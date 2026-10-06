import fs from 'fs';
import path from 'path';
import fontverter from 'fontverter';
import subsetFont from 'subset-font';

async function buildFonts() {
  const publicFontsDir = path.resolve('public/fonts');
  if (!fs.existsSync(publicFontsDir)) {
    fs.mkdirSync(publicFontsDir, { recursive: true });
  }

  console.log('1. Converting Mitr-Light to WOFF2...');
  const mitr = fs.readFileSync('fonts/Mitr-Light.ttf');
  const mitrWoff2 = await fontverter.convert(mitr, 'woff2');
  fs.writeFileSync(path.join(publicFontsDir, 'Mitr-Light.woff2'), mitrWoff2);
  console.log(`✓ Mitr-Light.woff2 written (${mitrWoff2.length} bytes)`);

  console.log('2. Converting TAN-MON CHERI-Regular to WOFF2...');
  const tan = fs.readFileSync('fonts/TAN-MON CHERI-Regular.otf');
  const tanWoff2 = await fontverter.convert(tan, 'woff2');
  fs.writeFileSync(path.join(publicFontsDir, 'TAN-MON-CHERI-Regular.woff2'), tanWoff2);
  console.log(`✓ TAN-MON-CHERI-Regular.woff2 written (${tanWoff2.length} bytes)`);

  console.log('3. Subsetting ShipporiMincho-Bold to WOFF2...');
  const shippori = fs.readFileSync('fonts/ShipporiMincho-Bold.ttf');
  let chars = '';
  // ASCII printable
  for (let c = 32; c <= 126; c++) chars += String.fromCharCode(c);
  // Latin-1 supplement symbols & quotes
  chars += '¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ';
  chars += '•–—―‘’‚‛“”„‟†‡…‰′″‹›※‼⁇⁈⁉\u200B✦★☆→←↑↓฿';
  // All Hiragana
  for (let c = 0x3040; c <= 0x309f; c++) chars += String.fromCharCode(c);
  // All Katakana
  for (let c = 0x30a0; c <= 0x30ff; c++) chars += String.fromCharCode(c);
  // CJK symbols & punctuation
  for (let c = 0x3000; c <= 0x303f; c++) chars += String.fromCharCode(c);
  // Common Kanji for Japanese matcha / tea / cafe
  chars += '抹茶ハウス宇治京都茶道濃薄茶葉焙煎菓子店一二三四五六七八九十百千万円年月日時分秒日月火水木金土本本日東京日本品質農園厳選香甘苦渋味伝統製法至高点前器水風土歴史美味至福時間空間体験';

  const shipporiWoff2 = await subsetFont(shippori, chars, { targetFormat: 'woff2' });
  fs.writeFileSync(path.join(publicFontsDir, 'ShipporiMincho-Bold.woff2'), shipporiWoff2);
  console.log(`✓ ShipporiMincho-Bold.woff2 written (${shipporiWoff2.length} bytes)`);

  console.log('All fonts built successfully!');
}

buildFonts().catch(err => {
  console.error(err);
  process.exit(1);
});
