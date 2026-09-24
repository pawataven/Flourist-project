export interface Store {
  id: number;
  name: string;
  district: string;
  province: string;
  lat: number;
  lng: number;
  delivery: {
    lineManUrl: string;
    grabUrl: string;
  };
}

// Replace the platform URLs with each branch's real ordering page when available.
export const stores: Store[] = [

  {
    id: 1,
    name: "สาขาวิทยุ (Witthayu)",
    district: "ปทุมวัน",
    province: "Bangkok",
    lat: 13.7383,
    lng: 100.547182,
    delivery: {
      lineManUrl: "https://lin.ee/YCQmFxH?openExternalBrowser=1",
      grabUrl: "https://app.grab.com/s/XNUnIrHb",
    },
  },
  {
    id: 2,
    name: "สาขาราชปรารภ (Ratchaprarop)",
    district: "ราชเทวี",
    province: "Bangkok",
    lat: 13.760758,
    lng: 100.541883,
    delivery: {
      lineManUrl: "https://lin.ee/8ps0ZYL?openExternalBrowser=1",
      grabUrl: "https://app.grab.com/s/tgRZjlaU",
    },
  },
  {
    id: 3,
    name: "สาขาราชพฤกษ์ (Ratchaphruek)",
    district: "ตลิ่งชัน",
    province: "Bangkok",
    lat: 13.797775,
    lng: 100.444447,
    delivery: {
      lineManUrl: "https://lin.ee/nzSmykT?openExternalBrowser=1",
      grabUrl: "https://app.grab.com/s/A4EeQf2F",
    },
  },
  {
    id: 4,
    name: "สาขาเอกมัย (Ekkamai)",
    district: "วัฒนา",
    province: "Bangkok",
    lat: 13.734781,
    lng: 100.589279,
    delivery: {
      lineManUrl: "https://lin.ee/rcEon8r?openExternalBrowser=1",
      grabUrl: "https://app.grab.com/s/9kfb2kAL",
    },
  },
  {
    id: 5,
    name: "สาขาปุณณวิถี (Punnawithi)",
    district: "พระโขนง",
    province: "Bangkok",
    lat: 13.699369,
    lng: 100.603935,
    delivery: {
      lineManUrl: "https://lin.ee/QLxnv1Q?openExternalBrowser=1",
      grabUrl: "https://app.grab.com/s/WgvGziRe",
    },
  },
  {
    id: 6,
    name: "สาขาเกษตร (Kaset)",
    district: "จตุจักร",
    province: "Bangkok",
    lat: 13.836553,
    lng: 100.578375,
    delivery: {
      lineManUrl: "https://lin.ee/PQmiB40F?openExternalBrowser=1",
      grabUrl: "https://app.grab.com/s/dydE8ju2",
    },
  },
  {
    id: 7,
    name: "สาขางามวงศ์วาน (Ngamwongwan)",
    district: "หลักสี่",
    province: "Bangkok",
    lat: 13.869944,
    lng: 100.554522,
    delivery: {
      lineManUrl: "https://lin.ee/9m75536?openExternalBrowser=1",
      grabUrl: "https://app.grab.com/s/XPJMw60i",
    },
  },
  {
    id: 8,
    name: "สาขาบางนา (Bangna)",
    district: "บางพลี",
    province: "Samut Prakan",
    lat: 13.663236,
    lng: 100.653668,
    delivery: {
      lineManUrl: "https://lin.ee/O3Tmdcc?openExternalBrowser=1",
      grabUrl: "https://app.grab.com/s/xwTEDaFt",
    },
  },
  {
    id: 9,
    name: "สาขากรุงเทพกรีฑา (Krungthep Kreetha)",
    district: "สะพานสูง",
    province: "bangkok",
    lat: 13.740047,
    lng: 100.687783,
    delivery: {
      lineManUrl: "https://lin.ee/tsURnuuA?openExternalBrowser=1",
      grabUrl: "https://app.grab.com/s/stXpxlle",
    },
  },
];
