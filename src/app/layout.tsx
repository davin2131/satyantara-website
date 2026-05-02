import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SATYANTARA — Warisan Budaya Solo dalam Satu Sentuhan",
  description:
    "SATYANTARA adalah ruang digital yang merangkai cerita Wayang dan kearifan Solo menjadi pengalaman, produk, dan kreasi mewah yang siap menemani harimu.",
  keywords: [
    "SATYANTARA",
    "Wayang",
    "Budaya Solo",
    "Pandawa",
    "Bima Bungkus",
    "Sanggar Wayang",
    "Kerajinan Indonesia",
  ],
  authors: [{ name: "SATYANTARA" }],
  openGraph: {
    title: "SATYANTARA — Warisan Budaya Solo dalam Satu Sentuhan",
    description:
      "Ruang digital yang merangkai cerita Wayang dan kearifan Solo menjadi pengalaman dan kreasi mewah.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
