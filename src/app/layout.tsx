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

const SITE_URL = "https://satyantara-website.vercel.app";
const SITE_NAME = "SATYANTARA — Warisan Budaya Solo dalam Satu Sentuhan";
const SITE_DESCRIPTION =
  "SATYANTARA adalah ruang digital yang merangkai cerita Wayang dan kearifan Solo menjadi pengalaman, produk, dan kreasi mewah yang siap menemani harimu.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "SATYANTARA",
    "Wayang",
    "Budaya Solo",
    "Surakarta",
    "Pandawa",
    "Bima Bungkus",
    "Anoman Obong",
    "Sanggar Wayang",
    "Kerajinan Indonesia",
    "Workshop Wayang",
    "Edukasi Budaya",
  ],
  authors: [{ name: "SATYANTARA" }],
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: SITE_NAME,
    description:
      "Ruang digital yang merangkai cerita Wayang dan kearifan Solo menjadi pengalaman dan kreasi mewah.",
    url: SITE_URL,
    siteName: "SATYANTARA",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SATYANTARA — Warisan Budaya Solo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Ruang digital yang merangkai cerita Wayang dan kearifan Solo menjadi pengalaman dan kreasi mewah.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/",
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
