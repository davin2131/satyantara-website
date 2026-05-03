#!/usr/bin/env tsx
import "dotenv/config";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.warn(
    "[sanity-sync] NEXT_PUBLIC_SANITY_PROJECT_ID tidak diset, lewati sync (pakai data yang ada di Git).",
  );
  process.exit(0);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: !token,
});

type StorySrc = {
  slug: { current: string };
  title: string;
  subtitle?: string;
  price: string;
  description: string;
  activities?: { name: string; detail: string }[];
  imageUrl?: string;
  imageAlt?: string;
  marketplaceUrl?: string;
  marketplaceLabel?: string;
  requiresDate?: boolean;
  availableDays?: string[];
  bookingWeeks?: number;
};

type RecSrc = {
  slug: { current: string };
  title: string;
  price: string;
  imageUrl?: string;
  imageAlt?: string;
  marketplaceUrl?: string;
  marketplaceLabel?: string;
};

type MitraSrc = {
  slug: { current: string };
  name: string;
  price: string;
  pricePer?: string;
  badge?: string;
  tone: string;
  description: string;
  highlights?: string[];
  imageUrl?: string;
  imageAlt?: string;
  marketplaceUrl?: string;
  marketplaceLabel?: string;
};

type SlideSrc = {
  title: string;
  caption?: string;
  imageUrl?: string;
  imageAlt?: string;
};

type GalleryItemSrc = {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
};

type WayangEntrySrc = {
  slug?: { current?: string };
  name: string;
  alias?: string;
  category: "pandawa" | "kurawa" | "punakawan" | "dewa-pahlawan";
  origin: "mahabharata" | "ramayana" | "lain";
  weapon?: string;
  summary: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
};

type ProvinceCultureSrc = {
  code: string;
  name?: string;
  slug?: { current?: string };
  capital?: string;
  region?:
    | "sumatera"
    | "jawa"
    | "bali-nusa-tenggara"
    | "kalimantan"
    | "sulawesi"
    | "maluku"
    | "papua";
  dance?: string;
  music?: string;
  house?: string;
  attire?: string;
  food?: string;
  performingArt?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
};

type SiteSettingsSrc = {
  hero?: {
    eyebrow?: string;
    tagline?: string;
    primaryCta?: string;
    secondaryCta?: string;
  };
  aboutBrief?: {
    eyebrow?: string;
    headingLine1?: string;
    headingLine2?: string;
    headingLine3?: string;
    body?: string;
    stats?: { value: string; label: string }[];
    mediaImageUrl?: string;
    mediaImageAlt?: string;
    mediaVideoUrl?: string;
  };
  tentangKami?: {
    eyebrow?: string;
    heading?: string;
    body?: string;
    valueCards?: { icon: string; title: string; text: string }[];
  };
  footer?: {
    callout?: string;
    socials?: { platform: string; href: string }[];
    contacts?: {
      kind: string;
      label: string;
      value: string;
      href: string;
    }[];
    copyright?: string;
    tagline?: string;
  };
  navbar?: {
    ctaLabel?: string;
    ctaHref?: string;
    exploreLabel?: string;
    exploreEyebrow?: string;
    exploreTitle?: string;
    exploreBody?: string;
    exploreFooterNote?: string;
    exploreFooterCta?: string;
  };
  faqPage?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    ctaEyebrow?: string;
    ctaTitle?: string;
    ctaBody?: string;
  };
  jadwalPage?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    emptyTitle?: string;
    emptyBody?: string;
  };
};

type FaqGroupSrc = {
  title: string;
  order?: number;
  items?: { question: string; answer: string }[];
};

