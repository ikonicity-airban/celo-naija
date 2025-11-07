import { Phone } from "lucide-react";
import { useState } from "react";

interface PhoneNumberInputProps {
  onSubmit: (phoneNumber: string) => void;
  onClose: () => void;
}

export default function PhoneNumberModal({ onSubmit, onClose }: PhoneNumberInputProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    
    // Limit to 10 digits (without the leading 0)
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    
    setPhoneNumber(value);
    
    // Validate Nigerian phone number (7, 8, or 9 followed by 0 or 1, then 8 more digits)
    const nigerianPhoneRegex = /^(7|8|9)(0|1)\d{8}$/;
    
    if (value.length === 10 && nigerianPhoneRegex.test(value)) {
      setIsValid(true);
      setError("");
    } else if (value.length === 10) {
      setIsValid(false);
      setError("Please enter a valid Nigerian phone number");
    } else {
      setIsValid(false);
      setError("");
    }
  };

  const handleSubmit = () => {
    if (isValid) {
      onSubmit(phoneNumber);
    }
  };

  const formatPhoneNumber = (value: string) => {
    if (value.length <= 3) return value;
    if (value.length <= 6) return `${value.slice(0, 3)} ${value.slice(3)}`;
    return `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-purple-400/20 p-5 sm:p-6 lg:p-8"
        style={{
          animation: "modalSlideIn 0.3s ease-out"
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
            <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h2 
            className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1.5 sm:mb-2"
            style={{
              fontFamily: "Lato, sans-serif",
              background: "linear-gradient(135deg, #FFFFFF 0%, #E0E0FF 50%, #C4B5FD 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Welcome to Celo Naija
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            Enter your phone number to get started
          </p>
        </div>

        {/* Phone Input */}
        <div className="mb-5 sm:mb-6">
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 sm:gap-2 text-gray-400">
              <span className="text-base sm:text-lg">🇳🇬</span>
              <span className="text-xs sm:text-sm">+234</span>
            </div>
            <input
              type="tel"
              value={formatPhoneNumber(phoneNumber)}
              onChange={handlePhoneChange}
              placeholder="803 456 7890"
              maxLength={12}
              className="w-full pl-20 sm:pl-24 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/5 border-2 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-300 text-sm sm:text-base"
              style={{
                fontFamily: "Lato, sans-serif",
                borderColor: error ? "#ef4444" : isValid ? "#35D07F" : "rgba(255,255,255,0.1)"
              }}
            />
            {isValid && (
              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          {error && (
            <p className="mt-2 text-xs sm:text-sm text-red-400">{error}</p>
          )}
          {!error && phoneNumber.length > 0 && !isValid && (
            <p className="mt-2 text-xs sm:text-sm text-red-400">
              Enter 10 digits number.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            fontFamily: "Lato, sans-serif",
            background: isValid 
              ? "linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%)"
              : "rgba(255,255,255,0.1)",
            color: isValid ? "#FFFFFF" : "#6B7280",
            boxShadow: isValid ? "0 4px 20px rgba(139, 92, 246, 0.3)" : "none"
          }}
        >
          Continue
        </button>

        {/* Info text */}
        <p className="mt-3 sm:mt-4 text-center text-xs text-gray-500">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}