#!/usr/bin/env node
import "dotenv/config";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in env.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

/**
 * Helper: bangun ISO datetime untuk WIB (UTC+7).
 * iso(2026, 5, 29, 19, 0)  -> 2026-05-29T19:00:00+07:00
 */
function iso(y, m, d, hh = 0, mm = 0) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${y}-${pad(m)}-${pad(d)}T${pad(hh)}:${pad(mm)}:00+07:00`;
}

/**
 * Slug-friendly: lowercase, dashes, no special chars
 */
function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Acara berulang multi-hari → expand jadi N events terpisah, slug suffix tanggal.
 * Atau bisa juga 1 event aja dengan deskripsi "setiap Sabtu/Minggu" — kita pilih ini
 * supaya jumlah dokumen wajar (tidak 100+ event Mei 2026).
 */

// ── Daftar acara Mei 2026 (Solo) ──
const events = [
  // ── Poster 1/6 (image 1) ──
  {
    title: "Pertunjukan Ramayana",
    category: "pertunjukan",
    startDate: iso(2026, 5, 29, 19, 0),
    endDate: iso(2026, 5, 29, 22, 0),
    location: "Taman Balekambang, Solo",
    description:
      "Pertunjukan epos Ramayana di Taman Balekambang Solo. Saksikan kisah klasik Rama dan Sinta dalam balutan seni budaya khas Surakarta.",
    isFeatured: true,
  },
  {
    title: "Ramayana Penyelamatan Dewi Sinta & Fire Dance",
    category: "pertunjukan",
    startDate: iso(2026, 5, 2, 16, 30),
    endDate: iso(2026, 5, 2, 20, 0),
    location: "Solo Safari, Solo",
    description:
      "Pertunjukan Ramayana 'Penyelamatan Dewi Sinta' digabung dengan Fire Dance — setiap Sabtu & Minggu di Solo Safari pukul 16:30 - 20:00 WIB selama Mei 2026.",
  },
  {
    title: "Wayang Orang Sriwedari",
    category: "pertunjukan",
    startDate: iso(2026, 5, 4, 19, 30),
    endDate: iso(2026, 5, 4, 22, 0),
    location: "Gedung Wayang Orang Sriwedari, Solo",
    description:
      "Pertunjukan Wayang Orang rutin di Gedung Wayang Orang Sriwedari — setiap Senin sampai Sabtu pukul 19:30 WIB.",
  },
  {
    title: "Solo Is Solo",
    category: "festival",
    startDate: iso(2026, 5, 1, 18, 0),
    endDate: iso(2026, 5, 1, 22, 0),
    location: "Koridor Gatot Subroto, Solo",
    description:
      "Festival pertunjukan seni budaya 'Solo Is Solo' di Koridor Gatot Subroto — setiap Jumat sampai Minggu mulai pukul 18:00 WIB.",
  },
  {
    title: "Solo Car Free Day",
    category: "lainnya",
    startDate: iso(2026, 5, 3, 5, 0),
    endDate: iso(2026, 5, 3, 9, 0),
    location: "Jl. Slamet Riyadi, Solo",
    description:
      "Car Free Day rutin di sepanjang Jl. Slamet Riyadi — setiap Minggu pukul 05:00 - 09:00 WIB. Bebas dari kendaraan bermotor untuk olahraga, kuliner & seni jalanan.",
  },

  // ── Poster 2/6 (image 4) ──
  {
    title: "Mangkunegaran Makan Makan",
    category: "festival",
    startDate: iso(2026, 5, 1, 17, 0),
    endDate: iso(2026, 5, 3, 22, 0),
    location: "Pamedan Pura Mangkunegaran, Solo",
    description:
      "Festival kuliner di Pamedan Pura Mangkunegaran tanggal 1 - 3 Mei 2026. Sajian khas Mangkunegaran dan kuliner Solo dalam suasana keraton.",
  },
  {
    title: "Mangkunegaran Run",
    category: "lainnya",
    startDate: iso(2026, 5, 3, 5, 30),
    endDate: iso(2026, 5, 3, 10, 0),
    location: "Pamedan Pura Mangkunegaran, Solo",
    description:
      "Lomba lari Mangkunegaran Run yang diselenggarakan di Pamedan Pura Mangkunegaran pada tanggal 3 Mei 2026.",
  },
  {
    title: "Dwijoswara",
    category: "pertunjukan",
    startDate: iso(2026, 5, 2, 19, 0),
    endDate: iso(2026, 5, 2, 22, 0),
    location: "Pendapa Suryahamijaya SMKN 8 Surakarta",
    description:
      "Pagelaran Dwijoswara di Pendapa Suryahamijaya SMKN 8 Surakarta pada 2 Mei 2026.",
  },
  {
    title: "Wingspan 5 Volkswagen",
    category: "lainnya",
    startDate: iso(2026, 5, 2, 9, 0),
    endDate: iso(2026, 5, 3, 21, 0),
    location: "Solo Technopark, Solo",
    description:
      "Acara komunitas Volkswagen 'Wingspan 5' di Solo Technopark, 2 - 3 Mei 2026.",
  },
  {
    title: "Belajar di Museum — Pottery Class",
    category: "workshop",
    startDate: iso(2026, 5, 2, 9, 0),
    endDate: iso(2026, 5, 2, 12, 0),
    location: "Museum Radyapustaka Surakarta",
    description:
      "Kelas membuat tembikar (pottery class) untuk pengunjung Museum Radyapustaka — setiap Sabtu pukul 09:00 WIB di Mei 2026 (2, 9, 16, 23, 30 Mei).",
  },

  // ── Poster 3/6 (image 3) ──
  {
    title: "Solo Art Market",
    category: "festival",
    startDate: iso(2026, 5, 2, 9, 0),
    endDate: iso(2026, 5, 2, 17, 0),
    location: "Selasar Ngarsopuro, Solo",
    description:
      "Pasar seni dan kerajinan di Selasar Ngarsopuro — buka tanggal 2, 3, 17, 31 Mei 2026 pukul 09:00 - 17:00 WIB.",
  },
  {
    title: "Solo di Waktu Malam",
    category: "festival",
    startDate: iso(2026, 5, 2, 18, 0),
    endDate: iso(2026, 5, 2, 23, 0),
    location: "Koridor Ketandan, Solo",
    description:
      "Pesta kuliner & musik 'Solo di Waktu Malam' di Koridor Ketandan — setiap Sabtu (2, 9, 16, 23, 30 Mei 2026) pukul 18:00 - 23:00 WIB.",
  },
  {
    title: "Jazz Triwindu",
    category: "pertunjukan",
    startDate: iso(2026, 5, 4, 19, 0),
    endDate: iso(2026, 5, 4, 23, 0),
    location: "Selasar Ngarsopuro, Solo",
    description:
      "Pagelaran musik jazz outdoor 'Jazz Triwindu' di Selasar Ngarsopuro — setiap Senin (4, 11, 18, 25 Mei 2026) pukul 19:00 - 23:00 WIB.",
  },
  {
    title: "Ngarsopurock",
    category: "pertunjukan",
    startDate: iso(2026, 5, 5, 19, 0),
    endDate: iso(2026, 5, 5, 23, 0),
    location: "Selasar Ngarsopuro, Solo",
    description:
      "Festival musik rock 'Ngarsopurock' di Selasar Ngarsopuro — setiap Selasa (5, 12, 19, 26 Mei 2026) pukul 19:00 - 23:00 WIB.",
  },
  {
    title: "New BnR",
    category: "pertunjukan",
    startDate: iso(2026, 5, 6, 19, 0),
    endDate: iso(2026, 5, 6, 23, 0),
    location: "Selasar Ngarsopuro, Solo",
    description:
      "Pertunjukan musik 'New BnR' di Selasar Ngarsopuro — setiap Rabu (6, 13, 20, 27 Mei 2026) pukul 19:00 - 23:00 WIB.",
  },

  // ── Poster 4/6 (image 2) ──
  {
    title: "Keroncong Keprabon",
    category: "pertunjukan",
    startDate: iso(2026, 5, 7, 19, 0),
    endDate: iso(2026, 5, 7, 23, 0),
    location: "Selasar Ngarsopuro, Solo",
    description:
      "Pagelaran musik keroncong 'Keroncong Keprabon' di Selasar Ngarsopuro — setiap Kamis (7, 14, 21, 28 Mei 2026) pukul 19:00 - 23:00 WIB.",
  },
  {
    title: "Semarak Budaya Indonesia",
    category: "festival",
    startDate: iso(2026, 5, 8, 9, 0),
    endDate: iso(2026, 5, 9, 22, 0),
    location: "Balai Kota Surakarta",
    description:
      "Festival budaya 'Semarak Budaya Indonesia' di Balai Kota Surakarta — 8 sampai 9 Mei 2026.",
    isFeatured: true,
  },
  {
    title: "KaoemCraft #13",
    category: "festival",
    startDate: iso(2026, 5, 9, 9, 0),
    endDate: iso(2026, 5, 9, 17, 0),
    location: "Kampung Wisata Batik Kauman, Solo",
    description:
      "Pameran kerajinan dan workshop 'KaoemCraft #13' di Kampung Wisata Batik Kauman — 9 Mei 2026, pukul 09:00 - 17:00 WIB.",
  },
  {
    title: "Pesona Solo Culture & Heritage — Pertemuan FK Pokdarwis Jateng",
    category: "diskusi",
    startDate: iso(2026, 5, 9, 9, 0),
    endDate: iso(2026, 5, 10, 17, 0),
    location: "Solo",
    description:
      "Pertemuan Forum Komunikasi Pokdarwis Jateng dengan tema 'Pesona Solo Culture & Heritage' — 9 - 10 Mei 2026.",
  },
  {
    title: "Lomba Cerdas Cermat Museum",
    category: "lainnya",
    startDate: iso(2026, 5, 12, 8, 0),
    endDate: iso(2026, 5, 13, 16, 0),
    location: "Museum Radyapustaka Surakarta",
    description:
      "Lomba Cerdas Cermat Museum di Museum Radyapustaka — 12 - 13 Mei 2026 mulai pukul 08:00 WIB.",
  },
];

async function run() {
  console.log(`Seeding ${events.length} acara Mei 2026 ke Sanity…`);
  const tx = client.transaction();

  events.forEach((e) => {
    const slug = slugify(e.title);
    const id = `event.mei2026-${slug}`;
    tx.createOrReplace({
      _id: id,
      _type: "event",
      title: e.title,
      category: e.category,
      startDate: e.startDate,
      endDate: e.endDate,
      location: e.location,
      description: e.description,
      isFeatured: Boolean(e.isFeatured),
    });
    console.log(`  • ${e.title}`);
  });

  await tx.commit();
  console.log(`✓ Selesai. ${events.length} event ter-publish di Sanity.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
