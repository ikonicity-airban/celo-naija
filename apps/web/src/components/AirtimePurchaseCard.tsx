import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Smartphone } from "lucide-react";

type Network = "mtn" | "airtel" | "glo" | "9mobile";

interface AirtimePurchaseCardProps {
  onPurchase?: (network: Network, phone: string, amount: number) => void;
}

const networks = [
  { id: "mtn" as Network, name: "MTN", color: "bg-yellow-500" },
  { id: "airtel" as Network, name: "Airtel", color: "bg-red-500" },
  { id: "glo" as Network, name: "Glo", color: "bg-green-600" },
  { id: "9mobile" as Network, name: "9mobile", color: "bg-emerald-500" },
];

const amounts = [100, 200, 500, 1000];

export default function AirtimePurchaseCard({ onPurchase }: AirtimePurchaseCardProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const exchangeRate = 1650;
  const finalAmount = amount || parseFloat(customAmount) || 0;
  const amountCNGN = finalAmount / exchangeRate;

  const handlePurchase = () => {
    if (onPurchase && selectedNetwork && phone && finalAmount > 0) {
      onPurchase(selectedNetwork, phone, finalAmount);
      setSelectedNetwork(null);
      setPhone("");
      setAmount(null);
      setCustomAmount("");
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
          <Smartphone className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-h2">Buy Airtime</h2>
          <p className="text-caption text-muted-foreground">Quick top-up with cNGN</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-body mb-3">Select Network</Label>
          <div className="grid grid-cols-2 gap-3">
            {networks.map((network) => (
              <button
                key={network.id}
                onClick={() => setSelectedNetwork(network.id)}
                data-testid={`button-network-${network.id}`}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all hover-elevate ${
                  selectedNetwork === network.id
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
              >
                <div className={`w-8 h-8 rounded-full ${network.color}`} />
                <span className="text-body-lg font-medium">{network.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="airtime-phone" className="text-body mb-2">
            Phone Number
          </Label>
          <div className="flex gap-2">
            <div className="flex items-center px-3 h-12 bg-muted rounded-lg">
              <span className="text-body-lg">+234</span>
            </div>
            <Input
              id="airtime-phone"
              type="tel"
              placeholder="812 345 6789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              data-testid="input-airtime-phone"
              className="flex-1 h-12 text-body-lg"
            />
          </div>
        </div>

        <div>
          <Label className="text-body mb-3">Amount (NGN)</Label>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {amounts.map((amt) => (
              <Button
                key={amt}
                onClick={() => {
                  setAmount(amt);
                  setCustomAmount("");
                }}
                data-testid={`button-airtime-amount-${amt}`}
                variant={amount === amt ? "default" : "outline"}
                size="sm"
              >
                ₦{amt}
              </Button>
            ))}
          </div>
          <Input
            type="number"
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setAmount(null);
            }}
            data-testid="input-custom-amount"
            className="h-12 text-body-lg"
          />
          {finalAmount > 0 && (
            <p className="text-caption text-muted-foreground mt-2" data-testid="text-airtime-conversion">
              ≈ {amountCNGN.toFixed(4)} cNGN
            </p>
          )}
        </div>

        <Button
          onClick={handlePurchase}
          disabled={!selectedNetwork || !phone || finalAmount <= 0}
          data-testid="button-purchase-airtime"
          className="w-full h-12"
        >
          Purchase Airtime
        </Button>
      </div>
    </Card>
  );
}
