import { defineField, defineType } from "sanity";

export const heroSlide = defineType({
  name: "heroSlide",
  title: "Slide Carousel (Galeri Budaya)",
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
      title: "Judul slide",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  orderings: [
    { title: "Urutan", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
