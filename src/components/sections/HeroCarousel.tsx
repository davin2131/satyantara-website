"use client";

import { useEffect, useState } from "react";
import { heroSlides } from "@/data/products";

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      aria-label="Galeri budaya Satyantara"
      className="relative px-5 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative h-[280px] overflow-hidden rounded-3xl border border-gold-500/20 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:h-[380px] md:h-[460px]">
          {heroSlides.map((slide, i) => (
            <div
              key={slide.title}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={i !== active}
            >
              <CarouselArt index={i} />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                <p className="mb-2 text-[11px] uppercase tracking-[0.45em] text-gold-300">
                  Lakon {String(i + 1).padStart(2, "0")} / 05
                </p>
                <h3 className="font-display text-2xl text-cream sm:text-4xl md:text-5xl">
                  {slide.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm text-parchment/75 sm:text-base">
                  {slide.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="mt-6 flex items-center justify-center gap-2.5">
          {heroSlides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Tampilkan ${s.title}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active
                  ? "w-10 bg-gold-400"
                  : "w-3 bg-gold-500/30 hover:bg-gold-400/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* SVG-based decorative artwork — different palette per slide.
   Avoids needing remote/optimized image assets while keeping the luxe vibe. */
function CarouselArt({ index }: { index: number }) {
  const palettes = [
    { from: "#3d1f0a", to: "#9c5a1f", accent: "#f5d691" },
    { from: "#3a1112", to: "#8b1f1f", accent: "#f2c97c" },
    { from: "#1f1a2c", to: "#5e3d6c", accent: "#f5d691" },
    { from: "#0e2a2a", to: "#1f6b62", accent: "#d4a24e" },
    { from: "#2a1a0e", to: "#7a4d18", accent: "#f5d691" },
  ];
  const p = palettes[index % palettes.length];
  const id = `carouselGrad-${index}`;

  return (
    <svg
      viewBox="0 0 1200 560"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.from} />
          <stop offset="100%" stopColor={p.to} />
        </linearGradient>
        <radialGradient id={`${id}-spot`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={p.accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={p.accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="560" fill={`url(#${id})`} />
      <rect width="1200" height="560" fill={`url(#${id}-spot)`} />

      {/* Wayang silhouette */}
      <g transform="translate(820,80)" opacity="0.82">
        <path
          d="M120 0 Q150 80 140 160 Q200 200 200 280 Q200 360 150 420 L120 460 L90 420 Q40 360 40 280 Q40 200 100 160 Q90 80 120 0 Z"
          fill={p.accent}
          opacity="0.18"
        />
        <path
          d="M120 0 Q150 80 140 160 Q200 200 200 280 Q200 360 150 420 L120 460 L90 420 Q40 360 40 280 Q40 200 100 160 Q90 80 120 0 Z"
          fill="none"
          stroke={p.accent}
          strokeOpacity="0.55"
          strokeWidth="2"
        />
      </g>

      {/* Patternal arcs */}
      <g
        fill="none"
        stroke={p.accent}
        strokeOpacity="0.18"
        strokeWidth="1.5"
      >
        {[80, 160, 240, 320, 400, 480].map((r) => (
          <circle key={r} cx="180" cy="520" r={r} />
        ))}
      </g>

      {/* Floating motifs */}
      <g fill={p.accent} opacity="0.35">
        <circle cx="320" cy="200" r="3" />
        <circle cx="380" cy="160" r="2" />
        <circle cx="420" cy="240" r="2.5" />
        <circle cx="500" cy="180" r="2" />
        <circle cx="600" cy="220" r="3" />
        <circle cx="700" cy="180" r="2" />
      </g>
    </svg>
  );
}
