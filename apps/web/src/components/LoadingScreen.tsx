"use client";

import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #0A0E27 0%, #1A0B2E 50%, #2D1B4E 100%)",
      }}
    >
      {/* Animated Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-cyan-600/10 blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Logo/Icon with gradient */}
        <div 
          className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%)",
            boxShadow: "0 20px 60px rgba(139, 92, 246, 0.4)",
          }}
        >
          <Loader2 className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '1.5s' }} />
          
          {/* Rotating ring */}
          <div 
            className="absolute inset-0 -z-10 rounded-2xl opacity-40"
            style={{
              background: "conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.6), transparent)",
              animation: "rotate 3s linear infinite",
              filter: "blur(10px)",
            }}
          />
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
          <h2 
            className="text-2xl font-bold"
            style={{
              fontFamily: "Lato, sans-serif",
              background: "linear-gradient(135deg, #FFFFFF 0%, #E0E0FF 50%, #C4B5FD 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Loading...
          </h2>
          <p className="text-sm text-gray-400">Please wait a moment</p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-purple-400"
              style={{
                animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}