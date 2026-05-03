"use client";

import { useState } from "react";
import { Reveal } from "../ui/Reveal";

type FaqGroup = {
  title: string;
  items: { q: string; a: string }[];
};

const groups: FaqGroup[] = [
  {
    title: "Tentang SATYANTARA",
    items: [
      {
        q: "Apa itu SATYANTARA?",
        a: "SATYANTARA adalah brand budaya yang lahir dari Solo (Surakarta). Kami merangkai cerita Wayang dan kearifan Jawa menjadi pengalaman edukatif yang ramah anak muda — dari workshop, lakon pertunjukan, sampai produk kerajinan dari sanggar mitra.",
      },
      {
        q: "Siapa yang bisa ikut workshop SATYANTARA?",
        a: "Semua usia, terutama remaja, mahasiswa, dan keluarga. Workshop kami didesain supaya mudah diikuti pemula tanpa perlu latar belakang seni — cukup bawa rasa ingin tahu.",
      },
      {
        q: "Di mana lokasi sanggar SATYANTARA?",
        a: "Kami berbasis di Solo (Surakarta), Jawa Tengah. Untuk alamat detail dan koordinasi kunjungan, silakan hubungi kami via WhatsApp di footer halaman.",
      },
    ],
  },
  {
    title: "Lakon & Workshop",
    items: [
      {
        q: "Apa bedanya Lakon Bima Bungkus dan Anoman Obong?",
        a: "Bima Bungkus mengangkat kisah lahirnya Werkudara — fokus pada proses 'pecah' dari bungkus sakti, cocok untuk eksplorasi tema keberanian. Anoman Obong mengangkat kisah Sang Kera Putih membakar Alengka — fokus pada strategi dan loyalitas. Keduanya 1 hari penuh, harga Rp 1.000.000.",
      },
      {
        q: "Berapa lama durasi satu workshop?",
        a: "Sekitar 4–6 jam dalam satu hari, sudah termasuk sesi cerita, DIY (rakit wayang kertas / bookmark), dan dokumentasi. Kami fleksibel kalau kelompok kamu butuh format yang berbeda.",
      },
      {
        q: "Workshop bisa untuk grup atau hanya individu?",
        a: "Bisa keduanya. Untuk grup (sekolah, kantor, komunitas), hubungi kami untuk dapat penawaran khusus dengan jumlah peserta minimum tertentu.",
      },
      {
        q: "Apakah saya dapat sertifikat / dokumentasi?",
        a: "Ya, peserta mendapat foto dokumentasi dan story book eksklusif. Untuk grup sekolah/komunitas, sertifikat partisipasi bisa kami siapkan atas permintaan.",
      },
    ],
  },
  {
    title: "Pemesanan & Pembayaran",
    items: [
      {
        q: "Bagaimana cara pesan paket lakon atau produk mitra?",
        a: "Pilih item dari halaman Beranda → Layanan atau Produk Mitra → klik produknya → pilih tanggal (untuk paket lakon) → masukkan ke keranjang → checkout via WhatsApp. Tim kami akan konfirmasi ketersediaan dan instruksi pembayaran.",
      },
      {
        q: "Metode pembayarannya apa?",
        a: "Transfer bank atau e-wallet (DANA, OVO, GoPay) — detail rekening akan dikirim setelah konfirmasi via WhatsApp. Kami belum menerima pembayaran kartu kredit otomatis.",
      },
      {
        q: "Bisakah saya reschedule jadwal workshop?",
        a: "Bisa, minimal H-3 sebelum tanggal pelaksanaan. Reschedule mendadak (kurang dari 3 hari) tergantung ketersediaan sanggar mitra dan dapat dikenakan biaya admin.",
      },
      {
        q: "Bagaimana kebijakan refund?",
        a: "Pembatalan H-7 atau lebih: refund 80%. H-3 sampai H-7: refund 50%. Kurang dari H-3: tidak ada refund, tapi bisa kami konversi jadi voucher untuk lakon berikutnya.",
      },
    ],
  },
  {
    title: "Konten & Sumber Cerita",
    items: [
      {
        q: "Tokoh wayang di Ensiklopedia datanya dari mana?",
        a: "Kami merangkum dari pakem Mahabharata dan Ramayana versi Jawa, ditambah refleksi dari para dalang dan literatur akademik. Kalau kamu temukan info yang perlu dikoreksi, kabari kami via WhatsApp/email.",
      },
      {
        q: "Peta Budaya 38 provinsi sumbernya apa?",
        a: "Data tarian, alat musik, rumah adat, pakaian, dan makanan kami rangkum dari sumber budaya umum (Wikipedia, Kemendikbud, dan referensi daerah). Foto landmark dari Wikipedia Commons (lisensi terbuka).",
      },
      {
        q: "Apakah Permainan Tebak Tokoh bisa dimainkan berkali-kali?",
        a: "Ya, setiap sesi pertanyaannya diacak ulang dari Ensiklopedia — sehingga tiap sesi terasa berbeda. Cocok untuk belajar santai sambil main.",
      },
    ],
  },
  {
    title: "Kerja Sama & Kontak",
    items: [
      {
        q: "Saya seniman / sanggar, bisa kerjasama dengan SATYANTARA?",
        a: "Sangat bisa. Kami selalu terbuka kolaborasi dengan dalang, perajin, sanggar, dan komunitas budaya. Kirim proposal singkat via email atau WhatsApp, kami balas dalam 2-3 hari kerja.",
      },
      {
        q: "Saya mau wawancara / liputan untuk media, hubungi siapa?",
        a: "Silakan kirim email ke alamat di footer dengan subjek 'Media — [nama media]'. Kami siapkan press kit, foto resolusi tinggi, dan jadwal wawancara dengan founder/dalang mitra.",
      },
    ],
  },
];

export function FAQ() {
  // Buka pertanyaan pertama secara default supaya page tidak terlihat kosong.
  const [open, setOpen] = useState<string | null>("0-0");

  const toggle = (key: string) => setOpen((prev) => (prev === key ? null : key));

  return (
    <section
      id="faq"
      className="section-glow relative px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-8 lg:px-10 lg:pb-24 lg:pt-36"
    >
      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <div className="mb-10 flex flex-col items-center gap-4 text-center sm:mb-14 sm:gap-5">
            <p className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.4em] text-gold-400 sm:gap-3 sm:text-[11px] sm:tracking-[0.5em]">
              <span className="h-px w-6 bg-gold-500/60 sm:w-10" />
              Pertanyaan Umum
              <span className="h-px w-6 bg-gold-500/60 sm:w-10" />
            </p>
            <h1 className="font-display text-4xl leading-tight text-cream min-[400px]:text-5xl sm:text-6xl md:text-7xl">
              <span className="shimmer-text">FAQ</span>
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-parchment/90 sm:text-base">
              Hal-hal yang paling sering ditanyakan Teman Satya — dari paket lakon, jadwal workshop, pembayaran, sampai cara kerjasama.
            </p>
          </div>
        </Reveal>

        <div className="space-y-10">
          {groups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 80}>
              <div>
                <h2 className="mb-4 text-xs uppercase tracking-[0.32em] text-gold-300 sm:text-sm">
                  {group.title}
                </h2>
                <ul className="space-y-3">
                  {group.items.map((item, ii) => {
                    const key = `${gi}-${ii}`;
                    const isOpen = open === key;
                    return (
                      <li
                        key={key}
                        className="overflow-hidden rounded-2xl border border-gold-500/20 bg-coffee-900/50"
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => toggle(key)}
                          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-gold-500/5 sm:px-6 sm:py-5"
                        >
                          <span className="font-display text-base text-cream sm:text-lg">
                            {item.q}
                          </span>
                          <ChevronIcon
                            className={`h-5 w-5 flex-none text-gold-300 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                            isOpen
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="px-5 pb-5 text-sm leading-relaxed text-parchment/90 sm:px-6 sm:pb-6 sm:text-base">
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div className="mt-12 rounded-2xl border border-gold-500/20 bg-gradient-to-br from-coffee-900/70 to-coffee-800/40 px-6 py-8 text-center sm:px-10 sm:py-10">
            <p className="text-xs uppercase tracking-[0.32em] text-gold-300 sm:text-sm">
              Masih Ada Pertanyaan?
            </p>
            <h3 className="mt-3 font-display text-2xl text-cream sm:text-3xl">
              Hubungi Kami Langsung
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-parchment/90 sm:text-base">
              Tim SATYANTARA siap membantu lewat WhatsApp atau email. Kami biasanya membalas dalam 1-2 hari kerja.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="https://wa.me/6287862181294"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-300 to-gold-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-coffee-950 transition hover:from-gold-400 hover:to-gold-600 sm:px-7 sm:text-sm"
              >
                Chat WhatsApp
              </a>
              <a
                href="mailto:satyantarasolo@gmail.com"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-gold-500/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cream transition hover:border-gold-300 hover:bg-gold-500/10 hover:text-gold-200 sm:px-7 sm:text-sm"
              >
                Kirim Email
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
