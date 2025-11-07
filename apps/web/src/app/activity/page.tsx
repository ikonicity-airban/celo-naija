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

  // Fetch transactions
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

  // Filter and search transactions
  const filteredTransactions = allTransactions.filter((tx: any) => {
    if (activeFilter !== "all" && tx.type !== activeFilter) return false;
    if (searchQuery && !tx.recipient.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Group by date
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
            <h1 className="text-h1">Activity</h1>
          </div>

          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
                className="pl-10 h-12"
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
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-32 h-32 mb-4 flex items-center justify-center">
                <Search className="w-16 h-16 text-muted-foreground/30" />
              </div>
              <p className="text-h2 text-muted-foreground mb-2">No transactions found</p>
              <p className="text-body text-muted-foreground text-center">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedTransactions).map(([date, transactions]: [string, any]) => (
                <div key={date}>
                  <h3 className="text-body font-semibold text-muted-foreground mb-2 px-2">
                    {date}
                  </h3>
                  <div className="bg-card rounded-lg border border-card-border overflow-hidden">
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
