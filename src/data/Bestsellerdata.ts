import type { ImageMetadata } from "astro";
import Hawaii from "../assets/products/Hawaii.jpg";
import Ichigo from "../assets/products/Ichigo.jpg";
import Tiramisu from "../assets/products/Tiramisu.jpg";
import Spanner from "../assets/products/Spanner.jpg";
import Motoro from "../assets/products/Motoro.jpg";
import Picomo from "../assets/products/Picomo.jpg";
import Doubleflow from "../assets/products/Double Flow.jpg";
import BlueOkinawaMatchaCheese from "../assets/products/Okinawa.jpg";
import BlueOkinawaDescription from "../assets/products/description/Blue-Okinawa-Matcha-Cheese.png";
import HawaiiDescription from "../assets/products/description/Hawaii-matcha.png";
import IchigoDescription from "../assets/products/description/Ichigo-Matcha-Cheese.png";
import DoubleflowDescription from "../assets/products/description/Matcha-double-flow.png";
import MatchaSaltedSpannerDescription from "../assets/products/description/Matcha-Salted-Spanner.png";
import TiramisuDescription from "../assets/products/description/Matcha-Tiramisu-Drink.png";
import MotoroDescription from "../assets/products/description/Motoro.png";
import PicomoDescription from "../assets/products/description/Picomo.png";

export interface ProductPrice {
  size: string;
  price: string;
}

export interface Product {
  image?: ImageMetadata;
  descriptionImage?: ImageMetadata;
  title: string;
  description?: string;
  note?: string;
  prices: ProductPrice[];
}

export const productsSignature: Product[] = [
  {
    image: Hawaii,
    descriptionImage: HawaiiDescription,
    title: "Hawaii",
    description: "น้ำสับปะรดหอมสุวรรณแท้ 100% สกัดเย็นทั้งลูก ไม่ผ่านกรรมวิธีความร้อน ไม่เติมน้ำตาล ท็อปด้วย Umi มัทฉะเกรดพิธีการสายพันธุ์เดี่ยว Okumidori เพิ่มความเข้ากันให้น้ำสับปะรดสดชื่นยิ่งขึ้น ทานคู่กับ สับปะรดหั่นแว่น บูสความหวานฉ่ำให้กับเมนูนี้",
    prices: [
      { size: "ราคา", price: "175.-" },
    ],
  },
  {
    image: Ichigo,
    descriptionImage: IchigoDescription,
    title: "Ichigo",
    description: "ความพิถีพิถันในทุกเลเยอร์ เริ่มต้นด้วยความสดชื่นของ Secret Strawberry Puree จนได้รสชาติเข้มข้น ไล่ระดับขึ้นมาด้วยนมสดเย็นจัด และปิดท้ายด้วย Signature Matcha Cream Cheese ครีมชีสเนื้อแน่นที่ผสานมัทฉะเกรดพรีเมียม ให้รสสัมผัสหอม มัน นัว",
    prices: [
      { size: "ราคา", price: "190.-" },
    ],
  },
  {
    image: Tiramisu,
    descriptionImage: TiramisuDescription,
    title: "Tiramisu",
    description: "ความเข้มข้นของมัทฉะเกรดพิธีจากเมืองอิเสะ ผสานความละมุนของมาสคาโปนครีมเนียนนุ่ม ท็อปบนเลเยอร์มัทฉะ ทานคู่กับ homemade lady finger ที่นุ่มละลายในปากอย่างลงตัว",
    prices: [
      { size: "ราคา", price: "225.-" },
    ],
  },
    {
    image: Spanner,
    descriptionImage: MatchaSaltedSpannerDescription,
    title: "Spanner",
    description: "เมนูใหม่! นมสดวนิลาสูตรพิเศษจากทางร้าน เลเยอร์ด้วยมัทฉะเกรดพรีเมียมเข้มข้นพิเศษ ท็อปวิปครีมสูตร Signature Blend หอมมันเนื้อเนียนนุ่ม โรยเกลือมัทฉะปิดท้าย เพื่อรสชาติที่กลมกล่อมลงตัว",
    prices: [
      { size: "ราคา", price: "189.-" },
    ],
  },
    {
    image: Motoro,
    descriptionImage: MotoroDescription,
    title: "Motoro",
    description: "เมนูขายดีตลอดกาล มัทฉะเกรดพิธี x เผือกหอม x โม\u2060จิหนึบ การผสมผสานสุดนัวของนมโอ๊ตและน้ำมะพร้าวสดจากบ้านแพ้ว หอมละมุนอย่างลงตัวด้วยมัทฉะเกรดพิธี Okumidori พร้อมเคี้ยวโม\u2060จิหนุบๆ และเผือกแท้ๆ ในแก้วเดียว",
    prices: [
      { size: "ราคา", price: "280.-" },
    ],
  },
      {
    image: Picomo,
    descriptionImage: PicomoDescription,
    title: "Picomo",
    description: "เมนูที่ได้รับแรงบันดาลใจจาก วัตถุดิบ Pistachio Coconut Mochi Matcha มัทฉะเกรดพรีเมียมจากเมืองยาเมะ ความหอมมันเข้มข้นของ Pistachio Cream และ น้ำมะพร้าวสดแท้ 100% จากบ้านแพ้ว ไม่ใส่น้ำตาล ปิดท้ายด้วยโม\u2060จิข้าวญี่ปุ่นผสมข้าวบาร์เลย์ อย่างลงตัว",
    prices: [
      { size: "ราคา", price: "179.-" },
    ],
  },
      {
    image: Doubleflow,
    descriptionImage: DoubleflowDescription,
    title: "double flow",
    description: "จัดเต็มมัทฉะ 2 สไตล์ในแก้วเดียว ทั้งซอสมัทฉะรสเข้มและครีมชีสมัทฉะรสนัว เข้ากันอย่างไม่น่าเชื่อกับเบสนมโอ๊ตและน้ำมะพร้าวสด ผสานคุณค่าจากสาหร่ายสปิรูลิน่า ให้รสชาติคลีนๆ สบายท้อง แต่ยังคงความฟินขั้นสุด",
    prices: [
      { size: "ราคา", price: "220.-" },
    ],
  },
      {
    image: BlueOkinawaMatchaCheese,
    descriptionImage: BlueOkinawaDescription,
    title: "Blue Okinawa",
    description: "ความลงตัวครั้งใหม่ของนมมะพร้าวและสาหร่ายสปิรูลิน่าสีฟ้าน้ำทะเล ตัดกับความเข้มข้นของ Matcha Cream Cheese สูตรลับจากทางร้าน ท็อปด้วยบุกเคี้ยวสนุก ให้ความรู้สึกเหมือนได้พักผ่อนริมชายหาดทุกครั้งที่ดื่ม",
    prices: [
      { size: "ราคา", price: "185.-" },
    ],
  },
];

export const products = productsSignature;
