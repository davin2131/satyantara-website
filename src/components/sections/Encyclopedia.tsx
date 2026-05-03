"use client";

import { useMemo, useState } from "react";
import { Reveal } from "../ui/Reveal";
import { Modal } from "../ui/Modal";
import { Gunungan } from "../Gunungan";
import {
  wayangEntries,
  wayangCategoryLabels,
  wayangOriginLabels,
  type WayangEntry,
  type WayangCategory,
} from "@/data/wayang";

// Slugs yang punya foto bawaan di /public/wayang/[slug].jpg.
// Dipakai sebagai fallback kalau editor belum upload foto via Sanity Studio.
// Foto Sanity (entry.imageUrl) selalu menang kalau ada.
const WAYANG_LOCAL_PHOTOS = new Set<string>([
  "yudistira",
  "bima",
  "arjuna",
  "nakula",
  "sadewa",
  "duryudana",
  "sengkuni",
  "semar",
  "gareng",
  "petruk",
  "bagong",
  "anoman",
  "sri-krishna",
  "bathara-guru",
  "drupadi",
]);

function resolveWayangPhoto(entry: WayangEntry): string | null {
  if (entry.imageUrl) return entry.imageUrl;
  if (WAYANG_LOCAL_PHOTOS.has(entry.slug)) return `/wayang/${entry.slug}.jpg`;
  return null;
}

type FilterValue = "all" | WayangCategory;

const filters: { value: FilterValue; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "pandawa", label: "Pandawa" },
  { value: "kurawa", label: "Kurawa" },
  { value: "punakawan", label: "Punakawan" },
  { value: "dewa-pahlawan", label: "Dewa & Pahlawan" },
];

