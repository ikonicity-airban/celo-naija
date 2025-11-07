import { NextResponse } from "next/server";
import { getUserByPhone, createUser } from "@/lib/db/queries";
import { normalizePhoneNumber } from "@/lib/contracts/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get("phone");
  if (!phone) return NextResponse.json({ error: "phone required" }, { status: 400 });

  // Normalize phone number to +234 format for consistency
  const normalizedPhone = normalizePhoneNumber(phone);

  const [user] = await getUserByPhone(normalizedPhone);
  if (user) return NextResponse.json(user);

  const [newUser] = await createUser(normalizedPhone);
  return NextResponse.json(newUser);
}