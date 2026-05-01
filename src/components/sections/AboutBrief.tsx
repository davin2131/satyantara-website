import { Reveal } from "../ui/Reveal";
import { Gunungan } from "../Gunungan";

export function AboutBrief() {
  return (
    <section className="section-glow relative px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10 lg:py-16">
      <Gunungan className="pointer-events-none absolute -right-20 top-1/2 h-[280px] w-[280px] -translate-y-1/2 opacity-[0.04] sm:h-[420px] sm:w-[420px] sm:opacity-[0.06]" />
      <div className="mx-auto grid max-w-6xl items-start gap-8 sm:gap-12 md:grid-cols-2">
        <Reveal>
          <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-gold-400/80 sm:text-[11px] sm:tracking-[0.45em]">
            Selamat Datang
          </p>
          <h2 className="font-display text-3xl leading-[1.1] text-cream min-[400px]:text-4xl sm:text-6xl md:text-7xl">
            <span className="block text-xl font-medium uppercase tracking-[0.25em] text-cream/85 min-[400px]:text-2xl min-[400px]:tracking-[0.3em] sm:text-4xl">
              Satyantara
            </span>
            <span className="mt-2 block">Brand Budaya</span>
            <span className="block text-gold-400">Indonesia.</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative">
            <span className="absolute -left-4 top-0 h-full w-px bg-gradient-to-b from-gold-500/60 via-gold-400/30 to-transparent" />
            <p className="text-sm leading-relaxed text-parchment/85 sm:text-lg">
              <span className="font-semibold text-gold-300">
                Halo, Sayners!
              </span>{" "}
              Selamat datang di website digital kami. SATYANTARA hadir dan
              selalu siap untuk menemani hari harimu, mari lakukan aktivitas
              positif yang kaya akan pengetahuan. Isi hari hari mu dengan{" "}
              <span className="italic text-gold-200">SATYANTARA</span>.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-cream/70 sm:mt-8 sm:gap-6 sm:text-xs sm:tracking-[0.32em]">
              <Stat label="Sanggar Mitra" value="12+" />
              <Stat label="Lakon Cerita" value="40+" />
              <Stat label="Sayners" value="5K+" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-display text-2xl text-gold-300 sm:text-3xl">{value}</span>
      <span>{label}</span>
    </div>
  );
}
