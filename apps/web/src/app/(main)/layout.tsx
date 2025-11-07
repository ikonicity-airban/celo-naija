"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { hasUser, getUserPhone, getOrCreateUser } from "@/lib/auth";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Skip check if already on onboarding page
      if (pathname === "/onboarding") {
        setIsCheckingAuth(false);
        return;
      }

      // Check if user exists
      if (!hasUser()) {
        router.push("/onboarding");
        return;
      }

      // Verify user exists in database
      const phone = getUserPhone();
      if (phone) {
        const user = await getOrCreateUser(phone);
        if (!user) {
          // If user doesn't exist in DB, redirect to onboarding
          router.push("/onboarding");
          return;
        }
      }

      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [router, pathname]);

  // Show loading state while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-body text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative min-h-screen">
        {children}
      </div>
      <BottomNav />
    </>
  );
}