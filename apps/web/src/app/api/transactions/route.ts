import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { transactions, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get("phone");
  if (!phone) return NextResponse.json({ error: "phone required" }, { status: 400 });

  const user = await db.select().from(users).where(eq(users.phoneNumber, phone)).limit(1);
  if (!user[0]) return NextResponse.json([]);

  const txs = await db
    .select()
    .from(transactions)
    .where(eq(transactions.userId, user[0].id))
    .orderBy(transactions.createdAt);

  return NextResponse.json(txs);
}