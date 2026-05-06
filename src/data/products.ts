// AUTO-GENERATED FROM SANITY. Edit content via Sanity Studio.
// Run `npm run sanity:sync` to refresh from Sanity.

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
  {
    slug: "anoman-obong",
    title: "Anoman Obong",
    subtitle: "Saat Sang Kera Putih Membakar Alengka",
    price: "Rp 1.000.000",
    description: "Anoman si kera putih tertangkap dan ekornya dibakar api besar! Bukannya takut, dia malah melompat-lompat di atas atap istana musuh sampai seluruh kota raksasa terbakar habis. Dia lincah, cerdas, dan nggak pernah menyerah. Ayo edutrip bersama Anoman si kera putih!",
    imageUrl: "https://cdn.sanity.io/images/4tij5rov/production/4f4561cd7cd8365faad39f4c6b6f4a8cbfe2c4e7-449x556.jpg",



    activities: [
      { name: "Membuat Wayang", detail: "Membuat wayang anoman obong." },
      { name: "Karawitan", detail: "Belajar dan bermain karawitan." },
      { name: "Gantungan kunci Anoman obong", detail: "Membuat gantungan kunci anoman obong bersama." },
      { name: "Story Book anoman obong", detail: "Cerita menarik tentang anoman obong." },
      { name: "Akses digital Story book anoman obong", detail: "Versi digital lengkap untuk bacaan jangka panjang." },
    ],
  },
  {
    slug: "pandhawa",
    title: "Pandhawa",
    subtitle: "Lima Saudara, Satu Dharma",
    price: "Rp 1.000.000",
    description: "Pernah bayangkan ada orang yang sangat baik sampai-sampai musuh pun bingung mau melawannya? Itulah Punthadewa, pemimpin Pandawa yang punya darah putih karena kesuciannnya. Dia mengajarkan kita kalau kesabaran adalah kekuatan yang paling sakti! Ikuti jejak keseruan edutrip bersama Pandhawa!",
    imageUrl: "https://cdn.sanity.io/images/4tij5rov/production/dbda738ec3584148a9e12c8893468fd2bc4d5e9e-900x1600.jpg",



    activities: [
      { name: "Membuat Wayang Pandhawa", detail: "Belajar membuat wayang pandhawa." },
      { name: "Belajar Dalang", detail: "Belajar dalang bersama." },
      { name: "Story Book Pandhawa", detail: "Cerita menarik tentang Pandhawa." },
      { name: "Akses digital Story book pandhawa", detail: "Versi digital lengkap untuk bacaan jangka panjang." },
    ],
  },
];

export const recommendations: Recommendation[] = [
  {
    slug: "gajah-sena",
    title: "Gajah Sena",
    price: "Rp 1.000.000",



  },
  {
    slug: "anoman-obong",
    title: "Anoman Obong",
    price: "Rp 1.000.000",



  },
  {
    slug: "pandhawa",
    title: "Pandhawa",
    price: "Rp 1.000.000",



  },
  {
    slug: "kresna-duta",
    title: "Kresna Duta",
    price: "Rp 1.000.000",



  },
  {
    slug: "arjuna-wiwaha",
    title: "Arjuna Wiwaha",
    price: "Rp 1.000.000",



  },
  {
    slug: "dewa-ruci",
    title: "Dewa Ruci",
    price: "Rp 1.000.000",



  },
];