const QUERY = /* groq */ `{
  "stories": *[_type == "story" && !(_id in path("drafts.**"))] | order(order asc, _createdAt asc){
    "slug": slug,
    title,
    subtitle,
    price,
    description,
    activities[]{name, detail},
    marketplaceUrl,
    marketplaceLabel,
    requiresDate,
    availableDays,
    bookingWeeks,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  },
  "recommendations": *[_type == "recommendation" && !(_id in path("drafts.**"))] | order(order asc, _createdAt asc){
    "slug": slug,
    title,
    price,
    marketplaceUrl,
    marketplaceLabel,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  },
  "mitraProducts": *[_type == "mitra" && !(_id in path("drafts.**"))] | order(order asc, _createdAt asc){
    "slug": slug,
    name,
    price,
    pricePer,
    badge,
    tone,
    description,
    highlights,
    marketplaceUrl,
    marketplaceLabel,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  },
  "heroSlides": *[_type == "heroSlide" && !(_id in path("drafts.**"))] | order(order asc, _createdAt asc){
    title,
    caption,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  },
  "galleryItems": *[_type == "galleryItem" && !(_id in path("drafts.**"))] | order(order asc, _createdAt asc){
    title,
    description,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  },
  "wayangEntries": *[_type == "wayangEntry" && !(_id in path("drafts.**"))] | order(order asc, _createdAt asc){
    "slug": slug,
    name,
    alias,
    category,
    origin,
    weapon,
    summary,
    description,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  },
  "provinceCultures": *[_type == "provinceCulture" && !(_id in path("drafts.**"))]{
    code,
    name,
    "slug": slug,
    capital,
    region,
    dance,
    music,
    house,
    attire,
    food,
    performingArt,
    description,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  },
  "events": *[_type == "event" && !(_id in path("drafts.**"))] | order(startDate asc){
    "slug": coalesce(slug.current, _id),
    title,
    category,
    startDate,
    endDate,
    location,
    description,
    registrationUrl,
    isFeatured,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  },
  "siteSettings": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    hero{eyebrow, tagline, primaryCta, secondaryCta},
    aboutBrief{
      eyebrow, headingLine1, headingLine2, headingLine3, body,
      stats[]{value, label},
      "mediaImageUrl": mediaImage.asset->url,
      "mediaImageAlt": mediaImage.alt,
      mediaVideoUrl
    },
    tentangKami{
      eyebrow, heading, body,
      valueCards[]{icon, title, text}
    },
    footer{
      callout,
      socials[]{platform, href},
      contacts[]{kind, label, value, href},
      copyright, tagline
    },
    navbar{
      ctaLabel, ctaHref, exploreLabel, exploreEyebrow,
      exploreTitle, exploreBody, exploreFooterNote, exploreFooterCta
    },
    faqPage{eyebrow, title, subtitle, ctaEyebrow, ctaTitle, ctaBody},
    jadwalPage{eyebrow, title, subtitle, emptyTitle, emptyBody}
  },
  "faqGroups": *[_type == "faqGroup" && !(_id in path("drafts.**"))] | order(order asc, _createdAt asc){
    title,
    order,
    items[]{question, answer}
  }
}`;

function lit(s: unknown) {
  return JSON.stringify(s ?? "");
}

