import { stories } from "@/data/products";
import { Reveal } from "../ui/Reveal";

export function ProductDetail() {
  const story = stories[0]; // Bima Bungkus

  return (
    <section className="relative px-5 py-20 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-10 md:grid-cols-[minmax(260px,360px)_1fr]">
          <Reveal>
            <FeatureArt />
          </Reveal>

          <Reveal delay={120}>
            <div>
              <p className="text-[11px] uppercase tracking-[0.45em] text-gold-400/80">
                Featured Lakon
              </p>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <h3 className="font-display text-4xl text-cream sm:text-5xl">
                  {story.title}
                </h3>
                <span className="text-lg font-medium tracking-wide text-gold-300">
                  {story.price}
                </span>
              </div>

              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-parchment/85">
                {story.description}
              </p>

              <div className="mt-8">
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
                        <p className="mt-1 text-sm text-parchment/70">
                          {a.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeatureArt() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-gold-500/30 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="featureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d1f0a" />
            <stop offset="100%" stopColor="#9c5a1f" />
          </linearGradient>
          <radialGradient id="featureGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f5d691" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f5d691" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill="url(#featureGrad)" />
        <rect width="400" height="500" fill="url(#featureGlow)" />

        {/* Bima silhouette: large warrior figure */}
        <g transform="translate(120 90)" fill="#1a0f06" opacity="0.78">
          {/* Head */}
          <ellipse cx="80" cy="50" rx="32" ry="38" />
          {/* Crown */}
          <path d="M48 30 L60 0 L72 24 L80 -4 L88 24 L100 0 L112 30 Z" fill="#d4a24e" />
          {/* Body / shoulders */}
          <path d="M30 90 Q80 80 130 90 L150 200 Q140 270 120 330 L40 330 Q20 270 10 200 Z" />
          {/* Arms */}
          <path d="M30 100 Q-10 160 0 240 L24 240 Q22 170 50 110 Z" />
          <path d="M130 100 Q170 160 160 240 L136 240 Q138 170 110 110 Z" />
          {/* Belt highlight */}
          <rect x="25" y="200" width="110" height="14" fill="#d4a24e" opacity="0.7" />
        </g>

        {/* Decorative arcs */}
        <g fill="none" stroke="#f5d691" strokeOpacity="0.14" strokeWidth="1.4">
          {[60, 120, 180, 240, 300, 360].map((r) => (
            <circle key={r} cx="200" cy="500" r={r} />
          ))}
        </g>
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coffee-950/70 via-transparent to-transparent" />
      <p className="absolute bottom-3 left-4 right-4 font-display text-sm italic text-cream/85">
        cerita Bima Bungkus
      </p>
    </div>
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
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
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
