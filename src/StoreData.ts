export interface Store {
  id: number;
  name: string;
  district: string;
  province: string;
  lat: number;
  lng: number;
}

export const stores: Store[] = [
  {
    id: 1,
    name: "สาขาเอกมัย (Ekkamai)",
    district: "เขตวัฒนา",
    province: "Bangkok",
    lat: 13.734781,
    lng: 100.589279,
  },
  {
    id: 2,
    name: "สาขาบางนา (Bangna)",
    district: "อำเภอบางพลี",
    province: "Samut Prakan",
    lat: 13.663236,
    lng: 100.653668,
  },
  {
    id: 3,
    name: "สาขาเกษตร (Kaset)",
    district: "เขตจตุจักร",
    province: "Bangkok",
    lat: 13.836553,
    lng: 100.578375,
  },
  {
    id: 4,
    name: "สาขาปุณณวิถี (Punnawithi)",
    district: "เขตพระโขนง",
    province: "Bangkok",
    lat: 13.699369,
    lng: 100.603935,
  },
  {
    id: 5,
    name: "สาขาวิทยุ (Witthayu)",
    district: "เขตปทุมวัน",
    province: "Bangkok",
    lat: 13.738300,
    lng: 100.547182,
  },
  {
    id: 6,
    name: "สาขาราชปรารภ (Ratchaprarop)",
    district: "เขตราชเทวี",
    province: "Bangkok",
    lat: 13.760758,
    lng: 100.541883,
  },
];

