"use client";

import { useBalance } from "@/lib/hooks/use-api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Send, Download, Smartphone, TrendingUp } from "lucide-react";
import { formatNGN } from "@/lib/contracts/utils";
import { formatEther } from "viem";
import ImgCoin from "../assets/coins.png";

interface BalanceCardProps {
  onSend: () => void;
  onReceive: () => void;
  onBuyAirtime: () => void;
}

export default function BalanceCard({ onSend, onReceive, onBuyAirtime }: BalanceCardProps) {
  const { data: balanceData, isLoading } = useBalance();

  const balance = balanceData?.data || balanceData;
  const cNGNDisplay = balance?.cNGN ? parseFloat(balance.cNGN).toFixed(2) : "0.00";
  const ngnDisplay = balance?.ngn ? formatNGN(balance.ngn) : "₦0.00";

  if (isLoading) {
    return (
      <div className="card-accent relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div>
            <Skeleton className="h-4 w-24 bg-white/20 mb-2" />
            <Skeleton className="h-10 w-40 bg-white/20" />
            <Skeleton className="h-4 w-32 bg-white/20 mt-2" />
          </div>
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-12 flex-1 bg-white/10 rounded-2xl" />
            <Skeleton className="h-12 flex-1 bg-white/10 rounded-2xl" />
            <Skeleton className="h-12 flex-1 bg-white/10 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-accent relative overflow-visible">
      {/* 3D Coin Illustration */}
      <div className="absolute -right-8 -top-4 w-48 h-48 pointer-events-none z-0 opacity-60">
        <img
          src={ImgCoin.src}
          alt=""
          className="w-full h-full object-contain"
          style={{
            filter: "drop-shadow(0 10px 30px rgba(217, 117, 187, 0.4))",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-4">
        {/* Balance Display */}
        <div>
          <p className="text-caption text-white/90 mb-1">Total Balance</p>
          <h2 className="text-display">{ngnDisplay}</h2>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-sm font-semibold text-[#D975BB]">
              {cNGNDisplay} cNGN
            </p>
            <div className="flex items-center gap-1 text-xs text-white/80">
              <TrendingUp className="w-3 h-3" />
              <span>Live</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onSend}
            className="flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-white">Send</span>
          </button>

          <button
            onClick={onReceive}
            className="flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-white">Receive</span>
          </button>

          <button
            onClick={onBuyAirtime}
            className="flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-white">Airtime</span>
          </button>
        </div>
      </div>
    </div>
  );
}