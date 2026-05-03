"use client";

import { useMemo, useState } from "react";
import { Reveal } from "../ui/Reveal";
import { Modal } from "../ui/Modal";
import {
  provinces,
  provincesById,
  provinceRegionLabels,
  type ProvinceCulture,
  type ProvinceRegion,
} from "@/data/provinces";
import { provincePaths, MAP_VIEWBOX } from "@/data/indonesiaMap";

// Slugs yang punya foto landmark bawaan di /public/provinces/[slug].jpg.
// Foto Sanity (province.imageUrl) selalu menang kalau editor upload via Studio.
const PROVINCE_LOCAL_PHOTOS = new Set<string>([
  "aceh", "sumatera-utara", "sumatera-barat", "riau", "jambi",
  "sumatera-selatan", "bengkulu", "lampung", "bangka-belitung", "kepulauan-riau",
  "dki-jakarta", "jawa-barat", "jawa-tengah", "diy", "jawa-timur", "banten",
  "bali", "ntb", "ntt",
  "kalimantan-barat", "kalimantan-tengah", "kalimantan-selatan",
  "kalimantan-timur", "kalimantan-utara",
  "sulawesi-utara", "sulawesi-tengah", "sulawesi-selatan", "sulawesi-tenggara",
  "gorontalo", "sulawesi-barat",
  "maluku", "maluku-utara",
  "papua", "papua-pegunungan", "papua-selatan", "papua-tengah",
  "papua-barat", "papua-barat-daya",
]);

function resolveProvincePhoto(p: ProvinceCulture): string | null {
  if (p.imageUrl) return p.imageUrl;
  if (PROVINCE_LOCAL_PHOTOS.has(p.slug)) return `/provinces/${p.slug}.jpg`;
  return null;
}

type RegionFilter = "all" | ProvinceRegion;

const regionFilters: { value: RegionFilter; label: string }[] = [
  { value: "all", label: "Semua Pulau" },
  { value: "sumatera", label: "Sumatera" },
  { value: "jawa", label: "Jawa" },
  { value: "bali-nusa-tenggara", label: "Bali & NT" },
  { value: "kalimantan", label: "Kalimantan" },
  { value: "sulawesi", label: "Sulawesi" },
  { value: "maluku", label: "Maluku" },
  { value: "papua", label: "Papua" },
];

const regionFillClass: Record<ProvinceRegion, string> = {
  sumatera: "fill-amber-700/30 hover:fill-amber-500/55",
  jawa: "fill-rose-700/30 hover:fill-rose-500/55",
  "bali-nusa-tenggara": "fill-emerald-700/30 hover:fill-emerald-500/55",
  kalimantan: "fill-violet-700/30 hover:fill-violet-500/55",
  sulawesi: "fill-cyan-700/30 hover:fill-cyan-500/55",
  maluku: "fill-orange-700/30 hover:fill-orange-500/55",
  papua: "fill-fuchsia-700/30 hover:fill-fuchsia-500/55",
};

const regionDotClass: Record<ProvinceRegion, string> = {
  sumatera: "bg-amber-500/70",
  jawa: "bg-rose-500/70",
  "bali-nusa-tenggara": "bg-emerald-500/70",
  kalimantan: "bg-violet-500/70",
  sulawesi: "bg-cyan-500/70",
  maluku: "bg-orange-500/70",
  papua: "bg-fuchsia-500/70",
};

