// Default seed untuk halaman /privasi & /syarat-ketentuan.
// Bisa di-override via Sanity Studio (collection "Halaman Legal").
// Setelah Anda publish dokumen Sanity, jalankan `npm run sanity:sync`
// untuk regenerate file ini sesuai isi Studio.

export type LegalPageKind = "privacy" | "terms";

export type LegalPage = {
  kind: LegalPageKind;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const legalPages: LegalPage[] = [
  {
    kind: "privacy",
    title: "Kebijakan Privasi",
    lastUpdated: "1 Januari 2026",
    intro:
      "Kebijakan Privasi ini menjelaskan bagaimana SATYANTARA mengumpulkan, menggunakan, dan melindungi informasi yang Anda berikan ketika menggunakan situs web ini. Dengan mengakses atau menggunakan layanan kami, Anda menyetujui praktik yang dijelaskan dalam dokumen ini.",
    sections: [
      {
        heading: "1. Informasi yang Kami Kumpulkan",
        paragraphs: [
          "Kami hanya mengumpulkan data yang Anda berikan secara sukarela ketika menghubungi kami melalui WhatsApp, email, atau form kontak — misalnya nama, nomor telepon, alamat email, dan pesan yang Anda kirim.",
          "Selain itu, server hosting kami dapat mencatat data teknis standar (alamat IP, jenis perangkat, browser, dan halaman yang dikunjungi) untuk keperluan keamanan dan analitik agregat. Data ini tidak digunakan untuk mengidentifikasi Anda secara pribadi.",
        ],
      },
      {
        heading: "2. Bagaimana Kami Menggunakan Informasi Anda",
        paragraphs: [
          "Informasi yang Anda berikan kami gunakan hanya untuk: (a) merespons pertanyaan, pemesanan, atau permintaan kerjasama; (b) mengirim informasi tentang lakon, workshop, atau acara yang Anda minati; (c) memperbaiki kualitas layanan dan konten situs.",
          "Kami tidak menjual, menyewakan, atau menukar data pribadi Anda dengan pihak ketiga untuk tujuan komersial.",
        ],
      },
      {
        heading: "3. Penyimpanan & Keamanan Data",
        paragraphs: [
          "Data yang Anda kirim disimpan di sistem internal SATYANTARA dan platform pihak ketiga yang terpercaya (mis. layanan WhatsApp Business, email provider). Kami berusaha menerapkan langkah keamanan yang wajar untuk mencegah akses, perubahan, atau pengungkapan tanpa izin.",
          "Meski demikian, tidak ada metode transmisi data lewat internet yang sepenuhnya aman; kami tidak dapat menjamin keamanan absolut.",
        ],
      },
      {
        heading: "4. Cookie & Penyimpanan Lokal",
        paragraphs: [
          "Situs ini menggunakan penyimpanan lokal browser (localStorage) untuk menyimpan keranjang belanja sementara dan preferensi tampilan, agar pengalaman Anda tetap nyaman saat kembali ke situs. Data ini tidak dikirim ke server kami dan dapat Anda hapus kapan saja melalui pengaturan browser.",
        ],
      },
      {
        heading: "5. Layanan Pihak Ketiga",
        paragraphs: [
          "Saat Anda klik tombol 'Pesan via WhatsApp' atau 'Beli di Marketplace', Anda akan diarahkan ke layanan pihak ketiga (WhatsApp, Shopee, Tokopedia, dll.) yang memiliki kebijakan privasi tersendiri. Kami menyarankan Anda membaca kebijakan masing-masing penyedia tersebut.",
        ],
      },
      {
        heading: "6. Hak Anda",
        paragraphs: [
          "Anda berhak meminta akses, koreksi, atau penghapusan data pribadi yang kami simpan, sejauh diperbolehkan oleh hukum yang berlaku. Untuk permintaan tersebut, silakan hubungi kami melalui kontak yang tertera di bagian Footer situs.",
        ],
      },
      {
        heading: "7. Perubahan Kebijakan",
        paragraphs: [
          "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Versi terbaru selalu tersedia di halaman ini, dengan tanggal pembaruan terakhir tercantum di atas.",
        ],
      },
    ],
  },
  {
    kind: "terms",
    title: "Syarat & Ketentuan",
    lastUpdated: "1 Januari 2026",
    intro:
      "Syarat & Ketentuan ini mengatur penggunaan situs web SATYANTARA serta layanan yang kami tawarkan. Dengan mengakses situs ini, Anda menyetujui untuk terikat oleh ketentuan berikut.",
    sections: [
      {
        heading: "1. Ruang Lingkup Layanan",
        paragraphs: [
          "SATYANTARA menyediakan informasi, konten edukasi budaya, paket lakon (pertunjukan & workshop wayang), serta katalog produk merchandise dari sanggar mitra. Pemesanan dan transaksi dilakukan melalui WhatsApp atau marketplace pihak ketiga yang ditautkan dari situs ini.",
          "Konten ensiklopedia, peta budaya, dan permainan disediakan untuk tujuan edukasi dan pelestarian budaya. Kami berusaha menjaga akurasi konten, namun tidak menjamin bebas dari kekeliruan.",
        ],
      },
      {
        heading: "2. Pemesanan & Pembayaran",
        paragraphs: [
          "Pemesanan paket lakon atau produk menjadi sah ketika telah dikonfirmasi oleh tim SATYANTARA melalui WhatsApp atau email. Kami berhak menolak atau membatalkan pesanan jika terjadi kesalahan harga, ketersediaan, atau alasan operasional lain.",
          "Harga yang tertera di situs dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu. Harga final selalu dikonfirmasi sebelum pembayaran dilakukan.",
          "Untuk pembelian merchandise, pembayaran dilakukan via metode yang tersedia di marketplace pihak ketiga (Shopee, Tokopedia, dll.) atau transfer langsung sesuai kesepakatan.",
        ],
      },
      {
        heading: "3. Pertunjukan & Workshop",
        paragraphs: [
          "Tanggal pertunjukan/workshop yang dipilih melalui keranjang bersifat usulan; kepastian jadwal akan dikonfirmasi via WhatsApp setelah pembayaran. Reschedule dimungkinkan dengan kesepakatan kedua belah pihak.",
          "Pembatalan oleh pelanggan dengan pemberitahuan minimal 7 hari sebelum acara dapat memperoleh refund parsial sesuai kebijakan tim. Pembatalan dadakan kurang dari 3 hari umumnya tidak dapat dikembalikan, namun tetap dievaluasi case-by-case.",
        ],
      },
      {
        heading: "4. Hak Cipta & Konten",
        paragraphs: [
          "Seluruh konten di situs ini — termasuk teks, gambar, ilustrasi, logo SATYANTARA, dan materi audio-visual — dilindungi hak cipta dan menjadi milik SATYANTARA atau pemberi lisensinya, kecuali dinyatakan sebaliknya.",
          "Foto wayang dan landmark budaya tertentu yang berasal dari Wikimedia Commons / Public Domain dipakai sesuai lisensi yang berlaku, dengan atribusi tercantum di file `public/wayang/CREDITS.md` dan `public/provinces/CREDITS.md`.",
          "Anda dapat mengutip konten edukatif untuk keperluan non-komersial dengan menyebutkan sumber. Penggunaan komersial memerlukan izin tertulis dari kami.",
        ],
      },
      {
        heading: "5. Tautan ke Pihak Ketiga",
        paragraphs: [
          "Situs ini dapat memuat tautan ke layanan pihak ketiga (WhatsApp, marketplace, sosial media). Kami tidak bertanggung jawab atas isi, kebijakan, atau praktik dari layanan eksternal tersebut.",
        ],
      },
      {
        heading: "6. Batasan Tanggung Jawab",
        paragraphs: [
          "SATYANTARA tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan situs ini, sepanjang diizinkan oleh hukum yang berlaku.",
        ],
      },
      {
        heading: "7. Perubahan Ketentuan",
        paragraphs: [
          "Kami dapat memperbarui Syarat & Ketentuan ini sewaktu-waktu. Penggunaan situs setelah perubahan dianggap sebagai persetujuan terhadap versi terbaru.",
        ],
      },
      {
        heading: "8. Hukum yang Berlaku",
        paragraphs: [
          "Ketentuan ini tunduk pada hukum yang berlaku di Republik Indonesia. Setiap perselisihan akan diselesaikan secara musyawarah; jika tidak tercapai, dapat diselesaikan melalui jalur hukum di wilayah Surakarta.",
        ],
      },
    ],
  },
];

export function getLegalPage(
  kind: LegalPageKind,
  fallback?: LegalPage,
): LegalPage {
  const found = legalPages.find((p) => p.kind === kind);
  if (found) return found;
  if (fallback) return fallback;
  throw new Error(`Legal page not found: ${kind}`);
}
