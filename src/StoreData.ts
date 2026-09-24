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
    name: "สาขาเอกมัย (Ekkamai)",
    district: "วัฒนา",
    province: "Bangkok",
    lat: 13.734781,
    lng: 100.589279,
    delivery: {
      lineManUrl: "https://lineman.line.me/",
      grabUrl: "https://food.grab.com/th/th/",
    },
  },
  {
    id: 2,
    name: "สาขาบางนา (Bangna)",
    district: "บางพลี",
    province: "Samut Prakan",
    lat: 13.663236,
    lng: 100.653668,
    delivery: {
      lineManUrl: "https://lineman.line.me/",
      grabUrl: "https://food.grab.com/th/th/",
    },
  },
  {
    id: 3,
    name: "สาขาเกษตร (Kaset)",
    district: "จตุจักร",
    province: "Bangkok",
    lat: 13.836553,
    lng: 100.578375,
    delivery: {
      lineManUrl: "https://lineman.line.me/",
      grabUrl: "https://food.grab.com/th/th/",
    },
  },
  {
    id: 4,
    name: "สาขาปุณณวิถี (Punnawithi)",
    district: "พระโขนง",
    province: "Bangkok",
    lat: 13.699369,
    lng: 100.603935,
    delivery: {
      lineManUrl: "https://lineman.line.me/",
      grabUrl: "https://food.grab.com/th/th/",
    },
  },
  {
    id: 5,
    name: "สาขาวิทยุ (Witthayu)",
    district: "ปทุมวัน",
    province: "Bangkok",
    lat: 13.7383,
    lng: 100.547182,
    delivery: {
      lineManUrl: "https://lineman.line.me/",
      grabUrl: "https://app.grab.com/s/XNUnIrHb",
    },
  },
  {
    id: 6,
    name: "สาขาราชปรารภ (Ratchaprarop)",
    district: "ราชเทวี",
    province: "Bangkok",
    lat: 13.760758,
    lng: 100.541883,
    delivery: {
      lineManUrl: "https://lineman.line.me/",
      grabUrl: "https://food.grab.com/th/th/",
    },
  },
];
