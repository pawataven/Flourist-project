import cocoaDutch from "../assets/SpecailSelection/Cocoa-Dutch.jpg";
import motoro from "../assets/SpecailSelection/Motoro.jpg";
import iwa from "../assets/SpecailSelection/iwav2.jpg";

export interface SpecialSelectionItem {
  eyebrow: string;
  title: string[];
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
      "โกโก้ดัตช์แท้เข้มข้น รินช้าๆ อย่างพิถีพิถัน สัมผัสรสชาติอันนุ่มละมุน เมนูพิเศษประจำร้านสำหรับช่วงเวลาผ่อนคลายที่ไม่ต้องเร่งรีบ",
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
      "มัทฉะโทนถั่วเข้มข้น ผสานความนุ่มละมุนของเผือกหอมแท้ และโมจิข้าวญี่ปุ่นหนุบหนับ",
    price: "280 THB",
    availability: "Available at all branches",
    image: motoro,
    imageAlt: "Matcha with bean tones, taro and delicate rice mochi by Flourist, a special selection priced at 280 THB",
    branchHref: "/map",
  },
  {
    eyebrow: "Flourist / Selection",
    title: ["Iwa", "Latte"],
    description:
      "รังสรรค์จากมัทฉะเกรดพิธีการระดับพรีเมียม IWA ผสานความกลมกล่อมละมุนของนมสดแท้",
    price: "190 THB",
    availability: "Available at all branches",
    image: iwa,
    imageAlt: "Iwa matcha Latte by Flourist, a special selection priced at 280 THB",
    branchHref: "/map",
  },
];
