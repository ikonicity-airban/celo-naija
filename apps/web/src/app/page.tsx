"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import BalanceCard from "@/components/BalanceCard";
import TransactionListItem from "@/components/TransactionListItem";
import { Button } from "@/components/ui/button";
import { Bell, TrendingUp } from "lucide-react";

export default function Home() {
  const router = useRouter();

  // Mock data for now - replace with real API calls
  const balance = { cNGN: 150000, ngn: 247500000 };
  const transactions = [
    {
      id: "1",
      type: "sent" as const,
      recipient: "Chidi Okafor",
      recipientPhone: "8123456789",
      amountNGN: "50000",
      status: "completed" as const,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      type: "received" as const,
      recipient: "Ngozi Adeyemi",
      recipientPhone: "8098765432",
      amountNGN: "25000",
      status: "completed" as const,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "3",
      type: "airtime" as const,
      recipient: "MTN Airtime",
      recipientPhone: "8123456789",
      amountNGN: "1000",
      status: "completed" as const,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, #EBE2FF 0%, #F8F6FB 100%)",
        }}
      />

      <div className="max-w-mobile mx-auto">
        {/* Header */}
        <header className="sticky top-0 z-10">
          <div
            className="backdrop-blur-md"
            style={{
              background: "rgba(251, 251, 253, 0.8)",
            }}
          >
            <div className="flex items-center justify-between p-4">
              <div>
                <h1 className="text-h1">NaijaSend</h1>
                <p className="text-caption text-muted-foreground">
                  Send money home, fast
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                data-testid="button-notifications"
                className="relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
              </Button>
            </div>
          </div>
        </header>

        <div className="p-4 space-y-6">
          {/* Balance Card */}
          <BalanceCard
            balanceCNGN={balance.cNGN}
            balanceNGN={balance.ngn}
            onSend={() => router.push("/send")}
            onReceive={() => console.log("Receive clicked")}
            onBuyAirtime={() => router.push("/send")}
          />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="card-subtle">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-pink" />
                <span className="text-caption text-muted-gray-purple">
                  This Month
                </span>
              </div>
              <p className="text-h2">₦125,000</p>
              <p className="text-caption text-pink font-semibold mt-1">
                +12% from last month
              </p>
            </div>
            <div className="card-subtle">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-caption text-muted-gray-purple">
                  Transactions
                </span>
              </div>
              <p className="text-h2">24</p>
              <p className="text-caption text-muted-gray-purple mt-1">
                Completed
              </p>
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-h2">Recent Transactions</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/activity")}
                data-testid="button-view-all"
              >
                View All
              </Button>
            </div>

            {transactions.length === 0 ? (
              <div className="card-default text-center py-12">
                <p className="text-body text-muted-foreground">
                  No transactions yet
                </p>
                <p className="text-caption text-muted-foreground mt-1">
                  Start by sending money or buying airtime
                </p>
              </div>
            ) : (
              <div className="space-y-1 bg-card rounded-lg border border-card-border overflow-hidden">
                {transactions.slice(0, 5).map((tx: any) => (
                  <TransactionListItem
                    key={tx.id}
                    type={tx.type}
                    recipient={tx.recipient}
                    phone={tx.recipientPhone}
                    amount={parseFloat(tx.amountNGN)}
                    status={tx.status}
                    timestamp={new Date(tx.createdAt).toLocaleString()}
                    onClick={() => console.log("Transaction clicked:", tx.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}