export const mitraProducts: MitraProduct[] = [
  {
    slug: "kalung-rajamala",
    name: "Kalung Rajamala",
    price: "Rp 30.000",
    pricePer: "/biji",
    badge: "Handmade",
    tone: "rose" as MitraProduct["tone"],
    description: "Kalung handmade dengan liontin Rajamala — sosok ikan raksasa pengiring perahu kerajaan Surakarta. Dirajut tangan oleh perajin Kauman, setiap kalung punya detail ukir yang sedikit berbeda — itulah keistimewaannya.",
    imageUrl: "https://cdn.sanity.io/images/4tij5rov/production/2be192549bdacc0a4c8616561d1d168ec8618f75-2268x4032.jpg",


    highlights: [
      "Tali kulit asli, tahan air",
      "Liontin kuningan dengan finishing patina emas",
      "Aman untuk kulit sensitif",
    ],
  },
  {
    slug: "ikat-kepala",
    name: "Ikat Kepala Khas Solo",
    price: "Rp 100.000",
    
    badge: "100 Ribu",
    tone: "emerald" as MitraProduct["tone"],
    description: "Ikat Kepala Khas Solo. Cocok jadi hadiah untuk teman dan keluarga.",
    imageUrl: "https://cdn.sanity.io/images/4tij5rov/production/11b3e6e15bff3cfaba6c10084c38fd6a048bf669-2268x4032.jpg",


    highlights: [
      "Diameter 14 cm, tinggi 3 cm",
      "Keramik berkualitas tinggi (food-safe glaze)",
      "Tersedia warna hitam-emas atau merah-emas",
    ],
  },
  {
    slug: "gantungan-kunci",
    name: "Gantungan Kunci Wayang Golek",
    price: "Rp 15.000",
    pricePer: "/biji",
    badge: "Best Seller",
    tone: "amber" as MitraProduct["tone"],
    description: "Gantungan kunci kayu jati Belanda dengan ukiran karakter Wayang. Pilih karaktermu: Bima, Arjuna, Anoman, atau Sinta. Pas dijadikan oleh-oleh untuk teman dan keluarga.",
    imageUrl: "https://cdn.sanity.io/images/4tij5rov/production/f46893daa8f13acb96192049807d602b9e55112c-4032x2268.jpg",


    highlights: [
      "Kayu jati Belanda berkualitas",
      "Lapisan finishing tahan air & gores",
      "Tersedia 8 karakter Wayang",
    ],
  },
  {
    slug: "gantungan-mobil",
    name: "Gantungan Mobil",
    price: "Rp 25.000",
    pricePer: "/biji",
    badge: "New",
    tone: "rust" as MitraProduct["tone"],
    description: "Gantungan untuk kaca mobil dengan ornamen Gunungan kecil dan rumbai benang katun. Membawa nuansa Solo ke dalam mobilmu, sekaligus jadi pengingat akan akar budaya.",
    imageUrl: "https://cdn.sanity.io/images/4tij5rov/production/a813ce0911c17ea4a46664e18838eed8a6c9eccb-2268x4032.jpg",


    highlights: [
      "Tinggi total 22 cm",
      "Pengait stainless anti-karat",
      "Tersedia varian merah, hitam, coklat",
    ],
  },
  {
    slug: "topeng-wayang",
    name: "Topeng Wayang",
    price: "Rp 20.000",
    pricePer: "/biji",
    
    tone: "indigo" as MitraProduct["tone"],
    description: "Hadirkan nuansa klasik dan magis Jawa di ruangan Anda dengan Topeng Wayang eksklusif ini.",
    imageUrl: "https://cdn.sanity.io/images/4tij5rov/production/59cea33e843e5788f3f9fde2727485e99eff5987-2268x4032.jpg",


    highlights: [
      "Logam kuningan plating emas",
      "Pin pengaman ganda",
      "Diameter 4 cm",
    ],
  },
  {
    slug: "pembatas-buku",
    name: "Pembatas Buku",
    price: "Rp 45.000",
    
    
    tone: "rose" as MitraProduct["tone"],
    description: "Pembatas Buku dengan cover ilustrasi Wayang. Membantu kembali ke halaman terakhir tanpa harus membalik-balik buku.",
    imageUrl: "https://cdn.sanity.io/images/4tij5rov/production/e3e548fc6c2cb603c8fb24311f5dbeac2825427a-2268x4032.jpg",


    highlights: [
      "80 halaman kertas dotted 100gsm",
      "Cover hardcover dengan ilustrasi emboss",
      "Pita pembatas + elastic band",
    ],
  },
];

export const heroSlides: HeroSlide[] = [
  {
    title: "Sanggar Wayang Solo",
    caption: "Dimana cerita leluhur tetap hidup setiap malam.",
    imageUrl: "https://cdn.sanity.io/images/4tij5rov/production/aa11ee41713a6a4da37716f0bea0b0130b0d19b7-736x529.jpg",
  },
  {
    title: "Pelukis Topeng",
    caption: "Setiap goresan membawa karakter ke dalam kayu.",
    imageUrl: "https://cdn.sanity.io/images/4tij5rov/production/a7fbc9efd93f9088b05fedbfba9bc702e6e0683f-736x490.jpg",
  },
  {
    title: "Penari Bedhaya",
    caption: "Gerakan halus yang merangkai doa dan budaya.",
    imageUrl: "https://cdn.sanity.io/images/4tij5rov/production/4f46576bed2ea94c08d1633cbda17342bc067b2c-736x552.jpg",
  },
  {
    title: "Dalang & Gamelan",
    caption: "Suara gamelan menjadi nadi setiap pertunjukan.",
    imageUrl: "https://cdn.sanity.io/images/4tij5rov/production/dd549529cdd59136b7a55b887d4908aa5cb42342-735x492.jpg",
  },
  {
    title: "Workshop Sayners",
    caption: "Tempat anak muda menjadi kreator budaya.",
    imageUrl: "https://cdn.sanity.io/images/4tij5rov/production/2f11b64a3dc41a47e44eb24bb9a314ffa40745fd-736x491.jpg",
  },
];
