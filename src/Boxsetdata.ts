import type { ImageMetadata } from "astro";
import Sokutai from "./assets/boxset/sokutai.jpg";

export interface BoxsetPrice {
  size: string;
  price: string;
}

export interface Boxset {
  image?: ImageMetadata;
  title: string;
  description: string;
  note?: string;
  prices: BoxsetPrice[];
}

export const boxsets: Boxset[] = [
  {
    image: Sokutai,
    title: "FLOURIST : The Sokutai Collection",
    description: "The Ultimate Ceremonial Matcha Experience สัมผัสสุนทรียภาพแห่งการชงชาชั้นสูง ผ่านบรรจุภัณฑ์ที่ได้รับแรงบันดาลใจจาก โซคุไต (Sokutai) เครื่องแต่งกายชั้นสูงในราชสำนักญี่ปุ่นโบราณ ถอดรหัสโครงสร้างการซ้อนทับของเลเยอร์ผ้าทอมือและลวดลายมงคล สู่ดีไซน์ร่วมสมัยสไตล์ Quiet Luxury ที่รวบรวมอุปกรณ์ชงชาพิถีพิถันไว้ในกล่องเดียว",
    prices: [
      { size: "ราคา", price: "1750 บาท" },
    ],
  },
];
