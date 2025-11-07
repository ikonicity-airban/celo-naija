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
    <Card className="p-6 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <p className="text-caption opacity-90 mb-2">Total Balance</p>
          <div className="flex items-baseline gap-2">
            {showBalance ? (
              <>
                <span className="text-display font-bold" data-testid="text-balance-cngn">
                  {balanceCNGN.toFixed(2)}
                </span>
                <span className="text-h2 opacity-90">cNGN</span>
              </>
            ) : (
              <span className="text-display font-bold">••••••</span>
            )}
          </div>
          {showBalance && (
            <p className="text-caption opacity-75 mt-1" data-testid="text-balance-ngn">
              ≈ ₦{balanceNGN.toLocaleString()}
            </p>
          )}
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setShowBalance(!showBalance)}
          data-testid="button-toggle-balance"
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
        </Button>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onSend}
          data-testid="button-send"
          variant="secondary"
          className="flex-1 bg-background/20 hover:bg-background/30 text-primary-foreground border-0"
        >
          <Send className="w-4 h-4 mr-2" />
          Send
        </Button>
        <Button
          onClick={onReceive}
          data-testid="button-receive"
          variant="secondary"
          className="flex-1 bg-background/20 hover:bg-background/30 text-primary-foreground border-0"
        >
          <Download className="w-4 h-4 mr-2" />
          Receive
        </Button>
        <Button
          onClick={onBuyAirtime}
          data-testid="button-airtime"
          variant="secondary"
          className="flex-1 bg-background/20 hover:bg-background/30 text-primary-foreground border-0"
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Airtime
        </Button>
      </div>
    </Card>
  );
}
