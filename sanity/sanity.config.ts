import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "";
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

export default defineConfig({
  name: "satyantara-studio",
  title: "Satyantara CMS",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Konten")
          .items([
            S.listItem()
              .title("Setting Halaman (Hero / About / Tentang / Footer)")
              .child(
                S.editor()
                  .id("siteSettings")
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.divider(),
            S.documentTypeListItem("story").title("Lakon"),
            S.documentTypeListItem("recommendation").title("Rekomendasi Produk"),
            S.documentTypeListItem("mitra").title("Produk Mitra"),
            S.documentTypeListItem("heroSlide").title("Slide Carousel"),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
