"use client";

import { Send, ArrowDownLeft, Smartphone, Zap, Clock, CheckCircle2, XCircle } from "lucide-react";
import { formatNGN } from "@/lib/contracts/utils";
import { formatDistanceToNow } from "date-fns";

interface TransactionListItemProps {
  type: "sent" | "received" | "airtime" | "bills";
  recipient: string;
  phone: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  timestamp: string;
  onClick: () => void;
}

export default function TransactionListItem({
  type,
  recipient,
  phone,
  amount,
  status,
  timestamp,
  onClick,
}: TransactionListItemProps) {
  const iconMap = {
    sent: Send,
    received: ArrowDownLeft,
    airtime: Smartphone,
    bills: Zap,
  };

  const colorMap = {
    sent: "bg-gradient-to-br from-[#D975BB] to-[#A03E82]",
    received: "bg-gradient-to-br from-[#7056B2] to-[#55389B]",
    airtime: "bg-gradient-to-br from-[#8462E1] to-[#55389B]",
    bills: "bg-gradient-to-br from-[#7056B2] to-[#A03E82]",
  };

  const statusConfig = {
    pending: { icon: Clock, color: "text-[#747384]", bg: "bg-[#F8F6FB]" },
    completed: { icon: CheckCircle2, color: "text-[#7056B2]", bg: "bg-[#EBE2FF]" },
    failed: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
  };

  const Icon = iconMap[type];
  const StatusIcon = statusConfig[status].icon;
  const isNegative = type === "sent" || type === "airtime" || type === "bills";

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 hover:bg-[rgba(168,163,193,0.04)] active:bg-[rgba(168,163,193,0.08)] text-left transition-all duration-200 border-b border-[rgba(168,163,193,0.06)] last:border-0"
    >
      {/* Icon */}
      <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${colorMap[type]} shadow-elevation-2 flex-shrink-0`}>
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-body-lg font-semibold text-deep-violet truncate">
          {recipient}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <p className="text-caption text-muted-gray-purple">+234{phone}</p>
          <span className="text-caption text-muted-gray-purple">•</span>
          <p className="text-caption text-muted-gray-purple">
            {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
          </p>
        </div>
      </div>

      {/* Amount + Status */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <p className={`text-body-lg font-bold ${isNegative ? "text-deep-violet" : "text-[#7056B2]"}`}>
          {isNegative ? "-" : "+"}{formatNGN(amount).replace("NGN", "₦")}
        </p>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${statusConfig[status].bg}`}>
          <StatusIcon className={`w-3 h-3 ${statusConfig[status].color}`} />
          <span className={`text-xs font-medium ${statusConfig[status].color} capitalize`}>
            {status}
          </span>
        </div>
      </div>
    </button>
  );
}