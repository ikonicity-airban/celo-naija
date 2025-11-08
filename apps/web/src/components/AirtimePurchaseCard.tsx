"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Smartphone, Loader2 } from "lucide-react";
import { usePurchaseAirtime } from "@/lib/hooks/use-api";
import { useToast } from "@/hooks/use-toast";
import { normalizePhoneNumber, isValidNigerianPhone, formatNGN } from "@/lib/contracts/utils";

type Network = "mtn" | "airtel" | "glo" | "9mobile";

interface AirtimePurchaseCardProps {
  onSuccess?: () => void;
}

const networks = [
  { id: "mtn" as Network, name: "MTN", color: "bg-yellow-500" },
  { id: "airtel" as Network, name: "Airtel", color: "bg-red-500" },
  { id: "glo" as Network, name: "Glo", color: "bg-green-600" },
  { id: "9mobile" as Network, name: "9mobile", color: "bg-emerald-500" },
];

const amounts = [100, 200, 500, 1000];

export default function AirtimePurchaseCard({ onSuccess }: AirtimePurchaseCardProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const { mutateAsync: purchaseAirtime, isPending } = usePurchaseAirtime();
  const { toast } = useToast();

  const exchangeRate = Number(process.env.NEXT_PUBLIC_CNGN_TO_NGN_RATE || 1);
  const finalAmount = amount || parseFloat(customAmount) || 0;
  const amountCNGN = finalAmount / exchangeRate;

  const isPhoneValid = phone.length === 10 && isValidNigerianPhone(normalizePhoneNumber(phone));

  const handlePurchase = async () => {
    if (!selectedNetwork || !isPhoneValid || finalAmount <= 0) return;

    try {
      await purchaseAirtime({
        network: selectedNetwork,
        phone,
        amountNGN: finalAmount,
      });

      toast({
        title: "Airtime Purchased!",
        description: `${formatNGN(finalAmount)} ${selectedNetwork.toUpperCase()} airtime sent to +234${phone}`,
      });

      // Reset form
      setSelectedNetwork(null);
      setPhone("");
      setAmount(null);
      setCustomAmount("");

      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({
        title: "Purchase Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="card-default">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#8462E1] to-[#55389B] shadow-elevation-2">
          <Smartphone className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-h2">Buy Airtime</h2>
          <p className="text-caption text-muted-gray-purple">Quick top-up with cNGN</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-body-lg font-semibold text-deep-violet mb-3">Select Network</Label>
          <div className="grid grid-cols-2 gap-3">
            {networks.map((network) => (
              <button
                key={network.id}
                onClick={() => setSelectedNetwork(network.id)}
                data-testid={`button-network-${network.id}`}
                disabled={isPending}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all hover-elevate active-elevate-2 ${
                  selectedNetwork === network.id
                    ? "border-pink bg-pink/5 shadow-elevation-2"
                    : "border-[rgba(168,163,193,0.12)] hover:border-[rgba(168,163,193,0.2)]"
                }`}
              >
                <div className={`w-8 h-8 rounded-full ${network.color} shadow-sm flex-shrink-0`} />
                <span className="text-body-lg font-semibold text-deep-violet">{network.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="airtime-phone" className="text-body-lg font-semibold text-deep-violet mb-2">
            Phone Number
          </Label>
          <div className="flex gap-2">
            <div className="flex items-center px-4 h-12 bg-[#F8F6FB] rounded-2xl border border-[rgba(168,163,193,0.06)]">
              <span className="text-body-lg font-medium text-deep-violet">+234</span>
            </div>
            <Input
              id="airtime-phone"
              type="tel"
              placeholder="812 345 6789"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              disabled={isPending}
              data-testid="input-airtime-phone"
              className="flex-1 h-12 text-body-lg border-[rgba(168,163,193,0.06)] rounded-2xl focus:border-pink focus:ring-2 focus:ring-pink/20"
            />
          </div>
          {phone.length > 0 && !isPhoneValid && (
            <p className="text-xs text-destructive mt-2">Enter a valid 10-digit Nigerian number</p>
          )}
        </div>

        <div>
          <Label className="text-body-lg font-semibold text-deep-violet mb-3">Amount (NGN)</Label>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {amounts.map((amt) => (
              <Button
                key={amt}
                onClick={() => {
                  setAmount(amt);
                  setCustomAmount("");
                }}
                disabled={isPending}
                data-testid={`button-airtime-amount-${amt}`}
                variant={amount === amt ? "default" : "outline"}
                size="sm"
                className={amount === amt ? "bg-gradient-b text-white" : "border-[rgba(168,163,193,0.12)] hover:border-pink hover:bg-pink/5"}
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
            disabled={isPending}
            data-testid="input-custom-amount"
            className="h-12 text-body-lg border-[rgba(168,163,193,0.06)] rounded-2xl focus:border-pink focus:ring-2 focus:ring-pink/20"
          />
          {finalAmount > 0 && (
            <p className="text-caption text-muted-gray-purple mt-2" data-testid="text-airtime-conversion">
              ≈ {amountCNGN.toFixed(4)} cNGN
            </p>
          )}
        </div>

        <Button
          onClick={handlePurchase}
          disabled={!selectedNetwork || !isPhoneValid || finalAmount <= 0 || isPending}
          data-testid="button-purchase-airtime"
          className="w-full h-12 bg-gradient-b text-white hover-elevate active-elevate-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Purchase Airtime"
          )}
        </Button>
      </div>
    </div>
  );
}