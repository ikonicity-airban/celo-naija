// apps/web/src/lib/contracts/utils.ts
import { parseEther, formatEther, type Address } from "viem";

/**
 * Convert NGN to cNGN (wei)
 * Uses exchange rate from env (default 1:1 for demo)
 */
export function ngnToCNGN(amountNGN: number): bigint {
  const rate = Number(process.env.NEXT_PUBLIC_CNGN_TO_NGN_RATE || 1);
  const cNGNAmount = amountNGN / rate;
  return parseEther(cNGNAmount.toString());
}

/**
 * Convert cNGN (wei) to NGN
 */
export function cngnToNGN(amountCNGN: bigint): number {
  const rate = Number(process.env.NEXT_PUBLIC_CNGN_TO_NGN_RATE || 1);
  const cNGNFloat = Number(formatEther(amountCNGN));
  return cNGNFloat * rate;
}

/**
 * Format NGN with naira symbol
 */
export function formatNGN(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Normalize phone number to +234 format
 */
export function normalizePhoneNumber(phone: string): string {
  // Remove spaces, hyphens, parentheses
  let cleaned = phone.replace(/[\s\-()]/g, "");

  // Remove leading + if present
  if (cleaned.startsWith("+")) {
    cleaned = cleaned.slice(1);
  }

  // If starts with 0, replace with 234
  if (cleaned.startsWith("0")) {
    cleaned = "234" + cleaned.slice(1);
  }

  // If doesn't start with 234, add it
  if (!cleaned.startsWith("234")) {
    cleaned = "234" + cleaned;
  }

  return "+" + cleaned;
}

/**
 * Validate Nigerian phone number
 */
export function isValidNigerianPhone(phone: string): boolean {
  const normalized = normalizePhoneNumber(phone);
  // +234 followed by 10 digits
  return /^\+234\d{10}$/.test(normalized);
}

/**
 * Get short transaction hash for display
 */
export function shortTxHash(hash: string): string {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}

/**
 * Check if address is zero address
 */
export function isZeroAddress(address: Address): boolean {
  return address === "0x0000000000000000000000000000000000000000";
}
