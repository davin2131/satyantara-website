import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { siteCopy } from "@/data/site";

export function TentangKamiPage() {
  const copy = siteCopy.tentangKamiPage;
  const navbar = siteCopy.navbar;
  const emailContact = siteCopy.footer.contacts.find((c) => c.kind === "email");

  return (
    <section
      id="tentang-kami"
      className="section-glow relative px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-8 lg:px-10 lg:pb-24 lg:pt-36"
    >
      <div className="relative mx-auto max-w-5xl">
        {/* Hero */}
        <Reveal>
          <div className="mb-10 flex flex-col items-center gap-4 text-center sm:mb-14 sm:gap-5">
            <p className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.4em] text-gold-400 sm:gap-3 sm:text-[11px] sm:tracking-[0.5em]">
              <span className="h-px w-6 bg-gold-500/60 sm:w-10" />
              {copy.eyebrow}
              <span className="h-px w-6 bg-gold-500/60 sm:w-10" />
            </p>
            <h1 className="font-display text-4xl leading-tight text-cream min-[400px]:text-5xl sm:text-6xl md:text-7xl">
              <span className="shimmer-text">{copy.title}</span>
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-parchment/90 sm:text-base">
              {copy.subtitle}
            </p>
          </div>
        </Reveal>

        {copy.heroImageUrl ? (
          <Reveal delay={120}>
            <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-gold-500/20 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:mb-16">
              <Image
                src={copy.heroImageUrl}
                alt={copy.heroImageAlt ?? copy.title}
                fill
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        ) : null}

        {/* Sections (cerita panjang, foto bergantian kiri-kanan) */}
        {copy.sections.length > 0 ? (
          <div className="space-y-10 sm:space-y-14">
            {copy.sections.map((section, i) => {
              const reverse = i % 2 === 1;
              const hasImage = !!section.imageUrl;
              return (
                <Reveal key={section.heading} delay={i * 80}>
                  <article
                    className={`grid gap-6 sm:gap-10 ${
                      hasImage ? "lg:grid-cols-2" : ""
                    }`}
                  >
                    {hasImage ? (
                      <div
                        className={`relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-gold-500/20 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] ${
                          reverse ? "lg:order-2" : ""
                        }`}
                      >
                        <Image
                          src={section.imageUrl!}
                          alt={section.imageAlt ?? section.heading}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <div
                      className={`flex flex-col justify-center ${
                        reverse ? "lg:order-1" : ""
                      }`}
                    >
                      <h2 className="font-display text-2xl leading-tight text-cream sm:text-3xl">
                        {section.heading}
                      </h2>
                      <div className="gold-divider mt-4 w-24" />
                      <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-parchment/90 sm:text-base">
                        {section.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        ) : null}

        {/* Visi & Misi */}
        {copy.visi || copy.misi.length > 0 ? (
          <Reveal delay={120}>
            <div className="mt-14 grid gap-5 rounded-3xl border border-gold-500/20 bg-coffee-900/40 p-6 sm:mt-20 sm:gap-6 sm:p-10 md:grid-cols-2">
              {copy.visi ? (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gold-400 sm:text-[11px] sm:tracking-[0.45em]">
                    Visi
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-cream/95 sm:text-lg">
                    {copy.visi}
                  </p>
                </div>
              ) : null}
              {copy.misi.length > 0 ? (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gold-400 sm:text-[11px] sm:tracking-[0.45em]">
                    Misi
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {copy.misi.map((m, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm leading-relaxed text-parchment/90 sm:text-base"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-gold-400"
                        />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Reveal>
        ) : null}

        {/* Tim */}
        {copy.team.length > 0 ? (
          <Reveal delay={160}>
            <div className="mt-14 sm:mt-20">
              <p className="text-center text-[10px] uppercase tracking-[0.4em] text-gold-400 sm:text-[11px] sm:tracking-[0.45em]">
                Tim & Founder
              </p>
              <h2 className="mt-3 text-center font-display text-3xl text-cream sm:text-4xl">
                Wajah di Balik Cerita
              </h2>
              <div className="gold-divider mx-auto mt-5 w-32" />
              <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {copy.team.map((member) => (
                  <article
                    key={member.name}
                    className="overflow-hidden rounded-3xl border border-gold-500/20 bg-coffee-800/40 p-5 transition hover:border-gold-400/40 hover:bg-coffee-800/70 sm:p-6"
                  >
                    {member.photoUrl ? (
                      <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-2xl border border-gold-500/15">
                        <Image
                          src={member.photoUrl}
                          alt={member.photoAlt ?? member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 320px"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <h3 className="font-display text-xl text-cream">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-gold-300">
                      {member.role}
                    </p>
                    {member.bio ? (
                      <p className="mt-3 text-sm leading-relaxed text-parchment/85">
                        {member.bio}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        ) : null}

        {/* CTA Kontak */}
        <Reveal delay={200}>
          <div className="mt-14 rounded-3xl border border-gold-500/30 bg-gradient-to-br from-coffee-900/80 to-coffee-950/90 p-6 text-center sm:mt-20 sm:p-10">
            <h2 className="font-display text-2xl text-cream sm:text-3xl">
              {copy.ctaTitle}
            </h2>
            <div className="gold-divider mx-auto mt-4 w-24" />
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-parchment/90 sm:text-base">
              {copy.ctaBody}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={navbar.ctaHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-gradient-to-b from-gold-300 to-gold-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-coffee-950 shadow-[0_14px_32px_-12px_rgba(212,162,78,0.6)] transition hover:from-gold-400 hover:to-gold-600"
              >
                Hubungi via WhatsApp
              </a>
              {emailContact ? (
                <a
                  href={emailContact.href}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-gold-500/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-cream transition hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-300"
                >
                  Email Kami
                </a>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
