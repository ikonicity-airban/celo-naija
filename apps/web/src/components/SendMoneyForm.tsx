import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { ArrowRight, User } from "lucide-react";

interface SendMoneyFormProps {
  onSend?: (phone: string, amount: number) => void;
}

export default function SendMoneyForm({ onSend }: SendMoneyFormProps) {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"phone" | "amount" | "review">("phone");

  const exchangeRate = 1650;
  const amountNGN = parseFloat(amount) || 0;
  const amountCNGN = amountNGN / exchangeRate;

  const handleContinue = () => {
    if (step === "phone" && phone) {
      setStep("amount");
    } else if (step === "amount" && amount) {
      setStep("review");
    }
  };

  const handleSend = () => {
    if (onSend && phone && amount) {
      onSend(phone, parseFloat(amount));
      setPhone("");
      setAmount("");
      setStep("phone");
    }
  };

  return (
    <div className="space-y-6">
      {step === "phone" && (
        <Card className="p-6">
          <h2 className="text-h2 mb-6">Send Money</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone" className="text-body mb-2">
                Phone Number
              </Label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 h-12 bg-muted rounded-lg">
                  <span className="text-body-lg">+234</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="812 345 6789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  data-testid="input-phone"
                  className="flex-1 h-12 text-body-lg"
                />
              </div>
            </div>
            <Button
              onClick={handleContinue}
              disabled={!phone}
              data-testid="button-continue"
              className="w-full h-12"
            >
              Continue
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </Card>
      )}

      {step === "amount" && (
        <Card className="p-6">
          <button
            onClick={() => setStep("phone")}
            data-testid="button-back"
            className="text-body text-primary mb-4 hover-elevate px-3 py-1 rounded"
          >
            ← Back
          </button>
          <h2 className="text-h2 mb-6">Enter Amount</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount" className="text-body mb-2">
                Amount (NGN)
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body-lg text-muted-foreground">
                  ₦
                </span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  data-testid="input-amount"
                  className="pl-8 h-12 text-body-lg"
                />
              </div>
              {amount && (
                <p className="text-caption text-muted-foreground mt-2" data-testid="text-conversion">
                  ≈ {amountCNGN.toFixed(4)} cNGN (1 cNGN = ₦{exchangeRate})
                </p>
              )}
            </div>
            <div className="flex gap-2">
              {[1000, 5000, 10000, 20000].map((amt) => (
                <Button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  data-testid={`button-amount-${amt}`}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  ₦{amt.toLocaleString()}
                </Button>
              ))}
            </div>
            <Button
              onClick={handleContinue}
              disabled={!amount || parseFloat(amount) <= 0}
              data-testid="button-review"
              className="w-full h-12"
            >
              Review
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </Card>
      )}

      {step === "review" && (
        <Card className="p-6">
          <button
            onClick={() => setStep("amount")}
            data-testid="button-back-review"
            className="text-body text-primary mb-4 hover-elevate px-3 py-1 rounded"
          >
            ← Back
          </button>
          <h2 className="text-h2 mb-6">Review Transaction</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-body-lg font-medium" data-testid="text-review-phone">
                  +234 {phone}
                </p>
                <p className="text-caption text-muted-foreground">Recipient</p>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-muted rounded-lg">
              <div className="flex justify-between">
                <span className="text-body text-muted-foreground">Amount</span>
                <span className="text-body-lg font-semibold" data-testid="text-review-amount">
                  ₦{parseFloat(amount).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-body text-muted-foreground">cNGN Equivalent</span>
                <span className="text-body" data-testid="text-review-cngn">
                  {amountCNGN.toFixed(4)} cNGN
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-body text-muted-foreground">Fee</span>
                <span className="text-body text-primary">Free</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between">
                <span className="text-body-lg font-medium">Total</span>
                <span className="text-body-lg font-bold" data-testid="text-review-total">
                  {amountCNGN.toFixed(4)} cNGN
                </span>
              </div>
            </div>

            <Button
              onClick={handleSend}
              data-testid="button-send-money"
              className="w-full h-12"
            >
              Send Money
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
