import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes, Lato, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

const lato = Lato({
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Defining Modern Elegance",
  description: "Spaces Crafted for Living. Where structural integrity meets curated warmth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} ${lato.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" href="/assets/about-precision.webp" as="image" />
        <link rel="preload" href="/assets/about-reality.webp" as="image" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
