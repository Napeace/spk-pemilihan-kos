import { konversiKosData } from './converter';
// Fungsi Perhitungan SAW (4 Kriteria)
export const hitungSAW = (data, bobot) => {
  // Konversi text ke numerik
  const convertedData = konversiKosData(data);
  // Normalisasi
  const normalized = convertedData.map(kos => {
    const minHarga = Math.min(...convertedData.map(k => k.hargaNumerik));
    const maxFasilitas = Math.max(...convertedData.map(k => k.fasilitasNumerik));
    const maxLuas = Math.max(...convertedData.map(k => k.luasKamarNumerik));
    const maxKeamanan = Math.max(...convertedData.map(k => k.keamananNumerik));

    return {
      ...kos,
      normHarga: minHarga / kos.hargaNumerik, // Cost: min/x
      normFasilitas: kos.fasilitasNumerik / maxFasilitas, // Benefit: x/max
      normLuas: kos.luasKamarNumerik / maxLuas, // Benefit: x/max
      normKeamanan: kos.keamananNumerik / maxKeamanan // Benefit: x/max
    };
  });

  // Hitung SAW Score
  return normalized.map(kos => ({
    ...kos,
    sawScore: (
      kos.normHarga * bobot.harga +
      kos.normFasilitas * bobot.fasilitas +
      kos.normLuas * bobot.luasKamar +
      kos.normKeamanan * bobot.keamanan
    )
  }));
};

// Fungsi Perhitungan TOPSIS (4 Kriteria)
export const hitungTOPSIS = (data, bobot) => {
  // Konversi text ke numerik
  const convertedData = konversiKosData(data);
  
  // Normalisasi Euclidean
  const sumSquaresHarga = Math.sqrt(
    convertedData.reduce((sum, k) => sum + k.hargaNumerik * k.hargaNumerik, 0)
  );
  const sumSquaresFas = Math.sqrt(
    convertedData.reduce((sum, k) => sum + k.fasilitasNumerik * k.fasilitasNumerik, 0)
  );
  const sumSquaresLuas = Math.sqrt(
    convertedData.reduce((sum, k) => sum + k.luasKamarNumerik * k.luasKamarNumerik, 0)
  );
  const sumSquaresKeamanan = Math.sqrt(
    convertedData.reduce((sum, k) => sum + k.keamananNumerik * k.keamananNumerik, 0)
  );

  const normalized = convertedData.map(kos => ({
    ...kos,
    normHarga: (kos.hargaNumerik / sumSquaresHarga) * bobot.harga,
    normFasilitas: (kos.fasilitasNumerik / sumSquaresFas) * bobot.fasilitas,
    normLuas: (kos.luasKamarNumerik / sumSquaresLuas) * bobot.luasKamar,
    normKeamanan: (kos.keamananNumerik / sumSquaresKeamanan) * bobot.keamanan
  }));

  // Ideal Positif & Negatif
  const idealPositif = {
    harga: Math.min(...normalized.map(k => k.normHarga)), // Cost: min
    fasilitas: Math.max(...normalized.map(k => k.normFasilitas)), // Benefit: max
    luas: Math.max(...normalized.map(k => k.normLuas)), // Benefit: max
    keamanan: Math.max(...normalized.map(k => k.normKeamanan)) // Benefit: max
  };

  const idealNegatif = {
    harga: Math.max(...normalized.map(k => k.normHarga)), // Cost: max
    fasilitas: Math.min(...normalized.map(k => k.normFasilitas)), // Benefit: min
    luas: Math.min(...normalized.map(k => k.normLuas)), // Benefit: min
    keamanan: Math.min(...normalized.map(k => k.normKeamanan)) // Benefit: min
  };

  // Hitung jarak & TOPSIS Score
  return normalized.map(kos => {
    const dPositif = Math.sqrt(
      Math.pow(kos.normHarga - idealPositif.harga, 2) +
      Math.pow(kos.normFasilitas - idealPositif.fasilitas, 2) +
      Math.pow(kos.normLuas - idealPositif.luas, 2) +
      Math.pow(kos.normKeamanan - idealPositif.keamanan, 2)
    );

    const dNegatif = Math.sqrt(
      Math.pow(kos.normHarga - idealNegatif.harga, 2) +
      Math.pow(kos.normFasilitas - idealNegatif.fasilitas, 2) +
      Math.pow(kos.normLuas - idealNegatif.luas, 2) +
      Math.pow(kos.normKeamanan - idealNegatif.keamanan, 2)
    );

    return {
      ...kos,
      topsisScore: dNegatif / (dPositif + dNegatif)
    };
  });
};

// Fungsi Menghitung MSE
export const hitungMSE = (data, method) => {
  const scores = method === 'SAW' ? data.map(d => d.sawScore) : data.map(d => d.topsisScore);
  const mean = scores.reduce((sum, s) => sum + s, 0) / scores.length;
  const mse = scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / scores.length;
  return mse;
};