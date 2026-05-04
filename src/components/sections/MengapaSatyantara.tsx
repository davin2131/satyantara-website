import { Reveal } from "../ui/Reveal";
import { siteCopy } from "@/data/site";

const ICONS = {
  sanggar: SanggarIcon,
  dalang: DalangIcon,
  whatsapp: WhatsappIcon,
  budaya: BudayaIcon,
  wayang: WayangIcon,
  topeng: TopengIcon,
  gamelan: GamelanIcon,
} as const;

export type MengapaIconKey = keyof typeof ICONS;

export function MengapaSatyantara() {
  const c = siteCopy.mengapaKami;
  if (!c || c.items.length === 0) return null;
  return (
    <section
      id="mengapa-kami"
      className="relative px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold-400 sm:text-[11px] sm:tracking-[0.45em]">
              {c.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-3xl tracking-[0.14em] text-cream min-[400px]:text-4xl sm:text-5xl sm:tracking-[0.18em] md:text-6xl">
              {c.title}
            </h2>
            <div className="gold-divider mt-6 w-40" />
            {c.subtitle ? (
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-parchment/85 sm:text-base">
                {c.subtitle}
              </p>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div
            className={`mt-10 grid gap-4 sm:mt-14 sm:gap-5 ${
              c.items.length >= 4
                ? "sm:grid-cols-2 lg:grid-cols-4"
                : "sm:grid-cols-3"
            }`}
          >
            {c.items.map((item) => {
              const Icon = ICONS[(item.icon ?? "sanggar") as MengapaIconKey] ?? SanggarIcon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-gold-500/15 bg-coffee-800/40 p-6 transition hover:border-gold-400/40 hover:bg-coffee-800/70"
                >
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-parchment/90">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SanggarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function DalangIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 21c0-3.5 3-6 7-6s7 2.5 7 6" />
    </svg>
  );
}

function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12a8.5 8.5 0 0 1-12.4 7.6L3 21l1.5-5.4A8.5 8.5 0 1 1 21 12z" />
      <path d="M9 10c.4 1.5 1.6 2.7 3 3 1.4-.5 2-1 2-1l1 1.5-1 1c-2 .6-5-1-6-3l1-1.5z" />
    </svg>
  );
}

function BudayaIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
    </svg>
  );
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
