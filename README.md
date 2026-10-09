# FLOURIST Matchahouse
> **Interactive Brand & E-Commerce Frontend Experience**  
> เว็บไซต์แบรนด์คาเฟ่มัทฉะและเบเกอรีสไตล์ญี่ปุ่นพรีเมียม พัฒนาจากดีไซน์ Figma สู่ผลงาน Frontend คุณภาพสูง

---

## 🍵 Project Overview
**FLOURIST Matchahouse** คือเว็บไซต์เชิง Interactive Brand Experience ที่สร้างขึ้นเพื่อถ่ายทอดสุนทรียภาพแห่งชาเขียวมัทฉะเกรดพิธีการ (Ceremonial Grade Matcha) และขนมหวานโฮมเมดสไตล์ญี่ปุ่น (Signature Daifuku & Artisanal Bakery) 

โปรเจกต์นี้เป็นการแปลงดีไซน์จาก **Figma** สู่การพัฒนา **Frontend Application** ที่สมบูรณ์แบบ ทั้งในแง่ของ Mood & Tone, Spacing, Typography, Visual Aesthetics และ Interactive User Experience ที่หรูหรา สง่างาม (Dark Luxury: โทนสี Deep Forest `#080a09` ผสานประกายทอง Champagne Gold `#c5a259`)

ตัวเว็บผสานการเล่าเรื่องของแบรนด์ (Brand Storytelling) เข้ากับฟีเจอร์ระดับโปรดักชัน เช่น **Digital Flipbook Menu** (หนังสือเมนูดิจิทัลที่เปิดพลิกหน้าได้เสมือนจริง), **Interactive Store Locator** (ระบบค้นหาสาขาพร้อมแผนที่ Leaflet), **Smart Multi-Step Delivery Ordering** (ระบบสั่งเดลิเวอรีพร้อมคำนวณพิกัดหาร้านที่ใกล้ที่สุดอัตโนมัติด้วย Geolocation) และ **Physics-Based Product Carousels**

---

