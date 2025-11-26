// Opsi untuk dropdown (sesuai requirement PDF)
export const hargaOptions = [
  { value: '≥ Rp. 1.000.000', label: '≥ Rp. 1.000.000' },
  { value: '< Rp. 1.000.000', label: '< Rp. 1.000.000' },
  { value: '< Rp. 750.000', label: '< Rp. 750.000' },
  { value: '< Rp. 500.000', label: '< Rp. 500.000' },
  { value: '≤ Rp. 300.000', label: '≤ Rp. 300.000' }
];

export const fasilitasOptions = [
  { value: 'Kasur, Lemari', label: 'Kasur, Lemari' },
  { value: 'Kasur, Lemari, Meja', label: 'Kasur, Lemari, Meja' },
  { value: 'Kasur, Lemari, Meja, Dapur, Kipas Angin', label: 'Kasur, Lemari, Meja, Dapur, Kipas Angin' },
  { value: 'Kasur, Lemari, Meja, Dapur, AC, Kamar mandi dalam', label: 'Kasur, Lemari, Meja, Dapur, AC, Kamar mandi dalam' },
  { value: 'Kasur, Lemari, Meja, Dapur, AC,Kamar mandi dalam, TV', label: 'Kasur, Lemari, Meja, Dapur, AC, Kamar mandi dalam, TV' }
];

export const luasKamarOptions = [
  { value: '3 x 3', label: '3 x 3' },
  { value: '3 x 4', label: '3 x 4' },
  { value: '4 x 5', label: '4 x 5' },
  { value: '5 x 5', label: '5 x 5' },
  { value: '5 x 6', label: '5 x 6' }
];

export const keamananOptions = [
  { value: 'Kunci Kamar', label: 'Kunci Kamar' },
  { value: 'Kunci Kamar, Pagar', label: 'Kunci Kamar, Pagar' },
  { value: 'Kunci Kamar, Pagar, Gembok', label: 'Kunci Kamar, Pagar, Gembok' },
  { value: 'Kunci Kamar, Pagar, Gembok, Batas Pengunjung', label: 'Kunci Kamar, Pagar, Gembok, Batas Pengunjung' },
  { value: 'Kunci Kamar, Pagar, Gembok, Batas Pengunjung, CCTV', label: 'Kunci Kamar, Pagar, Gembok, Batas Pengunjung, CCTV' }
];

// Bobot dari PDF (4 kriteria)
export const defaultBobot = {
  harga: 0.2666,      // 26.7%
  fasilitas: 0.2482,  // 24.8%
  luasKamar: 0.2197,  // 22.0%
  keamanan: 0.2655    // 26.5%
};