import { AppShell } from "@/components/AppShell";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { AboutBrief } from "@/components/sections/AboutBrief";
import { Products } from "@/components/sections/Products";
import { Recommendations } from "@/components/sections/Recommendations";
import { ProductMitra } from "@/components/sections/ProductMitra";
import { TentangKami } from "@/components/sections/TentangKami";
import { Footer } from "@/components/sections/Footer";
import { SectionDivider } from "@/components/ui/Ornament";

export default function Home() {
  return (
    <AppShell>
      <Navbar />
      <main>
        <Hero />
        <SectionDivider variant="diamond" />
        <HeroCarousel />
        <SectionDivider variant="lotus" />
        <AboutBrief />
        <SectionDivider variant="wayang" />
        <Products />
        <SectionDivider variant="diamond" />
        <Recommendations />
        <SectionDivider variant="lotus" />
        <ProductMitra />
        <SectionDivider variant="wayang" />
        <TentangKami />
      </main>
      <Footer />
    </AppShell>
  );
}
