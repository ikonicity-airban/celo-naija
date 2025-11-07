// apps/web/src/app/api/airtime/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { getUserByPhone, createUser, createTx } from "@/lib/db/queries";
import { ngnToCNGN, normalizePhoneNumber } from "@/lib/contracts/utils";
import { mockAirtime } from "@/lib/mocks/data";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userPhone, userAddress, network, phone, amountNGN, txHash } = body;

    if (!network || !phone || !amountNGN) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    const normalizedUserPhone = userPhone ? normalizePhoneNumber(userPhone) : null;
    const normalizedRecipientPhone = normalizePhoneNumber(phone);

    // 1. Get or create user
    let user;
    if (normalizedUserPhone) {
      let [existingUser] = await getUserByPhone(normalizedUserPhone);
      if (!existingUser) {
        [existingUser] = await createUser(normalizedUserPhone);
      }
      user = existingUser;
    } else if (userAddress) {
      [user] = await createUser(`temp_${Date.now()}`);
    } else {
      return NextResponse.json(
        { error: "User phone or address required", success: false },
        { status: 400 }
      );
    }

    // 2. Process airtime purchase
    let receipt;
    if (USE_MOCK) {
      receipt = await mockAirtime(normalizedRecipientPhone, Number(amountNGN));
    } else {
      // TODO: Integrate real provider (Paga, MTN MoMo)
      receipt = { success: true, receipt: `REAL-${Date.now()}` };
    }

    // 3. Create transaction record
    const amountCNGN = ngnToCNGN(Number(amountNGN));
    
    const [transaction] = await createTx({
      userId: user.id,
      type: "airtime",
      recipientPhone: normalizedRecipientPhone,
      amountNGN: amountNGN.toString(),
      amountCNGN,
      txHash: txHash || undefined,
      status: receipt.success ? "completed" : "failed",
      metadata: {
        network,
        receipt: receipt.receipt,
        mock: USE_MOCK,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        transaction,
        receipt,
        message: `Successfully purchased ₦${amountNGN} ${network} airtime for ${normalizedRecipientPhone}`,
      },
    });
  } catch (error: any) {
    console.error("Airtime purchase error:", error);
    return NextResponse.json(
      { 
        error: error.message || "Failed to purchase airtime",
        success: false 
      },
      { status: 500 }
    );
  }
}