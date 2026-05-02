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
};

type RecSrc = {
  slug: { current: string };
  title: string;
  price: string;
  imageUrl?: string;
  imageAlt?: string;
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
};

type SlideSrc = {
  title: string;
  caption?: string;
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
};

const QUERY = /* groq */ `{
  "stories": *[_type == "story"] | order(order asc, _createdAt asc){
    "slug": slug,
    title,
    subtitle,
    price,
    description,
    activities[]{name, detail},
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  },
  "recommendations": *[_type == "recommendation"] | order(order asc, _createdAt asc){
    "slug": slug,
    title,
    price,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  },
  "mitraProducts": *[_type == "mitra"] | order(order asc, _createdAt asc){
    "slug": slug,
    name,
    price,
    pricePer,
    badge,
    tone,
    description,
    highlights,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  },
  "heroSlides": *[_type == "heroSlide"] | order(order asc, _createdAt asc){
    title,
    caption,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  },
  "siteSettings": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    hero{eyebrow, tagline, primaryCta, secondaryCta},
    aboutBrief{
      eyebrow, headingLine1, headingLine2, headingLine3, body,
      stats[]{value, label}
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
    }
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

  const stories = data.stories
    .map(
      (s) => `  {
    slug: ${lit(s.slug?.current)},
    title: ${lit(s.title)},
    subtitle: ${lit(s.subtitle)},
    price: ${lit(s.price)},
    description: ${lit(s.description)},
${imgLines(s.imageUrl, s.imageAlt)}
    activities: [
${(s.activities ?? [])
  .map(
    (a) => `      { name: ${lit(a.name)}, detail: ${lit(a.detail)} },`,
  )
  .join("\n")}
    ],
  },`,
    )
    .join("\n");

  const recs = data.recommendations
    .map(
      (r) => `  {
    slug: ${lit(r.slug?.current)},
    title: ${lit(r.title)},
    price: ${lit(r.price)},
${imgLines(r.imageUrl, r.imageAlt)}
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

export type Story = {
  slug: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  activities: { name: string; detail: string }[];
  imageUrl?: string;
  imageAlt?: string;
};

export type Recommendation = {
  slug: string;
  title: string;
  price: string;
  imageUrl?: string;
  imageAlt?: string;
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
    },
    null,
    2,
  )};
`;
}

async function main() {
  console.log(`[sanity-sync] fetching from project ${projectId}/${dataset}…`);
  const data = await client.fetch(QUERY);

  const productsPath = path.join(ROOT, "src/data/products.ts");
  const sitePath = path.join(ROOT, "src/data/site.ts");

  writeFileSync(productsPath, buildProductsTs(data), "utf8");
  console.log(`[sanity-sync] wrote ${productsPath}`);

  writeFileSync(sitePath, buildSiteTs(data.siteSettings), "utf8");
  console.log(`[sanity-sync] wrote ${sitePath}`);

  console.log("[sanity-sync] done.");
}

main().catch((err) => {
  console.error("[sanity-sync] failed:", err);
  process.exit(1);
});
