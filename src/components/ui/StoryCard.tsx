"use client";

import { Reveal } from "./Reveal";
import { useStoryModal } from "../AppShell";

type Props = {
  index: number;
  slug: string;
  title: string;
  subtitle?: string;
  price: string;
  delay?: number;
};

export function StoryCard({ index, slug, title, subtitle, price, delay = 0 }: Props) {
  const { openStory } = useStoryModal();

  return (
    <Reveal delay={delay}>
      <button
        type="button"
        onClick={() => openStory(slug)}
        className="group block w-full text-left"
      >
        <article className="relative overflow-hidden rounded-3xl border border-gold-500/20 bg-coffee-800/60 p-3 transition-all duration-700 group-hover:-translate-y-1 group-hover:border-gold-400/60 group-hover:shadow-[0_30px_60px_-20px_rgba(212,162,78,0.25)]">
          <StoryArt index={index} />
          <div className="px-4 pb-4 pt-4">
            <h3 className="font-display text-2xl text-cream transition-colors group-hover:text-gold-200">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-cream/55">
                {subtitle}
              </p>
            )}
            <p className="mt-3 text-sm text-gold-300">{price}</p>
          </div>
          <div className="absolute right-3 top-3 rounded-full bg-coffee-950/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold-300 opacity-0 transition-opacity group-hover:opacity-100">
            Pelajari →
          </div>
        </article>
      </button>
    </Reveal>
  );
}

function StoryArt({ index }: { index: number }) {
  const palettes = [
    { from: "#1f6b62", to: "#0e2a2a", motif: "#f5d691" },
    { from: "#8b1f1f", to: "#3a1112", motif: "#f2c97c" },
    { from: "#5e3d6c", to: "#1f1a2c", motif: "#f5d691" },
    { from: "#9c5a1f", to: "#3d1f0a", motif: "#f5d691" },
    { from: "#1f4a6b", to: "#0a1f2c", motif: "#d4a24e" },
    { from: "#6b2f4a", to: "#2c0e1f", motif: "#f2c97c" },
  ];
  const p = palettes[index % palettes.length];
  const id = `card-${index}`;

  return (
    <div className="relative aspect-square overflow-hidden rounded-2xl">
      <svg
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full transition-transform duration-700 group-hover:scale-110"
      >
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={p.from} />
            <stop offset="100%" stopColor={p.to} />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={p.motif} stopOpacity="0.35" />
            <stop offset="100%" stopColor={p.motif} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill={`url(#${id})`} />
        <rect width="400" height="400" fill={`url(#${id}-glow)`} />

        <g transform="translate(140 60)" opacity="0.85">
          <path
            d="M60 0 Q80 60 70 110 Q120 140 120 200 Q120 260 80 300 L60 320 L40 300 Q0 260 0 200 Q0 140 50 110 Q40 60 60 0 Z"
            fill="#1a0f06"
            opacity="0.55"
          />
          <path
            d="M60 0 Q80 60 70 110 Q120 140 120 200 Q120 260 80 300 L60 320 L40 300 Q0 260 0 200 Q0 140 50 110 Q40 60 60 0 Z"
            fill="none"
            stroke={p.motif}
            strokeWidth="2"
            strokeOpacity="0.7"
          />
          <circle cx="60" cy="180" r="6" fill={p.motif} opacity="0.6" />
          <path
            d="M30 220 Q60 240 90 220"
            stroke={p.motif}
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M30 250 Q60 270 90 250"
            stroke={p.motif}
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
        </g>

        <g
          fill="none"
          stroke={p.motif}
          strokeOpacity="0.18"
          strokeWidth="1.2"
        >
          {[40, 80, 120, 160, 200, 240].map((r) => (
            <circle key={r} cx="50" cy="380" r={r} />
          ))}
        </g>
      </svg>
    </div>
  );
}
