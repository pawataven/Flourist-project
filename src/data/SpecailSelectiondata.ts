import cocoaDutch from "../assets/SpecailSelection/Cocoa-Dutch.jpg";
import motoro from "../assets/SpecailSelection/Motoro.jpg";
import iwa from "../assets/SpecailSelection/iwa.jpg";

export interface SpecialSelectionItem {
  eyebrow: string;
  title: [string, string];
  description: string;
  price: string;
  availability: string;
  image: typeof cocoaDutch;
  imageAlt: string;
  branchHref: string;
}

export const specialSelections: SpecialSelectionItem[] = [
  {
    eyebrow: "Flourist / Special Selection",
    title: ["Cocoa", "Dutch"],
    description:
      "Deep Dutch cocoa, poured slowly. A rich and velvety house special for unhurried afternoons.",
    price: "100 THB",
    availability: "Available at all branches",
    image: cocoaDutch,
    imageAlt: "Cocoa Dutch by Flourist, a Dutch cocoa drink priced at 100 THB",
    branchHref: "/map",
  },
  {
    eyebrow: "Flourist / Special Selection",
    title: ["Motoro", ""],
    description:
      "Matcha with bean tones, taro and delicate rice mochi",
    price: "280 THB",
    availability: "Available at all branches",
    image: motoro,
    imageAlt: "Matcha with bean tones, taro and delicate rice mochi by Flourist, a special selection priced at 280 THB",
    branchHref: "/map",
  },
  {
    eyebrow: "Flourist / Special Selection",
    title: ["Iwa matcha Latte", ""],
    description:
      "Crafted with Premium IWA Ceremonial Grade Matcha & Fresh Milk",
    price: "190 THB",
    availability: "Available at all branches",
    image: iwa,
    imageAlt: "Iwa matcha Latte by Flourist, a special selection priced at 280 THB",
    branchHref: "/map",
  },
];
