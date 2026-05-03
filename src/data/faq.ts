// AUTO-GENERATED FROM SANITY. Edit content via Sanity Studio.
// FAQ content: collection "FAQ - Pertanyaan Umum" (faqGroup documents).
// Page hero text: "Setting Halaman" -> "Halaman FAQ".
// Run `npm run sanity:sync` to refresh from Sanity.

export type FaqItem = {
  q: string;
  a: string;
};

export type FaqGroup = {
  title: string;
  order: number;
  items: FaqItem[];
};

export type FaqPageContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
};

export const faqPageContent: FaqPageContent = {
  eyebrow: "Pertanyaan Umum",
  title: "FAQ",
  subtitle:
    "Hal-hal yang paling sering ditanyakan Teman Satya — dari paket lakon, jadwal workshop, pembayaran, sampai cara kerjasama.",
  ctaEyebrow: "Masih Ada Pertanyaan?",
  ctaTitle: "Hubungi Kami Langsung",
  ctaBody:
    "Tim SATYANTARA siap membantu lewat WhatsApp atau email. Kami biasanya membalas dalam 1-2 hari kerja.",
};

export const faqGroups: FaqGroup[] = [
  {
    title: "Tentang SATYANTARA",
    order: 10,
    items: [
      {
        q: "Apa itu SATYANTARA?",
        a: "SATYANTARA adalah brand budaya yang lahir dari Solo (Surakarta). Kami merangkai cerita Wayang dan kearifan Jawa menjadi pengalaman edukatif yang ramah anak muda — dari workshop, lakon pertunjukan, sampai produk kerajinan dari sanggar mitra.",
      },
      {
        q: "Siapa yang bisa ikut workshop SATYANTARA?",
        a: "Semua usia, terutama remaja, mahasiswa, dan keluarga. Workshop kami didesain supaya mudah diikuti pemula tanpa perlu latar belakang seni — cukup bawa rasa ingin tahu.",
      },
      {
        q: "Di mana lokasi sanggar SATYANTARA?",
        a: "Kami berbasis di Solo (Surakarta), Jawa Tengah. Untuk alamat detail dan koordinasi kunjungan, silakan hubungi kami via WhatsApp di footer halaman.",
      },
    ],
  },
  {
    title: "Lakon & Workshop",
    order: 20,
    items: [
      {
        q: "Apa bedanya Lakon Bima Bungkus dan Anoman Obong?",
        a: "Bima Bungkus mengangkat kisah lahirnya Werkudara — fokus pada proses 'pecah' dari bungkus sakti, cocok untuk eksplorasi tema keberanian. Anoman Obong mengangkat kisah Sang Kera Putih membakar Alengka — fokus pada strategi dan loyalitas. Keduanya 1 hari penuh, harga Rp 1.000.000.",
      },
      {
        q: "Berapa lama durasi satu workshop?",
        a: "Sekitar 4–6 jam dalam satu hari, sudah termasuk sesi cerita, DIY (rakit wayang kertas / bookmark), dan dokumentasi. Kami fleksibel kalau kelompok kamu butuh format yang berbeda.",
      },
      {
        q: "Workshop bisa untuk grup atau hanya individu?",
        a: "Bisa keduanya. Untuk grup (sekolah, kantor, komunitas), hubungi kami untuk dapat penawaran khusus dengan jumlah peserta minimum tertentu.",
      },
      {
        q: "Apakah saya dapat sertifikat / dokumentasi?",
        a: "Ya, peserta mendapat foto dokumentasi dan story book eksklusif. Untuk grup sekolah/komunitas, sertifikat partisipasi bisa kami siapkan atas permintaan.",
      },
    ],
  },
  {
    title: "Pemesanan & Pembayaran",
    order: 30,
    items: [
      {
        q: "Bagaimana cara pesan paket lakon atau produk mitra?",
        a: "Pilih item dari halaman Beranda → Layanan atau Produk Mitra → klik produknya → pilih tanggal (untuk paket lakon) → masukkan ke keranjang → checkout via WhatsApp. Tim kami akan konfirmasi ketersediaan dan instruksi pembayaran.",
      },
      {
        q: "Metode pembayarannya apa?",
        a: "Transfer bank atau e-wallet (DANA, OVO, GoPay) — detail rekening akan dikirim setelah konfirmasi via WhatsApp. Kami belum menerima pembayaran kartu kredit otomatis.",
      },
      {
        q: "Bisakah saya reschedule jadwal workshop?",
        a: "Bisa, minimal H-3 sebelum tanggal pelaksanaan. Reschedule mendadak (kurang dari 3 hari) tergantung ketersediaan sanggar mitra dan dapat dikenakan biaya admin.",
      },
      {
        q: "Bagaimana kebijakan refund?",
        a: "Pembatalan H-7 atau lebih: refund 80%. H-3 sampai H-7: refund 50%. Kurang dari H-3: tidak ada refund, tapi bisa kami konversi jadi voucher untuk lakon berikutnya.",
      },
    ],
  },
  {
    title: "Konten & Sumber Cerita",
    order: 40,
    items: [
      {
        q: "Tokoh wayang di Ensiklopedia datanya dari mana?",
        a: "Kami merangkum dari pakem Mahabharata dan Ramayana versi Jawa, ditambah refleksi dari para dalang dan literatur akademik. Kalau kamu temukan info yang perlu dikoreksi, kabari kami via WhatsApp/email.",
      },
      {
        q: "Peta Budaya 38 provinsi sumbernya apa?",
        a: "Data tarian, alat musik, rumah adat, pakaian, dan makanan kami rangkum dari sumber budaya umum (Wikipedia, Kemendikbud, dan referensi daerah). Foto landmark dari Wikipedia Commons (lisensi terbuka).",
      },
      {
        q: "Apakah Permainan Tebak Tokoh bisa dimainkan berkali-kali?",
        a: "Ya, setiap sesi pertanyaannya diacak ulang dari Ensiklopedia — sehingga tiap sesi terasa berbeda. Cocok untuk belajar santai sambil main.",
      },
    ],
  },
  {
    title: "Kerja Sama & Kontak",
    order: 50,
    items: [
      {
        q: "Saya seniman / sanggar, bisa kerjasama dengan SATYANTARA?",
        a: "Sangat bisa. Kami selalu terbuka kolaborasi dengan dalang, perajin, sanggar, dan komunitas budaya. Kirim proposal singkat via email atau WhatsApp, kami balas dalam 2-3 hari kerja.",
      },
      {
        q: "Saya mau wawancara / liputan untuk media, hubungi siapa?",
        a: "Silakan kirim email ke alamat di footer dengan subjek 'Media — [nama media]'. Kami siapkan press kit, foto resolusi tinggi, dan jadwal wawancara dengan founder/dalang mitra.",
      },
    ],
  },
];
