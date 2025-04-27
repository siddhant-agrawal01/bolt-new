"use client";
import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [loadingTexts, setLoadingTexts] = useState([
    "Starting quantum engines...",
    "Brewing intelligent responses...",
    "Connecting neural pathways...",
    "Aligning digital stars...",
    "Warming up AI circuits...",
  ]);
  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Cycle through loading texts
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [loadingTexts.length]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black overflow-hidden">
      {/* Animated orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[40rem] h-[40rem] bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply blur-[128px] animate-blob"></div>
        <div className="absolute top-[20%] right-[15%] w-[30rem] h-[30rem] bg-yellow-200 dark:bg-yellow-900/20 rounded-full mix-blend-multiply blur-[128px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[10%] left-[35%] w-[35rem] h-[35rem] bg-cyan-200 dark:bg-cyan-900/20 rounded-full mix-blend-multiply blur-[128px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]"></div>

      {/* Floating particles */}
      <div className="particles-container absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="particle bg-green-500 absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main loading content with animation */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Logo animation */}
        <div className="relative">
          <div className="relative flex items-center justify-center w-24 h-24">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-spin-slow opacity-75 blur-md"></div>
            <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-green-500 animate-pulse" />
            </div>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-30 animate-ping-slow"></div>
        </div>

        {/* Loading text with fade in/out effect */}
        <div className="h-6 overflow-hidden">
          <p className="text-gray-600 dark:text-gray-300 text-lg animate-fade-in-out">
            {loadingTexts[currentText]}
          </p>
        </div>

        {/* Progress bar with glow effect */}
        <div className="w-64 sm:w-80 relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-75 blur-[2px]"></div>
          <div className="relative h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
            {progress}% Complete
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        .animate-blob {
          animation: blob 10s infinite alternate;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes ping-slow {
          0% {
            transform: scale(0.95);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.3;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.5;
          }
        }

        .animate-ping-slow {
          animation: ping-slow 3s infinite;
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        @keyframes fade-in-out {
          0%,
          100% {
            opacity: 0;
            transform: translateY(10px);
          }
          20%,
          80% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-out {
          animation: fade-in-out 2s infinite;
        }

        .bg-grid-pattern {
          background-image:
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .particle {
          animation: float linear infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-100px) translateX(30px);
          }
          100% {
            transform: translateY(-200px) translateX(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
