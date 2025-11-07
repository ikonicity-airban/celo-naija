"use client";
import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import TransactionListItem from "@/components/TransactionListItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";

type FilterTab = "all" | "sent" | "received" | "airtime" | "bills";

export default function Activity() {
  const [, setLocation] = useLocation();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: transactionsData } = useQuery({
    queryKey: ["/api/transactions"],
  });

  const allTransactions = (transactionsData as any)?.data || [];

  const filters = [
    { id: "all" as FilterTab, label: "All" },
    { id: "sent" as FilterTab, label: "Sent" },
    { id: "received" as FilterTab, label: "Received" },
    { id: "airtime" as FilterTab, label: "Airtime" },
    { id: "bills" as FilterTab, label: "Bills" },
  ];

  const filteredTransactions = allTransactions.filter((tx: any) => {
    if (activeFilter !== "all" && tx.type !== activeFilter) return false;
    if (searchQuery && !tx.recipient.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const groupedTransactions = filteredTransactions.reduce((acc: any, tx: any) => {
    const date = new Date(tx.createdAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dateLabel = "This Week";
    if (date.toDateString() === today.toDateString()) {
      dateLabel = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      dateLabel = "Yesterday";
    }

    if (!acc[dateLabel]) acc[dateLabel] = [];
    acc[dateLabel].push(tx);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-lavender via-[#A990D4] to-deep-violet pb-24">
      <div className="max-w-mobile mx-auto">
        <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-10 border-b border-[rgba(168,163,193,0.06)]">
          <div className="flex items-center gap-3 p-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setLocation("/")}
              data-testid="button-back"
              className="hover-elevate active-elevate-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-h1">Activity</h1>
          </div>

          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-gray-purple" />
              <Input
                type="search"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
                className="pl-12 h-12 rounded-2xl border-[rgba(168,163,193,0.06)] shadow-elevation-2"
              />
            </div>
          </div>

          <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                data-testid={`filter-${filter.id}`}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </header>

        <div className="p-4">
          {Object.keys(groupedTransactions).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 card-default">
              <div className="w-32 h-32 mb-4 flex items-center justify-center bg-[#F8F6FB] rounded-full">
                <Search className="w-16 h-16 text-muted-gray-purple/30" />
              </div>
              <p className="text-h2 mb-2">No transactions found</p>
              <p className="text-body text-center">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedTransactions).map(([date, transactions]: [string, any]) => (
                <div key={date}>
                  <h3 className="text-body font-semibold text-deep-violet mb-2 px-2">
                    {date}
                  </h3>
                  <div className="bg-white rounded-3xl border border-[rgba(168,163,193,0.06)] overflow-hidden shadow-elevation-1">
                    {transactions.map((tx: any) => (
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}