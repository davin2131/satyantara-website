import { defineField, defineType } from "sanity";

const TONES = ["amber", "rose", "emerald", "indigo", "ochre", "rust"] as const;

export const mitra = defineType({
  name: "mitra",
  title: "Produk Mitra",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Urutan tampil",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "name",
      title: "Nama produk",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (ID unik)",
      type: "slug",
      options: { source: "name", maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Harga",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "pricePer",
      title: "Per satuan (opsional)",
      type: "string",
      description: 'Contoh: "/biji"',
    }),
    defineField({
      name: "badge",
      title: "Badge (opsional)",
      type: "string",
      description: "Contoh: New, Best Seller",
    }),
    defineField({
      name: "tone",
      title: "Tone warna",
      type: "string",
      options: { list: TONES.map((t) => ({ title: t, value: t })) },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Deskripsi",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "highlights",
      title: "Highlight (poin singkat)",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  orderings: [
    { title: "Urutan", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
