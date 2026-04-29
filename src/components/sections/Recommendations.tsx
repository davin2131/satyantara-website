import { recommendations } from "@/data/products";
import { StoryCard } from "../ui/StoryCard";
import { Reveal } from "../ui/Reveal";

export function Recommendations() {
  return (
    <section className="relative px-5 py-20 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.45em] text-gold-400/80">
                Untuk Sayners
              </p>
              <h3 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
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

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
          {recommendations.map((r, i) => (
            <StoryCard
              key={`${r.slug}-${i}`}
              index={i}
              slug={r.slug}
              title={r.title}
              price={r.price}
              delay={i * 70}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
