import { recommendations } from "@/data/products";
import { StoryCard } from "../ui/StoryCard";
import { Reveal } from "../ui/Reveal";

export function Recommendations() {
  return (
    <section className="section-glow relative px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10 sm:gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold-400/80 sm:text-[11px] sm:tracking-[0.45em]">
                Untuk Sayners
              </p>
              <h3 className="mt-2 font-display text-2xl leading-tight text-cream min-[400px]:text-3xl sm:text-4xl">
                Rekomendasi Produk
              </h3>
            </div>
            <a
              href="#layanan"
              className="hidden items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold-300 hover:text-gold-200 sm:inline-flex"
            >
              Lihat Semua →
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {recommendations.map((r, i) => (
            <StoryCard
              key={`${r.slug}-${i}`}
              index={i}
              slug={r.slug}
              title={r.title}
              price={r.price}
              delay={i * 70}
              imageUrl={r.imageUrl}
              imageAlt={r.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
