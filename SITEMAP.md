# FLOURIST Matchahouse — Website Sitemap

เอกสารนี้สรุปโครงสร้างหน้าที่เข้าถึงได้ผ่าน URL, ส่วนสำคัญภายในแต่ละหน้า และทางออกไปยังบริการภายนอก ตามโค้ดใน `src/pages`, navigation, footer และข้อมูลสาขาปัจจุบัน

## 1. แผนผัง URL

```text
/
├── /menu
│   ├── #signature
│   └── #dessert
├── /events
├── /map
├── /about
└── /contactUs
```

ทุกหน้ามี navigation, delivery modal, footer และปุ่มกลับขึ้นด้านบนร่วมกัน ส่วน `/` เป็นหน้าแรกและไม่มีหน้าแยกสำหรับรายการสินค้าหรือแต่ละสาขา

## 2. รายละเอียดหน้า

### `/` — หน้าแรก

- Hero: ภาพแบรนด์และลิงก์ “Explore Matcha” ไป `/menu`
- Special Selection: รายการเครื่องดื่มคัดสรรและลิงก์สั่ง/ดูข้อมูลตามข้อมูลสินค้า
- Best Sellers: carousel สินค้าขายดี; ส่วนนี้มี anchor `/#best-sellers`
- Flourist Collection: ชุดสินค้าและขนม; ส่วนนี้มี anchor `/#flourist-collection`
- Footer: ลิงก์ไปหน้าเมนู เกี่ยวกับ งานอีเวนต์ สาขา และติดต่อ

### `/menu` — เมนู

- Digital menu book: ปก, พลิกหน้าหรือเลือกภาพย่อ, ซูม และปิดมุมมอง
- ภายในเล่มมีหมวดเครื่องดื่มซิกเนเจอร์, cold whisk/modern flavors, daifuku & sweets และ single cultivars/origin
- ส่วนรายการสินค้า Signature ที่ `#signature`
- ส่วนรายการขนม Dessert ที่ `#dessert`
- เป็นหน้าเดียว; หน้าหนังสือและหมวดสินค้าไม่ใช่ URL แยก

### `/events` — ข่าวกิจกรรม

- รายละเอียดงาน “The Leaf’s Secret” และภาพประชาสัมพันธ์
- เนื้อหากิจกรรมและรายการจุดเด่น
- ข้อมูลวัน เวลา และสถานที่จัดงาน
- ลิงก์ตำแหน่งงานไป Google Maps
- ปัจจุบันมีหน้า event นี้หน้าเดียว ไม่มี route แยกตาม event

### `/map` — ค้นหาสาขา

- ช่องค้นหาและปุ่ม reset
- รายการสาขาที่สร้างจาก `src/data/StoreData.ts`
- แผนที่ Leaflet พร้อม marker และ popup รายละเอียด
- เลือกรายการสาขาเพื่อเชื่อมกับตำแหน่งบนแผนที่
- แต่ละสาขาไม่มี URL เฉพาะ; ลิงก์แผนที่ภายนอกเปิด Google Maps

### `/about` — เกี่ยวกับ Flourist

- เรื่องราวและปรัชญาของแบรนด์
- จุดเริ่มต้น/แนวทางการคัดสรรมัทฉะ
- ความหมายของชื่อ FLOURIST และเส้นทางแบรนด์
- ส่วนแนะนำวัตถุดิบและประสบการณ์ของร้าน
- ลิงก์ไป `/menu` และ `/map`

### `/contactUs` — ติดต่อเรา

- ช่องทางติดต่อทางโทรศัพท์, LINE และอีเมล
- ข้อมูลสำหรับเข้าร้านและลิงก์ไป `/map`
- ลิงก์ภายนอก: `tel:`, LINE และ `mailto:`

## 3. องค์ประกอบร่วมทุกหน้า

- **Desktop / compact / mobile navigation:** Home, Menu, Events, Maps, About, Contact Us
- **Delivery modal:** ขั้นเลือกวิธีรับบริการ, ผู้ให้บริการ/พื้นที่ใกล้เคียง หรือกรอกตำแหน่งเอง; เป็นหน้าต่างในหน้าเดิม ไม่ใช่ URL
- **Footer:** ลิงก์หน้าเว็บ, anchor ไป `/#best-sellers`, `/#flourist-collection`, `/menu#signature`, `/menu#dessert`, ช่องทางติดต่อ และ social links
- **Back to top:** กลับสู่ด้านบนของหน้า

## 4. เส้นทางที่ไม่ใช่หน้าเว็บ

- `tel:0615120465` — โทรศัพท์
- `mailto:flourist.bakehouse@gmail.com` — อีเมล
- LINE Official — ติดต่อ/สั่งซื้อ
- Grab — สั่งจากสาขาที่มีข้อมูลใน store data
- Google Maps — เส้นทางไปสาขาหรือสถานที่จัดงาน
- Facebook / Instagram — social links

## 5. ขอบเขตและหมายเหตุ

- เส้นทางหน้าเว็บที่พบใน `src/pages`: `/`, `/menu`, `/events`, `/map`, `/about`, `/contactUs` รวม 6 หน้า
- ไม่พบ dynamic routes, blog routes, product detail routes, category routes หรือหน้า 404 ที่กำหนดเองใน `src/pages`
- `#signature`, `#dessert`, `#best-sellers` และ `#flourist-collection` เป็น anchor ภายในหน้า ไม่ใช่หน้าใหม่
- เมนู flipbook, modal, carousel, search/filter สาขา และแผนที่เป็นสถานะ/ส่วนประกอบบนหน้า ไม่ได้เพิ่ม URL
- Sitemap นี้เป็นเอกสารโครงสร้างเว็บสำหรับทีมงาน; ยังไม่ใช่ XML sitemap สำหรับ search engines เนื่องจากโปรเจกต์ยังไม่ได้กำหนด production site URL ใน `astro.config.mjs`
