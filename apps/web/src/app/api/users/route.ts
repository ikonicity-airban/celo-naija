import { NextResponse } from "next/server";
import { getUserByPhone, createUser } from "@/lib/db/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get("phone");
  if (!phone) return NextResponse.json({ error: "phone required" }, { status: 400 });

  const [user] = await getUserByPhone(phone);
  if (user) return NextResponse.json(user);

  const [newUser] = await createUser(phone);
  return NextResponse.json(newUser);
}