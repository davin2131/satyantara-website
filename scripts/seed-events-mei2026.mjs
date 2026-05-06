#!/usr/bin/env node
/**
 * Seed acara Mei 2026 Solo ke Sanity.
 *
 * Strategi:
 * - Acara berulang dengan tanggal eksplisit ATAU pola hari → di-split jadi
 *   1 dokumen per tanggal (sesuai request user).
 * - Wayang Orang Sriwedari (Senin-Sabtu rutin) → di-split per range minggu
 *   (4 dokumen: 4-9, 11-16, 18-23, 25-30 Mei) dengan startDate-endDate.
 * - Acara multi-hari kontinu (mis. Mangkunegaran Makan Makan 1-3 Mei) →
 *   1 dokumen dengan startDate-endDate.
 *
 * Idempotent: pakai _id deterministik berdasar slug+tanggal, jadi aman
 * dijalankan ulang.
 *
 * Sebelum seed, script juga menghapus dokumen "root recurring" lama
 * (mis. event.mei2026-ngarsopurock) agar tidak duplicate setelah split.
 */
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

function pad(n) {
  return String(n).padStart(2, "0");
}

/** ISO date string for WIB (UTC+7). y/m/d/h/min args. */
function iso(y, m, d, hh = 0, mm = 0) {
  return `${y}-${pad(m)}-${pad(d)}T${pad(hh)}:${pad(mm)}:00+07:00`;
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Build a per-date variant of a base event template. */
function makeOccurrence(template, day, opts = {}) {
  const startHH = opts.startHH ?? template.startHH ?? 0;
  const startMM = opts.startMM ?? template.startMM ?? 0;
  const endHH = opts.endHH ?? template.endHH;
  const endMM = opts.endMM ?? template.endMM ?? 0;
  return {
    title: template.title,
    category: template.category,
    location: template.location,
    description: template.description,
    isFeatured: Boolean(template.isFeatured),
    startDate: iso(2026, 5, day, startHH, startMM),
    endDate:
      endHH != null ? iso(2026, 5, day, endHH, endMM) : undefined,
    slugSuffix: `2026-05-${pad(day)}`,
  };
}

// ── Daftar event template + tanggal occurrence ──
const events = [];

// 1. Pertunjukan Ramayana — single date
events.push({
  title: "Pertunjukan Ramayana",
  category: "pertunjukan",
  startDate: iso(2026, 5, 29, 19, 0),
  endDate: iso(2026, 5, 29, 22, 0),
  location: "Taman Balekambang, Solo",
  description:
    "Pertunjukan epos Ramayana di Taman Balekambang Solo. Saksikan kisah klasik Rama dan Sinta dalam balutan seni budaya khas Surakarta.",
  isFeatured: true,
});

// 2. Ramayana Penyelamatan Dewi Sinta & Fire Dance — Sabtu & Minggu Mei
{
  const tpl = {
    title: "Ramayana Penyelamatan Dewi Sinta & Fire Dance",
    category: "pertunjukan",
    location: "Solo Safari, Solo",
    description:
      "Pertunjukan Ramayana 'Penyelamatan Dewi Sinta' digabung dengan Fire Dance di Solo Safari, pukul 16:30 - 20:00 WIB.",
    startHH: 16,
    startMM: 30,
    endHH: 20,
    endMM: 0,
  };
  for (const d of [2, 3, 9, 10, 16, 17, 23, 24, 30, 31]) {
    events.push(makeOccurrence(tpl, d));
  }
}

// 3. Wayang Orang Sriwedari — 4 doc per range minggu (Senin-Sabtu)
{
  const ranges = [
    [4, 9],
    [11, 16],
    [18, 23],
    [25, 30],
  ];
  for (const [start, end] of ranges) {
    events.push({
      title: "Wayang Orang Sriwedari",
      category: "pertunjukan",
      startDate: iso(2026, 5, start, 19, 30),
      endDate: iso(2026, 5, end, 22, 0),
      location: "Gedung Wayang Orang Sriwedari, Solo",
      description: `Pertunjukan Wayang Orang rutin di Gedung Wayang Orang Sriwedari — setiap Senin sampai Sabtu pukul 19:30 WIB. Pekan ini berlangsung tanggal ${start} - ${end} Mei 2026.`,
      slugSuffix: `2026-05-${pad(start)}-${pad(end)}`,
    });
  }
}

// 4. Solo Is Solo — Jumat, Sabtu, Minggu
{
  const tpl = {
    title: "Solo Is Solo",
    category: "festival",
    location: "Koridor Gatot Subroto, Solo",
    description:
      "Festival pertunjukan seni budaya 'Solo Is Solo' di Koridor Gatot Subroto, mulai pukul 18:00 WIB.",
    startHH: 18,
    startMM: 0,
    endHH: 22,
    endMM: 0,
  };
  for (const d of [1, 2, 3, 8, 9, 10, 15, 16, 17, 22, 23, 24, 29, 30, 31]) {
    events.push(makeOccurrence(tpl, d));
  }
}

// 5. Solo Car Free Day — setiap Minggu
{
  const tpl = {
    title: "Solo Car Free Day",
    category: "lainnya",
    location: "Jl. Slamet Riyadi, Solo",
    description:
      "Car Free Day rutin di Jl. Slamet Riyadi, pukul 05:00 - 09:00 WIB. Bebas dari kendaraan bermotor untuk olahraga, kuliner & seni jalanan.",
    startHH: 5,
    endHH: 9,
  };
  for (const d of [3, 10, 17, 24, 31]) {
    events.push(makeOccurrence(tpl, d));
  }
}

// 6. Mangkunegaran Makan Makan — multi-hari kontinu 1-3 Mei
events.push({
  title: "Mangkunegaran Makan Makan",
  category: "festival",
  startDate: iso(2026, 5, 1, 17, 0),
  endDate: iso(2026, 5, 3, 22, 0),
  location: "Pamedan Pura Mangkunegaran, Solo",
  description:
    "Festival kuliner di Pamedan Pura Mangkunegaran tanggal 1 - 3 Mei 2026. Sajian khas Mangkunegaran dan kuliner Solo dalam suasana keraton.",
});

// 7. Mangkunegaran Run — single date
events.push({
  title: "Mangkunegaran Run",
  category: "lainnya",
  startDate: iso(2026, 5, 3, 5, 30),
  endDate: iso(2026, 5, 3, 10, 0),
  location: "Pamedan Pura Mangkunegaran, Solo",
  description:
    "Lomba lari Mangkunegaran Run yang diselenggarakan di Pamedan Pura Mangkunegaran pada tanggal 3 Mei 2026.",
});

// 8. Dwijoswara — single date
events.push({
  title: "Dwijoswara",
  category: "pertunjukan",
  startDate: iso(2026, 5, 2, 19, 0),
  endDate: iso(2026, 5, 2, 22, 0),
  location: "Pendapa Suryahamijaya SMKN 8 Surakarta",
  description:
    "Pagelaran Dwijoswara di Pendapa Suryahamijaya SMKN 8 Surakarta pada 2 Mei 2026.",
});

// 9. Wingspan 5 Volkswagen — multi-hari kontinu 2-3 Mei
events.push({
  title: "Wingspan 5 Volkswagen",
  category: "lainnya",
  startDate: iso(2026, 5, 2, 9, 0),
  endDate: iso(2026, 5, 3, 21, 0),
  location: "Solo Technopark, Solo",
  description:
    "Acara komunitas Volkswagen 'Wingspan 5' di Solo Technopark, 2 - 3 Mei 2026.",
});

// 10. Belajar di Museum — Pottery Class — 2, 9, 16, 23, 30 Mei
{
  const tpl = {
    title: "Belajar di Museum — Pottery Class",
    category: "workshop",
    location: "Museum Radyapustaka Surakarta",
    description:
      "Kelas membuat tembikar (pottery class) di Museum Radyapustaka, mulai pukul 09:00 WIB.",
    startHH: 9,
    endHH: 12,
  };
  for (const d of [2, 9, 16, 23, 30]) {
    events.push(makeOccurrence(tpl, d));
  }
}

// 11. Solo Art Market — 2, 3, 17, 31 Mei
{
  const tpl = {
    title: "Solo Art Market",
    category: "festival",
    location: "Selasar Ngarsopuro, Solo",
    description:
      "Pasar seni dan kerajinan di Selasar Ngarsopuro, pukul 09:00 - 17:00 WIB.",
    startHH: 9,
    endHH: 17,
  };
  for (const d of [2, 3, 17, 31]) {
    events.push(makeOccurrence(tpl, d));
  }
}

// 12. Solo di Waktu Malam — 2, 9, 16, 23, 30 Mei
{
  const tpl = {
    title: "Solo di Waktu Malam",
    category: "festival",
    location: "Koridor Ketandan, Solo",
    description:
      "Pesta kuliner & musik 'Solo di Waktu Malam' di Koridor Ketandan, pukul 18:00 - 23:00 WIB.",
    startHH: 18,
    endHH: 23,
  };
  for (const d of [2, 9, 16, 23, 30]) {
    events.push(makeOccurrence(tpl, d));
  }
}

// 13. Jazz Triwindu — Senin (4, 11, 18, 25 Mei)
{
  const tpl = {
    title: "Jazz Triwindu",
    category: "pertunjukan",
    location: "Selasar Ngarsopuro, Solo",
    description:
      "Pagelaran musik jazz outdoor 'Jazz Triwindu' di Selasar Ngarsopuro, pukul 19:00 - 23:00 WIB.",
    startHH: 19,
    endHH: 23,
  };
  for (const d of [4, 11, 18, 25]) {
    events.push(makeOccurrence(tpl, d));
  }
}

// 14. Ngarsopurock — Selasa (5, 12, 19, 26 Mei)
{
  const tpl = {
    title: "Ngarsopurock",
    category: "pertunjukan",
    location: "Selasar Ngarsopuro, Solo",
    description:
      "Festival musik rock 'Ngarsopurock' di Selasar Ngarsopuro, pukul 19:00 - 23:00 WIB.",
    startHH: 19,
    endHH: 23,
  };
  for (const d of [5, 12, 19, 26]) {
    events.push(makeOccurrence(tpl, d));
  }
}

// 15. New BnR — Rabu (6, 13, 20, 27 Mei)
{
  const tpl = {
    title: "New BnR",
    category: "pertunjukan",
    location: "Selasar Ngarsopuro, Solo",
    description:
      "Pertunjukan musik 'New BnR' di Selasar Ngarsopuro, pukul 19:00 - 23:00 WIB.",
    startHH: 19,
    endHH: 23,
  };
  for (const d of [6, 13, 20, 27]) {
    events.push(makeOccurrence(tpl, d));
  }
}

// 16. Keroncong Keprabon — Kamis (7, 14, 21, 28 Mei)
{
  const tpl = {
    title: "Keroncong Keprabon",
    category: "pertunjukan",
    location: "Selasar Ngarsopuro, Solo",
    description:
      "Pagelaran musik keroncong 'Keroncong Keprabon' di Selasar Ngarsopuro, pukul 19:00 - 23:00 WIB.",
    startHH: 19,
    endHH: 23,
  };
  for (const d of [7, 14, 21, 28]) {
    events.push(makeOccurrence(tpl, d));
  }
}

// 17. Semarak Budaya Indonesia — multi-hari 8-9 Mei
events.push({
  title: "Semarak Budaya Indonesia",
  category: "festival",
  startDate: iso(2026, 5, 8, 9, 0),
  endDate: iso(2026, 5, 9, 22, 0),
  location: "Balai Kota Surakarta",
  description:
    "Festival budaya 'Semarak Budaya Indonesia' di Balai Kota Surakarta — 8 sampai 9 Mei 2026.",
  isFeatured: true,
});

// 18. KaoemCraft #13 — single date
events.push({
  title: "KaoemCraft #13",
  category: "festival",
  startDate: iso(2026, 5, 9, 9, 0),
  endDate: iso(2026, 5, 9, 17, 0),
  location: "Kampung Wisata Batik Kauman, Solo",
  description:
    "Pameran kerajinan dan workshop 'KaoemCraft #13' di Kampung Wisata Batik Kauman — 9 Mei 2026, pukul 09:00 - 17:00 WIB.",
});

// 19. Pesona Solo Culture & Heritage — multi-hari 9-10 Mei
events.push({
  title: "Pesona Solo Culture & Heritage — Pertemuan FK Pokdarwis Jateng",
  category: "diskusi",
  startDate: iso(2026, 5, 9, 9, 0),
  endDate: iso(2026, 5, 10, 17, 0),
  location: "Solo",
  description:
    "Pertemuan Forum Komunikasi Pokdarwis Jateng dengan tema 'Pesona Solo Culture & Heritage' — 9 - 10 Mei 2026.",
});

// 20. Lomba Cerdas Cermat Museum — multi-hari 12-13 Mei
events.push({
  title: "Lomba Cerdas Cermat Museum",
  category: "lainnya",
  startDate: iso(2026, 5, 12, 8, 0),
  endDate: iso(2026, 5, 13, 16, 0),
  location: "Museum Radyapustaka Surakarta",
  description:
    "Lomba Cerdas Cermat Museum di Museum Radyapustaka — 12 - 13 Mei 2026 mulai pukul 08:00 WIB.",
});

// Dokumen "root recurring" lama dari seed v1 yang sekarang sudah di-split
// per-tanggal — perlu dihapus supaya tidak duplicate.
const STALE_ROOT_IDS = [
  "event.mei2026-ramayana-penyelamatan-dewi-sinta-fire-dance",
  "event.mei2026-wayang-orang-sriwedari",
  "event.mei2026-solo-is-solo",
  "event.mei2026-solo-car-free-day",
  "event.mei2026-belajar-di-museum-pottery-class",
  "event.mei2026-solo-art-market",
  "event.mei2026-solo-di-waktu-malam",
  "event.mei2026-jazz-triwindu",
  "event.mei2026-ngarsopurock",
  "event.mei2026-new-bnr",
  "event.mei2026-keroncong-keprabon",
];

async function run() {
  // 1. Hapus dokumen recurring lama yang sekarang sudah di-split per-tanggal.
  console.log("Menghapus dokumen recurring lama dari Sanity…");
  const existingStale = await client.fetch(
    `*[_type == "event" && _id in $ids]._id`,
    { ids: STALE_ROOT_IDS },
  );
  if (existingStale.length > 0) {
    const tx = client.transaction();
    existingStale.forEach((id) => tx.delete(id));
    await tx.commit();
    console.log(`  • ${existingStale.length} dokumen recurring lama dihapus.`);
  } else {
    console.log("  • Tidak ada dokumen recurring lama.");
  }

  // 2. Seed dokumen baru.
  console.log(`\nSeeding ${events.length} acara Mei 2026 ke Sanity…`);
  const tx = client.transaction();

  events.forEach((e) => {
    const titleSlug = slugify(e.title);
    const idSuffix = e.slugSuffix
      ? `${titleSlug}-${e.slugSuffix}`
      : titleSlug;
    const id = `event.mei2026-${idSuffix}`;
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
  });

  await tx.commit();
  console.log(`✓ Selesai. ${events.length} event ter-publish di Sanity.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
