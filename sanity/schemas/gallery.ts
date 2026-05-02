import { defineField, defineType } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Galeri",
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
      title: "Judul foto",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      description:
        "Upload foto galeri di sini. Kalau dikosongkan, kartu pakai ilustrasi placeholder otomatis.",
      fields: [
        { name: "alt", title: "Alt text", type: "string" },
      ],
    }),
    defineField({
      name: "description",
      title: "Deskripsi foto",
      type: "text",
      rows: 4,
      description: "Deskripsi singkat yang muncul di bawah foto.",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    { title: "Urutan", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});
