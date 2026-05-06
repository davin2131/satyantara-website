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
    stats: { value: string; label: string }[];
    mediaImageUrl?: string;
    mediaImageAlt?: string;
    mediaVideoUrl?: string;
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
    socials: { platform: "youtube" | "telegram" | "instagram" | "facebook" | "tiktok"; href: string }[];
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
    "eyebrow": "Sugeng Rawuh, Teman Satya !",
    "tagline": "Ruang digital yang merangkai cerita Wayang dan kearifan Solo menjadi pengalaman, produk, dan kreasi yang siap menemani harimu.",
    "primaryCta": "Jelajahi Cerita",
    "secondaryCta": "Tentang Kami"
  },
  "aboutBrief": {
    "eyebrow": "Selamat Datang",
    "headingLine1": "Satyantara",
    "headingLine2": "Brand Budaya",
    "headingLine3": "Indonesia.",
    "body": "Halo, Teman Satya! Selamat datang di website digital kami. SATYANTARA hadir dan selalu siap untuk menemani hari harimu, mari lakukan aktivitas positif yang kaya akan pengetahuan. Isi hari hari mu dengan SATYANTARA.",
    "stats": [
      {
        "label": "Produk Sanggar Mitra",
        "value": "12+"
      },
      {
        "label": "Lakon Cerita",
        "value": "2"
      }
    ],
    "mediaImageUrl": "https://cdn.sanity.io/images/4tij5rov/production/c37a5bca42277c3f0996ea015b2e781dc709c7a3-8192x10424.png"
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
        "href": "https://www.youtube.com/@satyantara",
        "platform": "youtube"
      },
      {
        "href": "https://www.instagram.com/satyantara.edutrip",
        "platform": "instagram"
      },
      {
        "href": "www.tiktok.com/@satyantara.edutrip",
        "platform": "tiktok"
      }
    ],
    "contacts": [
      {
        "href": "https://wa.me/6281345617070",
        "kind": "whatsapp",
        "label": "WhatsApp",
        "value": "+62 813-4561-7070"
      },
      {
        "href": "mailto:satyantarasolo@gmail.com",
        "kind": "email",
        "label": "Email",
        "value": "satyantarasolo@gmail.com"
      },
      {
        "href": "#",
        "kind": "sanggar",
        "label": "Sanggar",
        "value": "Solo · Surakarta"
      }
    ],
    "copyright": "© SATYANTARA. Semua hak cipta dilindungi.",
    "tagline": ""
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
      "Mahabharata punya 18 parwa; lakon wayang biasanya pilih 1–2 bab.",
      "Pakeliran semalam suntuk bisa tampilkan 5–6 jam cerita non-stop.",
      "Gunungan dipakai dalang sebagai pembuka, jeda, dan penutup lakon."
    ],
    "exploreFooterNote": "",
    "exploreThumbs": {
      "galeri": {
        "url": "https://cdn.sanity.io/images/4tij5rov/production/115a8f0048dfb29819ba4f4c9682b097b03a7dba-1200x1200.jpg"
      },
      "ensiklopedia": {
        "url": "https://cdn.sanity.io/images/4tij5rov/production/549d06aa171c1f8182cc742606f6a65bc24bc795-736x1020.jpg"
      },
      "peta": {
        "url": "https://cdn.sanity.io/images/4tij5rov/production/b6848ac2212769b300c72e7e2157d691edd6e990-1280x1280.webp"
      },
      "permainan": {
        "url": "https://cdn.sanity.io/images/4tij5rov/production/a3b82624eb2833b8fc016d25c867db5e8c009ef1-225x225.png"
      }
    }
  },
  "tentangKamiPage": {
    "eyebrow": "Akar Cerita Kami",
    "title": "Tentang SATYANTARA",
    "subtitle": "Ruang digital yang menjaga cerita wayang dan kearifan Solo agar tetap hidup di keseharian generasi baru.",
    "sections": [],
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
