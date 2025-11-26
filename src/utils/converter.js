// Konversi TEXT kategori → Nilai Numerik (1-5)

export const konversiHarga = (hargaText) => {
  const mapping = {
    '≤ Rp. 300.000': 5,
    '< Rp. 500.000': 4,
    '< Rp. 750.000': 3,
    '< Rp. 1.000.000': 2,
    '≥ Rp. 1.000.000': 1
  };
  return mapping[hargaText] || 3; // default 3 jika tidak match
};

export const konversiFasilitas = (fasilitasText) => {
  const mapping = {
    'Kasur, Lemari': 1,
    'Kasur, Lemari, Meja': 2,
    'Kasur, Lemari, Meja, Dapur, Kipas Angin': 3,
    'Kasur, Lemari, Meja, Dapur, AC, Kamar mandi dalam': 4,
    'Kasur, Lemari, Meja, Dapur, AC,Kamar mandi dalam, TV': 5
  };
  
  // Cek exact match dulu
  if (mapping[fasilitasText]) return mapping[fasilitasText];
  
  // Fallback: hitung jumlah item (split by comma)
  const itemCount = fasilitasText.split(',').length;
  if (itemCount <= 2) return 1;
  if (itemCount === 3) return 2;
  if (itemCount <= 5) return 3;
  if (itemCount === 6) return 4;
  return 5;
};

export const konversiLuasKamar = (luasText) => {
  const mapping = {
    '3 x 3': 1,
    '3 x 4': 2,
    '4 x 5': 3,
    '5 x 5': 4,
    '5 x 6': 5
  };
  
  if (mapping[luasText]) return mapping[luasText];
  
  // Fallback: hitung luas (parsing "3 x 4" → 12)
  const parts = luasText.split('x').map(p => parseInt(p.trim()));
  if (parts.length === 2) {
    const luas = parts[0] * parts[1];
    if (luas <= 9) return 1;
    if (luas <= 12) return 2;
    if (luas <= 20) return 3;
    if (luas <= 25) return 4;
    return 5;
  }
  return 2; // default
};

export const konversiKeamanan = (keamananText) => {
  const mapping = {
    'Kunci Kamar': 1,
    'Kunci Kamar, Pagar': 2,
    'Kunci Kamar, Pagar, Gembok': 3,
    'Kunci Kamar, Pagar, Gembok, Batas Pengunjung': 4,
    'Kunci Kamar, Pagar, Gembok, Batas Pengunjung, CCTV': 5
  };
  
  if (mapping[keamananText]) return mapping[keamananText];
  
  // Fallback: hitung jumlah fitur
  const fiturCount = keamananText.split(',').length;
  return Math.min(fiturCount, 5);
};

// Helper untuk konversi semua kriteria sekaligus
export const konversiKosData = (kosData) => {
  return kosData.map(kos => ({
    ...kos,
    hargaNumerik: konversiHarga(kos.harga),
    fasilitasNumerik: konversiFasilitas(kos.fasilitas),
    luasKamarNumerik: konversiLuasKamar(kos.luas_kamar),
    keamananNumerik: konversiKeamanan(kos.keamanan)
  }));
};