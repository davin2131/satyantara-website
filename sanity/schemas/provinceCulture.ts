import { defineField, defineType } from "sanity";

export const provinceCulture = defineType({
  name: "provinceCulture",
  title: "Peta Budaya - Provinsi",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Kode provinsi (BPS, mis. 33, 91-A)",
      type: "string",
      description:
        "Harus sama dengan id di src/data/indonesiaMap.ts agar peta menampilkan data ini.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "name",
      title: "Nama provinsi",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "capital",
      title: "Ibukota",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "region",
      title: "Wilayah / Pulau",
      type: "string",
      options: {
        list: [
          { title: "Sumatera", value: "sumatera" },
          { title: "Jawa", value: "jawa" },
          { title: "Bali & Nusa Tenggara", value: "bali-nusa-tenggara" },
          { title: "Kalimantan", value: "kalimantan" },
          { title: "Sulawesi", value: "sulawesi" },
          { title: "Maluku", value: "maluku" },
          { title: "Papua", value: "papua" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "dance",
      title: "Tarian khas",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "music",
      title: "Alat musik tradisional",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "house",
      title: "Rumah adat",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "attire",
      title: "Pakaian adat",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "food",
      title: "Makanan khas",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "performingArt",
      title: "Seni pertunjukan / wayang",
      type: "string",
      description: "Wayang, teater rakyat, tari pertunjukan, dsb.",
    }),
    defineField({
      name: "description",
      title: "Deskripsi singkat",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Foto / ilustrasi",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
  ],
  orderings: [
    {
      title: "Kode provinsi",
      name: "codeAsc",
      by: [{ field: "code", direction: "asc" }],
    },
    {
      title: "Nama provinsi",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "capital", media: "image" },
  },
});
