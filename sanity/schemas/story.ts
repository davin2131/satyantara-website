import { defineField, defineType } from "sanity";

export const story = defineType({
  name: "story",
  title: "Lakon (Cerita Wayang)",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Urutan tampil",
      type: "number",
      description:
        "Urutan tampil di section Lakon Pilihan. Semakin kecil, semakin awal.",
      initialValue: 0,
    }),
    defineField({
      name: "title",
      title: "Judul",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (ID unik)",
      type: "slug",
      options: { source: "title", maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subjudul",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Harga",
      type: "string",
      description: "Contoh: Rp 1.000.000",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Deskripsi",
      type: "text",
      rows: 6,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Foto utama (opsional)",
      type: "image",
      options: { hotspot: true },
      description:
        "Kalau kosong, card pakai ilustrasi SVG otomatis. Upload foto untuk ganti.",
      fields: [
        { name: "alt", title: "Alt text (deskripsi untuk aksesibilitas)", type: "string" },
      ],
    }),
    defineField({
      name: "marketplaceUrl",
      title: "Link Marketplace (opsional)",
      type: "url",
      description:
        "Kalau diisi (mis. link Shopee/Tokopedia/Lazada), tombol di modal akan jadi 'Beli di Marketplace' dan langsung membuka link ini. Kalau dikosongkan, produk masuk Keranjang lalu checkout via WhatsApp.",
      validation: (r) =>
        r.uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
    defineField({
      name: "marketplaceLabel",
      title: "Label tombol marketplace (opsional)",
      type: "string",
      description:
        "Contoh: 'Beli di Shopee' atau 'Beli di Tokopedia'. Default: 'Beli di Marketplace'.",
    }),
    defineField({
      name: "requiresDate",
      title: "Wajib pilih tanggal saat pemesanan",
      type: "boolean",
      description:
        "Kalau aktif, pelanggan harus pilih tanggal sebelum bisa masuk keranjang. Cocok untuk lakon yang butuh booking jadwal pertunjukan.",
      initialValue: true,
    }),
    defineField({
      name: "availableDays",
      title: "Hari yang tersedia (opsional)",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Senin", value: "monday" },
          { title: "Selasa", value: "tuesday" },
          { title: "Rabu", value: "wednesday" },
          { title: "Kamis", value: "thursday" },
          { title: "Jumat", value: "friday" },
          { title: "Sabtu", value: "saturday" },
          { title: "Minggu", value: "sunday" },
        ],
      },
      description:
        "Pilih hari-hari yang bisa dipesan. Kalau dikosongkan, default Sabtu & Minggu. Hanya berlaku jika 'Wajib pilih tanggal' aktif.",
      initialValue: ["saturday", "sunday"],
      hidden: ({ parent }) => !parent?.requiresDate,
    }),
    defineField({
      name: "bookingWeeks",
      title: "Jumlah minggu ke depan yang ditampilkan",
      type: "number",
      description:
        "Berapa minggu ke depan yang muncul sebagai opsi tanggal. Default 4 minggu (~8 tanggal kalau Sabtu+Minggu).",
      initialValue: 4,
      validation: (r) => r.min(1).max(26).integer(),
      hidden: ({ parent }) => !parent?.requiresDate,
    }),
    defineField({
      name: "activities",
      title: "Activity",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Nama", type: "string" },
            { name: "detail", title: "Detail", type: "text", rows: 2 },
          ],
          preview: {
            select: { title: "name", subtitle: "detail" },
          },
        },
      ],
    }),
  ],
  orderings: [
    { title: "Urutan", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
