import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { Navbar } from "@/components/sections/Navbar";
import { TentangKamiPage } from "@/components/sections/TentangKamiPage";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Tentang Kami — SATYANTARA",
  description:
    "SATYANTARA adalah ruang digital yang merangkai cerita wayang dan kearifan Solo. Kenali visi, misi, tim, dan sanggar mitra di balik setiap lakon, workshop, dan karya budaya kami.",
};

export default function TentangKamiRoute() {
  return (
    <AppShell>
      <Navbar />
      <main>
        <TentangKamiPage />
      </main>
      <Footer />
    </AppShell>
  );
}
