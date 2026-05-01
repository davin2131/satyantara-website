import { Reveal } from "../ui/Reveal";

export function Footer() {
  return (
    <footer
      id="kontak"
      className="relative mt-8 px-4 pb-10 sm:mt-12 sm:px-6 sm:pb-12 md:px-8 lg:mt-16 lg:px-10"
    >
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Brand watermark + socials */}
        <Reveal>
          <div className="batik-pattern relative overflow-hidden rounded-2xl border border-gold-500/20 px-5 py-10 sm:rounded-3xl sm:px-12 sm:py-14">
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              aria-hidden
            >
              <span className="select-none font-display text-[14vw] leading-none tracking-[0.04em] text-gold-500/[0.06] sm:text-[120px]">
                SATYANTARA
              </span>
            </div>

            <div className="relative flex flex-col items-center gap-6 sm:gap-8">
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold-400/80 sm:text-[11px] sm:tracking-[0.45em]">
                Ikuti Cerita Kami
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <SocialButton label="YouTube" href="#" tone="rose">
                  <YouTubeIcon className="h-5 w-5" />
                </SocialButton>
                <SocialButton label="Telegram" href="#" tone="sky">
                  <TelegramIcon className="h-5 w-5" />
                </SocialButton>
                <SocialButton label="Instagram" href="#" tone="amber">
                  <InstagramIcon className="h-5 w-5" />
                </SocialButton>
                <SocialButton label="Facebook" href="#" tone="blue">
                  <FacebookIcon className="h-5 w-5" />
                </SocialButton>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Contact */}
        <Reveal delay={120}>
          <div className="rounded-2xl border border-gold-500/20 bg-coffee-800/50 p-6 sm:rounded-3xl sm:p-12">
            <h3 className="text-center font-display text-2xl tracking-[0.16em] text-cream min-[400px]:text-3xl sm:text-4xl sm:tracking-[0.2em]">
              CONTACT PERSON
            </h3>
            <div className="gold-divider mx-auto mt-5 w-32" />

            <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:mt-8 sm:flex-row sm:gap-8">
              <ContactItem
                icon={<WhatsAppIcon className="h-6 w-6" />}
                label="WhatsApp"
                value="+62 8xx-xxxx-xxxx"
                href="https://wa.me/"
                accent="emerald"
              />
              <ContactItem
                icon={<MailIcon className="h-6 w-6" />}
                label="Email"
                value="hello@satyantara.id"
                href="mailto:hello@satyantara.id"
                accent="amber"
              />
              <ContactItem
                icon={<PinIcon className="h-6 w-6" />}
                label="Sanggar"
                value="Solo · Surakarta"
                href="#"
                accent="rose"
              />
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-gold-500/15 pt-6 text-center text-xs text-cream/55 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} SATYANTARA. Semua hak cipta dilindungi.
          </p>
          <p className="tracking-[0.3em] uppercase text-gold-400/60">
            Crafted in Solo · Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialButton({
  href,
  label,
  children,
  tone,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  tone: "rose" | "sky" | "amber" | "blue";
}) {
  const toneMap = {
    rose: "hover:bg-rose-600/30 hover:border-rose-400/60 hover:text-rose-200",
    sky: "hover:bg-sky-600/30 hover:border-sky-400/60 hover:text-sky-200",
    amber: "hover:bg-amber-600/30 hover:border-amber-400/60 hover:text-amber-200",
    blue: "hover:bg-blue-600/30 hover:border-blue-400/60 hover:text-blue-200",
  } as const;
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/30 bg-coffee-950/40 text-cream/85 backdrop-blur transition-all duration-300 hover:scale-110 ${toneMap[tone]}`}
    >
      {children}
    </a>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  accent: "emerald" | "amber" | "rose";
}) {
  const accentMap = {
    emerald: "text-emerald-300 group-hover:bg-emerald-500/20",
    amber: "text-gold-300 group-hover:bg-gold-500/20",
    rose: "text-rose-300 group-hover:bg-rose-500/20",
  } as const;
  return (
    <a
      href={href}
      className="group flex items-center gap-4"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
    >
      <span
        className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/20 bg-coffee-900/70 transition ${accentMap[accent]}`}
      >
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-[10px] uppercase tracking-[0.4em] text-cream/55">
          {label}
        </span>
        <span className="text-sm font-medium text-cream group-hover:text-gold-200">
          {value}
        </span>
      </span>
    </a>
  );
}

/* Social + contact icons */
function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}
function TelegramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.022c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.566-4.458c.534-.196 1.006.128.832.938z" />
    </svg>
  );
}
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.81 11.81 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.044zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.148-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.711.307 1.265.49 1.697.628.713.227 1.362.195 1.875.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  );
}
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function PinIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
