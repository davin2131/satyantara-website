"use client";

import { useEffect, useState } from "react";
import { Gunungan } from "./Gunungan";

const TOTAL_DURATION = 3200;
const FADE_OUT_AT = 2700;

export function SplashScreen() {
  const [stage, setStage] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    // Lock body scroll while splash is visible
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const fadeOut = window.setTimeout(() => setStage("out"), FADE_OUT_AT);
    const remove = window.setTimeout(() => {
      setStage("done");
      document.body.style.overflow = original;
    }, TOTAL_DURATION);

    return () => {
      window.clearTimeout(fadeOut);
      window.clearTimeout(remove);
      document.body.style.overflow = original;
    };
  }, []);

  if (stage === "done") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden transition-opacity duration-500 ease-out ${
        stage === "out" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Layered backgrounds */}
      <div className="absolute inset-0 bg-coffee-950" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, rgba(212,162,78,0.22) 0%, rgba(0,0,0,0) 55%)",
        }}
      />
      {/* Soft batik scrim */}
      <div className="batik-pattern absolute inset-0 opacity-40" />

      {/* Gold flare ring */}
      <div className="splash-ring pointer-events-none absolute h-[110vmin] w-[110vmin] rounded-full" />

      {/* Particle dots */}
      <Particles />

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-6 px-6 text-center">
        <div className="splash-logo">
          <Gunungan className="h-64 w-auto sm:h-80" />
        </div>

        <div className="splash-eyebrow text-[11px] uppercase tracking-[0.6em] text-gold-300">
          Persembahan Dari
        </div>

        <h1 className="splash-title font-display text-5xl tracking-[0.05em] sm:text-7xl md:text-8xl">
          {"SATYANTARA".split("").map((char, i) => (
            <span
              key={i}
              className="splash-letter inline-block shimmer-text"
              style={{ animationDelay: `${800 + i * 80}ms` }}
            >
              {char}
            </span>
          ))}
        </h1>

        <div className="splash-line h-px w-0 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

        <div className="splash-tagline text-sm italic tracking-wider text-cream/75 sm:text-base">
          Sugeng Rawuh, Sayners.
        </div>
      </div>

      <style>{`
        .splash-logo {
          opacity: 0;
          transform: scale(0.7) translateY(20px);
          filter: drop-shadow(0 0 0 rgba(212, 162, 78, 0));
          animation:
            splashLogoIn 1400ms cubic-bezier(0.22, 1, 0.36, 1) 100ms forwards,
            splashLogoGlow 2400ms ease-in-out 1300ms infinite alternate;
        }
        @keyframes splashLogoIn {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(20px);
            filter: drop-shadow(0 0 0 rgba(212, 162, 78, 0));
          }
          70% {
            opacity: 1;
            transform: scale(1.04) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: drop-shadow(0 0 50px rgba(212, 162, 78, 0.55));
          }
        }
        @keyframes splashLogoGlow {
          0% {
            filter: drop-shadow(0 0 30px rgba(212, 162, 78, 0.35));
          }
          100% {
            filter: drop-shadow(0 0 70px rgba(212, 162, 78, 0.7));
          }
        }

        .splash-eyebrow {
          opacity: 0;
          animation: splashFade 700ms ease-out 700ms forwards;
        }
        @keyframes splashFade {
          to {
            opacity: 1;
          }
        }

        .splash-title {
          letter-spacing: 0.05em;
        }
        .splash-letter {
          opacity: 0;
          transform: translateY(40px);
          animation: letterReveal 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes letterReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .splash-line {
          animation: lineGrow 900ms ease-out 1700ms forwards;
        }
        @keyframes lineGrow {
          to {
            width: 220px;
          }
        }

        .splash-tagline {
          opacity: 0;
          animation: splashFade 800ms ease-out 2100ms forwards;
        }

        .splash-ring {
          background: radial-gradient(
            circle,
            transparent 60%,
            rgba(212, 162, 78, 0.06) 62%,
            transparent 68%
          );
          animation: ringPulse 3500ms ease-out 200ms infinite;
        }
        @keyframes ringPulse {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }
          40% {
            opacity: 0.9;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function Particles() {
  // Pre-determined positions for stable SSR/CSR (no random)
  const dots = [
    { x: 12, y: 18, d: 0 },
    { x: 88, y: 22, d: 200 },
    { x: 18, y: 76, d: 400 },
    { x: 84, y: 70, d: 600 },
    { x: 32, y: 12, d: 800 },
    { x: 68, y: 86, d: 1000 },
    { x: 6, y: 50, d: 1200 },
    { x: 94, y: 48, d: 1400 },
    { x: 50, y: 6, d: 1600 },
    { x: 50, y: 94, d: 1800 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0">
      {dots.map((dot, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-gold-300"
          style={{
            top: `${dot.y}%`,
            left: `${dot.x}%`,
            animation: `particleFloat 4s ease-in-out ${dot.d}ms infinite`,
            opacity: 0,
          }}
        />
      ))}
      <style>{`
        @keyframes particleFloat {
          0%, 100% {
            transform: translateY(0) scale(0.6);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) scale(1);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}
