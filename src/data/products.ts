export type Story = {
  slug: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  activities: { name: string; detail: string }[];
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
      "Hayo Sayners, siapa yang gak kenal Anoman? Kera putih sakti yang jadi utusan Sri Rama buat selidikin Alengka demi nyari Dewi Sinta. Tapi tahu nggak sih, dia bukan cuma ngintip — dia nge-prank Rahwana dengan membakar seluruh ibu kota Alengka pakai ekornya yang dibakar! Spoiler: ekornya tetap utuh, tapi negaranya jadi abu. Yuk, ikut SATYANTARA Anoman Obong Version dan jadi penjaga cerita berikutnya!",
    activities: [
      { name: "Mini Wayang Kulit", detail: "Pahat dan warnai sosok Anoman dengan teknik klasik dari sanggar." },
      { name: "Diorama Alengka", detail: "Rakit diorama 3D pertempuran legendaris di taman Argasoka." },
      { name: "Audio Drama", detail: "Akses cerita versi audio dengan iringan gamelan asli." },
      { name: "Workshop Dalang Muda", detail: "Belajar memainkan satu adegan singkat di sanggar." },
    ],
  },
  {
    slug: "pandhawa",
    title: "Pandhawa",
    subtitle: "Lima Saudara, Satu Dharma",
    price: "Rp 1.000.000",
    description:
      "Yudistira yang adil, Bima yang tangguh, Arjuna yang gagah, Nakula dan Sadewa si kembar yang setia. Lima ksatria penegak dharma ini punya cerita masing-masing yang bikin merinding. Paket Pandhawa membawamu masuk ke kisah lengkap mereka — dari masa kecil di Astinapura sampai perang Bharatayuda. Kamu nggak cuma kenalan, kamu akan paham kenapa Pandhawa adalah simbol kebenaran sampai sekarang.",
    activities: [
      { name: "Set Kartu Karakter", detail: "5 kartu karakter Pandhawa lengkap dengan kisah & senjata." },
      { name: "Workshop Filosofi", detail: "Belajar nilai dharma langsung dari ahli budaya Solo." },
      { name: "Tiket Pertunjukan", detail: "Akses VIP nonton wayang kulit semalam suntuk di Sanggar." },
      { name: "E-book Bharatayuda", detail: "Versi digital lengkap untuk bacaan jangka panjang." },
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
    slug: "kalung-rajamala",
    name: "Kalung Rajamala",
    price: "Rp 30.000",
    pricePer: "/biji",
    badge: "Handmade",
    tone: "rose",
    description:
      "Kalung handmade dengan liontin Rajamala — sosok ikan raksasa pengiring perahu kerajaan Surakarta. Dirajut tangan oleh perajin Kauman, setiap kalung punya detail ukir yang sedikit berbeda — itulah keistimewaannya.",
    highlights: [
      "Tali kulit asli, tahan air",
      "Liontin kuningan dengan finishing patina emas",
      "Aman untuk kulit sensitif",
    ],
  },
  {
    slug: "asbak-topeng",
    name: "Asbak Topeng",
    price: "Rp 100.000",
    badge: "100 Ribu",
    tone: "emerald",
    description:
      "Asbak keramik berbentuk topeng Wayang Topeng Solo. Dibakar dua kali untuk kekuatan maksimum, dengan finishing matte. Cocok jadi hadiah untuk para kolektor benda budaya.",
    highlights: [
      "Diameter 14 cm, tinggi 3 cm",
      "Keramik berkualitas tinggi (food-safe glaze)",
      "Tersedia warna hitam-emas atau merah-emas",
    ],
  },
  {
    slug: "gantungan-kunci",
    name: "Gantungan Kunci",
    price: "Rp 15.000",
    pricePer: "/biji",
    badge: "Best Seller",
    tone: "amber",
    description:
      "Gantungan kunci kayu jati Belanda dengan ukiran karakter Wayang. Pilih karaktermu: Bima, Arjuna, Anoman, atau Sinta. Pas dijadikan oleh-oleh untuk teman dan keluarga.",
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
    tone: "rust",
    description:
      "Gantungan untuk kaca mobil dengan ornamen Gunungan kecil dan rumbai benang katun. Membawa nuansa Solo ke dalam mobilmu, sekaligus jadi pengingat akan akar budaya.",
    highlights: [
      "Tinggi total 22 cm",
      "Pengait stainless anti-karat",
      "Tersedia varian merah, hitam, coklat",
    ],
  },
  {
    slug: "bros-wayang",
    name: "Bros Wayang",
    price: "Rp 20.000",
    pricePer: "/biji",
    tone: "indigo",
    description:
      "Bros logam dengan bentuk siluet Wayang. Sempurna untuk kerudung, jas, atau tas — sentuhan tradisi yang ringan dan elegan untuk gaya sehari-hari.",
    highlights: [
      "Logam kuningan plating emas",
      "Pin pengaman ganda",
      "Diameter 4 cm",
    ],
  },
  {
    slug: "magnet-kulkas",
    name: "Magnet Kulkas",
    price: "Rp 12.000",
    pricePer: "/biji",
    tone: "ochre",
    description:
      "Magnet kulkas serbaguna dengan ilustrasi tokoh Wayang khas Solo. Cocok dikoleksi dan jadi pajangan kulkas yang ngangenin tiap kali kamu buka pintunya.",
    highlights: [
      "Resin keras, tidak mudah pecah",
      "Magnet kuat (high pull-strength)",
      "Tersedia 12 desain karakter",
    ],
  },
  {
    slug: "kipas-tangan",
    name: "Kipas Tangan",
    price: "Rp 35.000",
    tone: "emerald",
    description:
      "Kipas tangan dari bambu dengan kain batik motif parang. Ringan, sejuk, dan lebih bermakna daripada kipas plastik biasa. Pas dipakai saat upacara atau acara formal.",
    highlights: [
      "Bambu pilihan, tahan lama",
      "Kain batik motif parang asli Solo",
      "Panjang 24 cm saat dibuka",
    ],
  },
  {
    slug: "tote-bag-batik",
    name: "Tote Bag Batik",
    price: "Rp 85.000",
    tone: "amber",
    description:
      "Tote bag kanvas dengan aksen batik di bagian depan. Muat A4, laptop 14\u201D, dan barang harian. Tahan banting, mudah dicuci, dan nyaman dibawa kemana-mana.",
    highlights: [
      "Kanvas tebal 12 oz",
      "Aksen batik printing tahan luntur",
      "Strap diperkuat & jahitan rangkap",
    ],
  },
  {
    slug: "notebook-a6",
    name: "Notebook A6",
    price: "Rp 45.000",
    tone: "rose",
    description:
      "Buku catatan ukuran saku dengan cover ilustrasi Wayang. Isi 80 halaman kertas dotted untuk journaling, sketching, atau planning. Buat ide-idemu mengalir lebih mewah.",
    highlights: [
      "80 halaman kertas dotted 100gsm",
      "Cover hardcover dengan ilustrasi emboss",
      "Pita pembatas + elastic band",
    ],
  },
  {
    slug: "tumbler-sayners",
    name: "Tumbler Sayners",
    price: "Rp 75.000",
    tone: "indigo",
    description:
      "Tumbler stainless 500ml dengan desain ornamen Gunungan. Menjaga minuman tetap dingin 12 jam atau panas 6 jam — gaya tradisional, fungsi modern.",
    highlights: [
      "Stainless steel double-wall",
      "Lulus uji bocor (leak-proof)",
      "Bebas BPA, food-grade",
    ],
  },
  {
    slug: "stiker-pack",
    name: "Stiker Pack",
    price: "Rp 25.000",
    tone: "ochre",
    description:
      "Pack berisi 12 stiker karakter Wayang dan ornamen Solo. Tempel di laptop, botol minum, helm, atau notebookmu. Hadiah kecil yang selalu disukai.",
    highlights: [
      "12 stiker vinyl tahan air",
      "Lapisan UV anti-pudar",
      "Mudah dilepas tanpa lengket",
    ],
  },
  {
    slug: "pin-set",
    name: "Pin Set",
    price: "Rp 30.000",
    tone: "rust",
    description:
      "Set 6 pin enamel keras dengan desain karakter Pandhawa. Cocok untuk topi, jaket denim, atau tas. Edisi terbatas — kolektor wajib koleksi semua varian.",
    highlights: [
      "Hard enamel finishing premium",
      "Pin pengaman ganda",
      "Diameter 2.5 cm per pin",
    ],
  },
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
