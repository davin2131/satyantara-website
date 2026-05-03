"use client";

import { useState } from "react";
import { Reveal } from "../ui/Reveal";
import { faqGroups } from "@/data/faq";
import { siteCopy } from "@/data/site";

export function FAQ() {
  const groups = faqGroups;
  const copy = siteCopy.faqPage;
  const navbar = siteCopy.navbar;
  const emailContact = siteCopy.footer.contacts.find((c) => c.kind === "email");

  // Buka pertanyaan pertama secara default supaya page tidak terlihat kosong.
  const [open, setOpen] = useState<string | null>(
    groups.length > 0 && groups[0].items.length > 0 ? "0-0" : null,
  );

  const toggle = (key: string) => setOpen((prev) => (prev === key ? null : key));

  return (
    <section
      id="faq"
      className="section-glow relative px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-8 lg:px-10 lg:pb-24 lg:pt-36"
    >
      <div className="relative mx-auto max-w-4xl">
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
            <p className="max-w-2xl text-sm leading-relaxed text-parchment/90 sm:text-base">
              {copy.subtitle}
            </p>
          </div>
        </Reveal>

        {groups.length === 0 ? (
          <Reveal>
            <div className="rounded-2xl border border-gold-500/20 bg-coffee-900/50 px-6 py-10 text-center text-sm text-parchment/85 sm:text-base">
              Belum ada pertanyaan yang dipublikasi. Admin bisa menambah lewat
              Sanity Studio (FAQ — Pertanyaan Umum).
            </div>
          </Reveal>
        ) : (
          <div className="space-y-10">
            {groups.map((group, gi) => (
              <Reveal key={`${group.title}-${gi}`} delay={gi * 80}>
                <div>
                  <h2 className="mb-4 text-xs uppercase tracking-[0.32em] text-gold-300 sm:text-sm">
                    {group.title}
                  </h2>
                  <ul className="space-y-3">
                    {group.items.map((item, ii) => {
                      const key = `${gi}-${ii}`;
                      const isOpen = open === key;
                      return (
                        <li
                          key={key}
                          className="overflow-hidden rounded-2xl border border-gold-500/20 bg-coffee-900/50"
                        >
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => toggle(key)}
                            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-gold-500/5 sm:px-6 sm:py-5"
                          >
                            <span className="font-display text-base text-cream sm:text-lg">
                              {item.q}
                            </span>
                            <ChevronIcon
                              className={`h-5 w-5 flex-none text-gold-300 transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <div
                            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                              isOpen
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <p className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-parchment/90 sm:px-6 sm:pb-6 sm:text-base">
                                {item.a}
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={400}>
          <div className="mt-12 rounded-2xl border border-gold-500/20 bg-gradient-to-br from-coffee-900/70 to-coffee-800/40 px-6 py-8 text-center sm:px-10 sm:py-10">
            <p className="text-xs uppercase tracking-[0.32em] text-gold-300 sm:text-sm">
              {copy.ctaEyebrow}
            </p>
            <h3 className="mt-3 font-display text-2xl text-cream sm:text-3xl">
              {copy.ctaTitle}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-parchment/90 sm:text-base">
              {copy.ctaBody}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={navbar.ctaHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-300 to-gold-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-coffee-950 transition hover:from-gold-400 hover:to-gold-600 sm:px-7 sm:text-sm"
              >
                Chat WhatsApp
              </a>
              {emailContact ? (
                <a
                  href={emailContact.href}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-gold-500/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cream transition hover:border-gold-300 hover:bg-gold-500/10 hover:text-gold-200 sm:px-7 sm:text-sm"
                >
                  Kirim Email
                </a>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
