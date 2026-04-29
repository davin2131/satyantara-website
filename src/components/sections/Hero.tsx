import { Gunungan } from "../Gunungan";

export function Hero() {
  return (
    <section
      id="beranda"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-20 bg-coffee-900" />
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 30%, rgba(212,162,78,0.18) 0%, rgba(212,162,78,0) 55%), radial-gradient(ellipse at 50% 110%, rgba(184,134,47,0.25) 0%, rgba(0,0,0,0) 60%)",
        }}
      />
      {/* Subtle vignette */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 50% 50%, transparent 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center sm:gap-8 sm:px-6">
        <div className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.4em] text-gold-400/80 sm:gap-3 sm:text-[11px] sm:tracking-[0.5em]">
          <span className="h-px w-6 bg-gold-500/60 sm:w-10" />
          Lakon Budaya Solo
          <span className="h-px w-6 bg-gold-500/60 sm:w-10" />
        </div>

        <Gunungan className="h-44 w-auto drop-shadow-[0_0_40px_rgba(212,162,78,0.4)] min-[400px]:h-56 sm:h-72 md:h-96 sm:drop-shadow-[0_0_60px_rgba(212,162,78,0.45)]" />

        <h1 className="font-display text-[2.4rem] leading-none tracking-tight text-cream min-[400px]:text-5xl sm:text-7xl md:text-8xl">
          <span className="shimmer-text">SATYANTARA</span>
        </h1>

        <p className="max-w-2xl text-sm leading-relaxed text-parchment/80 sm:text-base md:text-lg">
          Ruang digital yang merangkai cerita Wayang dan kearifan Solo menjadi
          pengalaman, produk, dan kreasi yang siap menemani harimu.
        </p>

        <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href="#layanan"
            className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-300 to-gold-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-coffee-950 shadow-[0_10px_30px_-8px_rgba(212,162,78,0.6)] transition-transform hover:scale-[1.02] hover:from-gold-400 hover:to-gold-600 sm:px-7 sm:text-sm"
          >
            Jelajahi Cerita
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#tentang-kami"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-gold-500/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cream transition hover:border-gold-300 hover:bg-gold-500/10 hover:text-gold-200 sm:px-7 sm:text-sm"
          >
            Tentang Kami
          </a>
        </div>

        {/* Scroll cue */}
        <div className="mt-12 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-gold-400/70">
          <span>Scroll</span>
          <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-gold-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
