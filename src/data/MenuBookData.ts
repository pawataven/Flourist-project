import type { ImageMetadata } from "astro";

// Assets imported for high-fidelity fallback pages
import logoGold from "../assets/Logo-5.png";
import logoWatermark from "../assets/index/Logo-web.png";


export interface MenuBookPage {
  id: string;
  pageIndex: number; // 0 = Cover, 1, 2, ...
  pageNumberLabel?: string; // e.g. "1", "2", "Cover"
  title: string;
  subtitle?: string;
  density: "hard" | "soft";
  type: "cover" | "story" | "product-spotlight" | "catalog" | "dessert" | "branches" | "back-cover";
  /**
   * Optional custom image URL (e.g. '/menu-pages/page-1.jpg' placed in the public/ folder).
   * If provided, the page will render this full-bleed vertical image directly.
   */
  customImage?: string;
  /**
   * Data payload for template rendering
   */
  data?: any;
}

export const menuBookPages: MenuBookPage[] = [
  // 1. หน้าปก (Front Cover)
  {
    id: "page-1",
    pageIndex: 0,
    pageNumberLabel: "Cover",
    title: "FLOURIST MENU",
    subtitle: "The Art of Ceremonial Matcha",
    density: "hard",
    type: "cover",
    customImage: "/menu-pages/page-1-cover.svg",
    data: {
      brandName: "FLOURIST",
      subBrand: "抹茶ハウス",
      est: "EST. 2020",
      location: "BANGKOK",
      tagline: "The Art of Ceremonial Matcha.",
      logo: logoGold,
      watermark: logoWatermark,
    },
  },

  // 2. หน้าที่ 1 (Spread 1 ซ้าย): เรื่องราวแหล่งปลูก (Terroir Story)
  {
    id: "page-2",
    pageIndex: 1,
    pageNumberLabel: "1",
    title: "From Japan's Finest Terroir",
    subtitle: "To Your Daily Ritual",
    density: "soft",
    type: "story",
    customImage: "/menu-pages/page-2.svg",
  },

  // 3. หน้าที่ 2 (Spread 1 ขวา): เมนูไฮไลท์ MOTORO Signature
  {
    id: "page-3",
    pageIndex: 2,
    pageNumberLabel: "2",
    title: "MOTORO SIGNATURE",
    subtitle: "Matcha Taro Mochi",
    density: "soft",
    type: "product-spotlight",
    customImage: "/menu-pages/page-3.svg",
  },

  // 4. หน้าที่ 3 (Spread 2 ซ้าย): เมนู SIGNATURE (Tiramisu, Ichigo, Spanner)
  {
    id: "page-4",
    pageIndex: 3,
    pageNumberLabel: "3",
    title: "SIGNATURE CREATIONS",
    subtitle: "Tiramisu, Ichigo, Spanner",
    density: "soft",
    type: "catalog",
    customImage: "/menu-pages/page-4.svg",
  },

  // 5. หน้าที่ 4 (Spread 2 ขวา): เมนู COCOA DUTCH
  {
    id: "page-5",
    pageIndex: 4,
    pageNumberLabel: "4",
    title: "COCOA DUTCH",
    subtitle: "Crafted Dutch Cocoa",
    density: "soft",
    type: "product-spotlight",
    customImage: "/menu-pages/page-5.svg",
  },

  // 6. หน้าที่ 5 (Spread 3 ซ้าย): เมนู SIGNATURE (Blue Okinawa, Motoro, Double Flow)
  {
    id: "page-6",
    pageIndex: 5,
    pageNumberLabel: "5",
    title: "SIGNATURE BLENDS",
    subtitle: "Blue Okinawa, Motoro, Double Flow",
    density: "soft",
    type: "catalog",
    customImage: "/menu-pages/page-6.svg",
  },

  // 7. หน้าที่ 6 (Spread 3 ขวา): เมนู IWA MATCHA LATTE
  {
    id: "page-7",
    pageIndex: 6,
    pageNumberLabel: "6",
    title: "IWA MATCHA LATTE",
    subtitle: "Ceremonial Grade & Fresh Milk",
    density: "soft",
    type: "product-spotlight",
    customImage: "/menu-pages/page-7.svg",
  },

  // 8. หน้าที่ 7 (Spread 4 ซ้าย): เมนู CLEAR / LATTE (ตารางสายพันธุ์ชา)
  {
    id: "page-8",
    pageIndex: 7,
    pageNumberLabel: "7",
    title: "CLEAR & LATTE",
    subtitle: "Single Cultivars & Blends",
    density: "soft",
    type: "catalog",
    customImage: "/menu-pages/page-8.svg",
  },

  // 9. หน้าที่ 8 (Spread 4 ขวา): เมนู DAIFUKU & DESSERTS
  {
    id: "page-9",
    pageIndex: 8,
    pageNumberLabel: "8",
    title: "DAIFUKU & DESSERTS",
    subtitle: "Handcrafted Sweets & Cakes",
    density: "soft",
    type: "dessert",
    customImage: "/menu-pages/page-9.svg",
  },

  // 10. ปกหลัง (Back Cover - Index 9)
  {
    id: "page-10",
    pageIndex: 9,
    pageNumberLabel: "Back",
    title: "FLOURIST BACK COVER",
    subtitle: "Matchahouse Bangkok",
    density: "hard",
    type: "back-cover",
    customImage: "/menu-pages/page-10-back.svg",
    data: {
      brandName: "FLOURIST",
      subBrand: "抹茶ハウス",
      tagline: "The Art of Ceremonial Matcha.",
      location: "BANGKOK, THAILAND",
      socials: [
        { label: "IG", value: "@flourist.matchahouse" },
        { label: "LINE", value: "@flourist.matcha" },
        { label: "TEL", value: "062-376-0586" },
      ],
      logo: logoGold,
      watermark: logoWatermark,
    },
  },
];
