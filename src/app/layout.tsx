import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Great_Vibes } from "next/font/google";
import "./globals.css";
import { site, asset } from "@/config/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: "By Bobbie — Mobile Lash Artist | I lash, you slay",
  description:
    "Luxury individual eyelash extensions, brought to your door. Classic, hybrid and volume sets by Bobbie — a private mobile lash artist. Book your appointment online.",
  openGraph: {
    title: "By Bobbie — Mobile Lash Artist",
    description:
      "Luxury individual eyelash extensions, brought to your door. I lash, you slay.",
    url: site.domain,
    siteName: "By Bobbie",
    images: [{ url: asset("/video/poster.jpg"), width: 1600, height: 900 }],
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
