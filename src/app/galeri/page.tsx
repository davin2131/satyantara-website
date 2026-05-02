import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { Navbar } from "@/components/sections/Navbar";
import { Gallery } from "@/components/sections/Gallery";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Galeri — SATYANTARA",
  description:
    "Bingkai cerita SATYANTARA: kumpulan foto wayang, sanggar, dan ornamen budaya Solo yang menjadi inspirasi setiap kreasi kami.",
};

export default function GaleriPage() {
  return (
    <AppShell>
      <Navbar />
      <main>
        <Gallery />
      </main>
      <Footer />
    </AppShell>
  );
}
