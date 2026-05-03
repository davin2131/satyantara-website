import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Jadwal Acara",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul acara",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Pertunjukan Wayang", value: "pertunjukan" },
          { title: "Workshop", value: "workshop" },
          { title: "Festival", value: "festival" },
          { title: "Diskusi / Talkshow", value: "diskusi" },
          { title: "Lainnya", value: "lainnya" },
        ],
        layout: "radio",
      },
      initialValue: "pertunjukan",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "startDate",
      title: "Tanggal & jam mulai",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      title: "Tanggal & jam selesai (opsional)",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Lokasi",
      type: "string",
      description: "Mis. 'Sanggar Wayang Solo, Jl. Slamet Riyadi No.123'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Deskripsi singkat",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "registrationUrl",
      title: "Link daftar / pesan tiket (opsional)",
      type: "url",
      description:
        "Bisa link WhatsApp (https://wa.me/...), formulir Google Form, atau marketplace tiket. Kalau kosong, akan diarahkan ke kontak WhatsApp default.",
    }),
    defineField({
      name: "image",
      title: "Foto / poster acara (opsional)",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({
      name: "isFeatured",
      title: "Tampilkan sebagai unggulan?",
      type: "boolean",
      initialValue: false,
      description: "Acara unggulan akan diberi badge khusus di halaman /jadwal.",
    }),
  ],
  orderings: [
    {
      title: "Tanggal terdekat",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "startDate", media: "image" },
    prepare({ title, subtitle, media }) {
      let when = "";
      if (typeof subtitle === "string") {
        try {
          when = new Date(subtitle).toLocaleString("id-ID", {
            dateStyle: "medium",
            timeStyle: "short",
          });
        } catch {
          when = subtitle;
        }
      }
      return { title: title ?? "Acara", subtitle: when, media };
    },
  },
});
