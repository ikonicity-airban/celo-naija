"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowRight, User, ArrowLeft, Loader2, Send } from "lucide-react";
import { useSendMoney } from "@/lib/hooks/use-api";
import { useToast } from "@/hooks/use-toast";
import { normalizePhoneNumber, isValidNigerianPhone, formatNGN } from "@/lib/contracts/utils";

interface SendMoneyFormProps {
  onSuccess?: () => void;
}

export default function SendMoneyForm({ onSuccess }: SendMoneyFormProps) {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"phone" | "amount" | "review">("phone");
  const { mutateAsync: sendMoney, isPending } = useSendMoney();
  const { toast } = useToast();

  const exchangeRate = Number(process.env.NEXT_PUBLIC_CNGN_TO_NGN_RATE || 1);
  const amountNGN = parseFloat(amount) || 0;
  const amountCNGN = amountNGN / exchangeRate;

  const isPhoneValid = phone.length === 10 && isValidNigerianPhone(normalizePhoneNumber(phone));

  const handleContinue = () => {
    if (step === "phone" && isPhoneValid) {
      setStep("amount");
    } else if (step === "amount" && amountNGN > 0) {
      setStep("review");
    }
  };

  const handleSend = async () => {
    if (!isPhoneValid || amountNGN <= 0) return;

    try {
      await sendMoney({
        recipientPhone: phone,
        amountNGN,
      });

      toast({
        title: "Money Sent Successfully!",
        description: `${formatNGN(amountNGN)} sent to +234${phone}`,
      });

      // Reset form
      setPhone("");
      setAmount("");
      setStep("phone");
      
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({
        title: "Transfer Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {step === "phone" && (
        <div className="card-default">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#D975BB] to-[#A03E82] shadow-elevation-2">
              <Send className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-h2">Send Money</h2>
              <p className="text-caption text-muted-gray-purple">Enter recipient's phone</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone" className="text-body-lg font-semibold text-deep-violet mb-2">
                Phone Number
              </Label>
              <div className="flex gap-2">
                <div className="flex items-center px-4 h-12 bg-[#F8F6FB] rounded-2xl border border-[rgba(168,163,193,0.06)]">
                  <span className="text-body-lg font-medium text-deep-violet">+234</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="812 345 6789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  data-testid="input-phone"
                  className="flex-1 h-12 text-body-lg border-[rgba(168,163,193,0.06)] rounded-2xl focus:border-pink focus:ring-2 focus:ring-pink/20"
                />
              </div>
              {phone.length > 0 && !isPhoneValid && (
                <p className="text-xs text-destructive mt-2">Enter a valid 10-digit Nigerian number</p>
              )}
            </div>
            <Button
              onClick={handleContinue}
              disabled={!isPhoneValid}
              data-testid="button-continue"
              className="w-full h-12 bg-gradient-b text-white hover-elevate active-elevate-2"
            >
              Continue
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {step === "amount" && (
        <div className="card-default">
          <button
            onClick={() => setStep("phone")}
            data-testid="button-back"
            className="flex items-center gap-2 text-body-lg text-vivid-purple mb-4 hover-elevate px-3 py-2 rounded-lg -ml-3 active-elevate-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h2 className="text-h2 mb-6">Enter Amount</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount" className="text-body-lg font-semibold text-deep-violet mb-2">
                Amount (NGN)
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body-lg font-semibold text-muted-gray-purple">
                  ₦
                </span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  data-testid="input-amount"
                  className="pl-8 h-12 text-body-lg border-[rgba(168,163,193,0.06)] rounded-2xl focus:border-pink focus:ring-2 focus:ring-pink/20"
                />
              </div>
              {amount && (
                <p className="text-caption text-muted-gray-purple mt-2" data-testid="text-conversion">
                  ≈ {amountCNGN.toFixed(4)} cNGN (1 cNGN = ₦{exchangeRate})
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[1000, 5000, 10000, 20000].map((amt) => (
                <Button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  data-testid={`button-amount-${amt}`}
                  variant="outline"
                  size="sm"
                  className="h-10 border-[rgba(168,163,193,0.12)] hover:border-pink hover:bg-pink/5 rounded-xl"
                >
                  ₦{amt.toLocaleString()}
                </Button>
              ))}
            </div>
            <Button
              onClick={handleContinue}
              disabled={!amount || amountNGN <= 0}
              data-testid="button-review"
              className="w-full h-12 bg-gradient-b text-white hover-elevate active-elevate-2"
            >
              Review
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {step === "review" && (
        <div className="card-default">
          <button
            onClick={() => setStep("amount")}
            data-testid="button-back-review"
            className="flex items-center gap-2 text-body-lg text-vivid-purple mb-4 hover-elevate px-3 py-2 rounded-lg -ml-3 active-elevate-2"
            disabled={isPending}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h2 className="text-h2 mb-6">Review Transaction</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-[#F8F6FB] rounded-2xl border border-[rgba(168,163,193,0.06)]">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#7056B2] to-[#55389B] shadow-elevation-2">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-body-lg font-semibold text-deep-violet" data-testid="text-review-phone">
                  +234 {phone}
                </p>
                <p className="text-caption text-muted-gray-purple">Recipient</p>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-[#F8F6FB] rounded-2xl border border-[rgba(168,163,193,0.06)]">
              <div className="flex justify-between">
                <span className="text-body text-muted-gray-purple">Amount</span>
                <span className="text-body-lg font-semibold text-deep-violet" data-testid="text-review-amount">
                  {formatNGN(amountNGN)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-body text-muted-gray-purple">cNGN Equivalent</span>
                <span className="text-body text-deep-violet" data-testid="text-review-cngn">
                  {amountCNGN.toFixed(4)} cNGN
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-body text-muted-gray-purple">Fee</span>
                <span className="text-body text-pink font-semibold">Free</span>
              </div>
              <div className="h-px bg-[rgba(168,163,193,0.12)] my-2" />
              <div className="flex justify-between">
                <span className="text-body-lg font-semibold text-deep-violet">Total</span>
                <span className="text-body-lg font-bold text-deep-violet" data-testid="text-review-total">
                  {amountCNGN.toFixed(4)} cNGN
                </span>
              </div>
            </div>

            <Button
              onClick={handleSend}
              disabled={isPending}
              data-testid="button-send-money"
              className="w-full h-12 bg-gradient-b text-white hover-elevate active-elevate-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Money"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}