export function PetaBudaya() {
  const [filter, setFilter] = useState<RegionFilter>("all");
  const [active, setActive] = useState<ProvinceCulture | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const filteredProvinces = useMemo(
    () =>
      filter === "all"
        ? provinces
        : provinces.filter((p) => p.region === filter),
    [filter],
  );

  const groupedByRegion = useMemo(() => {
    const groups: Record<ProvinceRegion, ProvinceCulture[]> = {
      sumatera: [],
      jawa: [],
      "bali-nusa-tenggara": [],
      kalimantan: [],
      sulawesi: [],
      maluku: [],
      papua: [],
    };
    for (const p of filteredProvinces) groups[p.region].push(p);
    return groups;
  }, [filteredProvinces]);

  const isHighlighted = (id: string) => {
    if (filter === "all") return true;
    const p = provincesById[id];
    return p?.region === filter;
  };

  const hoveredProvince = hovered ? provincesById[hovered] : null;

  return (
    <section
      id="peta-budaya"
      className="section-glow relative px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-8 lg:px-10 lg:pb-24 lg:pt-36"
    >
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-10 flex flex-col items-center gap-4 text-center sm:mb-14 sm:gap-5">
            <p className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.4em] text-gold-400/80 sm:gap-3 sm:text-[11px] sm:tracking-[0.5em]">
              <span className="h-px w-6 bg-gold-500/60 sm:w-10" />
              Jelajah Nusantara
              <span className="h-px w-6 bg-gold-500/60 sm:w-10" />
            </p>
            <h1 className="font-display text-4xl leading-tight text-cream min-[400px]:text-5xl sm:text-6xl md:text-7xl">
              <span className="shimmer-text">PETA BUDAYA INDONESIA</span>
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-parchment/85 sm:text-base">
              Tekan provinsi pada peta untuk membaca tarian khas, alat musik
              tradisional, rumah adat, pakaian, makanan, dan seni pertunjukan
              dari 38 provinsi Nusantara.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:mb-8 sm:gap-3">
            {regionFilters.map((f) => {
              const activeFilter = filter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(f.value)}
                  className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition-all sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.22em] ${
                    activeFilter
                      ? "border-gold-400/80 bg-gold-500/15 text-gold-200 shadow-[0_10px_30px_-15px_rgba(212,162,78,0.6)]"
                      : "border-gold-500/20 bg-coffee-800/60 text-parchment/75 hover:border-gold-400/50 hover:text-cream"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="relative overflow-hidden rounded-2xl border border-gold-500/20 bg-coffee-900/70 p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:p-6">
            <div className="relative w-full">
              <svg
                viewBox={MAP_VIEWBOX}
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Peta interaktif provinsi Indonesia"
                className="h-auto w-full"
              >
                <defs>
                  <radialGradient id="seaGlow" cx="50%" cy="55%" r="65%">
                    <stop offset="0%" stopColor="#16110a" />
                    <stop offset="100%" stopColor="#0a0703" />
                  </radialGradient>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="1000"
                  height="374"
                  fill="url(#seaGlow)"
                  rx="14"
                />
                {provincePaths.map((p) => {
                  const data = provincesById[p.id];
                  const region = data?.region ?? "jawa";
                  const dim = !isHighlighted(p.id);
                  const isHover = hovered === p.id;
                  return (
                    <path
                      key={p.id}
                      d={p.path}
                      onClick={() => data && setActive(data)}
                      onMouseEnter={() => setHovered(p.id)}
                      onMouseLeave={() =>
                        setHovered((h) => (h === p.id ? null : h))
                      }
                      onFocus={() => setHovered(p.id)}
                      onBlur={() =>
                        setHovered((h) => (h === p.id ? null : h))
                      }
                      tabIndex={data ? 0 : -1}
                      role={data ? "button" : undefined}
                      aria-label={data ? data.name : undefined}
                      onKeyDown={(e) => {
                        if (data && (e.key === "Enter" || e.key === " ")) {
                          e.preventDefault();
                          setActive(data);
                        }
                      }}
                      className={`cursor-pointer stroke-[#3b2a14] outline-none transition-all duration-300 [stroke-width:0.6] focus-visible:stroke-gold-300 focus-visible:[stroke-width:1.4] ${
                        regionFillClass[region]
                      } ${dim ? "opacity-25" : "opacity-100"} ${
                        isHover
                          ? "[stroke-width:1.4] !fill-gold-400/70"
                          : ""
                      }`}
                    />
                  );
                })}
              </svg>

              {hoveredProvince && (
                <div
                  aria-live="polite"
                  className="pointer-events-none absolute left-3 top-3 rounded-lg border border-gold-500/30 bg-coffee-950/85 px-3 py-2 shadow-[0_18px_40px_-15px_rgba(0,0,0,0.7)] backdrop-blur sm:left-5 sm:top-5 sm:px-4 sm:py-2.5"
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-gold-300/85 sm:text-[10px]">
                    {provinceRegionLabels[hoveredProvince.region]}
                  </p>
                  <p className="font-display text-base text-cream sm:text-lg">
                    {hoveredProvince.name}
                  </p>
                  <p className="text-[10px] text-parchment/70 sm:text-xs">
                    Ibukota: {hoveredProvince.capital}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-parchment/65 sm:text-[11px]">
              {(Object.keys(provinceRegionLabels) as ProvinceRegion[]).map(
                (r) => (
                  <span key={r} className="flex items-center gap-1.5">
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${regionDotClass[r]}`}
                    />
                    {provinceRegionLabels[r]}
                  </span>
                ),
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 sm:mt-14">
            <h2 className="font-display text-2xl text-cream sm:text-3xl">
              Daftar Provinsi
            </h2>
            <p className="mt-2 text-sm text-parchment/75 sm:text-base">
              Tekan nama provinsi untuk membuka detail budayanya. Pas untuk
              layar HP yang sempit.
            </p>

            {(Object.keys(groupedByRegion) as ProvinceRegion[])
              .filter((r) => groupedByRegion[r].length > 0)
              .map((region) => (
                <div key={region} className="mt-7">
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-300/85 sm:text-xs sm:tracking-[0.32em]">
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${regionDotClass[region]}`}
                    />
                    {provinceRegionLabels[region]}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
                    {groupedByRegion[region].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setActive(p)}
                        className="group flex flex-col items-start gap-0.5 rounded-xl border border-gold-500/20 bg-coffee-800/60 px-3 py-2.5 text-left transition-all hover:-translate-y-0.5 hover:border-gold-400/60 hover:bg-coffee-800/80 hover:shadow-[0_18px_40px_-20px_rgba(212,162,78,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-coffee-950 sm:px-4 sm:py-3"
                      >
                        <span className="font-display text-sm text-cream group-hover:text-gold-200 sm:text-base">
                          {p.name}
                        </span>
                        <span className="text-[10px] text-parchment/65 sm:text-xs">
                          Ibukota: {p.capital}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </Reveal>
      </div>

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        ariaLabel={active ? `Detail budaya ${active.name}` : "Detail provinsi"}
      >
        {active && <ProvinceModalBody province={active} />}
      </Modal>
    </section>
  );
}

function ProvinceModalBody({ province }: { province: ProvinceCulture }) {
  const items: { label: string; value: string }[] = [
    { label: "Tarian khas", value: province.dance },
    { label: "Alat musik", value: province.music },
    { label: "Rumah adat", value: province.house },
    { label: "Pakaian adat", value: province.attire },
    { label: "Makanan khas", value: province.food },
  ];
  if (province.performingArt) {
    items.push({ label: "Seni pertunjukan", value: province.performingArt });
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-coffee-700 via-coffee-800 to-coffee-950 sm:h-72 md:h-80">
        {(() => {
          const src = resolveProvincePhoto(province);
          return src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={province.imageAlt ?? province.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ProvinceCrest region={province.region} />
            </div>
          );
        })()}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/45 to-transparent" />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
        />
      </div>

      <div className="space-y-5 px-5 py-6 sm:px-8 sm:py-8">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold-300/90 sm:text-xs">
            {provinceRegionLabels[province.region]} · Ibukota {province.capital}
          </p>
          <h2 className="mt-1.5 font-display text-3xl leading-tight text-cream sm:text-4xl">
            {province.name}
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-parchment/85 sm:text-base">
          {province.description}
        </p>

        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((it) => (
            <li
              key={it.label}
              className="flex flex-col gap-0.5 border-l-2 border-gold-500/40 pl-3 sm:pl-4"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-300/85 sm:text-[11px]">
                {it.label}
              </span>
              <span className="text-sm text-cream sm:text-base">
                {it.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProvinceCrest({ region }: { region: ProvinceRegion }) {
  const colorClass = regionDotClass[region].replace("/70", "/90");
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="h-32 w-32 opacity-90 sm:h-40 sm:w-40"
      aria-hidden
    >
      <circle
        cx="60"
        cy="60"
        r="46"
        className={`${colorClass}`}
        fill="currentColor"
        fillOpacity="0.25"
      />
      <circle
        cx="60"
        cy="60"
        r="36"
        fill="none"
        className="stroke-gold-400/70"
        strokeWidth="1.4"
      />
      <path
        d="M60 28 C70 44, 78 50, 90 60 C78 70, 70 76, 60 92 C50 76, 42 70, 30 60 C42 50, 50 44, 60 28 Z"
        fill="none"
        className="stroke-gold-300/85"
        strokeWidth="1.6"
      />
      <circle cx="60" cy="60" r="3" className="fill-gold-300" />
    </svg>
  );
}
