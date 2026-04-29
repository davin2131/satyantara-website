import { Reveal } from "../ui/Reveal";
import { Gunungan } from "../Gunungan";

export function AboutBrief() {
  return (
    <section className="section-glow relative px-5 py-24 lg:px-10">
      <Gunungan className="pointer-events-none absolute -right-20 top-1/2 h-[420px] w-[420px] -translate-y-1/2 opacity-[0.04] sm:opacity-[0.06]" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <Reveal>
          <p className="mb-3 text-[11px] uppercase tracking-[0.45em] text-gold-400/80">
            Selamat Datang
          </p>
          <h2 className="font-display text-5xl leading-[1.05] text-cream sm:text-6xl md:text-7xl">
            <span className="block text-3xl font-medium tracking-[0.3em] uppercase text-cream/85 sm:text-4xl">
              Satyantara
            </span>
            <span className="mt-2 block">Brand Budaya</span>
            <span className="block text-gold-400">Indonesia.</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative">
            <span className="absolute -left-4 top-0 h-full w-px bg-gradient-to-b from-gold-500/60 via-gold-400/30 to-transparent" />
            <p className="text-base leading-relaxed text-parchment/85 sm:text-lg">
              <span className="font-semibold text-gold-300">
                Halo, Sayners!
              </span>{" "}
              Selamat datang di website digital kami. SATYANTARA hadir dan
              selalu siap untuk menemani hari harimu, mari lakukan aktivitas
              positif yang kaya akan pengetahuan. Isi hari hari mu dengan{" "}
              <span className="italic text-gold-200">SATYANTARA</span>.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.32em] text-cream/70">
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
      <span className="font-display text-3xl text-gold-300">{value}</span>
      <span>{label}</span>
    </div>
  );
}