export function Encyclopedia() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [active, setActive] = useState<WayangEntry | null>(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? wayangEntries
        : wayangEntries.filter((w) => w.category === filter),
    [filter],
  );

  return (
    <section
      id="ensiklopedia"
      className="section-glow relative px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-8 lg:px-10 lg:pb-24 lg:pt-36"
    >
      <Gunungan className="pointer-events-none absolute -right-24 top-32 h-[280px] w-[280px] opacity-[0.04] sm:h-[420px] sm:w-[420px] sm:opacity-[0.06]" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 flex flex-col items-center gap-4 text-center sm:mb-14 sm:gap-5">
            <p className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.4em] text-gold-400/80 sm:gap-3 sm:text-[11px] sm:tracking-[0.5em]">
              <span className="h-px w-6 bg-gold-500/60 sm:w-10" />
              Pustaka Tokoh Wayang
              <span className="h-px w-6 bg-gold-500/60 sm:w-10" />
            </p>
            <h1 className="font-display text-4xl leading-tight text-cream min-[400px]:text-5xl sm:text-6xl md:text-7xl">
              <span className="shimmer-text">ENSIKLOPEDIA</span>
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-parchment/85 sm:text-base">
              Mengenal tokoh-tokoh wayang yang menjadi nafas kreasi SATYANTARA —
              dari Pandawa Lima, Punakawan, hingga para dewa dan pahlawan.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {filters.map((f) => {
              const isActive = filter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(f.value)}
                  className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all sm:text-xs sm:tracking-[0.22em] ${
                    isActive
                      ? "border-gold-400/80 bg-gold-500/15 text-gold-200 shadow-[0_10px_30px_-15px_rgba(212,162,78,0.6)]"
                      : "border-gold-500/20 bg-coffee-900/50 text-parchment/75 hover:border-gold-400/50 hover:text-cream"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {visible.length === 0 ? (
          <Reveal delay={120}>
            <p className="mx-auto max-w-md rounded-2xl border border-gold-500/20 bg-coffee-900/60 px-6 py-10 text-center text-sm text-parchment/80">
              Belum ada tokoh dalam kategori ini.
            </p>
          </Reveal>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
            {visible.map((entry, i) => (
              <li key={entry.slug}>
                <Reveal delay={Math.min(i * 60, 320)}>
                  <WayangCard
                    entry={entry}
                    index={i}
                    onOpen={() => setActive(entry)}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        ariaLabel={active?.name}
        size="lg"
      >
        {active && <WayangModalBody entry={active} />}
      </Modal>
    </section>
  );
}

function WayangCard({
  entry,
  index,
  onOpen,
}: {
  entry: WayangEntry;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gold-500/20 bg-coffee-900/70 text-left shadow-[0_20px_60px_-25px_rgba(0,0,0,0.7)] transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-coffee-950"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-coffee-800">
        {(() => {
          const src = resolveWayangPhoto(entry);
          return src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={entry.imageAlt ?? entry.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <WayangPlaceholder index={index} category={entry.category} />
          );
        })()}
        <span className="absolute left-3 top-3 rounded-full bg-coffee-950/80 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-gold-300 backdrop-blur sm:text-[10px]">
          {wayangCategoryLabels[entry.category]}
        </span>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coffee-950/70 via-transparent to-transparent"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-xl leading-tight text-cream sm:text-2xl">
            {entry.name}
          </h3>
          {entry.alias && (
            <span className="text-[11px] uppercase tracking-[0.22em] text-gold-300/80">
              {entry.alias}
            </span>
          )}
        </div>
        <span className="block h-px w-10 bg-gold-500/60" aria-hidden />
        <p className="text-sm leading-relaxed text-parchment/85">
          {entry.summary}
        </p>
        <span className="mt-auto pt-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-300/80 transition-colors group-hover:text-gold-200">
          Baca lengkap →
        </span>
      </div>
    </button>
  );
}

function WayangModalBody({ entry }: { entry: WayangEntry }) {
  return (
    <div className="grid gap-0 md:grid-cols-[minmax(240px,320px)_1fr]">
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px]">
        {(() => {
          const src = resolveWayangPhoto(entry);
          return src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={entry.imageAlt ?? entry.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <WayangPlaceholder index={0} category={entry.category} />
          );
        })()}
        <span className="absolute left-4 top-4 rounded-full bg-coffee-950/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-300 backdrop-blur">
          {wayangCategoryLabels[entry.category]}
        </span>
      </div>

      <div className="p-5 pt-14 min-[400px]:p-6 sm:p-8 sm:pt-8">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold-400/80 sm:text-[11px] sm:tracking-[0.45em]">
          Tokoh Wayang
        </p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-2 sm:gap-x-5">
          <h3 className="font-display text-3xl leading-tight text-cream min-[400px]:text-4xl sm:text-5xl">
            {entry.name}
          </h3>
          {entry.alias && (
            <span className="text-sm uppercase tracking-[0.22em] text-gold-300">
              {entry.alias}
            </span>
          )}
        </div>

        <dl className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <MetaRow label="Asal Lakon" value={wayangOriginLabels[entry.origin]} />
          {entry.weapon && <MetaRow label="Senjata / Pusaka" value={entry.weapon} />}
        </dl>

        <p className="mt-6 text-[15px] leading-relaxed text-parchment/85">
          {entry.description}
        </p>
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gold-500/15 bg-coffee-800/50 px-4 py-3">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold-300/80">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-cream">{value}</dd>
    </div>
  );
}

function WayangPlaceholder({
  index,
  category,
}: {
  index: number;
  category: WayangCategory;
}) {
  const palettes: Record<WayangCategory, { from: string; to: string; motif: string }> = {
    pandawa: { from: "#3d2817", to: "#1a0f06", motif: "#f2c97c" },
    kurawa: { from: "#2a1a0e", to: "#0d0703", motif: "#b8862f" },
    punakawan: { from: "#4f3520", to: "#2a1a0e", motif: "#f5d691" },
    "dewa-pahlawan": { from: "#3d2817", to: "#1a0f06", motif: "#d4a24e" },
  };
  const p = palettes[category];
  const id = `way-${category}-${index}`;
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="presentation"
      aria-hidden
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="40%" r="80%">
          <stop offset="0%" stopColor={p.from} />
          <stop offset="100%" stopColor={p.to} />
        </radialGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor={p.motif} stopOpacity="0.25" />
          <stop offset="100%" stopColor={p.motif} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-bg)`} />
      <rect width="400" height="300" fill={`url(#${id}-glow)`} />

      <g transform="translate(200 50)" opacity="0.85">
        <path
          d="M0 0 Q18 60 12 110 Q60 140 60 200 Q60 250 22 285 L0 295 L-22 285 Q-60 250 -60 200 Q-60 140 -12 110 Q-18 60 0 0 Z"
          fill={p.to}
          opacity="0.55"
        />
        <path
          d="M0 0 Q18 60 12 110 Q60 140 60 200 Q60 250 22 285 L0 295 L-22 285 Q-60 250 -60 200 Q-60 140 -12 110 Q-18 60 0 0 Z"
          fill="none"
          stroke={p.motif}
          strokeWidth="1.6"
          strokeOpacity="0.7"
        />
        <circle cx="0" cy="160" r="9" fill={p.motif} opacity="0.7" />
      </g>

      <g fill="none" stroke={p.motif} strokeOpacity="0.15" strokeWidth="1.2">
        {[40, 80, 120].map((r) => (
          <circle key={`l-${r}`} cx="40" cy="280" r={r} />
        ))}
        {[40, 80, 120].map((r) => (
          <circle key={`r-${r}`} cx="360" cy="280" r={r} />
        ))}
      </g>
    </svg>
  );
}
