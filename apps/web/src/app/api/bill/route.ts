// apps/web/src/app/api/bill/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { getUserByPhone, createUser, createTx } from "@/lib/db/queries";
import { ngnToCNGN, normalizePhoneNumber } from "@/lib/contracts/utils";
import { mockBill } from "@/lib/mocks/data";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userPhone, userAddress, billType, meterNumber, amountNGN, packageName, txHash } = body;

    if (!billType || !meterNumber || !amountNGN) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    const normalizedUserPhone = userPhone ? normalizePhoneNumber(userPhone) : null;

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

    // 2. Process bill payment
    let receipt;
    if (USE_MOCK) {
      receipt = await mockBill(billType, meterNumber, Number(amountNGN));
    } else {
      // TODO: Integrate Quickteller/Interswitch
      receipt = { success: true, receipt: `REAL-BILL-${Date.now()}` };
    }

    // 3. Create transaction record
    const amountCNGN = ngnToCNGN(Number(amountNGN));
    
    const [transaction] = await createTx({
      userId: user.id,
      type: "bills",
      recipientPhone: meterNumber, // Store meter number in recipient field
      amountNGN: amountNGN.toString(),
      amountCNGN,
      txHash: txHash || undefined,
      status: receipt.success ? "completed" : "failed",
      metadata: {
        billType,
        meterNumber,
        packageName,
        receipt: receipt.receipt,
        mock: USE_MOCK,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        transaction,
        receipt,
        message: `Successfully paid ₦${amountNGN} ${billType} bill for ${meterNumber}`,
      },
    });
  } catch (error: any) {
    console.error("Bill payment error:", error);
    return NextResponse.json(
      { 
        error: error.message || "Failed to pay bill",
        success: false 
      },
      { status: 500 }
    );
  }
}