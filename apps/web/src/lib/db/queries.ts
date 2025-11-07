import { db } from "./client";
import { users, transactions } from "./schema";
import { eq, and } from "drizzle-orm";

export const getUserByPhone = (phone: string) =>
  db.select().from(users).where(eq(users.phoneNumber, phone)).limit(1);

export const createUser = (phone: string) =>
  db.insert(users).values({ phoneNumber: phone }).returning();

export const linkWallet = (phone: string, address: `0x${string}`) =>
  db
    .update(users)
    .set({ walletAddress: address })
    .where(eq(users.phoneNumber, phone))
    .returning();

export const createTx = (data: {
  userId: string;
  type: "sent" | "received" | "airtime" | "bills";
  recipientPhone: string;
  recipientWallet?: string;
  amountNGN: string;
  amountCNGN: bigint;
  txHash?: string;
  status: "pending" | "completed" | "failed";
  metadata?: any;
}) => db.insert(transactions).values(data).returning();

export const updateTxStatus = (txHash: string, status: "completed" | "failed") =>
  db
    .update(transactions)
    .set({ status })
    .where(eq(transactions.txHash, txHash))
    .returning();