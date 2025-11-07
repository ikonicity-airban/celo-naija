import { pgTable, uuid, varchar, timestamp, decimal, bigint, jsonb, serial, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  phoneNumber: varchar("phone_number", { length: 20 }).unique().notNull(),
  walletAddress: varchar("wallet_address", { length: 42 }), // nullable
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const transactions = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  type: varchar("type", { length: 20 }).$type<"sent" | "received" | "airtime" | "bills">().notNull(),
  recipientPhone: varchar("recipient_phone", { length: 20 }).notNull(),
  recipientWallet: varchar("recipient_wallet", { length: 42 }), // filled after first send
  amountNGN: decimal("amount_ngn", { precision: 15, scale: 2 }).notNull(),
  amountCNGN: bigint("amount_cngn", { mode: "bigint" }).notNull(), // wei
  txHash: varchar("tx_hash", { length: 66 }).unique(),
  status: varchar("status", { length: 20 }).$type<"pending" | "completed" | "failed">().notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});