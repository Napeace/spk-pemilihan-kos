export const initialKosData = [
  { id: 1, nama: "Kos Mawar", harga: 800000, fasilitas: 5, waktuTempuh: 10, luasKamar: 12, keamanan: 5 },
  { id: 2, nama: "Kos Melati", harga: 600000, fasilitas: 3, waktuTempuh: 15, luasKamar: 9, keamanan: 4 },
  { id: 3, nama: "Kos Anggrek", harga: 1200000, fasilitas: 5, waktuTempuh: 5, luasKamar: 25, keamanan: 5 },
  { id: 4, nama: "Kos Dahlia", harga: 450000, fasilitas: 2, waktuTempuh: 25, luasKamar: 9, keamanan: 2 },
  { id: 5, nama: "Kos Sakura", harga: 750000, fasilitas: 4, waktuTempuh: 12, luasKamar: 16, keamanan: 4 },
  { id: 6, nama: "Kos Teratai", harga: 950000, fasilitas: 5, waktuTempuh: 8, luasKamar: 16, keamanan: 5 },
  { id: 7, nama: "Kos Kenanga", harga: 500000, fasilitas: 2, waktuTempuh: 20, luasKamar: 9, keamanan: 3 },
  { id: 8, nama: "Kos Tulip", harga: 850000, fasilitas: 4, waktuTempuh: 10, luasKamar: 16, keamanan: 4 },
  { id: 9, nama: "Kos Cempaka", harga: 700000, fasilitas: 3, waktuTempuh: 14, luasKamar: 12, keamanan: 4 },
  { id: 10, nama: "Kos Seruni", harga: 650000, fasilitas: 3, waktuTempuh: 18, luasKamar: 12, keamanan: 3 },
  { id: 11, nama: "Kos Flamboyan", harga: 1100000, fasilitas: 5, waktuTempuh: 6, luasKamar: 25, keamanan: 5 },
  { id: 12, nama: "Kos Alamanda", harga: 550000, fasilitas: 3, waktuTempuh: 22, luasKamar: 9, keamanan: 3 },
  { id: 13, nama: "Kos Bugenvil", harga: 900000, fasilitas: 4, waktuTempuh: 9, luasKamar: 16, keamanan: 5 },
  { id: 14, nama: "Kos Kamboja", harga: 400000, fasilitas: 1, waktuTempuh: 30, luasKamar: 9, keamanan: 2 },
  { id: 15, nama: "Kos Gardenia", harga: 1050000, fasilitas: 5, waktuTempuh: 7, luasKamar: 25, keamanan: 5 }
];

export const defaultBobot = {
  harga: 0.25,
  fasilitas: 0.20,
  waktuTempuh: 0.15,
  luasKamar: 0.20,
  keamanan: 0.20
};

// Mapping untuk Fasilitas
export const fasilitasOptions = [
  { value: 1, label: 'Kasur, Lemari' },
  { value: 2, label: 'Kasur, Lemari, Meja' },
  { value: 3, label: 'Kasur, Lemari, Meja, Dapur, Kipas Angin' },
  { value: 4, label: 'Kasur, Lemari, Meja, Dapur, AC, Kamar Mandi Dalam' },
  { value: 5, label: 'Kasur, Lemari, Meja, Dapur, AC, Kamar Mandi Dalam, TV' }
];

// Mapping untuk Luas Kamar
export const luasKamarOptions = [
  { value: 9, label: '3 x 3' },
  { value: 12, label: '3 x 4' },
  { value: 16, label: '4 x 4' },
  { value: 25, label: '5 x 5' },
  { value: 30, label: '5 x 6' }
];

// Mapping untuk Keamanan
export const keamananOptions = [
  { value: 1, label: 'Kunci Kamar' },
  { value: 2, label: 'Kunci Kamar, Pagar' },
  { value: 3, label: 'Kunci Kamar, Pagar, Gembok' },
  { value: 4, label: 'Kunci Kamar, Pagar, Gembok, Batas Pengunjung' },
  { value: 5, label: 'Kunci Kamar, Pagar, Gembok, Batas Pengunjung, CCTV' }
];

// Helper function untuk mendapatkan label
export const getFasilitasLabel = (value) => {
  const option = fasilitasOptions.find(opt => opt.value === value);
  return option ? option.label : value;
};

export const getLuasKamarLabel = (value) => {
  const option = luasKamarOptions.find(opt => opt.value === value);
  return option ? option.label : `${value} m²`;
};

export const getKeamananLabel = (value) => {
  const option = keamananOptions.find(opt => opt.value === value);
  return option ? option.label : value;
};