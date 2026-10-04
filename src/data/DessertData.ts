import type { Product, ProductPrice } from "./Bestsellerdata";

// Dessert Assets
import BanoffeeBoxImg from "../assets/Dessert/Banoffee Box/Banoffee Box.png";
import BanoffeeBoxDesc from "../assets/Dessert/Banoffee Box/คำอธิบาย.png";
import ButterTteokImg from "../assets/Dessert/Butter tteok/Butter tteok.png";
import ButterTteokDesc from "../assets/Dessert/Butter tteok/คำอธิบาย.png";
import CheesecakeImg from "../assets/Dessert/Cheesecake/Cheesecake_v2.png";
import CheesecakeDesc from "../assets/Dessert/Cheesecake/คำอธิบาย.png";
import ChewyDubaiImg from "../assets/Dessert/Chewy Dubai/Chewy Dubai.png";
import ChewyDubaiDesc from "../assets/Dessert/Chewy Dubai/คำอธิบาย.png";
import EclairImg from "../assets/Dessert/Eclair/Eclair.png";
import EclairDesc from "../assets/Dessert/Eclair/คำอธิบาย.png";
import TiramisuBoxImg from "../assets/Dessert/Tiramisu Box/Tiramisu Box.jpg";
import TiramisuBoxDesc from "../assets/Dessert/Tiramisu Box/คำอธิบาย.png";

export type { Product, ProductPrice };

export const productsDessert: Product[] = [
  {
    image: ChewyDubaiImg,
    descriptionImage: ChewyDubaiDesc,
    title: "Chewy Dubai",
    note: "Matcha / Choco",
    description: "Matcha / Choco เนื้อแป้งสัมผัสนุ่มหนึบ รสต้นตำรับมาจากดูไบ หอมถั่วพิสตาชิโอ",
    prices: [
      { size: "ราคา", price: "240 บาท" },
    ],
  },
  {
    image: EclairImg,
    descriptionImage: EclairDesc,
    title: "Yame Eclair",
    description: "รสชาตินัตตี้ละมุน เนื้อนุ่ม ใช้มัทฉะสายพันธุ์ IWA ระดับพิธีการ จากเมือง ยาเมะ ประเทศญี่ปุ่น",
    prices: [
      { size: "ราคา", price: "189 บาท" },
    ],
  },
  {
    image: ButterTteokImg,
    descriptionImage: ButterTteokDesc,
    title: "Butter Tteok",
    description: "กลิ่นหอมของเนย ครีมชีส และมัทฉะ สัมผัสด้านนอกกรอบอย่างพอดี ตัดกับเนื้อด้านในที่นุ่มหนึบได้อย่างลงตัว",
    prices: [
      { size: "ราคา", price: "155 บาท" },
    ],
  },
  {
    image: TiramisuBoxImg,
    descriptionImage: TiramisuBoxDesc,
    title: "Tiramisu",
    description: "ขนมทิรามิสุกรอบ ผสมผสานกับครีมมัทฉะได้อย่างลงตัว สัมผัสเนียนนุ่ม ตามด้วยการโรยผงมัทฉะปิดท้าย",
    prices: [
      { size: "ราคา", price: "250 บาท" },
    ],
  },
  {
    image: BanoffeeBoxImg,
    descriptionImage: BanoffeeBoxDesc,
    title: "Banoffee",
    description: "กล้วยน้ำหว้า ที่ผสมผสานกับครีมชีสมัทฉะสูตรพิเศษของทางร้าน สัมผัสเนียนนุ่ม ตามด้วยการโรยผงมัทฉะปิดท้าย",
    prices: [
      { size: "ราคา", price: "315 บาท" },
    ],
  },
  {
    image: CheesecakeImg,
    descriptionImage: CheesecakeDesc,
    title: "Cheesecake",
    description: "ครีมชีสฝรั่งเศส Kiri เนื้อเค้กละลายในปาก ฐานครัมเบิ้ล ดาร์กโกโก้ อัลมอนด์ กรุบกรอบ แทรกแมคคาเดเมีย",
    prices: [
      { size: "ราคา", price: "290 บาท" },
    ],
  },
];