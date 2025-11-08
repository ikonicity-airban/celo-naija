"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Zap, Tv, Droplet, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { usePayBill } from "@/lib/hooks/use-api";
import { useToast } from "@/hooks/use-toast";
import { formatNGN } from "@/lib/contracts/utils";

type BillType = "nepa" | "dstv" | "water";

interface BillPaymentCardProps {
  onSuccess?: () => void;
}

const billTypes = [
  { id: "nepa" as BillType, name: "NEPA/PHCN", icon: Zap, color: "text-yellow-600", bgColor: "bg-yellow-500/10" },
  { id: "dstv" as BillType, name: "DSTV", icon: Tv, color: "text-blue-600", bgColor: "bg-blue-500/10" },
  { id: "water" as BillType, name: "Water", icon: Droplet, color: "text-cyan-600", bgColor: "bg-cyan-500/10" },
];

const dstvPackages = [
  { name: "DStv Padi", amount: 2500 },
  { name: "DStv Yanga", amount: 3500 },
  { name: "DStv Confam", amount: 6200 },
  { name: "DStv Compact", amount: 10500 },
];

export default function BillPaymentCard({ onSuccess }: BillPaymentCardProps) {
  const [selectedType, setSelectedType] = useState<BillType>("nepa");
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const { mutateAsync: payBill, isPending } = usePayBill();
  const { toast } = useToast();

  const exchangeRate = Number(process.env.NEXT_PUBLIC_CNGN_TO_NGN_RATE || 1);
  const amountNGN = parseFloat(amount) || 0;
  const amountCNGN = amountNGN / exchangeRate;

  const handlePay = async () => {
    if (!meterNumber || amountNGN <= 0) return;

    try {
      await payBill({
        billType: selectedType,
        meterNumber,
        amountNGN,
        packageName: selectedPackage || undefined,
      });

      toast({
        title: "Bill Paid Successfully!",
        description: `${formatNGN(amountNGN)} paid for ${selectedType.toUpperCase()}`,
      });

      // Reset form
      setMeterNumber("");
      setAmount("");
      setSelectedPackage("");

      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  const handlePackageSelect = (pkg: string) => {
    setSelectedPackage(pkg);
    const selected = dstvPackages.find((p) => p.name === pkg);
    if (selected) {
      setAmount(selected.amount.toString());
    }
  };

  return (
    <div className="card-default">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#7056B2] to-[#A03E82] shadow-elevation-2">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-h2">Pay Bills</h2>
          <p className="text-caption text-muted-gray-purple">NEPA, DSTV, Water bills</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-body-lg font-semibold text-deep-violet mb-3">Bill Type</Label>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {billTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type.id);
                    setAmount("");
                    setSelectedPackage("");
                  }}
                  disabled={isPending}
                  data-testid={`button-bill-${type.id}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 whitespace-nowrap transition-all hover-elevate active-elevate-2 ${
                    selectedType === type.id
                      ? "border-pink bg-pink/5 shadow-elevation-2"
                      : "border-[rgba(168,163,193,0.12)] hover:border-[rgba(168,163,193,0.2)]"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${type.bgColor}`}>
                    <Icon className={`w-5 h-5 ${type.color}`} />
                  </div>
                  <span className="text-body font-semibold text-deep-violet">{type.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Label htmlFor="meter-number" className="text-body-lg font-semibold text-deep-violet mb-2">
            {selectedType === "nepa" ? "Meter Number" : selectedType === "dstv" ? "Smartcard Number" : "Account Number"}
          </Label>
          <Input
            id="meter-number"
            type="text"
            placeholder="Enter number"
            value={meterNumber}
            onChange={(e) => setMeterNumber(e.target.value)}
            disabled={isPending}
            data-testid="input-meter-number"
            className="h-12 text-body-lg border-[rgba(168,163,193,0.06)] rounded-2xl focus:border-pink focus:ring-2 focus:ring-pink/20"
          />
        </div>

        {selectedType === "dstv" && (
          <div>
            <Label className="text-body-lg font-semibold text-deep-violet mb-2">Package</Label>
            <Select value={selectedPackage} onValueChange={handlePackageSelect} disabled={isPending}>
              <SelectTrigger data-testid="select-package" className="h-12 rounded-2xl border-[rgba(168,163,193,0.06)]">
                <SelectValue placeholder="Select package" />
              </SelectTrigger>
              <SelectContent>
                {dstvPackages.map((pkg) => (
                  <SelectItem key={pkg.name} value={pkg.name}>
                    {pkg.name} - ₦{pkg.amount.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {selectedType !== "dstv" && (
          <div>
            <Label htmlFor="bill-amount" className="text-body-lg font-semibold text-deep-violet mb-2">
              Amount (NGN)
            </Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body-lg font-semibold text-muted-gray-purple">
                ₦
              </span>
              <Input
                id="bill-amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isPending}
                data-testid="input-bill-amount"
                className="pl-8 h-12 text-body-lg border-[rgba(168,163,193,0.06)] rounded-2xl focus:border-pink focus:ring-2 focus:ring-pink/20"
              />
            </div>
          </div>
        )}

        {amountNGN > 0 && (
          <p className="text-caption text-muted-gray-purple" data-testid="text-bill-conversion">
            ≈ {amountCNGN.toFixed(4)} cNGN (1 cNGN = ₦{exchangeRate})
          </p>
        )}

        <Button
          onClick={handlePay}
          disabled={!meterNumber || amountNGN <= 0 || isPending}
          data-testid="button-pay-bill"
          className="w-full h-12 bg-gradient-b text-white hover-elevate active-elevate-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Pay Bill"
          )}
        </Button>
      </div>
    </div>
  );
}