function buildProductsTs(data: {
  stories: StorySrc[];
  recommendations: RecSrc[];
  mitraProducts: MitraSrc[];
  heroSlides: SlideSrc[];
}) {
  const imgLines = (u?: string, a?: string) => {
    const parts: string[] = [];
    if (u) parts.push(`    imageUrl: ${lit(u)},`);
    if (a) parts.push(`    imageAlt: ${lit(a)},`);
    return parts.join("\n");
  };

  const optLine = (key: string, val?: string) =>
    val ? `    ${key}: ${lit(val)},` : "";

  const stories = data.stories
    .map(
      (s) => {
        const dateLines: string[] = [];
        if (typeof s.requiresDate === "boolean") {
          dateLines.push(`    requiresDate: ${s.requiresDate ? "true" : "false"},`);
        }
        if (Array.isArray(s.availableDays) && s.availableDays.length > 0) {
          dateLines.push(
            `    availableDays: [${s.availableDays.map((d) => lit(d)).join(", ")}],`,
          );
        }
        if (typeof s.bookingWeeks === "number") {
          dateLines.push(`    bookingWeeks: ${s.bookingWeeks},`);
        }
        return `  {
    slug: ${lit(s.slug?.current)},
    title: ${lit(s.title)},
    subtitle: ${lit(s.subtitle)},
    price: ${lit(s.price)},
    description: ${lit(s.description)},
${imgLines(s.imageUrl, s.imageAlt)}
${optLine("marketplaceUrl", s.marketplaceUrl)}
${optLine("marketplaceLabel", s.marketplaceLabel)}
${dateLines.join("\n")}
    activities: [
${(s.activities ?? [])
  .map(
    (a) => `      { name: ${lit(a.name)}, detail: ${lit(a.detail)} },`,
  )
  .join("\n")}
    ],
  },`;
      },
    )
    .join("\n");

  const recs = data.recommendations
    .map(
      (r) => `  {
    slug: ${lit(r.slug?.current)},
    title: ${lit(r.title)},
    price: ${lit(r.price)},
${imgLines(r.imageUrl, r.imageAlt)}
${optLine("marketplaceUrl", r.marketplaceUrl)}
${optLine("marketplaceLabel", r.marketplaceLabel)}
  },`,
    )
    .join("\n");

  const mitra = data.mitraProducts
    .map(
      (m) => `  {
    slug: ${lit(m.slug?.current)},
    name: ${lit(m.name)},
    price: ${lit(m.price)},
    ${m.pricePer ? `pricePer: ${lit(m.pricePer)},` : ""}
    ${m.badge ? `badge: ${lit(m.badge)},` : ""}
    tone: ${lit(m.tone)} as MitraProduct["tone"],
    description: ${lit(m.description)},
${imgLines(m.imageUrl, m.imageAlt)}
${optLine("marketplaceUrl", m.marketplaceUrl)}
${optLine("marketplaceLabel", m.marketplaceLabel)}
    highlights: [
${(m.highlights ?? []).map((h) => `      ${lit(h)},`).join("\n")}
    ],
  },`,
    )
    .join("\n");

  const slides = data.heroSlides
    .map(
      (s) => `  {
    title: ${lit(s.title)},
    caption: ${lit(s.caption)},
${imgLines(s.imageUrl, s.imageAlt)}
  },`,
    )
    .join("\n");

  return `// AUTO-GENERATED FROM SANITY. Edit content via Sanity Studio.
// Run \`npm run sanity:sync\` to refresh from Sanity.

export type WeekDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type Story = {
  slug: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  activities: { name: string; detail: string }[];
  imageUrl?: string;
  imageAlt?: string;
  marketplaceUrl?: string;
  marketplaceLabel?: string;
  requiresDate?: boolean;
  availableDays?: WeekDay[];
  bookingWeeks?: number;
};

export type Recommendation = {
  slug: string;
  title: string;
  price: string;
  imageUrl?: string;
  imageAlt?: string;
  marketplaceUrl?: string;
  marketplaceLabel?: string;
};

export type MitraProduct = {
  slug: string;
  name: string;
  price: string;
  pricePer?: string;
  badge?: string;
  tone: "amber" | "rose" | "emerald" | "indigo" | "ochre" | "rust";
  description: string;
  highlights: string[];
  imageUrl?: string;
  imageAlt?: string;
  marketplaceUrl?: string;
  marketplaceLabel?: string;
};

export type HeroSlide = {
  title: string;
  caption: string;
  imageUrl?: string;
  imageAlt?: string;
};

export const stories: Story[] = [
${stories}
];

export const recommendations: Recommendation[] = [
${recs}
];

export const mitraProducts: MitraProduct[] = [
${mitra}
];

export const heroSlides: HeroSlide[] = [
${slides}
];
`;
}

function buildGalleryTs(items: GalleryItemSrc[]) {
  const imgLines = (u?: string, a?: string) => {
    const parts: string[] = [];
    if (u) parts.push(`    imageUrl: ${lit(u)},`);
    if (a) parts.push(`    imageAlt: ${lit(a)},`);
    return parts.join("\n");
  };

  const entries = items
    .map(
      (g) => `  {
    title: ${lit(g.title)},
    description: ${lit(g.description)},
${imgLines(g.imageUrl, g.imageAlt)}
  },`,
    )
    .join("\n");

  return `// AUTO-GENERATED FROM SANITY. Edit content via Sanity Studio.
// Run \`npm run sanity:sync\` to refresh from Sanity.

export type GalleryItem = {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
};

export const galleryItems: GalleryItem[] = [
${entries}
];
`;
}

type EventSrc = {
  slug?: string;
  title?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  description?: string;
  registrationUrl?: string;
  isFeatured?: boolean;
  imageUrl?: string;
  imageAlt?: string;
};

