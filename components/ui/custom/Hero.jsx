"use client";
import Lookup from "@/data/Lookup";
import {
  ArrowRight,
  ChevronRight,
  Globe,
  Shield,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import React, { useState, useEffect } from "react";

function Hero() {
  const [userInput, setUserInput] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Set loaded state for animations
    setTimeout(() => setIsLoaded(true), 100);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative  min-h-screen w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      {/* Animated background elements */}
      <div className="absolute  inset-0 overflow-hidden">
        <div className="absolute top-0  left-0 w-full h-full opacity-30 dark:opacity-10">
          <div className="absolute top-[10%] left-[15%] w-[40rem] h-[40rem] bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply blur-[128px] animate-blob"></div>
          <div className="absolute top-[20%] right-[15%] w-[30rem] h-[30rem] bg-yellow-200 dark:bg-yellow-900/20 rounded-full mix-blend-multiply blur-[128px] animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[10%] left-[35%] w-[35rem] h-[35rem] bg-cyan-200 dark:bg-cyan-900/20 rounded-full mix-blend-multiply blur-[128px] animate-blob animation-delay-4000"></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute  inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]"></div>

        {/* Floating particles */}
        <div className="particles-container">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`particle bg-green-500 absolute rounded-full opacity-20`}
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
      </div>

      {/* Main content container */}
      <div className="container mt-30 mx-auto px-4 pt-24 pb-12 relative z-10">
        {/* Logo and navigation - simplified for this example */}
        <div className="absolute top-8 left-0 right-0 flex justify-center">
          <div className="flex items-center gap-1.5 bg-black/10 dark:bg-white/10 backdrop-blur-lg py-1.5 px-3 rounded-full animate-fade-in-down">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium">Flash AI</span>
          </div>
        </div>

        {/* Hero content with staggered animation */}
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          {/* Badge */}
          <div
            className={`flex items-center gap-1 bg-black/5 dark:bg-white/5 backdrop-blur-lg py-1 px-3 rounded-full text-xs font-medium mb-6 transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Sparkles className="h-3 w-3 text-yellow-500" />
            <span>AI-powered solutions for modern businesses</span>
          </div>

          {/* Main headline with gradient */}
          <h1
            className={`font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-300 bg-clip-text text-transparent mb-6 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transform: isLoaded
                ? `translateX(${mousePosition.x * -10}px) translateY(${
                    mousePosition.y * -10
                  }px)`
                : "none",
            }}
          >
            {Lookup.HERO_HEADING}
            <span className="text-green-500 inline-block animate-pulse-subtle">
              {" "}
              .
            </span>
          </h1>

          {/* Subheading with delayed animation */}
          <p
            className={`text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mb-8 transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {Lookup.HERO_DESC}
          </p>

          {/* Social proof */}
          <div
            className={`flex flex-wrap justify-center items-center gap-2 mb-12 transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900"
                ></div>
              ))}
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Star
                className="h-4 w-4 text-yellow-500 mr-1"
                fill="currentColor"
              />
              <span>
                <b>4.9/5</b> from over 1,000+ reviews
              </span>
            </div>
          </div>

          {/* Main interaction area with floating effect */}
          <div
            className={`w-full max-w-3xl transition-all duration-1000 delay-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transform: isLoaded
                ? `translateX(${mousePosition.x * 5}px) translateY(${
                    mousePosition.y * 5
                  }px)`
                : "none",
            }}
          >
            <div className="relative group">
              {/* Glowing effect */}
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl opacity-75 group-hover:opacity-100 blur transition duration-1000 ${
                  isFocused ? "animate-glow" : ""
                }`}
              ></div>

              {/* Input card with glass effect */}
              <div className="relative rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl backdrop-blur-xl p-8">
                <div className="flex flex-col gap-5">
                  <div className="relative">
                    <textarea
                      className="w-full min-h-[120px] p-4 pr-12 text-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500/50 transition"
                      placeholder={Lookup.INPUT_PLACEHOLDER}
                      value={userInput}
                      onChange={(event) => setUserInput(event.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    ></textarea>
                    <div className="absolute right-3 top-3">
                      <div className="flex space-x-1">
                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                      <Shield className="h-4 w-4" />
                      <span>Your data is encrypted end-to-end</span>
                    </div>

                    <button
                      className={`flex items-center justify-center gap-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-lg hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 ${
                        !userInput ? "opacity-80 cursor-not-allowed" : ""
                      }`}
                      disabled={!userInput}
                    >
                      <span>Get Started</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestion chips */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {Lookup?.SUGGESTIONS.map((suggestion, index) => (
                <div
                  key={index}
                  className={`py-1 px-3 rounded-full text-sm font-medium bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:border-green-200 dark:hover:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all delay-${
                    index * 100
                  }`}
                  onClick={() => setUserInput(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </div>

          {/* Feature highlights */}
          <div
            className={`w-full max-w-4xl mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {[
              {
                icon: (
                  <Zap
                    className="h-5 w-5 text-yellow-500"
                    fill="currentColor"
                  />
                ),
                title: "Lightning Fast",
                description:
                  "Process data at incredible speeds with our optimized algorithms",
              },
              {
                icon: <Globe className="h-5 w-5 text-blue-500" />,
                title: "Global Reach",
                description:
                  "Connect with users worldwide through our distributed network",
              },
              {
                icon: <Shield className="h-5 w-5 text-green-500" />,
                title: "Enterprise Security",
                description:
                  "Your data is protected by industry-leading security protocols",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px]"
              >
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA section */}
          <div
            className={`w-full max-w-xl mt-16 flex flex-col items-center transition-all duration-1000 delay-1200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Ready to transform your workflow?
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Join thousands of teams already using our platform
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button className="bg-black dark:bg-white text-white dark:text-black font-medium py-2.5 px-5 rounded-lg flex items-center gap-1">
                Start free trial <ChevronRight className="h-4 w-4" />
              </button>
              <button className="bg-transparent border border-gray-300 dark:border-gray-700 font-medium py-2.5 px-5 rounded-lg">
                Schedule demo
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(0, 0, 0, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .animate-blob {
          animation: blob 10s infinite alternate;
        }

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

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in-down {
          animation: fade-in-down 1s ease forwards;
        }

        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-glow {
          animation: glow 2s infinite alternate;
        }

        @keyframes glow {
          0% {
            opacity: 0.7;
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            filter: blur(12px);
          }
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite;
        }

        @keyframes pulse-subtle {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
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

export default Hero;
