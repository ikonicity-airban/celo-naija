"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SendMoneyForm from "@/components/SendMoneyForm";
import AirtimePurchaseCard from "@/components/AirtimePurchaseCard";
import BillPaymentCard from "@/components/BillPaymentCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Smartphone, Zap } from "lucide-react";

type TabType = "send" | "airtime" | "bills";

export default function SendPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("send");

  const tabs = [
    { id: "send" as TabType, label: "Send Money", icon: Send },
    { id: "airtime" as TabType, label: "Buy Airtime", icon: Smartphone },
    { id: "bills" as TabType, label: "Pay Bills", icon: Zap },
  ];

  const handleSuccess = () => {
    // Refresh or redirect after successful transaction
    setTimeout(() => router.push("/"), 1500);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Gradient Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, #EBE2FF 0%, #F8F6FB 100%)",
        }}
      />

      <div className="max-w-mobile mx-auto lg:max-w-4xl">
        {/* Header */}
        <header className="sticky top-0 z-10 backdrop-blur-md" style={{ background: "rgba(251, 251, 253, 0.8)" }}>
          <div className="flex items-center gap-4 p-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => router.push("/")}
              data-testid="button-back"
              className="hover-elevate active-elevate-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-h2">Quick Actions</h1>
              <p className="text-caption text-muted-foreground">
                Send money, buy airtime, or pay bills
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 px-4 pb-4 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  data-testid={`tab-${tab.id}`}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl whitespace-nowrap transition-all hover-elevate active-elevate-2 ${
                    activeTab === tab.id
                      ? "bg-gradient-b text-white shadow-elevation-2"
                      : "bg-card text-muted-foreground border border-card-border"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        {/* Content - Desktop Responsive */}
        <div className="p-4">
          <div className="lg:max-w-2xl lg:mx-auto">
            {activeTab === "send" && <SendMoneyForm onSuccess={handleSuccess} />}
            {activeTab === "airtime" && <AirtimePurchaseCard onSuccess={handleSuccess} />}
            {activeTab === "bills" && <BillPaymentCard onSuccess={handleSuccess} />}
          </div>
        </div>
      </div>
    </div>
  );
}