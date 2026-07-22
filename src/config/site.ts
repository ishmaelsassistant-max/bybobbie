// Base URL for static media (videos/images).
// "" serves from this app's own /public folder (local dev and any git-based
// deploy). It can be set to a CDN base (e.g. a jsDelivr mirror of the repo) for
// deployments where the media is hosted separately from the code.
export const assetBase = process.env.NEXT_PUBLIC_ASSET_BASE ?? "";

export const asset = (path: string) => `${assetBase}${path}`;

export const site = {
  name: "By Bobbie",
  domain: "https://bybobbie.co.uk",
  tagline: "I lash, you slay",
  role: "Mobile Lash Artist",
  // Once Bobbie has created her free Cal.com account, put her username here
  // (e.g. "bybobbie") and the booking section will switch from the enquiry
  // card to the live calendar automatically. See SETUP.md.
  calUsername: "",
  email: "hello@bybobbie.co.uk",
  instagram: "", // e.g. "https://instagram.com/bybobbie.lashes"
  serviceArea: "Mobile appointments — I come to you",
};

export type Service = { name: string; price: number; note?: string; slug: string };

export const serviceGroups: { title: string; services: Service[] }[] = [
  {
    title: "Full Sets",
    services: [
      { name: "Classic", price: 110, note: "Timeless, natural definition", slug: "classic-full-set" },
      { name: "Hybrid", price: 125, note: "The best of classic & volume", slug: "hybrid-full-set" },
      { name: "Volume", price: 135, note: "Full, fluffy, unapologetic", slug: "volume-full-set" },
      { name: "Half Set Classic", price: 80, note: "A subtle, elegant lift", slug: "half-set-classic" },
    ],
  },
  {
    title: "Infills",
    services: [
      { name: "Classic Infill", price: 65, slug: "classic-infill" },
      { name: "Hybrid Infill", price: 75, slug: "hybrid-infill" },
      { name: "Volume Infill", price: 90, slug: "volume-infill" },
    ],
  },
  {
    title: "Add-Ons",
    services: [{ name: "Bottom Lashes", price: 45, slug: "bottom-lashes" }],
  },
  {
    title: "Removal",
    services: [
      { name: "Removal — My Work", price: 15, slug: "removal-my-work" },
      { name: "Removal — Others", price: 20, slug: "removal-others" },
    ],
  },
];
