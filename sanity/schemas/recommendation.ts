import { defineField, defineType } from "sanity";

export const recommendation = defineType({
  name: "recommendation",
  title: "Rekomendasi Produk",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Urutan tampil",
      type: "number",
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
      name: "price",
      title: "Harga",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "marketplaceUrl",
      title: "Link Marketplace (opsional)",
      type: "url",
      description:
        "Kalau diisi (mis. Shopee/Tokopedia), tombol di modal jadi 'Beli di Marketplace' dan buka link langsung. Kalau dikosongkan, masuk Keranjang lalu checkout WhatsApp.",
      validation: (r) =>
        r.uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
    defineField({
      name: "marketplaceLabel",
      title: "Label tombol marketplace (opsional)",
      type: "string",
      description: "Contoh: 'Beli di Shopee'. Default: 'Beli di Marketplace'.",
    }),
    defineField({
      name: "image",
      title: "Foto (opsional)",
      type: "image",
      options: { hotspot: true },
      description:
        "Kalau kosong, card pakai ilustrasi SVG otomatis. Upload foto untuk ganti.",
      fields: [
        { name: "alt", title: "Alt text", type: "string" },
      ],
    }),
  ],
  orderings: [
    { title: "Urutan", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
