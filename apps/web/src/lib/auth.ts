/**
 * Simple authentication utilities based on phone number
 */

import { normalizePhoneNumber } from "./contracts/utils";

export interface User {
  id: string;
  phoneNumber: string;
  walletAddress?: string | null;
  createdAt: string;
}

/**
 * Get user phone from localStorage
 */
export function getUserPhone(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("user_phone");
}

/**
 * Check if user has completed onboarding
 */
export function hasCompletedOnboarding(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("onboarding_completed") === "true";
}

/**
 * Get or create user from API
 * Normalizes phone number to +234 format for consistency
 */
export async function getOrCreateUser(phone: string): Promise<User | null> {
  try {
    // Normalize phone number to match API format
    const normalizedPhone = normalizePhoneNumber(phone);
    const response = await fetch(`/api/users?phone=${encodeURIComponent(normalizedPhone)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

/**
 * Check if user exists (has phone number in localStorage)
 */
export function hasUser(): boolean {
  return getUserPhone() !== null && hasCompletedOnboarding();
}

/**
 * Set user phone in localStorage
 */
export function setUserPhone(phone: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("user_phone", phone);
    localStorage.setItem("onboarding_completed", "true");
  }
}

/**
 * Clear user data (logout)
 */
export function clearUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user_phone");
    localStorage.removeItem("onboarding_completed");
  }
}

