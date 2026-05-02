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
