// AUTO-GENERATED FROM SANITY. Edit content via Sanity Studio.
// Run `npm run sanity:sync` to refresh from Sanity.

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
    mediaImageUrl?: string;
    mediaImageAlt?: string;
    mediaVideoUrl?: string;
    stats: { value: string; label: string }[];
  };
  mengapaKami: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: {
      icon: "sanggar" | "dalang" | "whatsapp" | "budaya" | "wayang" | "topeng" | "gamelan";
      title: string;
      body: string;
    }[];
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
    exploreFooterNotes: string[];
    exploreFooterNote: string;
    exploreThumbs?: {
      galeri?: { url?: string; alt?: string };
      ensiklopedia?: { url?: string; alt?: string };
      peta?: { url?: string; alt?: string };
      permainan?: { url?: string; alt?: string };
    };
  };
  tentangKamiPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    heroImageUrl?: string;
    heroImageAlt?: string;
    sections: { heading: string; body: string; imageUrl?: string; imageAlt?: string }[];
    visi: string;
    misi: string[];
    team: { name: string; role: string; bio: string; photoUrl?: string; photoAlt?: string }[];
    ctaTitle: string;
    ctaBody: string;
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

export const siteCopy: SiteCopy = {
  "hero": {
    "eyebrow": "Halo Teman Satya",
    "tagline": "Ruang digital yang merangkai cerita Wayang dan kearifan Solo menjadi pengalaman, produk, dan kreasi yang siap menemani harimuiiiiii.",
    "primaryCta": "Jelajahi Cerita",
    "secondaryCta": "Tentang Kami"
  },
  "aboutBrief": {
    "eyebrow": "Selamat Datang",
    "headingLine1": "Satyantara",
    "headingLine2": "Brand Budaya",
    "headingLine3": "Indonesia.",
    "body": "Halo, Sayners! Selamat datang di website digital kami. SATYANTARA hadir dan selalu siap untuk menemani hari harimu, mari lakukan aktivitas positif yang kaya akan pengetahuan. Isi hari hari mu dengan SATYANTARA.",
    "stats": [
      {
        "label": "Sanggar Mitra",
        "value": "12+"
      },
      {
        "label": "Lakon Cerita",
        "value": "40+"
      },
      {
        "label": "Sayners",
        "value": "5K+"
      }
    ]
  },
  "mengapaKami": {
    "eyebrow": "Mengapa Satyantara",
    "title": "Lebih dari Sekadar Toko Budaya",
    "subtitle": "Kami menjembatani Anda dengan sanggar, dalang, dan pengrajin terpercaya di Solo — semua dalam satu tempat yang mudah diakses.",
    "items": [
      {
        "icon": "sanggar",
        "title": "Sanggar Terpercaya Solo",
        "body": "Setiap lakon dan produk kurasi langsung dari sanggar wayang & komunitas budaya yang aktif di Surakarta."
      },
      {
        "icon": "dalang",
        "title": "Dalang & Pengrajin Asli",
        "body": "Kami bekerja langsung dengan dalang, pembuat wayang, perajin topeng, dan musisi gamelan — bukan reseller."
      },
      {
        "icon": "whatsapp",
        "title": "Pesan Mudah lewat WhatsApp",
        "body": "Tidak perlu rumit. Pilih lakon atau produk, isi keranjang, lanjut chat WhatsApp untuk konfirmasi & pembayaran."
      },
      {
        "icon": "budaya",
        "title": "Mendukung Pelaku Budaya",
        "body": "Setiap pesanan ikut menjaga keberlangsungan tradisi wayang, gamelan, dan ragam kesenian Solo."
      }
    ]
  },
  "tentangKami": {
    "eyebrow": "Akar Cerita Kami",
    "heading": "TENTANG KAMI",
    "body": "Di tengah kota Surakarta atau yang lebih dikenal dengan nama Solo, budaya menjadi denyut yang menghidupkan seluruh kegiatan masyarakat. Kota ini menjunjung tinggi nilai luhur Jawa yang terbentuk dari tata krama yang lembut, bahasa yang penuh makna, hingga kesenian tradisional yang tak pernah padam. Wayang Kulit, Blangkon, dan Topeng menjadi penanda kuat tentang betapa dalamnya akar budaya yang dijaga hingga kini. Pertunjukan yang mengangkat kisah Mahabharata dan Ramayana tidak hanya menyajikan keindahan visual, tetapi juga mengajak penonton memahami pesan hidup yang diwariskan leluhur. Peran dalang sebagai penjaga cerita membuat setiap pertunjukan memiliki kedalaman makna. Selain itu, berbagai tradisi seperti upacara adat, sajian kuliner khas, dan kegiatan komunitas memperlihatkan bagaimana budaya terus hidup dalam keseharian orang Solo.",
    "valueCards": [
      {
        "icon": "wayang",
        "text": "Setiap lakon dijaga oleh dalang sebagai penjaga cerita.",
        "title": "Wayang & Dalang"
      },
      {
        "icon": "topeng",
        "text": "Identitas Jawa yang dirawat antar generasi.",
        "title": "Topeng & Blangkon"
      },
      {
        "icon": "gamelan",
        "text": "Upacara dan sajian kuliner yang hidup setiap hari.",
        "title": "Gamelan & Tradisi"
      }
    ]
  },
  "footer": {
    "callout": "Ikuti Cerita Kami",
    "socials": [
      {
        "href": "#",
        "platform": "youtube"
      },
      {
        "href": "#",
        "platform": "telegram"
      },
      {
        "href": "#",
        "platform": "instagram"
      },
      {
        "href": "#",
        "platform": "facebook"
      }
    ],
    "contacts": [
      {
        "href": "https://wa.me/",
        "kind": "whatsapp",
        "label": "WhatsApp",
        "value": "+62 8xx-xxxx-xxxx"
      },
      {
        "href": "mailto:hello@satyantara.id",
        "kind": "email",
        "label": "Email",
        "value": "hello@satyantara.id"
      },
      {
        "href": "#",
        "kind": "sanggar",
        "label": "Sanggar",
        "value": "Solo · Surakarta"
      }
    ],
    "copyright": "© SATYANTARA. Semua hak cipta dilindungi.",
    "tagline": "Crafted in Solo · Indonesia"
  },
  "navbar": {
    "ctaLabel": "Pesan via WhatsApp",
    "ctaHref": "https://wa.me/6287862181294",
    "exploreLabel": "Eksplorasi",
    "exploreEyebrow": "Eksplorasi Budaya",
    "exploreTitle": "Cerita Wayang & Solo,\nterangkum dalam\nsatu eksplorasi.",
    "exploreBody": "Pilih pintu masuk ke konten budaya SATYANTARA — dari arsip foto sanggar, kisah tokoh wayang Pandawa & Kurawa, hingga peta budaya 38 provinsi.",
    "exploreFooterNotes": [
      "Tahukah kamu? Wayang Kulit diakui UNESCO sejak 2003.",
      "Solo dijuluki 'The Spirit of Java' karena warisan budaya Mataram.",
      "Punakawan (Semar, Gareng, Petruk, Bagong) hanya ada di wayang Jawa.",
      "Mahabharata punya 18 parwa; lakon wayang biasanya pilih 1\u20132 bab.",
      "Pakeliran semalam suntuk bisa tampilkan 5\u20136 jam cerita non-stop.",
      "Gunungan dipakai dalang sebagai pembuka, jeda, dan penutup lakon."
    ],
    "exploreFooterNote": ""
  },
  "tentangKamiPage": {
    "eyebrow": "Akar Cerita Kami",
    "title": "Tentang SATYANTARA",
    "subtitle": "Ruang digital yang menjaga cerita wayang dan kearifan Solo agar tetap hidup di keseharian generasi baru.",
    "sections": [
      {
        "heading": "Lahir dari Solo, untuk Cerita yang Tak Pernah Padam",
        "body": "SATYANTARA tumbuh dari kerinduan akan ruang yang merawat cerita wayang dan budaya Jawa secara utuh — bukan sekadar tampilan, tapi juga makna. Dari Kota Solo, kami merangkai pertunjukan, lakon, kerajinan, dan edukasi menjadi satu pengalaman yang mudah ditemui generasi baru."
      },
      {
        "heading": "Bekerja Bersama Sanggar & Pengrajin",
        "body": "Setiap karya, dari wayang kulit hingga merchandise, lahir dari kerja sama erat dengan sanggar lokal, dalang, dan pengrajin. Kami percaya cerita budaya hanya hidup ketika para penjaganya juga bisa hidup layak — itu sebabnya kemitraan dan transparansi jadi pondasi kami."
      },
      {
        "heading": "Edukasi yang Mengundang Bertanya",
        "body": "Lewat ensiklopedia tokoh wayang, peta budaya 38 provinsi, jadwal acara, dan permainan tebak tokoh, kami ingin Teman Satya tidak hanya menonton — tapi penasaran, ikut bertanya, dan akhirnya jatuh cinta pada cerita yang sudah lebih dulu ada di sekitar mereka."
      }
    ],
    "visi": "Menjadi rumah digital tempat cerita wayang dan budaya Solo terus tumbuh, dikenal, dan diwariskan.",
    "misi": [
      "Menyajikan cerita wayang dan tokohnya secara mudah diakses untuk semua usia.",
      "Bermitra dengan sanggar, dalang, dan pengrajin lokal Solo agar karya mereka punya panggung digital.",
      "Membuka pintu kolaborasi budaya bagi sekolah, komunitas, dan brand yang ingin belajar bersama."
    ],
    "team": [],
    "ctaTitle": "Mari Bercerita Bersama",
    "ctaBody": "Punya pertanyaan, ide kolaborasi, atau ingin mengundang SATYANTARA? Sapa kami lewat WhatsApp atau email — tim kami siap menjawab."
  },
  "faqPage": {
    "eyebrow": "Pertanyaan Umum",
    "title": "FAQ",
    "subtitle": "Hal-hal yang paling sering ditanyakan Teman Satya — dari paket lakon, jadwal workshop, pembayaran, sampai cara kerjasama.",
    "ctaEyebrow": "Masih Ada Pertanyaan?",
    "ctaTitle": "Hubungi Kami Langsung",
    "ctaBody": "Tim SATYANTARA siap membantu lewat WhatsApp atau email. Kami biasanya membalas dalam 1-2 hari kerja."
  },
  "jadwalPage": {
    "eyebrow": "Jadwal Acara",
    "title": "Pertunjukan, Workshop & Festival",
    "subtitle": "Kalender pertunjukan wayang, workshop, festival budaya, dan diskusi yang dijadwalkan SATYANTARA. Pilih acara, daftar via WhatsApp atau link resmi.",
    "emptyTitle": "Belum ada acara terjadwal",
    "emptyBody": "Tim SATYANTARA sedang menyusun jadwal terbaru. Sementara itu, Anda bisa hubungi kami langsung untuk request workshop privat atau pertunjukan grup."
  }
};
