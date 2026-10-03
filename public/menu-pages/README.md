# โฟลเดอร์สำหรับใส่รูปเมนูแนวตั้ง (Menu Pages)

คุณสามารถนำไฟล์รูปภาพเมนูแนวตั้งที่มีอยู่มาวางไว้ในโฟลเดอร์นี้เพื่อแสดงผลในหนังสือ Flipbook ได้ทันทีครับ:

ตัวอย่างชื่อไฟล์ที่แนะนำ:
- `cover.jpg` : หน้าปก
- `page-1.jpg` : หน้าที่ 1 (Terroir / Brand Story)
- `page-2.jpg` : หน้าที่ 2 (Motoro Signature)
- `page-3.jpg` : หน้าที่ 3
- `page-4.jpg` : หน้าที่ 4
- `page-5.jpg` : หน้าที่ 5
- `page-6.jpg` : หน้าที่ 6
- `back-cover.jpg` : หน้าปกหลัง

### วิธีเปิดใช้งานรูปภาพของคุณ:
เปิดไฟล์ `src/data/MenuBookData.ts` แล้วใส่พาธรูปในช่อง `customImage`:
```typescript
{
  id: "page-cover",
  customImage: "/menu-pages/cover.jpg",
  ...
},
{
  id: "page-1",
  customImage: "/menu-pages/page-1.jpg",
  ...
}
```
หากปล่อยว่างไว้ (`customImage: ""`) ระบบจะใช้ดีไซน์เทมเพลตอัตโนมัติที่สวยงามตามตัวอย่างที่แสดงอยู่ครับ!