function buildEventsTs(items: EventSrc[]) {
  const optLine = (key: string, val?: string) =>
    val ? `    ${key}: ${lit(val)},` : "";

  const entries = items
    .filter((e) => e.title && e.startDate && e.location && e.description)
    .map((e) => {
      const parts = [
        `    slug: ${lit(e.slug ?? e.title!.toLowerCase().replace(/[^a-z0-9]+/g, "-"))},`,
        `    title: ${lit(e.title!)},`,
        `    category: ${lit(e.category ?? "lainnya")},`,
        `    startDate: ${lit(e.startDate!)},`,
        optLine("endDate", e.endDate),
        `    location: ${lit(e.location!)},`,
        `    description: ${lit(e.description!)},`,
        optLine("registrationUrl", e.registrationUrl),
        e.isFeatured ? `    isFeatured: true,` : "",
        optLine("imageUrl", e.imageUrl),
        optLine("imageAlt", e.imageAlt),
      ].filter(Boolean);
      return `  {\n${parts.join("\n")}\n  },`;
    })
    .join("\n");

  return `// AUTO-GENERATED FROM SANITY. Edit content via Sanity Studio (collection "Jadwal Acara").
// Run \`npm run sanity:sync\` to refresh from Sanity.

export type EventCategory =
  | "pertunjukan"
  | "workshop"
  | "festival"
  | "diskusi"
  | "lainnya";

export type SatyantaraEvent = {
  slug: string;
  title: string;
  category: EventCategory;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  registrationUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  isFeatured?: boolean;
};

export const eventCategoryLabels: Record<EventCategory, string> = {
  pertunjukan: "Pertunjukan Wayang",
  workshop: "Workshop",
  festival: "Festival",
  diskusi: "Diskusi & Talkshow",
  lainnya: "Lainnya",
};

export const events: SatyantaraEvent[] = [
${entries}
];
`;
}

function buildWayangTs(items: WayangEntrySrc[]) {
  const optLine = (key: string, val?: string) =>
    val ? `    ${key}: ${lit(val)},` : "";

  const entries = items
    .map((w) => {
      const parts = [
        `    slug: ${lit(w.slug?.current)},`,
        `    name: ${lit(w.name)},`,
        optLine("alias", w.alias),
        `    category: ${lit(w.category)},`,
        `    origin: ${lit(w.origin)},`,
        optLine("weapon", w.weapon),
        `    summary: ${lit(w.summary)},`,
        `    description: ${lit(w.description)},`,
        optLine("imageUrl", w.imageUrl),
        optLine("imageAlt", w.imageAlt),
      ].filter(Boolean);
      return `  {\n${parts.join("\n")}\n  },`;
    })
    .join("\n");

  return `// AUTO-GENERATED FROM SANITY. Edit content via Sanity Studio.
// Run \`npm run sanity:sync\` to refresh from Sanity.

export type WayangCategory =
  | "pandawa"
  | "kurawa"
  | "punakawan"
  | "dewa-pahlawan";

export type WayangOrigin = "mahabharata" | "ramayana" | "lain";

export type WayangEntry = {
  slug: string;
  name: string;
  alias?: string;
  category: WayangCategory;
  origin: WayangOrigin;
  weapon?: string;
  summary: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
};

export const wayangCategoryLabels: Record<WayangCategory, string> = {
  pandawa: "Pandawa",
  kurawa: "Kurawa",
  punakawan: "Punakawan",
  "dewa-pahlawan": "Dewa & Pahlawan",
};

export const wayangOriginLabels: Record<WayangOrigin, string> = {
  mahabharata: "Mahabharata",
  ramayana: "Ramayana",
  lain: "Lain-lain",
};

export const wayangEntries: WayangEntry[] = [
${entries}
];
`;
}

