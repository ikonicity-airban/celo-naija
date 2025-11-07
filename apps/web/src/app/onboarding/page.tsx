"use client";
import { ArrowRight, Wallet, Shield, Zap, Globe, Phone, Smartphone, Banknote, Lightbulb, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImgCoin from "../../assets/coins.png";
import { setUserPhone, getOrCreateUser } from "@/lib/auth";

export default function OnboardingPage() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Carousel slides content
  const slides = [
    {
      title: "Send Money with Just a Phone Number",
      description: "Transfer money to anyone in Nigeria instantly using only their phone number. No bank account needed.",
      icon: Phone,
      color: "text-purple-400"
    },
    {
      title: "Pay Your Bills Easily",
      description: "Pay NEPA bills, water bills, cable TV and more directly from your phone.",
      icon: Lightbulb,
      color: "text-cyan-400"
    },
    {
      title: "Buy Airtime & Data",
      description: "Recharge airtime and buy data for MTN, Glo, Airtel, and 9mobile instantly.",
      icon: Smartphone,
      color: "text-pink-400"
    },
    {
      title: "No Bank Account Required",
      description: "Join millions of Nigerians using Celo Naija without a traditional bank account.",
      icon: Banknote,
      color: "text-blue-400"
    },
    {
      title: "Secure Blockchain Technology",
      description: "Built on Celo blockchain for maximum security. Your money is safe and fees are low.",
      icon: Shield,
      color: "text-green-400"
    }
  ];

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 50;
      const y = (e.clientY - window.innerHeight / 2) / 50;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    setShowModal(true);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    
    // Limit to 11 digits
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    
    setPhoneNumber(value);
    
    // Validate Nigerian phone number (starts with 070, 080, 081, 090, 091 etc.)
    const nigerianPhoneRegex = /^(0)(7|8|9)(0|1)\d{8}$/;
    
    if (value.length === 11 && nigerianPhoneRegex.test(value)) {
      setIsValid(true);
      setError("");
    } else if (value.length === 11) {
      setIsValid(false);
      setError("Please enter a valid Nigerian phone number");
    } else {
      setIsValid(false);
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (isValid && !isSubmitting) {
      setIsSubmitting(true);
      setError("");

      try {
        // Remove spaces from phone number (normalization happens in getOrCreateUser)
        const cleanedPhone = phoneNumber.replace(/\s/g, "");
        
        // Get or create user via API (will normalize to +234 format)
        const user = await getOrCreateUser(cleanedPhone);
        
        if (user) {
          // Store normalized phone number in localStorage
          setUserPhone(user.phoneNumber);
          
          // Close modal and redirect to home
          setShowModal(false);
          router.push("/");
        } else {
          setError("Failed to create account. Please try again.");
        }
      } catch (err: any) {
        console.error("Error creating user:", err);
        setError(err.message || "Failed to create account. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const formatPhoneNumber = (value: string) => {
    if (value.length <= 4) return value;
    if (value.length <= 7) return `${value.slice(0, 4)} ${value.slice(4)}`;
    return `${value.slice(0, 4)} ${value.slice(4, 7)} ${value.slice(7)}`;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-8 sm:py-12 lg:py-16">
      {/* Gradient Background with mesh pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #0A0E27 0%, #1A0B2E 50%, #2D1B4E 100%)",
        }}
      />

      {/* Animated Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
        }}
      />

      {/* Floating particles/orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
      </div>

      {/* Gradient orbs */}
      <div className="hidden lg:block absolute top-20 left-20 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="hidden lg:block absolute bottom-20 right-20 w-96 h-96 rounded-full bg-cyan-600/10 blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-14">
          
          {/* Left Section - Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1 px-2 sm:px-4">
            {/* Web3 Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm mb-4 sm:mb-5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-purple-200">Built on Celo Blockchain</span>
            </div>

            {/* Main Heading with gradient text */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-4 sm:mb-5"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 800,
                background: "linear-gradient(135deg, #FFFFFF 0%, #E0E0FF 50%, #C4B5FD 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Banking Made Simple for Nigerians
            </h1>

            {/* Carousel Section */}
            <div className="relative mb-6 sm:mb-8">
              {/* Carousel Content */}
              <div className="min-h-[110px] sm:min-h-[100px]">
                <div className="flex items-start gap-3 mb-3 sm:mb-4">
                  <div className={`p-2 sm:p-2.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm ${slides[currentSlide].color} flex-shrink-0`}>
                    <CurrentIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1.5 sm:mb-2 transition-all duration-500"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      {slides[currentSlide].title}
                    </h3>
                    <p 
                      className="text-xs sm:text-sm text-gray-300 leading-relaxed transition-all duration-500"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      {slides[currentSlide].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4">
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all duration-300"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>

                {/* Dots Indicators */}
                <div className="flex gap-1.5 sm:gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'w-6 sm:w-8 bg-purple-400' 
                          : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all duration-300"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Get Started Button with glassmorphism */}
            <button
              onClick={handleGetStarted}
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-100 active:translate-y-0 w-full sm:w-auto mx-auto lg:mx-0 border border-purple-400/30"
              style={{
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%)",
                boxShadow: "0 8px 32px rgba(139, 92, 246, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                fontFamily: "Lato, sans-serif",
                fontWeight: 600,
                fontSize: "15px",
                color: "#FFFFFF",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(124, 58, 237, 0.9) 0%, rgba(37, 99, 235, 0.9) 100%)";
                e.currentTarget.style.boxShadow =
                  "0 12px 40px rgba(139, 92, 246, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%)";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(139, 92, 246, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)";
              }}
            >
              <span
                className="flex items-center justify-center rounded-full bg-white/25 backdrop-blur-sm p-2 sm:p-2.5 transition-all duration-300 group-hover:rotate-12 group-hover:bg-white/35 flex-shrink-0"
                style={{ width: "36px", height: "36px" }}
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </span>
              <span className="whitespace-nowrap">Get Started</span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </button>

            {/* Trust indicators with icons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-5 sm:mt-6 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                <span>Instant Transfer</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-purple-400 font-bold text-sm sm:text-base">₦</span>
                <span>Low Fees</span>
              </div>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[450px] xl:max-w-[550px]">
              {/* Hexagon border effect */}
              <div className="absolute inset-0 opacity-30 blur-sm scale-110" 
                   style={{
                     background: "linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))",
                     clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
                   }}
              />
              
              {/* Image with cursor tracking */}
              <img
                src={ImgCoin.src}
                alt="Crypto currencies"
                className="relative w-full h-auto object-contain transition-all duration-200 ease-out"
                style={{
                  filter: "drop-shadow(0 20px 60px rgba(139, 92, 246, 0.4)) drop-shadow(0 10px 30px rgba(59, 130, 246, 0.3))",
                  transform: mounted && window.innerWidth >= 1024 
                    ? `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                    : 'none',
                }}
              />
              
              {/* Rotating ring effect */}
              <div 
                className="absolute inset-0 -z-10 opacity-40"
                style={{
                  background: "conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.4), transparent)",
                  animation: "rotate 10s linear infinite",
                  borderRadius: "50%",
                  filter: "blur(20px)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Phone Number Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div 
            className="relative w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-purple-400/20 p-5 sm:p-6 lg:p-8"
            style={{
              animation: "modalSlideIn 0.3s ease-out"
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
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
                  placeholder="0803 456 7890"
                  maxLength={13}
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
                <p className="mt-2 text-xs sm:text-sm text-gray-400">
                  Enter 11 digits starting with 070, 080, 081, 090, or 091
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              className="w-full py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                fontFamily: "Lato, sans-serif",
                background: isValid && !isSubmitting
                  ? "linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%)"
                  : "rgba(255,255,255,0.1)",
                color: isValid && !isSubmitting ? "#FFFFFF" : "#6B7280",
                boxShadow: isValid && !isSubmitting ? "0 4px 20px rgba(139, 92, 246, 0.3)" : "none"
              }}
            >
              {isSubmitting ? "Creating account..." : "Continue"}
            </button>

            {/* Info text */}
            <p className="mt-3 sm:mt-4 text-center text-xs text-gray-500">
              By continuing, you agree to our Terms & Privacy Policy
            </p>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

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