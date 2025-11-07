import { Eye, EyeOff, Send, Download, Smartphone } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface BalanceCardProps {
  balanceCNGN: number;
  balanceNGN: number;
  onSend?: () => void;
  onReceive?: () => void;
  onBuyAirtime?: () => void;
}

export default function BalanceCard({
  balanceCNGN,
  balanceNGN,
  onSend,
  onReceive,
  onBuyAirtime,
}: BalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="card-accent text-white">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <p className="text-caption text-white/90 mb-2">Total Balance</p>
          <div className="flex items-baseline gap-2">
            {showBalance ? (
              <>
                <span className="text-display" data-testid="text-balance-cngn">
                  {balanceCNGN.toFixed(2)}
                </span>
                <span className="text-h2 text-white/90">cNGN</span>
              </>
            ) : (
              <span className="text-display">••••••</span>
            )}
          </div>
          {showBalance && (
            <p className="text-caption text-pink mt-1 font-semibold" data-testid="text-balance-ngn">
              ≈ ₦{balanceNGN.toLocaleString()}
            </p>
          )}
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setShowBalance(!showBalance)}
          data-testid="button-toggle-balance"
          className="text-white hover:bg-white/10 border-0"
        >
          {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
        </Button>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onSend}
          data-testid="button-send"
          variant="secondary"
          className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0 h-12 rounded-[20px] hover-elevate active-elevate-2"
        >
          <Send className="w-4 h-4 mr-2" />
          Send
        </Button>
        <Button
          onClick={onReceive}
          data-testid="button-receive"
          variant="secondary"
          className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0 h-12 rounded-[20px] hover-elevate active-elevate-2"
        >
          <Download className="w-4 h-4 mr-2" />
          Receive
        </Button>
        <Button
          onClick={onBuyAirtime}
          data-testid="button-airtime"
          variant="secondary"
          className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0 h-12 rounded-[20px] hover-elevate active-elevate-2"
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Airtime
        </Button>
      </div>
    </div>
  );
}