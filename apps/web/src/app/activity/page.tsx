"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SendMoneyForm from "@/components/SendMoneyForm";
import AirtimePurchaseCard from "@/components/AirtimePurchaseCard";
import BillPaymentCard from "@/components/BillPaymentCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Smartphone, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type TabType = "send" | "airtime" | "bills";

export default function SendPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>("send");

  const handleSendMoney = async (phone: string, amount: number) => {
    try {
      // TODO: Integrate with smart contract
      toast({
        title: "Money Sent!",
        description: `₦${amount.toLocaleString()} sent to +234${phone}`,
      });
      
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      toast({
        title: "Transfer Failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleAirtimePurchase = async (network: string, phone: string, amount: number) => {
    try {
      toast({
        title: "Airtime Purchased!",
        description: `₦${amount} ${network.toUpperCase()} airtime sent to +234${phone}`,
      });
      
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleBillPayment = async (type: string, meterNumber: string, amount: number) => {
    try {
      toast({
        title: "Bill Paid!",
        description: `₦${amount.toLocaleString()} paid for ${type.toUpperCase()}`,
      });
      
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const tabs = [
    { id: "send" as TabType, label: "Send Money", icon: Send },
    { id: "airtime" as TabType, label: "Buy Airtime", icon: Smartphone },
    { id: "bills" as TabType, label: "Pay Bills", icon: Zap },
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
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl whitespace-nowrap transition-all hover-elevate ${
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

        {/* Content */}
        <div className="p-4">
          {activeTab === "send" && <SendMoneyForm onSend={handleSendMoney} />}
          {activeTab === "airtime" && <AirtimePurchaseCard onPurchase={handleAirtimePurchase} />}
          {activeTab === "bills" && <BillPaymentCard onPay={handleBillPayment} />}
        </div>
      </div>
    </div>
  );
}