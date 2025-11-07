"use client"

import { useState } from "react";
import { ArrowRight, ArrowLeft, Phone, Zap, CreditCard, X } from "lucide-react";

const OnboardingCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const steps = [
    {
      title: "Send Money Home, Fast",
      subtitle: "Transfer naira to any phone number in Nigeria. No bank account needed.",
      icon: Phone,
      color: "#D975BB",
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-64 h-64">
            {/* Phone mockup with money flying */}
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-purple-600 to-pink-500 p-1">
              <div className="w-full h-full rounded-[36px] bg-white flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-purple-900">₦50,000</div>
                  <div className="text-sm text-gray-600">+234 812 345 6789</div>
                  <div className="flex justify-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 animate-pulse" />
                    <div className="w-8 h-8 rounded-full bg-pink-500 animate-pulse delay-100" />
                  </div>
                </div>
              </div>
            </div>
            {/* Floating coins */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-yellow-400 animate-bounce" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-green-400 animate-bounce delay-200" />
          </div>
        </div>
      )
    },
    {
      title: "Pay Bills Instantly",
      subtitle: "NEPA, DSTV, Water bills—all in one place. Simple and secure.",
      icon: Zap,
      color: "#7056B2",
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="grid grid-cols-2 gap-4 w-64">
            {[
              { name: "NEPA", color: "bg-yellow-500", icon: "⚡" },
              { name: "DSTV", color: "bg-blue-500", icon: "📺" },
              { name: "Water", color: "bg-cyan-500", icon: "💧" },
              { name: "Airtime", color: "bg-green-500", icon: "📱" }
            ].map((bill, i) => (
              <div
                key={bill.name}
                className={`${bill.color} rounded-2xl p-6 text-white transform hover:scale-105 transition-all cursor-pointer`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-3xl mb-2">{bill.icon}</div>
                <div className="text-sm font-semibold">{bill.name}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "No Bank? No Problem",
      subtitle: "Use just your phone number. Send and receive money instantly with cNGN.",
      icon: CreditCard,
      color: "#261863",
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative">
            {/* Crossed out bank card */}
            <div className="relative">
              <div className="w-72 h-44 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-500 p-6 opacity-40">
                <div className="text-white text-xs mb-8">TRADITIONAL BANK</div>
                <div className="flex justify-between items-end">
                  <div className="text-white text-sm">••••  ••••  ••••  ••••</div>
                </div>
              </div>
              {/* Big X over it */}
              <div className="absolute inset-0 flex items-center justify-center">
                <X className="w-32 h-32 text-red-500 stroke-[3]" />
              </div>
            </div>
            
            {/* Phone number card emerging */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-40 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform">
              <div className="text-white space-y-4">
                <Phone className="w-8 h-8" />
                <div className="text-2xl font-bold">+234 812 345 6789</div>
                <div className="text-sm opacity-90">Your wallet address ✨</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  const handleGetStarted = () => {
    setShowPhoneInput(true);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      // Navigate to main app
      window.location.href = "/";
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleGetStarted();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Purple gradient background from design.json */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #131B63 0%, #481162 100%)",
        }}
      />

      {/* Decorative circles */}
      <div 
        className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "#D975BB" }}
      />
      <div 
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-15 blur-3xl"
        style={{ background: "#7056B2" }}
      />

      {/* Phone Input Modal */}
      {showPhoneInput && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <button
              onClick={() => setShowPhoneInput(false)}
              className="float-right text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-[#261863] mb-2">
              Welcome to NaijaSend
            </h2>
            <p className="text-gray-600 mb-6">
              Enter your phone number to get started
            </p>

            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 py-3 bg-gray-100 rounded-lg">
                    <span className="text-lg font-medium text-gray-700">+234</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="812 345 6789"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="flex-1 px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    maxLength={10}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={phoneNumber.length < 10}
                className="w-full py-4 rounded-full text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #FFFFFF 0%, #B971A3 50%, #A03E82 100%)",
                  boxShadow: "0px 10px 22px rgba(35,21,97,0.14)",
                }}
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Section - Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border-2"
                 style={{ 
                   backgroundColor: "rgba(217, 117, 187, 0.1)",
                   borderColor: "#D975BB"
                 }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#D975BB" }} />
              <span className="text-sm font-semibold" style={{ color: "#D975BB" }}>
                Mobile-First Wallet
              </span>
            </div>

            {/* Step Indicator */}
            <div className="flex justify-center lg:justify-start gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: index === currentStep ? "32px" : "8px",
                    backgroundColor: index === currentStep ? "#D975BB" : "rgba(255, 255, 255, 0.3)"
                  }}
                />
              ))}
            </div>

            {/* Icon */}
            <div className="flex justify-center lg:justify-start">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${currentStepData.color}, #7056B2)`,
                }}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl leading-tight"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
              }}
            >
              {currentStepData.title}
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 400,
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              {currentStepData.subtitle}
            </p>

            {/* Navigation Buttons */}
            <div className="flex gap-4 justify-center lg:justify-start pt-4">
              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="px-8 py-4 rounded-full font-bold text-white border-2 border-white/20 hover:bg-white/10 transition-all"
                  style={{
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              
              <button
                onClick={nextStep}
                className="flex-1 lg:flex-initial px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                style={{
                  background: "linear-gradient(135deg, #FFFFFF 0%, #B971A3 50%, #A03E82 100%)",
                  boxShadow: "0px 10px 22px rgba(35,21,97,0.14)",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Skip button */}
            <button
              onClick={handleGetStarted}
              className="text-white/60 hover:text-white text-sm font-medium transition-colors"
            >
              Skip for now →
            </button>
          </div>

          {/* Right Section - Illustration */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg h-96">
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-full opacity-30 blur-3xl"
                style={{
                  background: `radial-gradient(circle, ${currentStepData.color}, transparent)`,
                }}
              />
              
              {/* Illustration */}
              <div className="relative h-full">
                {currentStepData.illustration}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Preview */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div 
            className="flex items-center gap-6 px-8 py-4 rounded-full backdrop-blur-md"
            style={{
              background: "linear-gradient(180deg, #261863 0%, #2E2169 100%)",
              boxShadow: "0px 20px 48px rgba(35,21,97,0.18)",
            }}
          >
            {[
              { icon: "🏠", label: "Home" },
              { icon: "💸", label: "Send" },
              { icon: "⚡", label: "Bills" },
              { icon: "👤", label: "Profile" }
            ].map((item, i) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1 px-3 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <div className="text-2xl">{item.icon}</div>
                <div className="text-xs text-white font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCarousel;