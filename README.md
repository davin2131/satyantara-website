# SATYANTARA — Website Resmi

Website mewah single-page untuk **SATYANTARA**, brand budaya Solo yang merangkai
cerita Wayang dan kearifan Jawa menjadi pengalaman, produk, dan kreasi.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **Static export** (`output: "export"`) — siap di-host di mana saja
- **Playfair Display** + **Inter** (Google Fonts)
- Ilustrasi SVG buatan sendiri (Gunungan, Wayang, ornamen Topeng/Kalung/Kipas)

## Struktur

```
src/
├── app/
│   ├── layout.tsx       Root layout + fonts + metadata
│   ├── page.tsx         Homepage composition
│   └── globals.css      Theme tokens, batik pattern, reveal animation
├── components/
│   ├── Gunungan.tsx     Ornamen gunungan emas (hero + navbar)
│   ├── sections/        Navbar, Hero, HeroCarousel, AboutBrief,
│   │                    Products, ProductDetail, Recommendations,
│   │                    ProductMitra, TentangKami, Footer
│   └── ui/              Reveal (scroll animation), StoryCard
└── data/
    └── products.ts      Konten lakon, mitra produk, slide carousel
```

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run build        # menghasilkan ./out (static export)
```

## Deploy

Folder `out/` adalah hasil static export — bisa langsung di-upload ke
Vercel, Netlify, Cloudflare Pages, GitHub Pages, atau hosting statis apa pun.
