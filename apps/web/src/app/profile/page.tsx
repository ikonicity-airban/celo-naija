"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Phone, Wallet, Shield, HelpCircle, LogOut } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();

  const menuItems = [
    { icon: User, label: "Personal Information", action: () => {} },
    { icon: Phone, label: "Phone Number", action: () => {}, subtitle: "+234 812 345 6789" },
    { icon: Wallet, label: "Linked Wallet", action: () => {}, subtitle: "Not connected" },
    { icon: Shield, label: "Security & Privacy", action: () => {} },
    { icon: HelpCircle, label: "Help & Support", action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-mobile mx-auto">
        {/* Header */}
        <header className="sticky top-0 bg-background/80 backdrop-blur-lg z-10 border-b border-border">
          <div className="flex items-center gap-4 p-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => router.push("/")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-h2">Profile</h1>
              <p className="text-caption text-muted-foreground">
                Manage your account
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Profile Card */}
          <div className="card-accent text-white text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-h2 text-white">Welcome Back!</h2>
                <p className="text-caption text-white/90 mt-1">
                  +234 812 345 6789
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-1 bg-card rounded-lg border border-card-border overflow-hidden">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.action}
                  data-testid={`menu-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="w-full flex items-center gap-4 p-4 hover:bg-[rgba(168,163,193,0.04)] active:bg-[rgba(168,163,193,0.08)] text-left transition-all duration-200 border-b border-[rgba(168,163,193,0.06)] last:border-0"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-body-lg font-semibold text-deep-violet">
                      {item.label}
                    </p>
                    {item.subtitle && (
                      <p className="text-caption text-muted-gray-purple">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                  <svg
                    className="w-5 h-5 text-muted-foreground"
                    fill="none"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              );
            })}
          </div>

          {/* Logout Button */}
          <Button
            variant="destructive"
            className="w-full h-12"
            data-testid="button-logout"
            onClick={() => {
              // TODO: Implement logout
              router.push("/");
            }}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}