function buildProvincesTs(items: ProvinceCultureSrc[]) {
  const overrides = items.filter((p) => p.code);
  if (overrides.length === 0) {
    return `// AUTO-GENERATED FROM SANITY. Edit content via Sanity Studio.
// Run \`npm run sanity:sync\` to refresh from Sanity.
// Seed (default 38 provinsi) berasal dari \`provincesSeed.ts\`.

export {
  provinces,
  provincesById,
  provinceRegionLabels,
} from "./provincesSeed";
export type { ProvinceCulture, ProvinceRegion } from "./provincesSeed";
`;
  }

  const overridesObj = overrides
    .map((p) => {
      const fields: string[] = [];
      const push = (k: string, v?: string) => {
        if (v !== undefined && v !== null && v !== "") {
          fields.push(`    ${k}: ${lit(v)},`);
        }
      };
      push("name", p.name);
      push("slug", p.slug?.current);
      push("capital", p.capital);
      push("region", p.region);
      push("dance", p.dance);
      push("music", p.music);
      push("house", p.house);
      push("attire", p.attire);
      push("food", p.food);
      push("performingArt", p.performingArt);
      push("description", p.description);
      push("imageUrl", p.imageUrl);
      push("imageAlt", p.imageAlt);
      return `  ${lit(p.code)}: {\n${fields.join("\n")}\n  },`;
    })
    .join("\n");

  return `// AUTO-GENERATED FROM SANITY. Edit content via Sanity Studio.
// Run \`npm run sanity:sync\` to refresh from Sanity.
// Seed (default 38 provinsi) berasal dari \`provincesSeed.ts\`,
// kemudian di-override dengan data dari Sanity Studio per kode provinsi.

import {
  provinces as seedProvinces,
  provinceRegionLabels,
  type ProvinceCulture,
  type ProvinceRegion,
} from "./provincesSeed";

export type { ProvinceCulture, ProvinceRegion };
export { provinceRegionLabels };

const overrides: Record<string, Partial<ProvinceCulture>> = {
${overridesObj}
};

export const provinces: ProvinceCulture[] = seedProvinces.map((seed) => {
  const ovr = overrides[seed.id];
  if (!ovr) return seed;
  return { ...seed, ...ovr };
});

export const provincesById: Record<string, ProvinceCulture> = Object.fromEntries(
  provinces.map((p) => [p.id, p]),
);
`;
}

