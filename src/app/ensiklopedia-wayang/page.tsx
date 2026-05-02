import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { Navbar } from "@/components/sections/Navbar";
import { Encyclopedia } from "@/components/sections/Encyclopedia";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Ensiklopedia Wayang — SATYANTARA",
  description:
    "Mengenal tokoh-tokoh wayang yang menjadi nafas kreasi SATYANTARA — Pandawa, Kurawa, Punakawan, hingga para dewa dan pahlawan.",
};

export default function EnsiklopediaWayangPage() {
  return (
    <AppShell>
      <Navbar />
      <main>
        <Encyclopedia />
      </main>
      <Footer />
    </AppShell>
  );
}
