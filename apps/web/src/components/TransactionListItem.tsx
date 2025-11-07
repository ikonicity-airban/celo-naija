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
  completed: "bg-primary/10 text-primary",
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
      className="w-full flex items-center gap-4 p-4 hover-elevate active-elevate-2 rounded-lg text-left"
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full ${
          isIncoming ? "bg-primary/10" : "bg-muted"
        }`}
      >
        <Icon
          className={`w-5 h-5 ${isIncoming ? "text-primary" : "text-foreground"}`}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-body-lg font-medium truncate" data-testid="text-recipient">
          {recipient}
        </p>
        {phone && (
          <p className="text-caption text-muted-foreground" data-testid="text-phone">
            {phone}
          </p>
        )}
        <div className="flex items-center gap-2 mt-1">
          <p className="text-caption text-muted-foreground" data-testid="text-timestamp">
            {timestamp}
          </p>
          <Badge
            variant="secondary"
            className={`${statusColors[status]} text-caption px-2 py-0.5`}
            data-testid={`badge-status-${status}`}
          >
            {statusLabels[status]}
          </Badge>
        </div>
      </div>

      <div className="text-right">
        <p
          className={`text-body-lg font-semibold ${
            isIncoming ? "text-primary" : "text-foreground"
          }`}
          data-testid="text-amount"
        >
          {isIncoming ? "+" : "-"}₦{amount.toLocaleString()}
        </p>
      </div>
    </button>
  );
}