function buildSiteTs(s: SiteSettingsSrc | undefined) {
  const v = s ?? {};
  return `// AUTO-GENERATED FROM SANITY. Edit content via Sanity Studio.
// Run \`npm run sanity:sync\` to refresh from Sanity.

export type SiteCopy = {
  hero: {
    eyebrow: string;
    tagline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  aboutBrief: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    headingLine3: string;
    body: string;
    stats: { value: string; label: string }[];
    mediaImageUrl?: string;
    mediaImageAlt?: string;
    mediaVideoUrl?: string;
  };
  tentangKami: {
    eyebrow: string;
    heading: string;
    body: string;
    valueCards: { icon: "wayang" | "topeng" | "gamelan"; title: string; text: string }[];
  };
  footer: {
    callout: string;
    socials: { platform: "youtube" | "telegram" | "instagram" | "facebook"; href: string }[];
    contacts: { kind: "whatsapp" | "email" | "sanggar"; label: string; value: string; href: string }[];
    copyright: string;
    tagline: string;
  };
  navbar: {
    ctaLabel: string;
    ctaHref: string;
    exploreLabel: string;
    exploreEyebrow: string;
    exploreTitle: string;
    exploreBody: string;
    exploreFooterNote: string;
    exploreFooterCta: string;
  };
  faqPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaBody: string;
  };
  jadwalPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyBody: string;
  };
};

export const siteCopy: SiteCopy = ${JSON.stringify(
    {
      hero: {
        eyebrow: v.hero?.eyebrow ?? "",
        tagline: v.hero?.tagline ?? "",
        primaryCta: v.hero?.primaryCta ?? "",
        secondaryCta: v.hero?.secondaryCta ?? "",
      },
      aboutBrief: {
        eyebrow: v.aboutBrief?.eyebrow ?? "",
        headingLine1: v.aboutBrief?.headingLine1 ?? "",
        headingLine2: v.aboutBrief?.headingLine2 ?? "",
        headingLine3: v.aboutBrief?.headingLine3 ?? "",
        body: v.aboutBrief?.body ?? "",
        stats: v.aboutBrief?.stats ?? [],
        ...(v.aboutBrief?.mediaImageUrl ? { mediaImageUrl: v.aboutBrief.mediaImageUrl } : {}),
        ...(v.aboutBrief?.mediaImageAlt ? { mediaImageAlt: v.aboutBrief.mediaImageAlt } : {}),
        ...(v.aboutBrief?.mediaVideoUrl ? { mediaVideoUrl: v.aboutBrief.mediaVideoUrl } : {}),
      },
      tentangKami: {
        eyebrow: v.tentangKami?.eyebrow ?? "",
        heading: v.tentangKami?.heading ?? "",
        body: v.tentangKami?.body ?? "",
        valueCards: v.tentangKami?.valueCards ?? [],
      },
      footer: {
        callout: v.footer?.callout ?? "",
        socials: v.footer?.socials ?? [],
        contacts: v.footer?.contacts ?? [],
        copyright: v.footer?.copyright ?? "",
        tagline: v.footer?.tagline ?? "",
      },
      navbar: {
        ctaLabel: v.navbar?.ctaLabel ?? "Pesan via WhatsApp",
        ctaHref: v.navbar?.ctaHref ?? "https://wa.me/6287862181294",
        exploreLabel: v.navbar?.exploreLabel ?? "Eksplorasi",
        exploreEyebrow: v.navbar?.exploreEyebrow ?? "Eksplorasi Budaya",
        exploreTitle:
          v.navbar?.exploreTitle ??
          "Cerita Wayang & Solo,\nterangkum dalam\nsatu eksplorasi.",
        exploreBody:
          v.navbar?.exploreBody ??
          "Pilih pintu masuk ke konten budaya SATYANTARA — dari arsip foto sanggar, kisah tokoh wayang Pandawa & Kurawa, hingga peta budaya 38 provinsi.",
        exploreFooterNote:
          v.navbar?.exploreFooterNote ??
          "Tahukah kamu? Wayang Kulit diakui UNESCO sejak 2003.",
        exploreFooterCta: v.navbar?.exploreFooterCta ?? "Pesan workshop",
      },
      faqPage: {
        eyebrow: v.faqPage?.eyebrow ?? "Pertanyaan Umum",
        title: v.faqPage?.title ?? "FAQ",
        subtitle:
          v.faqPage?.subtitle ??
          "Hal-hal yang paling sering ditanyakan Teman Satya — dari paket lakon, jadwal workshop, pembayaran, sampai cara kerjasama.",
        ctaEyebrow: v.faqPage?.ctaEyebrow ?? "Masih Ada Pertanyaan?",
        ctaTitle: v.faqPage?.ctaTitle ?? "Hubungi Kami Langsung",
        ctaBody:
          v.faqPage?.ctaBody ??
          "Tim SATYANTARA siap membantu lewat WhatsApp atau email. Kami biasanya membalas dalam 1-2 hari kerja.",
      },
      jadwalPage: {
        eyebrow: v.jadwalPage?.eyebrow ?? "Jadwal Acara",
        title:
          v.jadwalPage?.title ?? "Pertunjukan, Workshop & Festival",
        subtitle:
          v.jadwalPage?.subtitle ??
          "Kalender pertunjukan wayang, workshop, festival budaya, dan diskusi yang dijadwalkan SATYANTARA. Pilih acara, daftar via WhatsApp atau link resmi.",
        emptyTitle:
          v.jadwalPage?.emptyTitle ?? "Belum ada acara terjadwal",
        emptyBody:
          v.jadwalPage?.emptyBody ??
          "Tim SATYANTARA sedang menyusun jadwal terbaru. Sementara itu, Anda bisa hubungi kami langsung untuk request workshop privat atau pertunjukan grup.",
      },
    },
    null,
    2,
  )};
`;
}