## 🌐 Live Website
- **Deploy URL:** [https://flourist-matchahouse.vercel.app](https://flourist-matchahouse.vercel.app)
> *หมายเหตุ: สามารถเปลี่ยน URL ด้านบนเป็น Production Link ของคุณก่อนนำไปใส่ใน Portfolio หรือ Resume*

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | **Astro 5** (Islands Architecture, Zero-JS by default, SSG) |
| **Language** | **TypeScript** |
| **Styling** | **Tailwind CSS 4** (`@tailwindcss/vite`), Custom CSS Theme Variables |
| **Interactive Libraries** | **Page-Flip** (`StPageFlip`), **Leaflet** + **OpenStreetMap** |
| **Web APIs** | HTML5 `<dialog>` Web Component, Geolocation API, Intersection Observer |
| **Optimization & Build** | **Sharp** (Image pipeline), **Fontverter** & **Subset-font** (Font subsetting) |
| **Runtime & Package Manager** | **Bun** / **Node.js** (>=22.12.0) |

---

## ✨ Key Features

### 1. 📖 Interactive Digital Flipbook Menu (`/menu`)
- ประสบการณ์อ่านเล่มเมนูแบบดิจิทัลเสมือนจริงด้วยระบบ **Physics Page-Flip**
- รองรับทั้งการเปิดแบบ **Two-Page Spread (Desktop)** และ **Single-Page Mode (Mobile/Tablet)**
- ระบบ **Cover Centering & Transform**: จัดเล่มสมุดให้อยู่กึ่งกลางหน้าจออย่างแม่นยำเมื่ออยู่ที่หน้าปก และขยายออกเมื่อเปิดอ่าน
- ฟังก์ชัน **Zoom Lightbox**: ขยายดูรายละเอียดภาพและส่วนผสมของเมนูแต่ละหน้าได้อย่างคมชัด
- **Thumbnail Scrubber & Navigation Buttons**: เลื่อนเลือกหน้าที่ต้องการได้อย่างรวดเร็ว พร้อมปุ่มลัดกลับสู่หน้าปก (Return to Cover)
- ควบคุมด้วย GPU Hardware-Accelerated Ambient Shadow เพื่อความลื่นไหลระดับ 60 FPS

### 2. 🗺️ Interactive Store Locator & Maps (`/map`)
- ระบบค้นหาและกรองสาขา (Store Search & Filter) แบบ Real-time ตามชื่อสาขา เขต หรือจังหวัด
- แผนที่แบบโต้ตอบด้วย **Leaflet & OpenStreetMap** พร้อม Custom Branded Marker Pin
- **Bi-directional Sync**: เมื่อคลิกเลือกสาขาในรายการ แผนที่จะเคลื่อนที่ (Fly/Pan) ไปยังตำแหน่งนั้นพร้อมเปิด Pop-up รายละเอียดทันที และเมื่อคลิกหมุดบนแผนที่ รายชื่อสาขาก็จะถูกไฮไลต์โดยอัตโนมัติ
- รองรับปุ่มนำทางตรงเข้าสู่ **Google Maps** ของแต่ละสาขา

### 3. 🛵 Smart Multi-Step Delivery Ordering Modal
- พัฒนาด้วยมาตรฐาน **HTML5 `<dialog>` Web Component** ทำงานรวดเร็ว เข้าถึงง่าย (Accessible) และล็อกการเลื่อนหน้าจอ (Scroll Lock)
- รองรับแพลตฟอร์มเดลิเวอรียอดนิยม: **GrabFood** และ **LINE MAN**
- **Automated Nearest Branch Detection**: ใช้ Browser Geolocation API คำนวณระยะทางระหว่างตำแหน่งของผู้ใช้กับพิกัดสาขาทั้งหมดด้วยสูตร **Haversine Formula** เพื่อแนะนำสาขาที่ใกล้ที่สุดให้อัตโนมัติ
- โหมดเลือกสาขาด้วยตนเอง (Manual Branch Selector) พร้อมระบบค้นหาชื่อสาขา

### 4. 🎠 Touch & Physics-Based Product Carousels
- ระบบ Carousel แสดงสินค้า Best Sellers และเมนูซิกเนเจอร์ที่เขียนขึ้นเองโดยไม่พึ่ง Library หนักๆ
- รองรับทั้ง Touch Gestures บนสมาร์ตโฟน และ Mouse Dragging บนคอมพิวเตอร์
- มีระบบคำนวณ **Drag Physics, Inertia & Momentum** ช่วยให้การเลื่อนดูสินค้าเป็นไปอย่างเป็นธรรมชาติ
- มาพร้อม Dot Pagination และปุ่มลูกศรควบคุม

### 5. 🌟 Special Selection Auto-Advancing Slider
- ส่วนจัดแสดงชาเขียวระดับพรีเมียมในหน้าแรกพร้อมระบบสลับสไลด์อัตโนมัติ
- ควบคุมการเข้าถึงด้วยมาตรฐาน Accessibility (จัดการ `inert`, `aria-hidden` และ tabindex อย่างถูกต้องตาม WAI-ARIA)

### 6. ⚡ Performance & Font Subsetting Pipeline
- สคริปต์อัตโนมัติ (`scripts/build-fonts.mjs`) ใช้ `fontverter` และ `subset-font` แปลงและตัดทอนตัวอักษรเฉพาะที่ใช้งาน (Thai, Latin, Japanese Kanji/Hiragana) ลดขนาดฟอนต์ WOFF2 ลงมากกว่า 70%
- ภาพทั้งหมดได้รับการแปลงเป็น **Responsive WebP** หลายขนาดความละเอียดผ่าน Astro Assets Pipeline

### 7. 📱 Luxury Responsive Design
- ออกแบบโดยยึดหลัก Mobile-First และ Responsive ทุกขนาดหน้าจอ (Mobile, Tablet, Laptop, Ultrawide)
- รายละเอียดงานดีไซน์ระดับพรีเมียม: Ultra-Thin 2px Gold Scrollbar, Custom Gold Text Selection, Smooth Backdrop Blurs

---

## 📄 Main Pages

- **`/` — Home**: Hero Section พร้อม Responsive Banner Art Direction, Special Selection Slideshow, Best Sellers Carousel, The Flourist Collection และ Brand Presentation
- **`/menu` — Digital Menu Book**: เล่มเมนูดิจิทัลที่พลิกหน้าได้ พร้อม Carousel สินค้าหมวด Signature และ Dessert
- **`/map` — Store Locator**: ระบบค้นหาสาขาและแผนที่ Leaflet แบบ Interactive พร้อมหมุดระบุตำแหน่งสาขาทั่วกรุงเทพฯ
- **`/events` — Special Exhibition**: หน้าประชาสัมพันธ์งานอีเวนต์พิเศษ *"The Leaf’s Secret"* แสดงรายละเอียดกิจกรรม วันเวลา สถานที่ และทางไป Google Maps
- **`/about` — Brand Story & Philosophy**: เรื่องราวของแบรนด์ เส้นทางการเดินทางจากขนมไดฟูกุสู่ความเชี่ยวชาญด้านมัทฉะ แหล่งปลูกชาในญี่ปุ่น และกระบวนการคราฟต์
- **`/contactUs` — Contact & Branches**: ข้อมูลช่องทางติดต่อด่วน (โทรศัพท์, LINE Official, อีเมล) และแนะนำการเดินทางมาเยือนหน้าร้าน

---

## 👨‍💻 My Role (Frontend Developer)

- **Figma to Code Implementation:** แปลงดีไซน์ต้นฉบับจาก Figma ของลูกค้าให้กลายเป็นเว็บไซต์จริง ใส่ใจในทุกรายละเอียดของ Spacing, Layout, Typography และ Responsive Behavior
- **Architecture & Component Design:** วางโครงสร้างโปรเจกต์ด้วย Astro และ TypeScript สร้าง Reusable Components เช่น Navigation Bar, Delivery Modal, Product Cards, Carousels และ Footer
- **Complex UI Logic & State Management:** พัฒนา Interactive Flipbook Book ด้วย `page-flip`, แผนที่ Leaflet, และ Delivery Flow แบบ Multi-step
- **Geolocation & Algorithms:** พัฒนาระบบคำนวณระยะทางพิกัดละติจูด-ลองจิจูด (Haversine Formula) เพื่อหาสาขาที่ใกล้ผู้ใช้งานที่สุด
- **Performance Optimization:** เขียนสคริปต์ Font Subsetting และปรับแต่งการโหลด Asset/ภาพ เพื่อให้คะแนน Core Web Vitals และ Lighthouse อยู่ในเกณฑ์ระดับสูง
- **Production Build & Deployment:** จัดการโครงสร้างโค้ดและเตรียมโปรเจกต์สำหรับการ Deploy บน Vercel

---

## 💻 Development & Getting Started

### ความต้องการของระบบ (Prerequisites)
- [Node.js](https://nodejs.org/) (>= 22.12.0) หรือ [Bun](https://bun.sh/)

### การติดตั้ง (Installation)
```bash
# โคลนโปรเจกต์
git clone <repository-url>
cd Flourist-project

# ติดตั้ง Dependencies ด้วย Bun (หรือ npm)
bun install
```

### การรัน Development Server
```bash
bun run dev
```
เปิดบราวเซอร์ที่ [http://localhost:4321](http://localhost:4321)

### การ Build สำหรับ Production
```bash
# สั่ง Build เว็บไซต์
bun run build

# ทดสอบรัน Preview ของ Production Bundle
bun run preview
```

### การรันสคริปต์ปรับแต่งฟอนต์ (Font Optimization Script)
```bash
node scripts/build-fonts.mjs
```

---

## 🏆 Portfolio Highlights

- **Attention to Detail:** ถอดแบบงานดีไซน์ระดับพรีเมียมได้อย่างประณีต คงเอกลักษณ์ Mood & Tone สไตล์ Japanese Modern Luxury ได้อย่างสมบูรณ์แบบ
- **Beyond Standard CRUD / Static Pages:** โชว์ทักษะการทำ Interactive UI ขั้นสูง เช่น การจำลองสมุดพลิกหน้า 3D/2D, แผนที่ GIS Leaflet, และการต่อยอด Web APIs เช่น Geolocation และ HTML5 Dialog
- **Performance-First Mindset:** ใช้ Astro เพื่อลดขนาด JavaScript Runtime สู่เบราว์เซอร์ พร้อมระบบ Font Subsetting และ Responsive Image Optimization ที่แสดงถึงความเข้าใจเชิงลึกด้าน Frontend Performance
- **Clean Architecture:** แยก Data Layer (`src/data/`) ออกจาก Presentation Layer เพื่อให้ดูแลและต่อยอดเพิ่มข้อมูลสินค้าและสาขาได้ง่ายในอนาคต
