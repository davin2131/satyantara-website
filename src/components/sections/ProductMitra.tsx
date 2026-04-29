"use client";

import { mitraProducts, type MitraProduct } from "@/data/products";
import { Reveal } from "../ui/Reveal";
import { Ornament } from "../ui/Ornament";
import { useMitraModal } from "../AppShell";

export function ProductMitra() {
  return (
    <section className="section-glow relative px-4 py-16 sm:px-5 sm:py-24 lg:px-10">
      <Ornament className="pointer-events-none absolute left-1/2 top-6 w-40 -translate-x-1/2 opacity-50 sm:top-10 sm:w-56" />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-9 flex items-end justify-between gap-4 sm:mb-12 sm:gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold-400/80 sm:text-[11px] sm:tracking-[0.45em]">
                Karya Sanggar
              </p>
              <h2 className="mt-2 font-display text-2xl leading-tight text-cream min-[400px]:text-3xl sm:text-5xl md:text-6xl">
                Product Mitra
              </h2>
              <p className="mt-3 max-w-xl text-sm text-parchment/75 sm:text-base">
                Kerajinan tangan dari para perajin Solo dan sekitarnya — setiap
                karya membawa cerita dan nilai luhur Nusantara.
              </p>
            </div>
            <a
              href="#layanan"
              className="hidden rounded-full border border-gold-500/30 px-5 py-2 text-xs uppercase tracking-[0.3em] text-gold-300 transition hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-200 md:inline-block"
            >
              Lihat Semua
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 min-[400px]:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {mitraProducts.map((p, i) => (
            <MitraCard key={p.slug} product={p} delay={i * 50} />
          ))}
        </div>

        <div className="mt-8 text-center sm:mt-10">
          <a
            href="#layanan"
            className="inline-flex items-center gap-2 text-sm italic text-cream/70 transition hover:text-gold-300"
          >
            Lainnya…
            <ArrowDownIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function MitraCard({ product, delay }: { product: MitraProduct; delay: number }) {
  const palette = TONE_PALETTE[product.tone];
  const { openMitra } = useMitraModal();

  return (
    <Reveal delay={delay}>
      <button
        type="button"
        onClick={() => openMitra(product.slug)}
        className="group block w-full text-left"
      >
      <article className="relative overflow-hidden rounded-2xl border border-gold-500/15 bg-coffee-800/40 p-2 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-gold-400/50 group-hover:shadow-[0_20px_40px_-15px_rgba(212,162,78,0.25)]">
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <MitraArt palette={palette} />
          {product.badge && (
            <span className="absolute left-2 top-2 rounded-full bg-coffee-950/80 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gold-300 backdrop-blur">
              {product.badge}
            </span>
          )}
          <span className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-coffee-950/80 text-gold-300 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            <PlusIcon className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className="px-2 pb-2 pt-3">
          <h4 className="text-sm font-semibold text-cream transition-colors group-hover:text-gold-200">
            {product.name}
          </h4>
          <p className="mt-0.5 text-[11px] text-gold-300/90">
            {product.price}
            {product.pricePer && (
              <span className="text-cream/50">{product.pricePer}</span>
            )}
          </p>
        </div>
      </article>
      </button>
    </Reveal>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      {...props}
    >
      <line x1="12" y1="6" x2="12" y2="18" />
      <line x1="6" y1="12" x2="18" y2="12" />
    </svg>
  );
}

const TONE_PALETTE: Record<
  MitraProduct["tone"],
  { from: string; to: string; motif: string; shape: "wayang" | "topeng" | "kalung" | "kipas" | "pin" | "kunci" }
> = {
  amber: { from: "#7a4d18", to: "#3d2817", motif: "#f5d691", shape: "kunci" },
  rose: { from: "#7a2a3a", to: "#3d141c", motif: "#f5b1c7", shape: "kalung" },
  emerald: { from: "#234c3a", to: "#0f261d", motif: "#9fd9b4", shape: "topeng" },
  indigo: { from: "#2a3a6b", to: "#11173a", motif: "#a4b3f7", shape: "pin" },
  ochre: { from: "#6b4f1a", to: "#332408", motif: "#f5d691", shape: "kipas" },
  rust: { from: "#7a2a18", to: "#3d130a", motif: "#f2c97c", shape: "wayang" },
};

function MitraArt({
  palette,
}: {
  palette: (typeof TONE_PALETTE)[keyof typeof TONE_PALETTE];
}) {
  const id = `mitra-${palette.from.replace("#", "")}`;
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full transition-transform duration-700 group-hover:scale-110"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.from} />
          <stop offset="100%" stopColor={palette.to} />
        </linearGradient>
        <radialGradient id={`${id}-spot`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={palette.motif} stopOpacity="0.3" />
          <stop offset="100%" stopColor={palette.motif} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id})`} />
      <rect width="200" height="200" fill={`url(#${id}-spot)`} />
      <Motif shape={palette.shape} color={palette.motif} />
    </svg>
  );
}

function Motif({
  shape,
  color,
}: {
  shape: "wayang" | "topeng" | "kalung" | "kipas" | "pin" | "kunci";
  color: string;
}) {
  if (shape === "wayang") {
    return (
      <g transform="translate(60 30)" opacity="0.85">
        <path
          d="M40 0 Q55 40 50 80 Q90 100 90 140 L60 200 L20 200 Q-10 140 30 80 Q25 40 40 0 Z"
          fill={color}
          opacity="0.3"
        />
        <path
          d="M40 0 Q55 40 50 80 Q90 100 90 140 L60 200 L20 200 Q-10 140 30 80 Q25 40 40 0 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.6"
          strokeOpacity="0.7"
        />
      </g>
    );
  }
  if (shape === "topeng") {
    return (
      <g transform="translate(100 100)" opacity="0.9">
        <ellipse cx="0" cy="0" rx="55" ry="70" fill={color} opacity="0.22" />
        <ellipse cx="0" cy="0" rx="55" ry="70" fill="none" stroke={color} strokeWidth="1.8" />
        <ellipse cx="-18" cy="-12" rx="6" ry="3" fill={color} />
        <ellipse cx="18" cy="-12" rx="6" ry="3" fill={color} />
        <path d="M-22 25 Q0 38 22 25" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M-30 -45 Q0 -65 30 -45" fill="none" stroke={color} strokeWidth="2" />
      </g>
    );
  }
  if (shape === "kalung") {
    return (
      <g fill="none" stroke={color} strokeWidth="2" opacity="0.85">
        <path d="M40 60 Q100 130 160 60" />
        <circle cx="100" cy="135" r="12" fill={color} fillOpacity="0.5" />
        <circle cx="70" cy="115" r="5" fill={color} fillOpacity="0.5" />
        <circle cx="130" cy="115" r="5" fill={color} fillOpacity="0.5" />
        <circle cx="55" cy="92" r="4" fill={color} fillOpacity="0.5" />
        <circle cx="145" cy="92" r="4" fill={color} fillOpacity="0.5" />
      </g>
    );
  }
  if (shape === "kipas") {
    return (
      <g transform="translate(100 130)" opacity="0.9">
        <path
          d="M0 0 L-80 -90 A100 100 0 0 1 80 -90 Z"
          fill={color}
          opacity="0.22"
        />
        <path
          d="M0 0 L-80 -90 A100 100 0 0 1 80 -90 Z"
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
        {[-60, -30, 0, 30, 60].map((deg) => (
          <line
            key={deg}
            x1="0"
            y1="0"
            x2={Math.sin((deg * Math.PI) / 180) * 95}
            y2={-Math.cos((deg * Math.PI) / 180) * 95}
            stroke={color}
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
        ))}
      </g>
    );
  }
  if (shape === "pin") {
    return (
      <g opacity="0.9">
        <circle cx="100" cy="100" r="55" fill={color} fillOpacity="0.18" />
        <circle cx="100" cy="100" r="55" fill="none" stroke={color} strokeWidth="2.2" />
        <circle cx="100" cy="100" r="38" fill="none" stroke={color} strokeWidth="1.4" strokeOpacity="0.6" />
        <path d="M82 95 Q100 78 118 95 M82 110 Q100 124 118 110" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </g>
    );
  }
  // kunci
  return (
    <g transform="translate(50 60)" opacity="0.9">
      <circle cx="40" cy="40" r="30" fill={color} fillOpacity="0.18" />
      <circle cx="40" cy="40" r="30" fill="none" stroke={color} strokeWidth="2" />
      <rect x="64" y="34" width="48" height="12" fill="none" stroke={color} strokeWidth="2" />
      <rect x="86" y="46" width="6" height="12" fill={color} fillOpacity="0.7" />
      <rect x="100" y="46" width="6" height="12" fill={color} fillOpacity="0.7" />
    </g>
  );
}

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}
