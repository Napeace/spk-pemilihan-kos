export const initialKosData = [
  { id: 1, nama: "Kos Mawar", harga: 800000, fasilitas: 5, waktuTempuh: 10, luasKamar: 12, keamanan: 5 },
  { id: 2, nama: "Kos Melati", harga: 600000, fasilitas: 3, waktuTempuh: 15, luasKamar: 9, keamanan: 4 },
  { id: 3, nama: "Kos Anggrek", harga: 1000000, fasilitas: 5, waktuTempuh: 5, luasKamar: 25, keamanan: 5 },
  { id: 4, nama: "Kos Dahlia", harga: 500000, fasilitas: 2, waktuTempuh: 20, luasKamar: 9, keamanan: 3 },
  { id: 5, nama: "Kos Sakura", harga: 750000, fasilitas: 4, waktuTempuh: 12, luasKamar: 16, keamanan: 4 },
  { id: 6, nama: "Kos Teratai", harga: 900000, fasilitas: 4, waktuTempuh: 8, luasKamar: 12, keamanan: 5 },
  { id: 7, nama: "Kos Kenanga", harga: 550000, fasilitas: 3, waktuTempuh: 18, luasKamar: 9, keamanan: 3 },
  { id: 8, nama: "Kos Tulip", harga: 850000, fasilitas: 4, waktuTempuh: 10, luasKamar: 16, keamanan: 4 },
  { id: 9, nama: "Kos Cempaka", harga: 700000, fasilitas: 3, waktuTempuh: 14, luasKamar: 12, keamanan: 4 },
  { id: 10, nama: "Kos Seruni", harga: 650000, fasilitas: 3, waktuTempuh: 16, luasKamar: 12, keamanan: 3 }
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