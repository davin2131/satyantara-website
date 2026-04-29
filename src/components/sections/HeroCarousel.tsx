"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/products";

const AUTOPLAY_MS = 6000;
const SNAP_DISTANCE = 0.18; // % of width to commit to next slide
const SNAP_VELOCITY = 0.4;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [dragPercent, setDragPercent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hover, setHover] = useState(false);
  const pointerStartX = useRef(0);
  const pointerStartW = useRef(1);
  const lastMoveX = useRef(0);
  const lastMoveT = useRef(0);
  const pointerId = useRef<number | null>(null);

  const next = useCallback(
    () => setActive((i) => (i + 1) % heroSlides.length),
    [],
  );
  const prev = useCallback(
    () => setActive((i) => (i - 1 + heroSlides.length) % heroSlides.length),
    [],
  );
  const goTo = useCallback((i: number) => setActive(i), []);

  useEffect(() => {
    if (hover || isDragging) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [hover, isDragging, next]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointerId.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointerStartX.current = e.clientX;
    pointerStartW.current = e.currentTarget.getBoundingClientRect().width || 1;
    lastMoveX.current = e.clientX;
    lastMoveT.current = performance.now();
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerId.current !== e.pointerId) return;
    const delta = e.clientX - pointerStartX.current;
    lastMoveX.current = e.clientX;
    lastMoveT.current = performance.now();
    setDragPercent((delta / pointerStartW.current) * 100);
  };

  const finishDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerId.current !== e.pointerId) return;
    pointerId.current = null;
    const delta = e.clientX - pointerStartX.current;
    const dt = Math.max(performance.now() - lastMoveT.current, 1);
    const recentDx = e.clientX - lastMoveX.current;
    const velocity = recentDx / dt;
    const past = Math.abs(delta) / pointerStartW.current >= SNAP_DISTANCE;
    const fast = Math.abs(velocity) >= SNAP_VELOCITY;
    if (past || fast) {
      if (delta < 0) next();
      else prev();
    }
    setIsDragging(false);
    setDragPercent(0);
  };

  const dragOffset = isDragging ? dragPercent / 100 : 0;

  return (
    <section
      aria-label="Galeri budaya Satyantara"
      className="relative px-5 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="group/carousel relative h-[320px] select-none overflow-hidden rounded-3xl border border-gold-500/25 bg-coffee-950 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(212,162,78,0.06)] sm:h-[420px] md:h-[520px]"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{ perspective: "1600px" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
        >
          {/* 3D Coverflow stage */}
          <div
            className={`absolute inset-0 ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {heroSlides.map((slide, i) => {
              const offset = i - active - dragOffset;
              const abs = Math.abs(offset);
              // 3D layout
              const tx = offset * 56; // % horizontal shift per step
              const tz = -abs * 220; // recede deeper for distant slides
              const ry = offset * -22; // rotateY per step
              const scale = Math.max(1 - abs * 0.12, 0.6);
              const opacity = abs > 2.5 ? 0 : Math.max(1 - abs * 0.32, 0.18);
              const blur = abs >= 1 ? Math.min(abs * 1.4, 4) : 0;
              const z = 100 - Math.round(abs * 10);
              const transition = isDragging
                ? "none"
                : "transform 950ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease-out, filter 700ms ease-out";
              return (
                <div
                  key={slide.title}
                  aria-hidden={i !== active}
                  className="absolute left-1/2 top-1/2 h-[88%] w-[78%] sm:w-[68%] md:w-[62%]"
                  style={{
                    transform: `translate(-50%, -50%) translate3d(${tx}%, 0, ${tz}px) rotateY(${ry}deg) scale(${scale})`,
                    opacity,
                    filter: blur ? `blur(${blur}px)` : undefined,
                    zIndex: z,
                    transition,
                    pointerEvents: i === active ? "auto" : "none",
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-2xl border border-gold-500/30 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7),0_0_0_1px_rgba(212,162,78,0.1)]">
                    <CarouselArt index={i} />

                    {/* Vignette + active glow */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/55 to-transparent" />
                    {i === active && (
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_55%,rgba(212,162,78,0.16)_0%,transparent_70%)]" />
                    )}

                    {/* Caption */}
                    <div
                      className="absolute inset-x-0 bottom-0 p-5 sm:p-8"
                      style={{
                        opacity: i === active ? 1 - Math.abs(dragOffset) * 0.6 : 0.45,
                        transition: isDragging
                          ? "none"
                          : "opacity 700ms ease-out",
                      }}
                    >
                      <p className="mb-2 text-[10px] uppercase tracking-[0.45em] text-gold-300 sm:text-[11px]">
                        Lakon {String(i + 1).padStart(2, "0")} / 05
                      </p>
                      <h3 className="font-display text-2xl text-cream sm:text-4xl md:text-5xl">
                        {slide.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm text-parchment/75 sm:text-base">
                        {slide.caption}
                      </p>
                      {i === active && (
                        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-coffee-950/60 px-3 py-1 text-[10px] uppercase tracking-[0.32em] text-gold-300 backdrop-blur sm:text-[11px]">
                          <SparkIcon className="h-3 w-3" />
                          Geser untuk lakon lain
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side fade masks for cinematic depth */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-coffee-950 via-coffee-950/70 to-transparent sm:w-48" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-coffee-950 via-coffee-950/70 to-transparent sm:w-48" />

          {/* Prev / Next arrows */}
          <button
            type="button"
            aria-label="Lakon sebelumnya"
            onClick={prev}
            className="absolute left-3 top-1/2 z-50 -translate-y-1/2 rounded-full border border-gold-500/40 bg-coffee-950/70 p-2.5 text-gold-200 backdrop-blur transition hover:border-gold-400 hover:bg-coffee-900 hover:text-gold-300 sm:p-3.5"
          >
            <ArrowIcon className="h-4 w-4 sm:h-5 sm:w-5" direction="left" />
          </button>
          <button
            type="button"
            aria-label="Lakon berikutnya"
            onClick={next}
            className="absolute right-3 top-1/2 z-50 -translate-y-1/2 rounded-full border border-gold-500/40 bg-coffee-950/70 p-2.5 text-gold-200 backdrop-blur transition hover:border-gold-400 hover:bg-coffee-900 hover:text-gold-300 sm:p-3.5"
          >
            <ArrowIcon className="h-4 w-4 sm:h-5 sm:w-5" direction="right" />
          </button>

          {/* Slide counter — big cinematic number */}
          <div className="pointer-events-none absolute right-5 top-4 z-50 flex items-baseline gap-1 font-display sm:right-8 sm:top-6">
            <span className="text-3xl text-gold-300 sm:text-5xl">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="text-sm text-gold-500/40 sm:text-base">
              / {String(heroSlides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Section eyebrow */}
          <div className="pointer-events-none absolute left-5 top-5 z-50 flex items-center gap-2 text-[10px] uppercase tracking-[0.45em] text-gold-300/90 sm:left-8 sm:top-7">
            <span className="block h-px w-10 bg-gold-500/60" />
            Lakon Budaya Solo
          </div>
        </div>

        {/* Indicators (progress dashes) */}
        <div className="mt-6 flex items-center justify-center gap-2.5">
          {heroSlides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Tampilkan ${s.title}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-700 ease-out ${
                i === active
                  ? "w-12 bg-gold-400 shadow-[0_0_14px_rgba(212,162,78,0.7)]"
                  : "w-3 bg-gold-500/30 hover:bg-gold-400/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowIcon({
  className,
  direction,
}: {
  className?: string;
  direction: "left" | "right";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        transform: direction === "left" ? "rotate(180deg)" : undefined,
      }}
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2 L13.5 9 L20 10.5 L13.5 12 L12 19 L10.5 12 L4 10.5 L10.5 9 Z" />
    </svg>
  );
}

/* SVG-based decorative artwork — different palette per slide. */
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
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.from} />
          <stop offset="100%" stopColor={p.to} />
        </linearGradient>
        <radialGradient id={`${id}-spot`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={p.accent} stopOpacity="0.45" />
          <stop offset="100%" stopColor={p.accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="700" fill={`url(#${id})`} />
      <rect width="1200" height="700" fill={`url(#${id}-spot)`} />

      {/* Wayang silhouette */}
      <g transform="translate(820,140)" opacity="0.85">
        <path
          d="M120 0 Q150 80 140 160 Q200 200 200 280 Q200 360 150 420 L120 460 L90 420 Q40 360 40 280 Q40 200 100 160 Q90 80 120 0 Z"
          fill={p.accent}
          opacity="0.22"
        />
        <path
          d="M120 0 Q150 80 140 160 Q200 200 200 280 Q200 360 150 420 L120 460 L90 420 Q40 360 40 280 Q40 200 100 160 Q90 80 120 0 Z"
          fill="none"
          stroke={p.accent}
          strokeOpacity="0.7"
          strokeWidth="2.5"
        />
      </g>

      {/* Concentric arcs */}
      <g fill="none" stroke={p.accent} strokeOpacity="0.22" strokeWidth="1.5">
        {[80, 160, 240, 320, 400, 480, 560].map((r) => (
          <circle key={r} cx="180" cy="640" r={r} />
        ))}
      </g>

      {/* Batik diagonal weave */}
      <g stroke={p.accent} strokeOpacity="0.1" strokeWidth="1">
        {Array.from({ length: 16 }).map((_, k) => (
          <line
            key={k}
            x1={-100 + k * 120}
            y1={0}
            x2={300 + k * 120}
            y2={700}
          />
        ))}
      </g>

      {/* Floating motifs */}
      <g fill={p.accent} opacity="0.5">
        <circle cx="320" cy="200" r="3" />
        <circle cx="380" cy="160" r="2" />
        <circle cx="420" cy="240" r="2.5" />
        <circle cx="500" cy="180" r="2" />
        <circle cx="600" cy="220" r="3" />
        <circle cx="700" cy="180" r="2" />
        <circle cx="280" cy="500" r="2.5" />
        <circle cx="500" cy="540" r="2" />
      </g>
    </svg>
  );
}
