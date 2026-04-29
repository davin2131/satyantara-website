"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { Modal } from "./ui/Modal";
import { SplashScreen } from "./SplashScreen";
import { stories, mitraProducts, type Story, type MitraProduct } from "@/data/products";

type StoryModalCtx = {
  openStory: (slug: string) => void;
};
type MitraModalCtx = {
  openMitra: (slug: string) => void;
};

const StoryModalContext = createContext<StoryModalCtx | null>(null);
const MitraModalContext = createContext<MitraModalCtx | null>(null);

export function useStoryModal() {
  const ctx = useContext(StoryModalContext);
  if (!ctx) throw new Error("useStoryModal must be used within AppShell");
  return ctx;
}
export function useMitraModal() {
  const ctx = useContext(MitraModalContext);
  if (!ctx) throw new Error("useMitraModal must be used within AppShell");
  return ctx;
}

function prettify(slug: string) {
  return slug
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

export function AppShell({ children }: { children: ReactNode }) {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [activeMitra, setActiveMitra] = useState<MitraProduct | null>(null);

  const openStory = useCallback((slug: string) => {
    const found = stories.find((s) => s.slug === slug);
    if (found) {
      setActiveStory(found);
      return;
    }
    // Fallback for recommendation lakon yang ceritanya belum dibuka
    setActiveStory({
      slug,
      title: prettify(slug),
      subtitle: "Lakon ini sedang disiapkan, Sayners.",
      price: "Rp 1.000.000",
      description:
        "Cerita lengkap dari lakon ini akan segera hadir di SATYANTARA. Pantau terus website dan media sosial kami untuk update terbaru — atau ikut newsletter Sayners agar tidak ketinggalan saat lakon ini dirilis.",
      activities: [
        { name: "Coming Soon", detail: "Activity dan paket workshop akan dirilis bertahap." },
        { name: "Pre-Order", detail: "Hubungi WhatsApp kami untuk masuk waiting-list." },
        { name: "Sneak Peek", detail: "Follow Instagram @satyantara untuk preview eksklusif." },
        { name: "Newsletter", detail: "Daftar via email untuk dapat early-bird harga." },
      ],
    });
  }, []);
  const openMitra = useCallback((slug: string) => {
    const found = mitraProducts.find((m) => m.slug === slug);
    if (found) setActiveMitra(found);
  }, []);

  return (
    <StoryModalContext.Provider value={{ openStory }}>
      <MitraModalContext.Provider value={{ openMitra }}>
        <SplashScreen />
        {children}

        <Modal
          open={activeStory !== null}
          onClose={() => setActiveStory(null)}
          ariaLabel={activeStory?.title}
          size="lg"
        >
          {activeStory && <StoryModalBody story={activeStory} />}
        </Modal>

        <Modal
          open={activeMitra !== null}
          onClose={() => setActiveMitra(null)}
          ariaLabel={activeMitra?.name}
          size="md"
        >
          {activeMitra && <MitraModalBody product={activeMitra} />}
        </Modal>
      </MitraModalContext.Provider>
    </StoryModalContext.Provider>
  );
}

function StoryModalBody({ story }: { story: Story }) {
  return (
    <div className="grid gap-0 md:grid-cols-[minmax(220px,300px)_1fr]">
      <div className="relative">
        <StoryHeroArt slug={story.slug} />
        <p className="absolute bottom-3 left-4 right-4 font-display text-sm italic text-cream/85">
          cerita {story.title.toLowerCase()}
        </p>
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-[11px] uppercase tracking-[0.45em] text-gold-400/80">
          Featured Lakon
        </p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <h3 className="font-display text-3xl text-cream sm:text-4xl">
            {story.title}
          </h3>
          <span className="text-base font-medium tracking-wide text-gold-300">
            {story.price}
          </span>
        </div>
        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-cream/55">
          {story.subtitle}
        </p>

        <p className="mt-5 text-[15px] leading-relaxed text-parchment/85">
          {story.description}
        </p>

        <div className="mt-7">
          <h4 className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-300">
            Activity
          </h4>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {story.activities.map((a) => (
              <li
                key={a.name}
                className="flex gap-3 rounded-2xl border border-gold-500/15 bg-coffee-800/40 p-4 transition hover:border-gold-400/40 hover:bg-coffee-800/70"
              >
                <span className="mt-1 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gold-500/15 text-gold-300">
                  <SparkleIcon className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-cream">{a.name}</p>
                  <p className="mt-1 text-sm text-parchment/70">{a.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-cream to-coffee-100 px-7 py-3 text-sm font-semibold tracking-[0.18em] uppercase text-coffee-950 shadow-[0_15px_40px_-15px_rgba(232,221,184,0.6)] transition-transform hover:scale-[1.02]"
          >
            <BagPlusIcon className="h-4 w-4" />
            Masukkan ke Keranjang
          </button>
          <IconButton ariaLabel="Tambah wishlist">
            <HeartIcon className="h-4 w-4" />
          </IconButton>
          <IconButton ariaLabel="Tanya CS">
            <ChatIcon className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

function MitraModalBody({ product }: { product: MitraProduct }) {
  return (
    <div className="p-0">
      <div className="relative">
        <div className="aspect-[16/9] w-full">
          <MitraHeroArt tone={product.tone} />
        </div>
        {product.badge && (
          <span className="absolute left-5 top-5 rounded-full bg-coffee-950/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300 backdrop-blur">
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-[11px] uppercase tracking-[0.45em] text-gold-400/80">
          Product Mitra
        </p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <h3 className="font-display text-3xl text-cream sm:text-4xl">
            {product.name}
          </h3>
          <span className="text-base font-medium tracking-wide text-gold-300">
            {product.price}
            {product.pricePer && (
              <span className="text-cream/55">{product.pricePer}</span>
            )}
          </span>
        </div>

        <p className="mt-5 text-[15px] leading-relaxed text-parchment/85">
          {product.description}
        </p>

        <div className="mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-300">
            Detail Produk
          </h4>
          <ul className="mt-3 space-y-2">
            {product.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 text-sm text-parchment/85"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gold-400" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-gold-300 to-gold-500 px-6 py-2.5 text-sm font-semibold tracking-[0.18em] uppercase text-coffee-950 shadow-[0_15px_40px_-15px_rgba(212,162,78,0.6)] transition-transform hover:scale-[1.02]"
          >
            <BagPlusIcon className="h-4 w-4" />
            Pesan Sekarang
          </button>
          <IconButton ariaLabel="Tambah wishlist">
            <HeartIcon className="h-4 w-4" />
          </IconButton>
          <IconButton ariaLabel="Tanya CS">
            <ChatIcon className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

function StoryHeroArt({ slug }: { slug: string }) {
  const palettes: Record<string, { from: string; to: string; motif: string }> = {
    "bima-bungkus": { from: "#3d1f0a", to: "#9c5a1f", motif: "#f5d691" },
    "anoman-obong": { from: "#3a1112", to: "#8b1f1f", motif: "#f5d691" },
    pandhawa: { from: "#1f1a2c", to: "#5e3d6c", motif: "#f5d691" },
  };
  const p = palettes[slug] ?? palettes["bima-bungkus"];
  const id = `storyHero-${slug}`;

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.from} />
          <stop offset="100%" stopColor={p.to} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={p.motif} stopOpacity="0.4" />
          <stop offset="100%" stopColor={p.motif} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id})`} />
      <rect width="400" height="500" fill={`url(#${id}-glow)`} />

      <g transform="translate(120 90)" fill="#1a0f06" opacity="0.8">
        <ellipse cx="80" cy="50" rx="32" ry="38" />
        <path
          d="M48 30 L60 0 L72 24 L80 -4 L88 24 L100 0 L112 30 Z"
          fill={p.motif}
        />
        <path d="M30 90 Q80 80 130 90 L150 200 Q140 270 120 330 L40 330 Q20 270 10 200 Z" />
        <path d="M30 100 Q-10 160 0 240 L24 240 Q22 170 50 110 Z" />
        <path d="M130 100 Q170 160 160 240 L136 240 Q138 170 110 110 Z" />
        <rect
          x="25"
          y="200"
          width="110"
          height="14"
          fill={p.motif}
          opacity="0.7"
        />
      </g>

      <g
        fill="none"
        stroke={p.motif}
        strokeOpacity="0.14"
        strokeWidth="1.4"
      >
        {[60, 120, 180, 240, 300, 360].map((r) => (
          <circle key={r} cx="200" cy="500" r={r} />
        ))}
      </g>
    </svg>
  );
}

function MitraHeroArt({
  tone,
}: {
  tone: MitraProduct["tone"];
}) {
  const palettes = {
    amber: { from: "#7a4d18", to: "#3d2817", motif: "#f5d691" },
    rose: { from: "#7a2a3a", to: "#3d141c", motif: "#f5b1c7" },
    emerald: { from: "#234c3a", to: "#0f261d", motif: "#9fd9b4" },
    indigo: { from: "#2a3a6b", to: "#11173a", motif: "#a4b3f7" },
    ochre: { from: "#6b4f1a", to: "#332408", motif: "#f5d691" },
    rust: { from: "#7a2a18", to: "#3d130a", motif: "#f2c97c" },
  } as const;
  const p = palettes[tone];
  const id = `mitraHero-${tone}`;

  return (
    <svg
      viewBox="0 0 800 450"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
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
      <rect width="800" height="450" fill={`url(#${id})`} />
      <rect width="800" height="450" fill={`url(#${id}-glow)`} />

      {/* Big motif center */}
      <g transform="translate(400 225)" opacity="0.85">
        <circle r="120" fill={p.motif} fillOpacity="0.2" />
        <circle
          r="120"
          fill="none"
          stroke={p.motif}
          strokeOpacity="0.7"
          strokeWidth="2"
        />
        <circle r="80" fill="none" stroke={p.motif} strokeOpacity="0.4" />
        <path
          d="M0 -90 Q40 -50 30 0 Q20 50 0 90 Q-20 50 -30 0 Q-40 -50 0 -90 Z"
          fill={p.motif}
          fillOpacity="0.45"
          stroke={p.motif}
          strokeOpacity="0.8"
          strokeWidth="1.4"
        />
      </g>

      <g
        fill="none"
        stroke={p.motif}
        strokeOpacity="0.18"
        strokeWidth="1.2"
      >
        {[60, 120, 180, 240, 300, 360].map((r) => (
          <circle key={r} cx="80" cy="450" r={r} />
        ))}
      </g>
    </svg>
  );
}

function IconButton({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 text-cream transition hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-300"
    >
      {children}
    </button>
  );
}

function SparkleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2 13.5 8.5 20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2zM5 18l.7 2.3L8 21l-2.3.7L5 24l-.7-2.3L2 21l2.3-.7L5 18zM19 14l.6 1.9L21.5 16.5l-1.9.6L19 19l-.6-1.9-1.9-.6 1.9-.6L19 14z" />
    </svg>
  );
}
function BagPlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
      <line x1="12" y1="13" x2="12" y2="19" />
      <line x1="9" y1="16" x2="15" y2="16" />
    </svg>
  );
}
function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function ChatIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
