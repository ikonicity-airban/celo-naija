"use client";

import { useRouter } from "next/navigation";
import { useTransactions } from "@/lib/hooks/use-api";
import BalanceCard from "@/components/BalanceCard";
import TransactionListItem from "@/components/TransactionListItem";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, TrendingUp, Activity } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { data: transactions, isLoading: txLoading } = useTransactions();

  // Calculate stats from transactions
  const thisMonthTotal = transactions?.reduce((sum: number, tx: any) => {
    const txDate = new Date(tx.createdAt);
    const now = new Date();
    if (txDate.getMonth() === now.getMonth() && tx.type === "sent") {
      return sum + parseFloat(tx.amountNGN);
    }
    return sum;
  }, 0) || 0;

  const completedCount = transactions?.filter((tx: any) => tx.status === "completed").length || 0;

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
        <header className="sticky top-0 z-10">
          <div
            className="backdrop-blur-md"
            style={{
              background: "rgba(251, 251, 253, 0.8)",
            }}
          >
            <div className="flex items-center justify-between p-4">
              <div>
                <h1 className="text-h1">Celo Naija</h1>
                <p className="text-caption text-muted-foreground">
                  Remit, pay bills, buy airtime & data
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
              <p className="text-h2">₦{thisMonthTotal.toLocaleString()}</p>
              <p className="text-caption text-pink font-semibold mt-1">
                Total sent
              </p>
            </div>
            <div className="card-subtle">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-[#7056B2]" />
                <span className="text-caption text-muted-gray-purple">
                  Transactions
                </span>
              </div>
              <p className="text-h2">{completedCount}</p>
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
                className="text-[#7056B2] hover:text-[#55389B]"
              >
                View All
              </Button>
            </div>

            {txLoading ? (
              <div className="space-y-1 bg-card rounded-lg border border-card-border overflow-hidden">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border-b border-card-border last:border-0">
                    <Skeleton className="w-12 h-12 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                ))}
              </div>
            ) : transactions?.length === 0 ? (
              <div className="card-default text-center py-12">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#EBE2FF] flex items-center justify-center">
                    <Activity className="w-8 h-8 text-[#7056B2]" />
                  </div>
                </div>
                <p className="text-body text-muted-foreground">
                  No transactions yet
                </p>
                <p className="text-caption text-muted-foreground mt-1">
                  Start by sending money or buying airtime
                </p>
                <Button
                  onClick={() => router.push("/send")}
                  className="mt-4 bg-gradient-b text-white hover-elevate"
                >
                  Send Money
                </Button>
              </div>
            ) : (
              <div className="space-y-1 bg-card rounded-lg border border-card-border overflow-hidden shadow-elevation-1">
                {transactions?.slice(0, 5).map((tx: any) => (
                  <TransactionListItem
                    key={tx.id}
                    type={tx.type}
                    recipient={tx.recipientPhone}
                    phone={tx.recipientPhone.replace("+234", "")}
                    amount={parseFloat(tx.amountNGN)}
                    status={tx.status}
                    timestamp={tx.createdAt}
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