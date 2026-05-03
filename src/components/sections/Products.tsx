import { stories } from "@/data/products";
import { StoryCard } from "../ui/StoryCard";
import { Reveal } from "../ui/Reveal";
import { CornerMotif, Ornament } from "../ui/Ornament";

export function Products() {
  return (
    <section
      id="layanan"
      className="section-glow relative px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10 lg:py-16"
    >
      <CornerMotif className="absolute left-3 top-5 h-8 w-8 opacity-60 sm:left-6 sm:top-8 sm:h-12 sm:w-12 sm:opacity-70" />
      <CornerMotif className="absolute right-3 top-5 h-8 w-8 -scale-x-100 opacity-60 sm:right-6 sm:top-8 sm:h-12 sm:w-12 sm:opacity-70" />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 flex flex-col items-center gap-3 text-center sm:mb-14">
            <Ornament className="mb-2 w-32 opacity-80 sm:w-44" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold-400 sm:text-[11px] sm:tracking-[0.45em]">
              Lakon Pilihan
            </span>
            <h2 className="font-display text-3xl leading-tight tracking-tight text-cream min-[400px]:text-4xl sm:text-5xl md:text-6xl">
              Satyantara&rsquo;s Products
            </h2>
            <p className="max-w-2xl text-sm text-parchment/90 sm:text-base">
              Dua lakon yang menjadi pintu masuk pengalaman budaya — dari
              kisah sang kera putih hingga lima saudara penegak dharma.
            </p>
            <div className="gold-divider mt-4 w-full max-w-md" />
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-4xl items-stretch gap-5 sm:grid-cols-2 sm:gap-6">
          {stories.map((s, i) => (
            <StoryCard
              key={s.slug}
              index={i}
              slug={s.slug}
              title={s.title}
              subtitle={s.subtitle}
              price={s.price}
              delay={i * 120}
              imageUrl={s.imageUrl}
              imageAlt={s.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
