#!/usr/bin/env node
import "dotenv/config";
import { createClient } from "@sanity/client";
import {
  stories,
  recommendations,
  mitraProducts,
  heroSlides,
} from "../src/data/products";
import { galleryItems } from "../src/data/gallery";
import { wayangEntries } from "../src/data/wayang";
import { provinces } from "../src/data/provincesSeed";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in env.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

function k(prefix, slug) {
  return `${prefix}.${slug}`;
}

async function seedStories() {
  console.log(`Seeding ${stories.length} stories…`);
  const tx = client.transaction();
  stories.forEach((s, i) => {
    tx.createOrReplace({
      _id: k("story", s.slug),
      _type: "story",
      order: i,
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      subtitle: s.subtitle,
      price: s.price,
      description: s.description,
      activities: s.activities.map((a) => ({
        _type: "object",
        name: a.name,
        detail: a.detail,
      })),
    });
  });
  await tx.commit();
}

async function seedRecommendations() {
  console.log(`Seeding ${recommendations.length} recommendations…`);
  const tx = client.transaction();
  recommendations.forEach((r, i) => {
    tx.createOrReplace({
      _id: k("recommendation", r.slug),
      _type: "recommendation",
      order: i,
      title: r.title,
      slug: { _type: "slug", current: r.slug },
      price: r.price,
    });
  });
  await tx.commit();
}

async function seedMitra() {
  console.log(`Seeding ${mitraProducts.length} mitra products…`);
  const tx = client.transaction();
  mitraProducts.forEach((m, i) => {
    tx.createOrReplace({
      _id: k("mitra", m.slug),
      _type: "mitra",
      order: i,
      name: m.name,
      slug: { _type: "slug", current: m.slug },
      price: m.price,
      pricePer: m.pricePer,
      badge: m.badge,
      tone: m.tone,
      description: m.description,
      highlights: m.highlights ?? [],
    });
  });
  await tx.commit();
}

async function seedHeroSlides() {
  console.log(`Seeding ${heroSlides.length} hero slides…`);
  const tx = client.transaction();
  heroSlides.forEach((h, i) => {
    const slug = `slide-${i + 1}`;
    tx.createOrReplace({
      _id: k("heroSlide", slug),
      _type: "heroSlide",
      order: i,
      title: h.title,
      caption: h.caption,
    });
  });
  await tx.commit();
}

