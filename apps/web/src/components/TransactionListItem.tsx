import { ArrowDownLeft, ArrowUpRight, Smartphone, Zap } from "lucide-react";
import { Badge } from "./ui/badge";

type TransactionType = "sent" | "received" | "airtime" | "bill";
type TransactionStatus = "pending" | "completed" | "failed";

interface TransactionListItemProps {
  type: TransactionType;
  recipient: string;
  phone?: string;
  amount: number;
  status: TransactionStatus;
  timestamp: string;
  onClick?: () => void;
}

const typeIcons = {
  sent: ArrowUpRight,
  received: ArrowDownLeft,
  airtime: Smartphone,
  bill: Zap,
};

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  completed: "bg-pink/10 text-pink",
  failed: "bg-destructive/10 text-destructive",
};

const statusLabels = {
  pending: "Processing",
  completed: "Successful",
  failed: "Failed",
};

export default function TransactionListItem({
  type,
  recipient,
  phone,
  amount,
  status,
  timestamp,
  onClick,
}: TransactionListItemProps) {
  const Icon = typeIcons[type];
  const isIncoming = type === "received";

  return (
    <button
      onClick={onClick}
      data-testid={`transaction-item-${type}`}
      className="w-full flex items-center gap-4 p-4 hover:bg-[rgba(168,163,193,0.04)] active:bg-[rgba(168,163,193,0.08)] rounded-lg text-left transition-all duration-200 border-b border-[rgba(168,163,193,0.06)] last:border-0"
    >
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-xl ${
          isIncoming ? "bg-pink/10" : "bg-gradient-c"
        }`}
      >
        <Icon
          className={`w-5 h-5 ${isIncoming ? "text-pink" : "text-white"}`}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-body-lg font-semibold text-deep-violet truncate" data-testid="text-recipient">
          {recipient}
        </p>
        {phone && (
          <p className="text-caption text-muted-gray-purple" data-testid="text-phone">
            {phone}
          </p>
        )}
        <div className="flex items-center gap-2 mt-1">
          <p className="text-caption text-muted-gray-purple" data-testid="text-timestamp">
            {timestamp}
          </p>
          <Badge
            variant="secondary"
            className={`${statusColors[status]} text-caption px-2 py-0.5 rounded-full`}
            data-testid={`badge-status-${status}`}
          >
            {statusLabels[status]}
          </Badge>
        </div>
      </div>

      <div className="text-right">
        <p
          className={`text-body-lg font-bold ${
            isIncoming ? "text-pink" : "text-deep-violet"
          }`}
          data-testid="text-amount"
        >
          {isIncoming ? "+" : "-"}₦{amount.toLocaleString()}
        </p>
      </div>
    </button>
  );
}