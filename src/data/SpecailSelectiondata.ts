import cocoaDutch from "../assets/SpecailSelection/Cocoa-Dutch.jpg";
import motoro from "../assets/SpecailSelection/Motoro.jpg";
import iwa from "../assets/SpecailSelection/iwav2.jpg";

export interface SpecialSelectionItem {
  eyebrow: string;
  title: string[];
  description: string;
  descriptionLines?: string[];
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
      "โกโก้ดัตช์แท้เข้มข้น รินช้าๆ อย่างพิถีพิถัน สัมผัสรสชาติ อันนุ่มละมุน เมนูพิเศษประจำร้านสำหรับช่วงเวลาผ่อนคลาย ที่ไม่ต้องเร่ง\u2060รีบ",
    descriptionLines: [
      "โกโก้ดัตช์แท้เข้มข้น รินช้าๆ อย่างพิถีพิถัน สัมผัสรสชาติ",
      "อันนุ่มละมุน เมนูพิเศษประจำร้านสำหรับช่วงเวลาผ่อนคลาย",
      "ที่ไม่ต้องเร่ง\u2060รีบ",
    ],
    price: "100.-",
    availability: "Available at all branches",
    image: cocoaDutch,
    imageAlt: "Cocoa Dutch by Flourist, a Dutch cocoa drink priced at 100.-",
    branchHref: "/map",
  },
  {
    eyebrow: "Flourist / Special Selection",
    title: ["Motoro", ""],
    description:
      "มัทฉะโทนถั่วเข้มข้น ผสานความนุ่มละมุนของเผือกหอมแท้ และโมจิข้าวญี่ปุ่นหนุบหนับ",
    descriptionLines: [
      "มัทฉะโทนถั่วเข้มข้น ผสานความนุ่มละมุนของเผือกหอมแท้",
      "และโมจิข้าวญี่ปุ่นหนุบหนับ",
    ],
    price: "280.-",
    availability: "Available at all branches",
    image: motoro,
    imageAlt: "Matcha with bean tones, taro and delicate rice mochi by Flourist, a special selection priced at 280.-",
    branchHref: "/map",
  },
  {
    eyebrow: "Flourist / Special Selection",
    title: ["Iwa", "Latte"],
    description:
      "รังสรรค์จากมัทฉะเกรดพิธีการระดับพรีเมียม IWA ผสาน\u2060ความ\u2060กลม\u2060กล่อมละมุนของนมสดแท้",
    descriptionLines: [
      "รังสรรค์จากมัทฉะเกรดพิธีการระดับพรีเมียม IWA",
      "ผสานความกลมกล่อมละมุนของนมสดแท้",
    ],
    price: "190.-",
    availability: "Available at all branches",
    image: iwa,
    imageAlt: "Iwa matcha Latte by Flourist, a special selection priced at 190.-",
    branchHref: "/map",
  },
];
