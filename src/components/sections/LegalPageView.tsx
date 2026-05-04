import { Reveal } from "../ui/Reveal";
import type { LegalPage } from "@/data/legal";

export function LegalPageView({ page }: { page: LegalPage }) {
  return (
    <section
      className="section-glow relative px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-8 lg:px-10 lg:pb-24 lg:pt-36"
    >
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <div className="mb-10 text-center sm:mb-14">
            <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-gold-400 sm:text-[11px] sm:tracking-[0.5em]">
              {page.kind === "privacy" ? "Kebijakan" : "Ketentuan"}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-cream sm:text-5xl md:text-6xl">
              <span className="shimmer-text">{page.title}</span>
            </h1>
            <div className="gold-divider mx-auto mt-5 w-32" />
            {page.lastUpdated ? (
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-parchment/70">
                Pembaruan terakhir: {page.lastUpdated}
              </p>
            ) : null}
            {page.intro ? (
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-parchment/90 sm:text-base">
                {page.intro}
              </p>
            ) : null}
          </div>
        </Reveal>

        <div className="space-y-8 sm:space-y-10">
          {page.sections.map((section, i) => (
            <Reveal key={`${section.heading}-${i}`} delay={i * 60}>
              <article className="rounded-2xl border border-gold-500/15 bg-coffee-900/40 p-6 sm:p-8">
                <h2 className="font-display text-xl text-cream sm:text-2xl">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-4">
                  {section.paragraphs.map((p, pi) => (
                    <p
                      key={pi}
                      className="text-sm leading-relaxed text-parchment/90 sm:text-base"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
