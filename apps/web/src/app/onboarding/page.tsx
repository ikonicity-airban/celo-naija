"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Wallet, Shield, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import ImgCoin from '../../assets/coins.png';

export default function OnboardingPage() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

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

  const handleGetStarted = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("onboarding_completed", "true");
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Celo-inspired gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #2E3338 0%, #1A1F23 100%)",
        }}
      />

      {/* Subtle accent orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "#35D07F" }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl"
        style={{ background: "#FBCC5C" }}
      />

      {/* Main Container with proper spacing */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Desktop: Two Column Layout, Mobile: Single Column */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 sm:gap-16 lg:gap-20 xl:gap-24">
          
          {/* Left Section - Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1 space-y-6 sm:space-y-8">
            {/* Celo-style Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 backdrop-blur-sm"
                 style={{ 
                   backgroundColor: "rgba(53, 208, 127, 0.1)",
                   borderColor: "#35D07F"
                 }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#35D07F" }} />
              <span className="text-sm font-semibold" style={{ color: "#35D07F" }}>
                Carbon-Negative Blockchain
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-tight"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
              }}
            >
              Convert Cash Into Crypto, Simply
            </h1>

            {/* Subtitle with proper spacing */}
            <p
              className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 400,
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              Connect your bank account and get access to more than 76,000 crypto
              currencies and tokens on Celo's mobile-first platform.
            </p>

            {/* Features Grid - Celo values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                   style={{
                     backgroundColor: "rgba(255, 255, 255, 0.05)",
                     border: "1px solid rgba(255, 255, 255, 0.1)"
                   }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: "rgba(53, 208, 127, 0.15)" }}>
                  <Shield className="w-5 h-5" style={{ color: "#35D07F" }} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-0.5">Secure</div>
                  <div className="text-xs" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    Non-custodial
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                   style={{
                     backgroundColor: "rgba(255, 255, 255, 0.05)",
                     border: "1px solid rgba(255, 255, 255, 0.1)"
                   }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: "rgba(251, 204, 92, 0.15)" }}>
                  <Zap className="w-5 h-5" style={{ color: "#FBCC5C" }} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-0.5">Fast</div>
                  <div className="text-xs" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    Instant swaps
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button - Celo style */}
            <div className="pt-4">
              <button
                onClick={handleGetStarted}
                className="group relative inline-flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-10 py-5 sm:py-6 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-100 active:translate-y-0 w-full sm:w-auto mx-auto lg:mx-0 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #35D07F 0%, #2BA968 100%)",
                  boxShadow: "0 10px 40px rgba(53, 208, 127, 0.3)",
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "#FFFFFF",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #2BA968 0%, #228F54 100%)";
                  e.currentTarget.style.boxShadow = "0 15px 50px rgba(53, 208, 127, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #35D07F 0%, #2BA968 100%)";
                  e.currentTarget.style.boxShadow = "0 10px 40px rgba(53, 208, 127, 0.3)";
                }}
              >
                <span
                  className="flex items-center justify-center rounded-full backdrop-blur-sm p-2.5 transition-all duration-300 group-hover:rotate-45 flex-shrink-0"
                  style={{ 
                    width: "44px", 
                    height: "44px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)"
                  }}
                >
                  <Wallet className="w-5 h-5 text-white" />
                </span>
                <span className="whitespace-nowrap">Connect Wallet</span>
                
                {/* Shimmer effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-2 text-sm" 
                 style={{ color: "rgba(255, 255, 255, 0.5)" }}>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#35D07F" }} />
                <span>Mobile-First</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#FBCC5C" }} />
                <span>Prosperity for All</span>
              </div>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              {/* Decorative ring */}
              <div 
                className="absolute inset-0 rounded-full opacity-30 blur-xl scale-110"
                style={{
                  background: "linear-gradient(135deg, rgba(53, 208, 127, 0.3), rgba(251, 204, 92, 0.3))",
                }}
              />
              
              {/* Image with cursor tracking */}
              <img
                src={ImgCoin.src}
                alt="Crypto currencies"
                className="relative w-full h-auto object-contain transition-all duration-200 ease-out"
                style={{
                  filter: "drop-shadow(0 20px 60px rgba(53, 208, 127, 0.25))",
                  transform: mounted && window.innerWidth >= 1024 
                    ? `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                    : 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}