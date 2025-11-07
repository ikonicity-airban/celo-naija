import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Zap, Tv, Droplet } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type BillType = "nepa" | "dstv" | "water";

interface BillPaymentCardProps {
  onPay?: (type: BillType, meterNumber: string, amount: number) => void;
}

const billTypes = [
  { id: "nepa" as BillType, name: "NEPA/PHCN", icon: Zap, color: "text-yellow-600" },
  { id: "dstv" as BillType, name: "DSTV", icon: Tv, color: "text-blue-600" },
  { id: "water" as BillType, name: "Water", icon: Droplet, color: "text-cyan-600" },
];

const dstvPackages = [
  { name: "DStv Padi", amount: 2500 },
  { name: "DStv Yanga", amount: 3500 },
  { name: "DStv Confam", amount: 6200 },
  { name: "DStv Compact", amount: 10500 },
];

export default function BillPaymentCard({ onPay }: BillPaymentCardProps) {
  const [selectedType, setSelectedType] = useState<BillType>("nepa");
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");

  const exchangeRate = 1650;
  const amountNGN = parseFloat(amount) || 0;
  const amountCNGN = amountNGN / exchangeRate;

  const handlePay = () => {
    if (onPay && meterNumber && amountNGN > 0) {
      onPay(selectedType, meterNumber, amountNGN);
      setMeterNumber("");
      setAmount("");
      setSelectedPackage("");
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
    <Card className="p-6">
      <h2 className="text-h2 mb-6">Pay Bills</h2>

      <div className="space-y-6">
        <div>
          <Label className="text-body mb-3">Bill Type</Label>
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
                  data-testid={`button-bill-${type.id}`}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 whitespace-nowrap transition-all hover-elevate ${
                    selectedType === type.id
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${type.color}`} />
                  <span className="text-body font-medium">{type.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Label htmlFor="meter-number" className="text-body mb-2">
            {selectedType === "nepa" ? "Meter Number" : selectedType === "dstv" ? "Smartcard Number" : "Account Number"}
          </Label>
          <Input
            id="meter-number"
            type="text"
            placeholder="Enter number"
            value={meterNumber}
            onChange={(e) => setMeterNumber(e.target.value)}
            data-testid="input-meter-number"
            className="h-12 text-body-lg"
          />
        </div>

        {selectedType === "dstv" && (
          <div>
            <Label className="text-body mb-2">Package</Label>
            <Select value={selectedPackage} onValueChange={handlePackageSelect}>
              <SelectTrigger data-testid="select-package" className="h-12">
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
            <Label htmlFor="bill-amount" className="text-body mb-2">
              Amount (NGN)
            </Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body-lg text-muted-foreground">
                ₦
              </span>
              <Input
                id="bill-amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                data-testid="input-bill-amount"
                className="pl-8 h-12 text-body-lg"
              />
            </div>
          </div>
        )}

        {amountNGN > 0 && (
          <p className="text-caption text-muted-foreground" data-testid="text-bill-conversion">
            ≈ {amountCNGN.toFixed(4)} cNGN (1 cNGN = ₦{exchangeRate})
          </p>
        )}

        <Button
          onClick={handlePay}
          disabled={!meterNumber || amountNGN <= 0}
          data-testid="button-pay-bill"
          className="w-full h-12"
        >
          Pay Bill
        </Button>
      </div>
    </Card>
  );
}
