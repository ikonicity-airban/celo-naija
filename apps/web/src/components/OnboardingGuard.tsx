"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

/**
 * OnboardingGuard - Redirects users to onboarding if they haven't completed it
 * Wrap this around your main app layout or specific pages
 */
export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip check if already on onboarding page
    if (pathname === "/onboarding") return;

    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem("onboarding_completed");

    if (!hasCompletedOnboarding) {
      router.push("/onboarding");
    }
  }, [pathname, router]);

  return <>{children}</>;
}

/**
 * Helper function to check onboarding status
 */
export function hasCompletedOnboarding(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("onboarding_completed") === "true";
}

/**
 * Helper function to reset onboarding (for testing)
 */
export function resetOnboarding(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("onboarding_completed");
  }
}