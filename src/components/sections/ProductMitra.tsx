import { mitraProducts, type MitraProduct } from "@/data/products";
import { Reveal } from "../ui/Reveal";

export function ProductMitra() {
  return (
    <section className="relative px-5 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.45em] text-gold-400/80">
                Karya Sanggar
              </p>
              <h2 className="mt-2 font-display text-4xl text-cream sm:text-5xl md:text-6xl">
                Product Mitra
              </h2>
              <p className="mt-3 max-w-xl text-parchment/75">
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

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {mitraProducts.map((p, i) => (
            <MitraCard key={p.name} product={p} delay={i * 50} />
          ))}
        </div>

        <div className="mt-10 text-center">
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

  return (
    <Reveal delay={delay}>
      <article className="group relative overflow-hidden rounded-2xl border border-gold-500/15 bg-coffee-800/40 p-2 transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/50">
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <MitraArt palette={palette} />
          {product.badge && (
            <span className="absolute left-2 top-2 rounded-full bg-coffee-950/80 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gold-300 backdrop-blur">
              {product.badge}
            </span>
          )}
        </div>
        <div className="px-2 pb-2 pt-3">
          <h4 className="text-sm font-semibold text-cream group-hover:text-gold-200 transition-colors">
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
    </Reveal>
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
