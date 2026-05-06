// AUTO-GENERATED FROM SANITY. Edit content via Sanity Studio (collection "Jadwal Acara").
// Run `npm run sanity:sync` to refresh from Sanity.

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
  {
    slug: "event.mei2026-mangkunegaran-makan-makan",
    title: "Mangkunegaran Makan Makan",
    category: "festival",
    startDate: "2026-05-01T17:00:00+07:00",
    endDate: "2026-05-03T22:00:00+07:00",
    location: "Pamedan Pura Mangkunegaran, Solo",
    description: "Festival kuliner di Pamedan Pura Mangkunegaran tanggal 1 - 3 Mei 2026. Sajian khas Mangkunegaran dan kuliner Solo dalam suasana keraton.",
  },
  {
    slug: "event.mei2026-solo-is-solo",
    title: "Solo Is Solo",
    category: "festival",
    startDate: "2026-05-01T18:00:00+07:00",
    endDate: "2026-05-01T22:00:00+07:00",
    location: "Koridor Gatot Subroto, Solo",
    description: "Festival pertunjukan seni budaya 'Solo Is Solo' di Koridor Gatot Subroto — setiap Jumat sampai Minggu mulai pukul 18:00 WIB.",
  },
  {
    slug: "event.mei2026-belajar-di-museum-pottery-class",
    title: "Belajar di Museum — Pottery Class",
    category: "workshop",
    startDate: "2026-05-02T09:00:00+07:00",
    endDate: "2026-05-02T12:00:00+07:00",
    location: "Museum Radyapustaka Surakarta",
    description: "Kelas membuat tembikar (pottery class) untuk pengunjung Museum Radyapustaka — setiap Sabtu pukul 09:00 WIB di Mei 2026 (2, 9, 16, 23, 30 Mei).",
  },
  {
    slug: "event.mei2026-solo-art-market",
    title: "Solo Art Market",
    category: "festival",
    startDate: "2026-05-02T09:00:00+07:00",
    endDate: "2026-05-02T17:00:00+07:00",
    location: "Selasar Ngarsopuro, Solo",
    description: "Pasar seni dan kerajinan di Selasar Ngarsopuro — buka tanggal 2, 3, 17, 31 Mei 2026 pukul 09:00 - 17:00 WIB.",
  },
  {
    slug: "event.mei2026-wingspan-5-volkswagen",
    title: "Wingspan 5 Volkswagen",
    category: "lainnya",
    startDate: "2026-05-02T09:00:00+07:00",
    endDate: "2026-05-03T21:00:00+07:00",
    location: "Solo Technopark, Solo",
    description: "Acara komunitas Volkswagen 'Wingspan 5' di Solo Technopark, 2 - 3 Mei 2026.",
  },
  {
    slug: "event.mei2026-ramayana-penyelamatan-dewi-sinta-fire-dance",
    title: "Ramayana Penyelamatan Dewi Sinta & Fire Dance",
    category: "pertunjukan",
    startDate: "2026-05-02T16:30:00+07:00",
    endDate: "2026-05-02T20:00:00+07:00",
    location: "Solo Safari, Solo",
    description: "Pertunjukan Ramayana 'Penyelamatan Dewi Sinta' digabung dengan Fire Dance — setiap Sabtu & Minggu di Solo Safari pukul 16:30 - 20:00 WIB selama Mei 2026.",
  },
  {
    slug: "event.mei2026-solo-di-waktu-malam",
    title: "Solo di Waktu Malam",
    category: "festival",
    startDate: "2026-05-02T18:00:00+07:00",
    endDate: "2026-05-02T23:00:00+07:00",
    location: "Koridor Ketandan, Solo",
    description: "Pesta kuliner & musik 'Solo di Waktu Malam' di Koridor Ketandan — setiap Sabtu (2, 9, 16, 23, 30 Mei 2026) pukul 18:00 - 23:00 WIB.",
  },
  {
    slug: "event.mei2026-dwijoswara",
    title: "Dwijoswara",
    category: "pertunjukan",
    startDate: "2026-05-02T19:00:00+07:00",
    endDate: "2026-05-02T22:00:00+07:00",
    location: "Pendapa Suryahamijaya SMKN 8 Surakarta",
    description: "Pagelaran Dwijoswara di Pendapa Suryahamijaya SMKN 8 Surakarta pada 2 Mei 2026.",
  },
  {
    slug: "event.mei2026-solo-car-free-day",
    title: "Solo Car Free Day",
    category: "lainnya",
    startDate: "2026-05-03T05:00:00+07:00",
    endDate: "2026-05-03T09:00:00+07:00",
    location: "Jl. Slamet Riyadi, Solo",
    description: "Car Free Day rutin di sepanjang Jl. Slamet Riyadi — setiap Minggu pukul 05:00 - 09:00 WIB. Bebas dari kendaraan bermotor untuk olahraga, kuliner & seni jalanan.",
  },
  {
    slug: "event.mei2026-mangkunegaran-run",
    title: "Mangkunegaran Run",
    category: "lainnya",
    startDate: "2026-05-03T05:30:00+07:00",
    endDate: "2026-05-03T10:00:00+07:00",
    location: "Pamedan Pura Mangkunegaran, Solo",
    description: "Lomba lari Mangkunegaran Run yang diselenggarakan di Pamedan Pura Mangkunegaran pada tanggal 3 Mei 2026.",
  },
  {
    slug: "event.mei2026-jazz-triwindu",
    title: "Jazz Triwindu",
    category: "pertunjukan",
    startDate: "2026-05-04T19:00:00+07:00",
    endDate: "2026-05-04T23:00:00+07:00",
    location: "Selasar Ngarsopuro, Solo",
    description: "Pagelaran musik jazz outdoor 'Jazz Triwindu' di Selasar Ngarsopuro — setiap Senin (4, 11, 18, 25 Mei 2026) pukul 19:00 - 23:00 WIB.",
  },
  {
    slug: "event.mei2026-wayang-orang-sriwedari",
    title: "Wayang Orang Sriwedari",
    category: "pertunjukan",
    startDate: "2026-05-04T19:30:00+07:00",
    endDate: "2026-05-04T22:00:00+07:00",
    location: "Gedung Wayang Orang Sriwedari, Solo",
    description: "Pertunjukan Wayang Orang rutin di Gedung Wayang Orang Sriwedari — setiap Senin sampai Sabtu pukul 19:30 WIB.",
  },
  {
    slug: "event.mei2026-ngarsopurock",
    title: "Ngarsopurock",
    category: "pertunjukan",
    startDate: "2026-05-05T19:00:00+07:00",
    endDate: "2026-05-05T23:00:00+07:00",
    location: "Selasar Ngarsopuro, Solo",
    description: "Festival musik rock 'Ngarsopurock' di Selasar Ngarsopuro — setiap Selasa (5, 12, 19, 26 Mei 2026) pukul 19:00 - 23:00 WIB.",
  },
  {
    slug: "event.mei2026-new-bnr",
    title: "New BnR",
    category: "pertunjukan",
    startDate: "2026-05-06T19:00:00+07:00",
    endDate: "2026-05-06T23:00:00+07:00",
    location: "Selasar Ngarsopuro, Solo",
    description: "Pertunjukan musik 'New BnR' di Selasar Ngarsopuro — setiap Rabu (6, 13, 20, 27 Mei 2026) pukul 19:00 - 23:00 WIB.",
  },
  {
    slug: "event.mei2026-keroncong-keprabon",
    title: "Keroncong Keprabon",
    category: "pertunjukan",
    startDate: "2026-05-07T19:00:00+07:00",
    endDate: "2026-05-07T23:00:00+07:00",
    location: "Selasar Ngarsopuro, Solo",
    description: "Pagelaran musik keroncong 'Keroncong Keprabon' di Selasar Ngarsopuro — setiap Kamis (7, 14, 21, 28 Mei 2026) pukul 19:00 - 23:00 WIB.",
  },
  {
    slug: "event.mei2026-semarak-budaya-indonesia",
    title: "Semarak Budaya Indonesia",
    category: "festival",
    startDate: "2026-05-08T09:00:00+07:00",
    endDate: "2026-05-09T22:00:00+07:00",
    location: "Balai Kota Surakarta",
    description: "Festival budaya 'Semarak Budaya Indonesia' di Balai Kota Surakarta — 8 sampai 9 Mei 2026.",
    isFeatured: true,
  },
  {
    slug: "event.mei2026-kaoemcraft-13",
    title: "KaoemCraft #13",
    category: "festival",
    startDate: "2026-05-09T09:00:00+07:00",
    endDate: "2026-05-09T17:00:00+07:00",
    location: "Kampung Wisata Batik Kauman, Solo",
    description: "Pameran kerajinan dan workshop 'KaoemCraft #13' di Kampung Wisata Batik Kauman — 9 Mei 2026, pukul 09:00 - 17:00 WIB.",
  },
  {
    slug: "event.mei2026-pesona-solo-culture-heritage-pertemuan-fk-pokdarwis-jateng",
    title: "Pesona Solo Culture & Heritage — Pertemuan FK Pokdarwis Jateng",
    category: "diskusi",
    startDate: "2026-05-09T09:00:00+07:00",
    endDate: "2026-05-10T17:00:00+07:00",
    location: "Solo",
    description: "Pertemuan Forum Komunikasi Pokdarwis Jateng dengan tema 'Pesona Solo Culture & Heritage' — 9 - 10 Mei 2026.",
  },
  {
    slug: "a15755e0-174f-4d81-9ee4-739f4fcc9baf",
    title: "Ramayana Penyelamatan Dewi Sinta dan Fire Danca",
    category: "pertunjukan",
    startDate: "2026-05-09T09:30:00.000Z",
    endDate: "2026-05-10T13:00:00.000Z",
    location: "Solo Safari",
    description: "Saksikan pertunjukan Ramayana Penyelamatan Dewi Sinta dan Fire Danca di Solo Safari pada hari Sabtu & Minggu, pukul 16:30 - 20:00.",
  },
  {
    slug: "event.mei2026-lomba-cerdas-cermat-museum",
    title: "Lomba Cerdas Cermat Museum",
    category: "lainnya",
    startDate: "2026-05-12T08:00:00+07:00",
    endDate: "2026-05-13T16:00:00+07:00",
    location: "Museum Radyapustaka Surakarta",
    description: "Lomba Cerdas Cermat Museum di Museum Radyapustaka — 12 - 13 Mei 2026 mulai pukul 08:00 WIB.",
  },
  {
    slug: "67c07392-473d-4365-b25a-c189642e6fb0",
    title: "Pertunjukan Ramayana",
    category: "pertunjukan",
    startDate: "2026-05-29T12:30:00.000Z",
    location: "Taman Balekambang",
    description: "Saksikan pertunjukan ramayana di balekambang pada tanggal 29 Mei 2026",
  },
  {
    slug: "event.mei2026-pertunjukan-ramayana",
    title: "Pertunjukan Ramayana",
    category: "pertunjukan",
    startDate: "2026-05-29T19:00:00+07:00",
    endDate: "2026-05-29T22:00:00+07:00",
    location: "Taman Balekambang, Solo",
    description: "Pertunjukan epos Ramayana di Taman Balekambang Solo. Saksikan kisah klasik Rama dan Sinta dalam balutan seni budaya khas Surakarta.",
    isFeatured: true,
  },
];
