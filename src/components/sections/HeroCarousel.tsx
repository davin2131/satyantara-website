"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/products";

const AUTOPLAY_MS = 5500;
const SNAP_DISTANCE = 0.18; // 18% of width to commit a slide
const SNAP_VELOCITY = 0.45; // px/ms

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [dragPercent, setDragPercent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hover, setHover] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
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
    () =>
      setActive((i) => (i - 1 + heroSlides.length) % heroSlides.length),
    [],
  );
  const goTo = useCallback((i: number) => setActive(i), []);

  // Auto-play (paused while hovering or dragging)
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
    const velocity = recentDx / dt; // px/ms
    const past = Math.abs(delta) / pointerStartW.current >= SNAP_DISTANCE;
    const fast = Math.abs(velocity) >= SNAP_VELOCITY;
    if (past || fast) {
      if (delta < 0) next();
      else prev();
    }
    setIsDragging(false);
    setDragPercent(0);
  };

  const trackTranslate = -active * 100 + (isDragging ? dragPercent : 0);

  return (
    <section
      aria-label="Galeri budaya Satyantara"
      className="relative px-5 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="group/carousel relative h-[280px] select-none overflow-hidden rounded-3xl border border-gold-500/25 bg-coffee-950 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(212,162,78,0.05)] sm:h-[380px] md:h-[460px]"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* Track */}
          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            className={`flex h-full w-full touch-pan-y ${
              isDragging
                ? "cursor-grabbing"
                : "cursor-grab transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            }`}
            style={{
              transform: `translate3d(${trackTranslate}%, 0, 0)`,
            }}
          >
            {heroSlides.map((slide, i) => {
              const offset = i - active - (isDragging ? dragPercent / 100 : 0);
              return (
                <div
                  key={slide.title}
                  className="relative h-full w-full shrink-0 overflow-hidden"
                  aria-hidden={i !== active}
                >
                  {/* Parallax art layer */}
                  <div
                    className={`absolute inset-0 will-change-transform ${
                      isDragging
                        ? ""
                        : "transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    }`}
                    style={{
                      transform: `translate3d(${offset * 18}%, 0, 0) scale(${
                        1 + Math.min(Math.abs(offset), 1) * 0.06
                      })`,
                    }}
                  >
                    <CarouselArt index={i} />
                  </div>

                  {/* Vignette overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/55 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_50%,rgba(20,11,5,0.55)_100%)]" />

                  {/* Caption (parallax-counter for subtle depth) */}
                  <div
                    className={`pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-10 ${
                      isDragging
                        ? ""
                        : "transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    }`}
                    style={{
                      transform: `translate3d(${offset * -28}%, 0, 0)`,
                      opacity: 1 - Math.min(Math.abs(offset), 1) * 0.7,
                    }}
                  >
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
              );
            })}
          </div>

          {/* Prev / Next arrows */}
          <button
            type="button"
            aria-label="Lakon sebelumnya"
            onClick={prev}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gold-500/30 bg-coffee-950/60 p-2 text-gold-200 opacity-0 backdrop-blur transition hover:border-gold-400 hover:bg-coffee-900 hover:text-gold-300 focus:opacity-100 group-hover/carousel:opacity-100 sm:p-3"
          >
            <ArrowIcon className="h-4 w-4 sm:h-5 sm:w-5" direction="left" />
          </button>
          <button
            type="button"
            aria-label="Lakon berikutnya"
            onClick={next}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gold-500/30 bg-coffee-950/60 p-2 text-gold-200 opacity-0 backdrop-blur transition hover:border-gold-400 hover:bg-coffee-900 hover:text-gold-300 focus:opacity-100 group-hover/carousel:opacity-100 sm:p-3"
          >
            <ArrowIcon className="h-4 w-4 sm:h-5 sm:w-5" direction="right" />
          </button>

          {/* Swipe hint */}
          <div className="pointer-events-none absolute right-5 top-5 hidden items-center gap-2 rounded-full border border-gold-500/20 bg-coffee-950/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.32em] text-gold-300/80 backdrop-blur sm:flex">
            <SwipeIcon className="h-3.5 w-3.5" />
            Geser
          </div>

          {/* Slide counter */}
          <div className="pointer-events-none absolute left-5 top-5 font-display text-xs text-gold-300/80">
            <span className="text-gold-200">{String(active + 1).padStart(2, "0")}</span>
            <span className="mx-1 text-gold-500/40">/</span>
            <span className="text-gold-300/60">
              {String(heroSlides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Indicators */}
        <div className="mt-6 flex items-center justify-center gap-2.5">
          {heroSlides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Tampilkan ${s.title}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active
                  ? "w-10 bg-gold-400 shadow-[0_0_12px_rgba(212,162,78,0.6)]"
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

function SwipeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 12h12M11 7l5 5-5 5" />
      <path d="M20 6v12" opacity="0.5" />
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
          <stop offset="0%" stopColor={p.accent} stopOpacity="0.45" />
          <stop offset="100%" stopColor={p.accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="560" fill={`url(#${id})`} />
      <rect width="1200" height="560" fill={`url(#${id}-spot)`} />

      {/* Wayang silhouette */}
      <g transform="translate(820,80)" opacity="0.85">
        <path
          d="M120 0 Q150 80 140 160 Q200 200 200 280 Q200 360 150 420 L120 460 L90 420 Q40 360 40 280 Q40 200 100 160 Q90 80 120 0 Z"
          fill={p.accent}
          opacity="0.22"
        />
        <path
          d="M120 0 Q150 80 140 160 Q200 200 200 280 Q200 360 150 420 L120 460 L90 420 Q40 360 40 280 Q40 200 100 160 Q90 80 120 0 Z"
          fill="none"
          stroke={p.accent}
          strokeOpacity="0.6"
          strokeWidth="2"
        />
      </g>

      {/* Patternal arcs */}
      <g
        fill="none"
        stroke={p.accent}
        strokeOpacity="0.2"
        strokeWidth="1.5"
      >
        {[80, 160, 240, 320, 400, 480].map((r) => (
          <circle key={r} cx="180" cy="520" r={r} />
        ))}
      </g>

      {/* Batik diagonal weave */}
      <g stroke={p.accent} strokeOpacity="0.08" strokeWidth="1">
        {Array.from({ length: 14 }).map((_, k) => (
          <line key={k} x1={-100 + k * 120} y1={0} x2={300 + k * 120} y2={560} />
        ))}
      </g>

      {/* Floating motifs */}
      <g fill={p.accent} opacity="0.45">
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
