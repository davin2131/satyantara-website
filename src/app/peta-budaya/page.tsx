import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { Navbar } from "@/components/sections/Navbar";
import { PetaBudaya } from "@/components/sections/PetaBudaya";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Peta Budaya Indonesia — SATYANTARA",
  description:
    "Peta interaktif 38 provinsi Indonesia. Jelajahi tarian, alat musik, rumah adat, pakaian, makanan, dan seni pertunjukan tiap daerah.",
};

export default function PetaBudayaPage() {
  return (
    <AppShell>
      <Navbar />
      <main>
        <PetaBudaya />
      </main>
      <Footer />
    </AppShell>
  );
}
