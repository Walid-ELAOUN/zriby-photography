import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zriby Photography | Photographe & Vidéaste de Mariage à Ariana, Tunis",
  description:
    "Photographie & Vidéographie de mariages, fiançailles et shoots studio sur-mesure par Hamdi Zriby. Note 4.8/5 sur Google Maps. Ariana, Grand Tunis.",
  keywords: [
    "photographe mariage tunis",
    "vidéaste mariage ariana",
    "zriby photography",
    "photobook",
    "shoot studio",
    "teaser mariage",
    "hamdi zriby",
    "photographe tunis",
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Zriby Photography | Photographe & Vidéaste de Mariage",
    description:
      "Saisir l'émotion, immortaliser vos plus beaux souvenirs. Photographie & vidéographie haut de gamme à Ariana, Grand Tunis.",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${display.variable} ${body.variable} bg-slate-950 font-body text-zinc-300 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
