import { Reveal } from "../ui/Reveal";
import { siteCopy } from "@/data/site";

export function TentangKami() {
  const c = siteCopy.tentangKami;
  return (
    <section
      id="tentang-kami"
      className="relative px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold-400/80 sm:text-[11px] sm:tracking-[0.45em]">
              {c.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-3xl tracking-[0.14em] text-cream min-[400px]:text-4xl sm:text-6xl sm:tracking-[0.18em] md:text-7xl">
              {c.heading}
            </h2>
            <div className="gold-divider mt-6 w-40" />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-gold-500/20 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:mt-12 sm:rounded-3xl">
            <SoloMural />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-8 max-w-4xl text-center text-sm leading-relaxed text-parchment/85 sm:mt-10 sm:text-lg">
            Di tengah kota Surakarta atau yang lebih dikenal dengan nama{" "}
            <span className="font-semibold text-gold-300">Solo</span>, budaya
            menjadi denyut yang menghidupkan seluruh kegiatan masyarakat. Kota
            ini menjunjung tinggi nilai luhur Jawa yang terbentuk dari tata
            krama yang lembut, bahasa yang penuh makna, hingga kesenian
            tradisional yang tak pernah padam.{" "}
            <span className="italic text-cream">
              Wayang Kulit, Blangkon, dan Topeng
            </span>{" "}
            menjadi penanda kuat tentang betapa dalamnya akar budaya yang
            dijaga hingga kini. Pertunjukan yang mengangkat kisah{" "}
            <span className="italic text-cream">
              Mahabharata dan Ramayana
            </span>{" "}
            tidak hanya menyajikan keindahan visual, tetapi juga mengajak
            penonton memahami pesan hidup yang diwariskan leluhur. Peran dalang
            sebagai penjaga cerita membuat setiap pertunjukan memiliki
            kedalaman makna. Selain itu, berbagai tradisi seperti upacara adat,
            sajian kuliner khas, dan kegiatan komunitas memperlihatkan
            bagaimana budaya terus hidup dalam keseharian orang Solo.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 sm:grid-cols-3">
            {c.valueCards.map((card) => (
              <ValueCard
                key={card.title}
                icon={iconFor(card.icon)}
                title={card.title}
                text={card.text}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ValueCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-gold-500/15 bg-coffee-800/40 p-6 transition hover:border-gold-400/40 hover:bg-coffee-800/70">
      <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-300">
        {icon}
      </span>
      <h4 className="font-display text-xl text-cream">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-parchment/75">{text}</p>
    </div>
  );
}

function SoloMural() {
  return (
    <svg
      viewBox="0 0 1200 480"
      preserveAspectRatio="xMidYMid slice"
      className="h-[260px] w-full sm:h-[340px] md:h-[420px]"
    >
      <defs>
        <linearGradient id="muralBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3d2817" />
          <stop offset="100%" stopColor="#1a0f06" />
        </linearGradient>
        <radialGradient id="muralGlow" cx="50%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#f5d691" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f5d691" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="480" fill="url(#muralBg)" />
      <rect width="1200" height="480" fill="url(#muralGlow)" />

      {/* Distant mountain silhouette */}
      <path
        d="M0 360 L120 300 L240 340 L360 280 L480 320 L600 260 L720 310 L840 270 L960 320 L1080 290 L1200 340 L1200 480 L0 480 Z"
        fill="#0e0703"
        opacity="0.6"
      />

      {/* Joglo / temple silhouette */}
      <g transform="translate(420 200)" fill="#1a0f06" opacity="0.85">
        <polygon points="180 0 0 90 360 90" />
        <rect x="40" y="90" width="280" height="80" />
        <polygon points="40 90 320 90 280 130 80 130" fill="#3d2817" />
        <rect x="160" y="120" width="40" height="50" fill="#0e0703" />
      </g>

      {/* Wayang figures spread across */}
      {[
        [120, 240],
        [260, 250],
        [820, 245],
        [960, 250],
        [1080, 240],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} opacity="0.88">
          <path
            d="M20 0 Q30 30 26 60 Q56 75 56 120 Q56 160 36 200 L20 220 L4 200 Q-16 160 -16 120 Q-16 75 14 60 Q10 30 20 0 Z"
            fill="#f5d691"
            fillOpacity="0.18"
            stroke="#f5d691"
            strokeOpacity="0.55"
            strokeWidth="1.4"
          />
        </g>
      ))}

      {/* Three big gunungan-ish ornaments */}
      <g transform="translate(560 80)" fill="#d4a24e" opacity="0.85">
        <path d="M40 0 Q60 60 50 130 L30 130 Q20 60 40 0 Z" />
      </g>

      {/* Concentric arcs base */}
      <g
        fill="none"
        stroke="#f5d691"
        strokeOpacity="0.12"
        strokeWidth="1.4"
      >
        {[80, 160, 240, 320, 400, 480, 560].map((r) => (
          <circle key={r} cx="600" cy="500" r={r} />
        ))}
      </g>

      <text
        x="600"
        y="455"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="20"
        fill="#f5d691"
        fillOpacity="0.7"
        letterSpacing="6"
      >
        SOLO · SURAKARTA
      </text>
    </svg>
  );
}

function iconFor(name: "wayang" | "topeng" | "gamelan") {
  if (name === "topeng") return <TopengIcon className="h-5 w-5" />;
  if (name === "gamelan") return <GamelanIcon className="h-5 w-5" />;
  return <WayangIcon className="h-5 w-5" />;
}

function WayangIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2c1 2 2 5 2 8 0 0 4 2 4 6 0 4-3 6-6 6s-6-2-6-6c0-4 4-6 4-6 0-3 1-6 2-8z" />
    </svg>
  );
}
function TopengIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <ellipse cx="12" cy="12" rx="7" ry="9" />
      <circle cx="9.5" cy="11" r="1" fill="currentColor" />
      <circle cx="14.5" cy="11" r="1" fill="currentColor" />
      <path d="M9 16c1 1 4 1 6 0" strokeLinecap="round" />
    </svg>
  );
}
function GamelanIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="13" r="7" />
      <circle cx="12" cy="13" r="3" />
      <path d="M3 6 12 4l9 2" strokeLinecap="round" />
    </svg>
  );
}
