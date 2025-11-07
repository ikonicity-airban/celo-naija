"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import BalanceCard from "@/components/BalanceCard";
import TransactionListItem from "@/components/TransactionListItem";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const { data: balanceData } = useQuery({
    queryKey: ["/api/balance"],
  });

  const { data: transactionsData } = useQuery({
    queryKey: ["/api/transactions"],
  });

  const balance = (balanceData as any)?.data || { cNGN: 0, ngn: 0 };
  const transactions = (transactionsData as any)?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-lavender via-[#A990D4] to-deep-violet pb-24">
      <div className="max-w-mobile mx-auto">
        <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-10 border-b border-[rgba(168,163,193,0.06)]">
          <div className="flex items-center justify-between p-4">
            <div>
              <h1 className="text-h1">NaijaSend</h1>
              <p className="text-caption">
                Send money home, fast
              </p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              data-testid="button-notifications"
              className="relative hover-elevate active-elevate-2"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
            </Button>
          </div>
        </header>

        <div className="p-4 space-y-6">
          <BalanceCard
            balanceCNGN={balance.cNGN}
            balanceNGN={balance.ngn}
            onSend={() => router.push("/send")}
            onReceive={() => console.log("Receive clicked")}
            onBuyAirtime={() => router.push("/send")}
          />

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-h2">Recent Transactions</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/activity")}
                data-testid="button-view-all"
                className="text-vivid-purple hover:text-pink hover-elevate"
              >
                View All
              </Button>
            </div>

            {transactions.length === 0 ? (
              <div className="text-center py-12 card-default">
                <p className="text-body-lg font-semibold text-deep-violet mb-2">No transactions yet</p>
                <p className="text-caption">
                  Start by sending money or buying airtime
                </p>
              </div>
            ) : (
              <div className="space-y-1 bg-white rounded-3xl border border-[rgba(168,163,193,0.06)] overflow-hidden shadow-elevation-1">
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