"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "../ui/Reveal";
import {
  events,
  eventCategoryLabels,
  type EventCategory,
  type SatyantaraEvent,
} from "@/data/events";
import { siteCopy } from "@/data/site";

type Filter = "upcoming" | "past" | "all";

function formatEventDate(iso: string, endIso?: string): string {
  const start = new Date(iso);
  const end = endIso ? new Date(endIso) : null;
  const sameDay =
    !end ||
    (start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDate() === end.getDate());

  const dateFmt = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeFmt = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (!end) return `${dateFmt.format(start)} · ${timeFmt.format(start)} WIB`;
  if (sameDay)
    return `${dateFmt.format(start)} · ${timeFmt.format(start)}–${timeFmt.format(end)} WIB`;
  return `${dateFmt.format(start)} – ${dateFmt.format(end)}`;
}

function categoryTone(category: EventCategory): string {
  switch (category) {
    case "pertunjukan":
      return "border-amber-400/40 bg-amber-500/10 text-amber-200";
    case "workshop":
      return "border-emerald-400/40 bg-emerald-500/10 text-emerald-200";
    case "festival":
      return "border-rose-400/40 bg-rose-500/10 text-rose-200";
    case "diskusi":
      return "border-sky-400/40 bg-sky-500/10 text-sky-200";
    default:
      return "border-gold-400/40 bg-gold-500/10 text-gold-200";
  }
}

export function JadwalAcara() {
  const [filter, setFilter] = useState<Filter>("upcoming");
  const [now, setNow] = useState<number | null>(null);
  const copy = siteCopy.jadwalPage;
  const whatsapp = siteCopy.navbar.ctaHref;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
  }, []);

  const grouped = useMemo(() => {
    if (now === null) {
      return {
        upcoming: [] as SatyantaraEvent[],
        past: [] as SatyantaraEvent[],
      };
    }
    const upcoming = events
      .filter((e) => new Date(e.startDate).getTime() >= now)
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );
    const past = events
      .filter((e) => new Date(e.startDate).getTime() < now)
      .sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      );
    return { upcoming, past };
  }, [now]);

  const list: SatyantaraEvent[] =
    filter === "upcoming"
      ? grouped.upcoming
      : filter === "past"
        ? grouped.past
        : [...grouped.upcoming, ...grouped.past];

  const filters: { value: Filter; label: string; count: number }[] = [
    { value: "upcoming", label: "Mendatang", count: grouped.upcoming.length },
    { value: "past", label: "Telah Berlalu", count: grouped.past.length },
    {
      value: "all",
      label: "Semua",
      count: grouped.upcoming.length + grouped.past.length,
    },
  ];

  return (
    <section
      id="jadwal"
      className="section-glow relative px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-8 lg:px-10 lg:pb-24 lg:pt-36"
    >
      <div className="relative mx-auto max-w-5xl">
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

        <Reveal delay={80}>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {filters.map((f) => {
              const isActive = filter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(f.value)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all sm:text-xs sm:tracking-[0.22em] ${
                    isActive
                      ? "border-gold-400/80 bg-gold-500/15 text-gold-200 shadow-[0_10px_30px_-15px_rgba(212,162,78,0.6)]"
                      : "border-gold-500/20 bg-coffee-900/50 text-parchment/85 hover:border-gold-400/50 hover:text-cream"
                  }`}
                >
                  <span>{f.label}</span>
                  <span className="rounded-full bg-coffee-950/60 px-2 py-0.5 text-[10px] text-gold-200">
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {list.length === 0 ? (
          <Reveal delay={120}>
            <div className="mx-auto max-w-xl rounded-2xl border border-gold-500/20 bg-coffee-900/60 px-6 py-12 text-center sm:px-10 sm:py-16">
              <p className="font-display text-2xl text-cream sm:text-3xl">
                {copy.emptyTitle}
              </p>
              <p className="mt-3 whitespace-pre-line text-sm text-parchment/85 sm:text-base">
                {filter === "upcoming"
                  ? copy.emptyBody
                  : filter === "past"
                    ? "Belum ada arsip acara yang ditampilkan."
                    : "Belum ada acara yang ditambahkan ke kalender."}
              </p>
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-b from-gold-300 to-gold-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-coffee-950 transition hover:from-gold-400 hover:to-gold-600 sm:px-7 sm:text-sm"
              >
                Tanyakan via WhatsApp
              </a>
            </div>
          </Reveal>
        ) : (
          <ol className="space-y-5">
            {list.map((e, i) => (
              <li key={e.slug ?? `${e.title}-${e.startDate}`}>
                <Reveal delay={Math.min(i * 60, 320)}>
                  <EventCard event={e} now={now ?? 0} />
                </Reveal>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

function EventCard({ event, now }: { event: SatyantaraEvent; now: number }) {
  const isPast = new Date(event.startDate).getTime() < now;
  const cta = event.registrationUrl ?? siteCopy.navbar.ctaHref;

  return (
    <article
      className={`flex flex-col gap-5 overflow-hidden rounded-2xl border bg-coffee-900/60 p-5 transition sm:flex-row sm:p-6 ${
        isPast
          ? "border-gold-500/15 opacity-80"
          : "border-gold-500/30 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)]"
      }`}
    >
      {event.imageUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-coffee-800 sm:aspect-square sm:w-48 sm:flex-none">
          <Image
            src={event.imageUrl}
            alt={event.imageAlt ?? event.title}
            fill
            sizes="(max-width: 640px) 100vw, 192px"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${categoryTone(
              event.category,
            )}`}
          >
            {eventCategoryLabels[event.category]}
          </span>
          {event.isFeatured && !isPast && (
            <span className="inline-flex items-center rounded-full border border-gold-300/60 bg-gold-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-200">
              Unggulan
            </span>
          )}
          {isPast && (
            <span className="inline-flex items-center rounded-full border border-parchment/20 bg-coffee-950/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-parchment/70">
              Selesai
            </span>
          )}
        </div>

        <h2 className="font-display text-2xl leading-tight text-cream sm:text-3xl">
          {event.title}
        </h2>

        <div className="space-y-1 text-sm text-parchment/90 sm:text-base">
          <p className="flex items-start gap-2">
            <CalendarIcon className="mt-1 h-4 w-4 flex-none text-gold-300" />
            <span>{formatEventDate(event.startDate, event.endDate)}</span>
          </p>
          <p className="flex items-start gap-2">
            <PinIcon className="mt-1 h-4 w-4 flex-none text-gold-300" />
            <span>{event.location}</span>
          </p>
        </div>

        <p className="text-sm leading-relaxed text-parchment/90 sm:text-base">
          {event.description}
        </p>

        {!isPast && (
          <div>
            <a
              href={cta}
              target={cta.startsWith("http") ? "_blank" : undefined}
              rel={cta.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-300 to-gold-500 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-coffee-950 transition hover:from-gold-400 hover:to-gold-600 sm:px-6 sm:text-xs sm:tracking-[0.22em]"
            >
              {event.registrationUrl ? "Daftar / Pesan" : "Tanyakan via WhatsApp"}
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
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