function buildFaqTs(groups: FaqGroupSrc[]): string {
  // Kalau Sanity belum ada faqGroup yang dipublish, fall back ke seed default
  // supaya halaman /faq tidak kosong sebelum admin isi data.
  const ordered = (Array.isArray(groups) ? groups : [])
    .filter((g) => g && g.title && Array.isArray(g.items) && g.items.length > 0)
    .map((g, i) => ({
      title: g.title,
      order: typeof g.order === "number" ? g.order : (i + 1) * 10,
      items: (g.items ?? [])
        .filter((it) => it && it.question && it.answer)
        .map((it) => ({ q: it.question, a: it.answer })),
    }))
    .sort((a, b) => a.order - b.order);

  const groupsLiteral =
    ordered.length > 0
      ? JSON.stringify(ordered, null, 2)
      : `[
  {
    "title": "Tentang SATYANTARA",
    "order": 10,
    "items": [
      {
        "q": "Apa itu SATYANTARA?",
        "a": "SATYANTARA adalah brand budaya yang lahir dari Solo (Surakarta). Kami merangkai cerita Wayang dan kearifan Jawa menjadi pengalaman edukatif yang ramah anak muda — dari workshop, lakon pertunjukan, sampai produk kerajinan dari sanggar mitra."
      },
      {
        "q": "Siapa yang bisa ikut workshop SATYANTARA?",
        "a": "Semua usia, terutama remaja, mahasiswa, dan keluarga. Workshop kami didesain supaya mudah diikuti pemula tanpa perlu latar belakang seni — cukup bawa rasa ingin tahu."
      }
    ]
  }
]`;

  return `// AUTO-GENERATED FROM SANITY. Edit content via Sanity Studio.
// FAQ content: collection "FAQ - Pertanyaan Umum" (faqGroup documents).
// Page hero text: "Setting Halaman" -> "Halaman FAQ".
// Run \`npm run sanity:sync\` to refresh from Sanity.

export type FaqItem = {
  q: string;
  a: string;
};

export type FaqGroup = {
  title: string;
  order: number;
  items: FaqItem[];
};

export const faqGroups: FaqGroup[] = ${groupsLiteral};
`;
}

async function main() {
  console.log(`[sanity-sync] fetching from project ${projectId}/${dataset}…`);
  const data = await client.fetch(QUERY);

  const productsPath = path.join(ROOT, "src/data/products.ts");
  const sitePath = path.join(ROOT, "src/data/site.ts");
  const galleryPath = path.join(ROOT, "src/data/gallery.ts");
  const wayangPath = path.join(ROOT, "src/data/wayang.ts");

  writeFileSync(productsPath, buildProductsTs(data), "utf8");
  console.log(`[sanity-sync] wrote ${productsPath}`);

  writeFileSync(sitePath, buildSiteTs(data.siteSettings), "utf8");
  console.log(`[sanity-sync] wrote ${sitePath}`);

  writeFileSync(galleryPath, buildGalleryTs(data.galleryItems ?? []), "utf8");
  console.log(`[sanity-sync] wrote ${galleryPath}`);

  writeFileSync(wayangPath, buildWayangTs(data.wayangEntries ?? []), "utf8");
  console.log(`[sanity-sync] wrote ${wayangPath}`);

  const provincesPath = path.join(ROOT, "src/data/provinces.ts");
  writeFileSync(
    provincesPath,
    buildProvincesTs(data.provinceCultures ?? []),
    "utf8",
  );
  console.log(`[sanity-sync] wrote ${provincesPath}`);

  const eventsPath = path.join(ROOT, "src/data/events.ts");
  writeFileSync(eventsPath, buildEventsTs(data.events ?? []), "utf8");
  console.log(`[sanity-sync] wrote ${eventsPath}`);

  // FAQ: hanya overwrite kalau Sanity sudah punya minimal 1 faqGroup yang valid.
  // Kalau belum ada, biarkan seed default di src/data/faq.ts.
  const faqList = (data.faqGroups ?? []) as FaqGroupSrc[];
  const hasFaq =
    Array.isArray(faqList) &&
    faqList.some(
      (g) => g && g.title && Array.isArray(g.items) && g.items.length > 0,
    );
  if (hasFaq) {
    const faqPath = path.join(ROOT, "src/data/faq.ts");
    writeFileSync(faqPath, buildFaqTs(faqList), "utf8");
    console.log(`[sanity-sync] wrote ${faqPath}`);
  } else {
    console.log(
      "[sanity-sync] no faqGroup published yet — keeping existing seed di src/data/faq.ts",
    );
  }

  console.log("[sanity-sync] done.");
}

main().catch((err) => {
  console.error("[sanity-sync] failed:", err);
  process.exit(1);
});
