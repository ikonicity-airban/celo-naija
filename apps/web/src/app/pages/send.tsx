import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SendMoneyForm from "@/components/SendMoneyForm";
import AirtimePurchaseCard from "@/components/AirtimePurchaseCard";
import BillPaymentCard from "@/components/BillPaymentCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient as qc } from "@/lib/queryClient";

type Tab = "send" | "airtime" | "bills";

export default function Send() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = qc;
  const [activeTab, setActiveTab] = useState<Tab>("send");

  // Send money mutation
  const sendMoneyMutation = useMutation({
    mutationFn: async (data: { recipientPhone: string; amountNGN: number }) => {
      const res = await apiRequest("POST", "/api/send", data);
      return await res.json();
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/balance"] });
      toast({
        title: "Money Sent!",
        description: data.data.message,
      });
      setTimeout(() => setLocation("/"), 1500);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send money",
        variant: "destructive",
      });
    },
  });

  // Airtime mutation
  const airtimeMutation = useMutation({
    mutationFn: async (data: { network: string; phone: string; amountNGN: number }) => {
      const res = await apiRequest("POST", "/api/airtime", data);
      return await res.json();
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/balance"] });
      toast({
        title: "Airtime Purchased!",
        description: data.data.message,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to purchase airtime",
        variant: "destructive",
      });
    },
  });

  // Bill payment mutation
  const billMutation = useMutation({
    mutationFn: async (data: {
      billType: string;
      meterNumber: string;
      amountNGN: number;
      packageName?: string;
    }) => {
      const res = await apiRequest("POST", "/api/bill", data);
      return await res.json();
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/balance"] });
      toast({
        title: "Bill Paid!",
        description: data.data.message,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to pay bill",
        variant: "destructive",
      });
    },
  });

  const handleSendMoney = (phone: string, amount: number) => {
    // Normalize phone number to +234 format
    const normalizedPhone = phone.startsWith("+234") ? phone : `+234${phone.replace(/^0/, "")}`;
    sendMoneyMutation.mutate({ recipientPhone: normalizedPhone, amountNGN: amount });
  };

  const handlePurchaseAirtime = (network: string, phone: string, amount: number) => {
    const normalizedPhone = phone.startsWith("+234") ? phone : `+234${phone.replace(/^0/, "")}`;
    airtimeMutation.mutate({ network, phone: normalizedPhone, amountNGN: amount });
  };

  const handlePayBill = (type: string, meterNumber: string, amount: number, packageName?: string) => {
    billMutation.mutate({ billType: type, meterNumber, amountNGN: amount, packageName });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-mobile mx-auto">
        <header className="sticky top-0 bg-background/80 backdrop-blur-lg z-10 border-b border-border">
          <div className="flex items-center gap-3 p-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setLocation("/")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-h1">Send & Pay</h1>
          </div>

          <div className="flex border-b border-border">
            {[
              { id: "send" as Tab, label: "Send Money" },
              { id: "airtime" as Tab, label: "Airtime" },
              { id: "bills" as Tab, label: "Bills" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                data-testid={`tab-${tab.id}`}
                className={`flex-1 px-4 py-3 text-body font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>
        </header>

        <div className="p-4">
          {activeTab === "send" && <SendMoneyForm onSend={handleSendMoney} />}
          {activeTab === "airtime" && <AirtimePurchaseCard onPurchase={handlePurchaseAirtime} />}
          {activeTab === "bills" && <BillPaymentCard onPay={handlePayBill} />}
        </div>
      </div>
    </div>
  );
}
