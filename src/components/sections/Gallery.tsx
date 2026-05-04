import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { galleryItems, type GalleryItem } from "@/data/gallery";

export function Gallery() {
  return (
    <section
      id="galeri"
      className="section-glow relative px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-8 lg:px-10 lg:pb-24 lg:pt-36"
    >
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 flex flex-col items-center gap-4 text-center sm:mb-14 sm:gap-5">
            <p className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.4em] text-gold-400 sm:gap-3 sm:text-[11px] sm:tracking-[0.5em]">
              <span className="h-px w-6 bg-gold-500/60 sm:w-10" />
              Bingkai Cerita Kami
              <span className="h-px w-6 bg-gold-500/60 sm:w-10" />
            </p>
            <h1 className="font-display text-4xl leading-tight text-cream min-[400px]:text-5xl sm:text-6xl md:text-7xl">
              <span className="shimmer-text">GALERI</span>
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-parchment/85 sm:text-base">
              Kumpulan momen, ornamen, dan suasana yang merangkai perjalanan
              SATYANTARA — dari panggung wayang hingga pelosok sanggar Solo.
            </p>
          </div>
        </Reveal>

        {galleryItems.length === 0 ? (
          <Reveal delay={120}>
            <p className="mx-auto max-w-md rounded-2xl border border-gold-500/20 bg-coffee-900/60 px-6 py-10 text-center text-sm text-parchment/80">
              Galeri sedang dipersiapkan. Foto-foto akan segera hadir lewat
              Sanggar Studio kami.
            </p>
          </Reveal>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
            {galleryItems.map((item, i) => (
              <li key={`${item.title}-${i}`}>
                <Reveal delay={Math.min(i * 80, 320)}>
                  <GalleryCard item={item} index={i} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  return (
    <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gold-500/20 bg-coffee-900/70 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.7)] transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)]">
      {item.imageUrl ? (
        <Image
          src={item.imageUrl}
          alt={item.imageAlt ?? item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <GalleryPlaceholder index={index} />
      )}
    </figure>
  );
}

function GalleryPlaceholder({ index }: { index: number }) {
  const palettes = [
    { from: "#3d2817", to: "#1a0f06", motif: "#d4a24e" },
    { from: "#2a1a0e", to: "#1a0f06", motif: "#f2c97c" },
    { from: "#4f3520", to: "#2a1a0e", motif: "#b8862f" },
    { from: "#3d2817", to: "#1a0f06", motif: "#f5d691" },
  ];
  const p = palettes[index % palettes.length];
  const id = `gal-${index}`;
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
        <radialGradient id={`${id}-glow`} cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor={p.motif} stopOpacity="0.22" />
          <stop offset="100%" stopColor={p.motif} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-bg)`} />
      <rect width="400" height="300" fill={`url(#${id}-glow)`} />

      <g transform="translate(160 60)" opacity="0.85">
        <path
          d="M40 0 Q55 50 50 90 Q90 110 90 160 Q90 210 55 240 L40 250 L25 240 Q-10 210 -10 160 Q-10 110 30 90 Q25 50 40 0 Z"
          fill={p.to}
          opacity="0.55"
        />
        <path
          d="M40 0 Q55 50 50 90 Q90 110 90 160 Q90 210 55 240 L40 250 L25 240 Q-10 210 -10 160 Q-10 110 30 90 Q25 50 40 0 Z"
          fill="none"
          stroke={p.motif}
          strokeWidth="1.6"
          strokeOpacity="0.7"
        />
      </g>

      <g
        fill="none"
        stroke={p.motif}
        strokeOpacity="0.18"
        strokeWidth="1.2"
      >
        {[40, 80, 120, 160].map((r) => (
          <circle key={r} cx="40" cy="280" r={r} />
        ))}
        {[40, 80, 120, 160].map((r) => (
          <circle key={`r-${r}`} cx="360" cy="280" r={r} />
        ))}
      </g>
    </svg>
  );
}
