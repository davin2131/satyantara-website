import { defineField, defineType } from "sanity";

export const wayangEntry = defineType({
  name: "wayangEntry",
  title: "Ensiklopedia Wayang",
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
      title: "Nama tokoh",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "alias",
      title: "Nama lain / alias",
      type: "string",
      description: "Misal: Bima → Werkudara, Arjuna → Janaka.",
    }),
    defineField({
      name: "slug",
      title: "Slug (ID unik)",
      type: "slug",
      options: { source: "name", maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Pandawa", value: "pandawa" },
          { title: "Kurawa", value: "kurawa" },
          { title: "Punakawan", value: "punakawan" },
          { title: "Dewa & Pahlawan", value: "dewa-pahlawan" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "origin",
      title: "Asal lakon",
      type: "string",
      options: {
        list: [
          { title: "Mahabharata", value: "mahabharata" },
          { title: "Ramayana", value: "ramayana" },
          { title: "Lain-lain", value: "lain" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "weapon",
      title: "Senjata / pusaka khas",
      type: "string",
      description: "Opsional. Misal Gada Rujakpolo, Panah Pasopati.",
    }),
    defineField({
      name: "summary",
      title: "Ringkasan singkat",
      type: "string",
      description: "Satu kalimat yang muncul di kartu (di bawah nama).",
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "description",
      title: "Deskripsi lengkap",
      type: "text",
      rows: 6,
      description:
        "Paragraf lengkap yang muncul di modal detail saat kartu di-klik.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Foto / ilustrasi",
      type: "image",
      options: { hotspot: true },
      description:
        "Kalau dikosongkan, kartu pakai ilustrasi placeholder otomatis.",
      fields: [
        { name: "alt", title: "Alt text", type: "string" },
      ],
    }),
  ],
  orderings: [
    { title: "Urutan", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "alias", media: "image" },
  },
});
