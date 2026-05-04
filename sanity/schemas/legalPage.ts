import { defineArrayMember, defineField, defineType } from "sanity";

export const legalPage = defineType({
  name: "legalPage",
  title: "Halaman Legal (Privasi & Syarat)",
  type: "document",
  description:
    "Buat 2 dokumen: 'Kebijakan Privasi' (kind=privacy) dan 'Syarat & Ketentuan' (kind=terms).",
  fields: [
    defineField({
      name: "kind",
      title: "Jenis halaman",
      type: "string",
      options: {
        list: [
          { title: "Kebijakan Privasi (/privasi)", value: "privacy" },
          { title: "Syarat & Ketentuan (/syarat-ketentuan)", value: "terms" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Judul halaman",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Tanggal pembaruan terakhir",
      type: "date",
      description: "Mis. 1 Januari 2026 — tampil di header halaman.",
    }),
    defineField({
      name: "intro",
      title: "Paragraf pembuka",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "sections",
      title: "Section",
      type: "array",
      validation: (r) => r.required().min(1),
      of: [
        defineArrayMember({
          type: "object",
          name: "legalSection",
          fields: [
            defineField({
              name: "heading",
              title: "Judul section",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "paragraphs",
              title: "Paragraf",
              type: "array",
              of: [{ type: "text" }],
              description:
                "Tambahkan paragraf satu per satu. Setiap paragraf akan tampil terpisah.",
              validation: (r) => r.required().min(1),
            }),
          ],
          preview: {
            select: { title: "heading", paragraphs: "paragraphs" },
            prepare({ title, paragraphs }) {
              const first = Array.isArray(paragraphs) ? paragraphs[0] : "";
              return {
                title: title ?? "Section",
                subtitle:
                  typeof first === "string"
                    ? first.slice(0, 80) + (first.length > 80 ? "…" : "")
                    : "",
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", kind: "kind" },
    prepare({ title, kind }) {
      const label =
        kind === "privacy"
          ? "Kebijakan Privasi"
          : kind === "terms"
            ? "Syarat & Ketentuan"
            : "Legal";
      return { title: title ?? label, subtitle: label };
    },
  },
});
