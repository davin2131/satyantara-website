import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Setting Halaman (Hero, About, Tentang, Footer)",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Section Hero",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow (label kecil di atas)", type: "string" },
        { name: "tagline", title: "Tagline (paragraf di bawah judul)", type: "text", rows: 3 },
        { name: "primaryCta", title: "Tombol utama (label)", type: "string" },
        { name: "secondaryCta", title: "Tombol kedua (label)", type: "string" },
      ],
    }),
    defineField({
      name: "aboutBrief",
      title: "Section Selamat Datang",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "headingLine1", title: "Heading baris 1 (kecil)", type: "string" },
        { name: "headingLine2", title: "Heading baris 2", type: "string" },
        { name: "headingLine3", title: "Heading baris 3 (warna emas)", type: "string" },
        { name: "body", title: "Paragraf", type: "text", rows: 4 },
        {
          name: "mediaImage",
          title: "Foto kolom kiri (opsional)",
          type: "image",
          options: { hotspot: true },
          description:
            "Kalau kosong, kolom kiri pakai heading teks default. Upload foto untuk ganti. Kalau URL Video di bawah terisi, video yg dipakai.",
          fields: [
            { name: "alt", title: "Alt text", type: "string" },
          ],
        },
        {
          name: "mediaVideoUrl",
          title: "URL Video YouTube/Vimeo (opsional)",
          type: "string",
          description:
            "Paste URL YouTube (spt https://www.youtube.com/watch?v=XXXX atau https://youtu.be/XXXX) atau Vimeo. Prioritas tertinggi — kalau terisi, override foto & heading teks.",
        },
        {
          name: "stats",
          title: "Statistik",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "value", title: "Nilai", type: "string" },
                { name: "label", title: "Label", type: "string" },
              ],
              preview: { select: { title: "value", subtitle: "label" } },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "mengapaKami",
      title: "Section Mengapa Satyantara (homepage)",
      type: "object",
      description:
        "Section value-prop di Beranda. Atur eyebrow, judul, subjudul, dan kartu (rekomendasi 3-4 kartu).",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Judul", type: "string" },
        {
          name: "subtitle",
          title: "Subjudul / paragraf intro",
          type: "text",
          rows: 3,
        },
        {
          name: "items",
          title: "Kartu value (rekomendasi 3-4)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "icon",
                  title: "Ikon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Sanggar (rumah joglo)", value: "sanggar" },
                      { title: "Dalang / Pengrajin (orang)", value: "dalang" },
                      { title: "WhatsApp / Chat", value: "whatsapp" },
                      { title: "Budaya / Hati", value: "budaya" },
                      { title: "Wayang", value: "wayang" },
                      { title: "Topeng", value: "topeng" },
                      { title: "Gamelan", value: "gamelan" },
                    ],
                  },
                },
                { name: "title", title: "Judul kartu", type: "string" },
                {
                  name: "body",
                  title: "Deskripsi singkat",
                  type: "text",
                  rows: 3,
                },
              ],
              preview: { select: { title: "title", subtitle: "body" } },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "tentangKami",
      title: "Section Tentang Kami (legacy, sudah tidak ditampilkan di Beranda)",
      description:
        "Field lama. Section ini sudah diganti oleh 'Section Mengapa Satyantara'. Konten tetap disimpan tapi tidak dirender. Halaman Tentang Kami yang lengkap ada di /tentang-kami (lihat field 'Halaman Tentang Kami').",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "heading", title: "Heading", type: "string" },
        { name: "body", title: "Paragraf utama", type: "text", rows: 8 },
        {
          name: "valueCards",
          title: "Kartu nilai (3 kartu di bawah)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "icon",
                  title: "Ikon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Wayang", value: "wayang" },
                      { title: "Topeng", value: "topeng" },
                      { title: "Gamelan", value: "gamelan" },
                    ],
                  },
                },
                { name: "title", title: "Judul", type: "string" },
                { name: "text", title: "Deskripsi", type: "text", rows: 2 },
              ],
              preview: { select: { title: "title", subtitle: "text" } },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "footer",
      title: "Section Footer",
      type: "object",
      fields: [
        { name: "callout", title: "Callout (label di atas sosial)", type: "string" },
        {
          name: "socials",
          title: "Sosial Media",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "platform",
                  title: "Platform",
                  type: "string",
                  options: {
                    list: [
                      { title: "YouTube", value: "youtube" },
                      { title: "Telegram", value: "telegram" },
                      { title: "Instagram", value: "instagram" },
                      { title: "Facebook", value: "facebook" },
                    ],
                  },
                },
                { name: "href", title: "URL", type: "string" },
              ],
              preview: { select: { title: "platform", subtitle: "href" } },
            },
          ],
        },
        {
          name: "contacts",
          title: "Contact Person",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "kind",
                  title: "Jenis",
                  type: "string",
                  options: {
                    list: [
                      { title: "WhatsApp", value: "whatsapp" },
                      { title: "Email", value: "email" },
                      { title: "Sanggar / Alamat", value: "sanggar" },
                    ],
                  },
                },
                { name: "label", title: "Label", type: "string" },
                { name: "value", title: "Nilai", type: "string" },
                { name: "href", title: "URL/href", type: "string" },
              ],
              preview: { select: { title: "label", subtitle: "value" } },
            },
          ],
        },
        { name: "copyright", title: "Copyright", type: "string" },
        { name: "tagline", title: "Tagline kanan bawah", type: "string" },
      ],
    }),
    defineField({
      name: "navbar",
      title: "Section Navbar (Tombol CTA)",
      type: "object",
      fields: [
        {
          name: "ctaLabel",
          title: "Label tombol CTA (legacy, sudah tidak ditampilkan)",
          type: "string",
          description:
            "Field lama untuk tombol 'Pesan via WhatsApp'. Tombol di kanan-atas navbar sudah dihapus, jadi field ini tidak lagi tampil. URL WhatsApp utama masih dipakai oleh halaman FAQ & Jadwal — silakan tetap isi 'URL tombol CTA' di bawah.",
        },
        {
          name: "ctaHref",
          title: "URL WhatsApp utama",
          type: "string",
          description:
            "Dipakai oleh tombol kontak di halaman FAQ & Jadwal. Mis. https://wa.me/6287862181294 (boleh tambahkan ?text= untuk pesan default).",
        },
        {
          name: "exploreThumbGaleri",
          title: "Foto card Galeri (mega-menu)",
          type: "image",
          options: { hotspot: true },
          description:
            "Foto kotak kecil di card 'Galeri' pada mega-menu Eksplorasi. Kalau kosong pakai default.",
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
        {
          name: "exploreThumbEnsiklopedia",
          title: "Foto card Ensiklopedia Wayang (mega-menu)",
          type: "image",
          options: { hotspot: true },
          description:
            "Foto kotak kecil di card 'Ensiklopedia Wayang' pada mega-menu Eksplorasi. Kalau kosong pakai default.",
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
        {
          name: "exploreThumbPeta",
          title: "Foto card Peta Budaya (mega-menu)",
          type: "image",
          options: { hotspot: true },
          description:
            "Foto kotak kecil di card 'Peta Budaya' pada mega-menu Eksplorasi. Kalau kosong pakai default.",
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
        {
          name: "exploreThumbPermainan",
          title: "Foto card Permainan (mega-menu)",
          type: "image",
          options: { hotspot: true },
          description:
            "Foto kotak kecil di card 'Permainan' pada mega-menu Eksplorasi. Kalau kosong pakai default.",
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
        {
          name: "exploreLabel",
          title: "Label dropdown Eksplorasi",
          type: "string",
          description:
            "Mis. 'Eksplorasi'. Mega-menu yang memuat Galeri, Ensiklopedia, Peta Budaya, Permainan.",
        },
        {
          name: "exploreEyebrow",
          title: "Eyebrow di mega-menu (kolom kiri)",
          type: "string",
          description: "Mis. 'Eksplorasi Budaya'.",
        },
        {
          name: "exploreTitle",
          title: "Judul di mega-menu (kolom kiri)",
          type: "text",
          rows: 3,
          description: "Mis. 'Cerita Wayang & Solo, terangkum dalam satu eksplorasi.'",
        },
        {
          name: "exploreBody",
          title: "Deskripsi di mega-menu (kolom kiri)",
          type: "text",
          rows: 4,
        },
        {
          name: "exploreFooterNotes",
          title: "Trivia di footer mega-menu (rotasi otomatis)",
          type: "array",
          of: [{ type: "string" }],
          description:
            "Daftar trivia/kutipan yang muncul bergantian otomatis tiap ~5 detik. Tambahkan sebanyak yang kamu mau.",
        },
        {
          name: "exploreFooterNote",
          title: "Catatan footer (legacy / fallback)",
          type: "string",
          description:
            "Dipakai HANYA kalau daftar trivia di atas kosong. Boleh dibiarkan kosong.",
        },
      ],
    }),
    defineField({
      name: "faqPage",
      title: "Halaman FAQ",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow (label kecil di atas)", type: "string" },
        { name: "title", title: "Judul halaman", type: "string" },
        { name: "subtitle", title: "Subjudul / paragraf intro", type: "text", rows: 3 },
        {
          name: "ctaEyebrow",
          title: "Eyebrow blok 'Masih ada pertanyaan?'",
          type: "string",
        },
        {
          name: "ctaTitle",
          title: "Judul blok 'Masih ada pertanyaan?'",
          type: "string",
        },
        {
          name: "ctaBody",
          title: "Paragraf blok 'Masih ada pertanyaan?'",
          type: "text",
          rows: 3,
        },
      ],
    }),
    defineField({
      name: "tentangKamiPage",
      title: "Halaman Tentang Kami (lengkap, /tentang-kami)",
      type: "object",
      description:
        "Konten halaman dedicated /tentang-kami. Berbeda dari section 'Tentang Kami' yang ada di Beranda — yang ini lebih panjang (cerita, visi & misi, foto, tim, kontak).",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Judul halaman", type: "string" },
        { name: "subtitle", title: "Subjudul / paragraf intro", type: "text", rows: 3 },
        {
          name: "heroImage",
          title: "Foto hero (opsional)",
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
        {
          name: "sections",
          title: "Section / cerita panjang",
          type: "array",
          description:
            "Tiap section punya judul + paragraf + foto opsional. Tampil berurutan, foto bergantian kiri-kanan.",
          of: [
            {
              type: "object",
              fields: [
                { name: "heading", title: "Judul section", type: "string" },
                { name: "body", title: "Paragraf", type: "text", rows: 6 },
                {
                  name: "image",
                  title: "Foto (opsional)",
                  type: "image",
                  options: { hotspot: true },
                  fields: [{ name: "alt", title: "Alt text", type: "string" }],
                },
              ],
              preview: { select: { title: "heading", subtitle: "body" } },
            },
          ],
        },
        {
          name: "visi",
          title: "Visi (1 kalimat)",
          type: "text",
          rows: 3,
        },
        {
          name: "misi",
          title: "Misi (poin per baris)",
          type: "array",
          of: [{ type: "string" }],
          description: "Tambahkan misi sebagai daftar — masing-masing poin satu baris.",
        },
        {
          name: "team",
          title: "Tim / Founder (opsional)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "name", title: "Nama", type: "string" },
                { name: "role", title: "Peran/Posisi", type: "string" },
                { name: "bio", title: "Bio singkat", type: "text", rows: 3 },
                {
                  name: "photo",
                  title: "Foto",
                  type: "image",
                  options: { hotspot: true },
                  fields: [{ name: "alt", title: "Alt text", type: "string" }],
                },
              ],
              preview: { select: { title: "name", subtitle: "role" } },
            },
          ],
        },
        {
          name: "ctaTitle",
          title: "Judul blok kontak",
          type: "string",
        },
        {
          name: "ctaBody",
          title: "Paragraf blok kontak",
          type: "text",
          rows: 3,
        },
      ],
    }),
    defineField({
      name: "jadwalPage",
      title: "Halaman Jadwal Acara",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "title", title: "Judul halaman", type: "string" },
        { name: "subtitle", title: "Subjudul / paragraf intro", type: "text", rows: 3 },
        {
          name: "emptyTitle",
          title: "Judul saat belum ada acara",
          type: "string",
        },
        {
          name: "emptyBody",
          title: "Paragraf saat belum ada acara",
          type: "text",
          rows: 3,
        },
      ],
    }),
  ],
});