async function seedSiteSettings() {
  console.log("Seeding siteSettings…");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    hero: {
      eyebrow: "Lakon Budaya Solo",
      tagline:
        "Ruang digital yang merangkai cerita Wayang dan kearifan Solo menjadi pengalaman, produk, dan kreasi yang siap menemani harimu.",
      primaryCta: "Jelajahi Cerita",
      secondaryCta: "Tentang Kami",
    },
    aboutBrief: {
      eyebrow: "Selamat Datang",
      headingLine1: "Satyantara",
      headingLine2: "Brand Budaya",
      headingLine3: "Indonesia.",
      body: "Halo, Sayners! Selamat datang di website digital kami. SATYANTARA hadir dan selalu siap untuk menemani hari harimu, mari lakukan aktivitas positif yang kaya akan pengetahuan. Isi hari hari mu dengan SATYANTARA.",
      stats: [
        { _type: "object", value: "12+", label: "Sanggar Mitra" },
        { _type: "object", value: "40+", label: "Lakon Cerita" },
        { _type: "object", value: "5K+", label: "Sayners" },
      ],
    },
    tentangKami: {
      eyebrow: "Akar Cerita Kami",
      heading: "TENTANG KAMI",
      body: "Di tengah kota Surakarta atau yang lebih dikenal dengan nama Solo, budaya menjadi denyut yang menghidupkan seluruh kegiatan masyarakat. Kota ini menjunjung tinggi nilai luhur Jawa yang terbentuk dari tata krama yang lembut, bahasa yang penuh makna, hingga kesenian tradisional yang tak pernah padam. Wayang Kulit, Blangkon, dan Topeng menjadi penanda kuat tentang betapa dalamnya akar budaya yang dijaga hingga kini. Pertunjukan yang mengangkat kisah Mahabharata dan Ramayana tidak hanya menyajikan keindahan visual, tetapi juga mengajak penonton memahami pesan hidup yang diwariskan leluhur. Peran dalang sebagai penjaga cerita membuat setiap pertunjukan memiliki kedalaman makna. Selain itu, berbagai tradisi seperti upacara adat, sajian kuliner khas, dan kegiatan komunitas memperlihatkan bagaimana budaya terus hidup dalam keseharian orang Solo.",
      valueCards: [
        {
          _type: "object",
          icon: "wayang",
          title: "Wayang & Dalang",
          text: "Setiap lakon dijaga oleh dalang sebagai penjaga cerita.",
        },
        {
          _type: "object",
          icon: "topeng",
          title: "Topeng & Blangkon",
          text: "Identitas Jawa yang dirawat antar generasi.",
        },
        {
          _type: "object",
          icon: "gamelan",
          title: "Gamelan & Tradisi",
          text: "Upacara dan sajian kuliner yang hidup setiap hari.",
        },
      ],
    },
    footer: {
      callout: "Ikuti Cerita Kami",
      socials: [
        { _type: "object", platform: "youtube", href: "#" },
        { _type: "object", platform: "telegram", href: "#" },
        { _type: "object", platform: "instagram", href: "#" },
        { _type: "object", platform: "facebook", href: "#" },
      ],
      contacts: [
        {
          _type: "object",
          kind: "whatsapp",
          label: "WhatsApp",
          value: "+62 8xx-xxxx-xxxx",
          href: "https://wa.me/",
        },
        {
          _type: "object",
          kind: "email",
          label: "Email",
          value: "hello@satyantara.id",
          href: "mailto:hello@satyantara.id",
        },
        {
          _type: "object",
          kind: "sanggar",
          label: "Sanggar",
          value: "Solo · Surakarta",
          href: "#",
        },
      ],
      copyright: "© SATYANTARA. Semua hak cipta dilindungi.",
      tagline: "Crafted in Solo · Indonesia",
    },
  });
}

async function seedGallery() {
  console.log(`Seeding ${galleryItems.length} gallery items…`);
  const tx = client.transaction();
  galleryItems.forEach((g, i) => {
    const slug = `gallery-${i + 1}`;
    tx.createOrReplace({
      _id: k("galleryItem", slug),
      _type: "galleryItem",
      order: i,
      title: g.title,
      description: g.description,
    });
  });
  await tx.commit();
}

async function seedWayang() {
  console.log(`Seeding ${wayangEntries.length} wayang entries…`);
  const tx = client.transaction();
  wayangEntries.forEach((w, i) => {
    tx.createOrReplace({
      _id: k("wayangEntry", w.slug),
      _type: "wayangEntry",
      order: i,
      name: w.name,
      ...(w.alias ? { alias: w.alias } : {}),
      slug: { _type: "slug", current: w.slug },
      category: w.category,
      origin: w.origin,
      ...(w.weapon ? { weapon: w.weapon } : {}),
      summary: w.summary,
      description: w.description,
    });
  });
  await tx.commit();
}

async function seedProvinces() {
  console.log(`Seeding ${provinces.length} province cultures…`);
  const tx = client.transaction();
  provinces.forEach((p) => {
    tx.createOrReplace({
      _id: k("provinceCulture", p.slug),
      _type: "provinceCulture",
      code: p.id,
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      capital: p.capital,
      region: p.region,
      dance: p.dance,
      music: p.music,
      house: p.house,
      attire: p.attire,
      food: p.food,
      performingArt: p.performingArt,
      description: p.description,
    });
  });
  await tx.commit();
}

async function main() {
  await seedStories();
  await seedRecommendations();
  await seedMitra();
  await seedHeroSlides();
  await seedGallery();
  await seedWayang();
  await seedProvinces();
  await seedSiteSettings();
  console.log("Seed selesai.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
