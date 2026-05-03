import { defineArrayMember, defineField, defineType } from "sanity";

export const faqGroup = defineType({
  name: "faqGroup",
  title: "FAQ — Grup Pertanyaan",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul grup",
      type: "string",
      description:
        "Mis. 'Tentang SATYANTARA', 'Lakon & Workshop', 'Pemesanan & Pembayaran'.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Urutan tampil",
      type: "number",
      description:
        "Angka kecil = tampil duluan. Pakai 10, 20, 30 supaya gampang sisipkan grup baru.",
      initialValue: 10,
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "items",
      title: "Daftar pertanyaan",
      type: "array",
      validation: (r) => r.required().min(1),
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          title: "Pertanyaan",
          fields: [
            defineField({
              name: "question",
              title: "Pertanyaan",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "answer",
              title: "Jawaban",
              type: "text",
              rows: 5,
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "question", subtitle: "answer" },
            prepare({ title, subtitle }) {
              return {
                title: title ?? "Pertanyaan",
                subtitle:
                  typeof subtitle === "string"
                    ? subtitle.slice(0, 80) + (subtitle.length > 80 ? "…" : "")
                    : "",
              };
            },
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Urutan tampil",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", order: "order", items: "items" },
    prepare({ title, order, items }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: title ?? "Grup FAQ",
        subtitle: `#${order ?? "?"} • ${count} pertanyaan`,
      };
    },
  },
});
