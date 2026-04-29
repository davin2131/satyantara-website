export type Story = {
  slug: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  activities: { name: string; detail: string }[];
};

export type MitraProduct = {
  name: string;
  price: string;
  pricePer?: string;
  badge?: string;
  tone: "amber" | "rose" | "emerald" | "indigo" | "ochre" | "rust";
};

export const stories: Story[] = [
  {
    slug: "bima-bungkus",
    title: "Bima Bungkus",
    subtitle: "Lakon Lahirnya Sang Werkudara",
    price: "Rp 1.000.000",
    description:
      "Halo, Sayners! Kalian tahu nggak kalau Bima — sang legenda Pandawa — itu lahir dengan cara yang paling epic? Dia terlahir dalam \u201CBungkus\u201D sakti yang nggak bisa dibuka pakai pedang atau sihir apa pun! Penasaran gimana cara dia \u201Cpecah\u201D dan jadi ksatria paling tangguh? Daripada cuma baca buku sejarah, mending ikut kami Level Up di SATYANTARA Bima Bungkus Version! Kita bakal explore langsung ke Sanggar Wayang di Kota Solo. Di sini, kamu bukan cuma nonton, tapi jadi kreator!",
    activities: [
      {
        name: "DIY Wayang Kertas",
        detail: "Rakit dan hias karakter Bima versimu sendiri.",
      },
      {
        name: "Bookmark Aesthetic",
        detail:
          "Bikin pembatas buku bentuk wayang yang bakal bikin buku sekolahmu jadi paling keren.",
      },
      {
        name: "Story Book Eksklusif",
        detail:
          "Dapatkan buku cerita \u201CBima Bungkus\u201D fisik yang cool abis, bisa jadi teman baca kamu.",
      },
      {
        name: "Unlock Digital Version",
        detail:
          "Lebih praktis untuk jadi teman baca kamu saat ingin mudik atau di perjalanan.",
      },
    ],
  },
  {
    slug: "anoman-obong",
    title: "Anoman Obong",
    subtitle: "Saat Sang Kera Putih Membakar Alengka",
    price: "Rp 1.000.000",
    description:
      "Misi penyelamatan Sinta yang membakar semangat — dan ibu kota Alengka. Ikuti petualangan Anoman dari taman Argasoka sampai api yang membakar mahkota Rahwana, dengan workshop dalang muda dan kreasi kostum mini.",
    activities: [
      { name: "Mini Wayang Kulit", detail: "Pahat dan warnai sosok Anoman dengan teknik klasik." },
      { name: "Diorama Alengka", detail: "Rakit diorama 3D pertempuran legendaris." },
      { name: "Audio Drama", detail: "Akses cerita versi audio dengan iringan gamelan." },
    ],
  },
  {
    slug: "pandhawa",
    title: "Pandhawa",
    subtitle: "Lima Saudara, Satu Dharma",
    price: "Rp 1.000.000",
    description:
      "Yudistira, Bima, Arjuna, Nakula, dan Sadewa — lima ksatria yang menegakkan kebenaran. Paket cerita lengkap dengan kartu karakter, panduan filosofi, dan pengalaman menonton wayang langsung di Sanggar.",
    activities: [
      { name: "Set Kartu Karakter", detail: "5 kartu karakter Pandhawa lengkap dengan kisah." },
      { name: "Workshop Filosofi", detail: "Belajar nilai dharma dari ahli budaya." },
      { name: "Tiket Pertunjukan", detail: "Akses VIP nonton wayang langsung di Solo." },
    ],
  },
];

export const recommendations = [
  { slug: "gajah-sena", title: "Gajah Sena", price: "Rp 1.000.000" },
  { slug: "anoman-obong", title: "Anoman Obong", price: "Rp 1.000.000" },
  { slug: "pandhawa", title: "Pandhawa", price: "Rp 1.000.000" },
  { slug: "kresna-duta", title: "Kresna Duta", price: "Rp 1.000.000" },
  { slug: "arjuna-wiwaha", title: "Arjuna Wiwaha", price: "Rp 1.000.000" },
  { slug: "dewa-ruci", title: "Dewa Ruci", price: "Rp 1.000.000" },
] as const;

export const mitraProducts: MitraProduct[] = [
  {
    name: "Kalung Rajamala",
    price: "Rp 30.000",
    pricePer: "/biji",
    badge: "Handmade",
    tone: "rose",
  },
  {
    name: "Asbak Topeng",
    price: "Rp 100.000",
    badge: "100 Ribu",
    tone: "emerald",
  },
  {
    name: "Gantungan Kunci",
    price: "Rp 15.000",
    pricePer: "/biji",
    badge: "Best Seller",
    tone: "amber",
  },
  {
    name: "Gantungan Mobil",
    price: "Rp 25.000",
    pricePer: "/biji",
    badge: "New",
    tone: "rust",
  },
  { name: "Bros Wayang", price: "Rp 20.000", pricePer: "/biji", tone: "indigo" },
  { name: "Magnet Kulkas", price: "Rp 12.000", pricePer: "/biji", tone: "ochre" },
  { name: "Kipas Tangan", price: "Rp 35.000", tone: "emerald" },
  { name: "Tote Bag Batik", price: "Rp 85.000", tone: "amber" },
  { name: "Notebook A6", price: "Rp 45.000", tone: "rose" },
  { name: "Tumbler Sayners", price: "Rp 75.000", tone: "indigo" },
  { name: "Stiker Pack", price: "Rp 25.000", tone: "ochre" },
  { name: "Pin Set", price: "Rp 30.000", tone: "rust" },
];

export const heroSlides = [
  {
    title: "Sanggar Wayang Solo",
    caption: "Dimana cerita leluhur tetap hidup setiap malam.",
  },
  {
    title: "Pelukis Topeng",
    caption: "Setiap goresan membawa karakter ke dalam kayu.",
  },
  {
    title: "Penari Bedhaya",
    caption: "Gerakan halus yang merangkai doa dan budaya.",
  },
  {
    title: "Dalang & Gamelan",
    caption: "Suara gamelan menjadi nadi setiap pertunjukan.",
  },
  {
    title: "Workshop Sayners",
    caption: "Tempat anak muda menjadi kreator budaya.",
  },
];
