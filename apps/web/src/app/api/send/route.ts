// apps/web/src/app/api/send/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { getUserByPhone, createUser, createTx } from "@/lib/db/queries";
import { ngnToCNGN, normalizePhoneNumber } from "@/lib/contracts/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senderPhone, senderAddress, recipientPhone, amountNGN, txHash } = body;

    // Validate inputs
    if (!recipientPhone || !amountNGN) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    const normalizedRecipient = normalizePhoneNumber(recipientPhone);
    const normalizedSender = senderPhone ? normalizePhoneNumber(senderPhone) : null;

    // 1. Get or create sender
    let sender;
    if (normalizedSender) {
      let [existingSender] = await getUserByPhone(normalizedSender);
      if (!existingSender) {
        [existingSender] = await createUser(normalizedSender);
      }
      sender = existingSender;
    } else if (senderAddress) {
      // Create temp user with wallet address
      [sender] = await createUser(`temp_${Date.now()}`);
    } else {
      return NextResponse.json(
        { error: "Sender phone or address required", success: false },
        { status: 400 }
      );
    }

    // 2. Get or create recipient
    let [recipient] = await getUserByPhone(normalizedRecipient);
    if (!recipient) {
      [recipient] = await createUser(normalizedRecipient);
    }

    // 3. Create transaction record
    const amountCNGN = ngnToCNGN(Number(amountNGN));
    
    const [transaction] = await createTx({
      userId: sender.id,
      type: "sent",
      recipientPhone: normalizedRecipient,
      recipientWallet: recipient.walletAddress || undefined,
      amountNGN: amountNGN.toString(),
      amountCNGN,
      txHash: txHash || undefined,
      status: txHash ? "pending" : "completed", // If no txHash, it's a mock
      metadata: {
        senderPhone: normalizedSender,
        senderAddress,
      },
    });

    // 4. Create corresponding "received" transaction for recipient
    await createTx({
      userId: recipient.id,
      type: "received",
      recipientPhone: normalizedSender || senderAddress || "unknown",
      recipientWallet: senderAddress,
      amountNGN: amountNGN.toString(),
      amountCNGN,
      txHash: txHash || undefined,
      status: txHash ? "pending" : "completed",
      metadata: {
        sender: normalizedSender || senderAddress,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        transaction,
        message: `Successfully sent ₦${amountNGN} to ${normalizedRecipient}`,
      },
    });
  } catch (error: any) {
    console.error("Send money error:", error);
    return NextResponse.json(
      { 
        error: error.message || "Failed to send money",
        success: false 
      },
      { status: 500 }
    );
  }
}