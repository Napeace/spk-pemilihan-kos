// Fungsi Perhitungan SAW
export const hitungSAW = (data, bobot) => {
  const normalized = data.map(kos => {
    const minHarga = Math.min(...data.map(k => k.harga));
    const maxFasilitas = Math.max(...data.map(k => k.fasilitas));
    const minWaktu = Math.min(...data.map(k => k.waktuTempuh));
    const maxLuas = Math.max(...data.map(k => k.luasKamar));
    const maxKeamanan = Math.max(...data.map(k => k.keamanan));

    return {
      ...kos,
      normHarga: minHarga / kos.harga,
      normFasilitas: kos.fasilitas / maxFasilitas,
      normWaktu: minWaktu / kos.waktuTempuh,
      normLuas: kos.luasKamar / maxLuas,
      normKeamanan: kos.keamanan / maxKeamanan
    };
  });

  return normalized.map(kos => ({
    ...kos,
    sawScore: (
      kos.normHarga * bobot.harga +
      kos.normFasilitas * bobot.fasilitas +
      kos.normWaktu * bobot.waktuTempuh +
      kos.normLuas * bobot.luasKamar +
      kos.normKeamanan * bobot.keamanan
    )
  }));
};

// Fungsi Perhitungan TOPSIS
export const hitungTOPSIS = (data, bobot) => {
  const normalized = data.map(kos => {
    const sumSquares = Math.sqrt(
      data.reduce((sum, k) => sum + k.harga * k.harga, 0)
    );
    const sumSquaresFas = Math.sqrt(
      data.reduce((sum, k) => sum + k.fasilitas * k.fasilitas, 0)
    );
    const sumSquaresWaktu = Math.sqrt(
      data.reduce((sum, k) => sum + k.waktuTempuh * k.waktuTempuh, 0)
    );
    const sumSquaresLuas = Math.sqrt(
      data.reduce((sum, k) => sum + k.luasKamar * k.luasKamar, 0)
    );
    const sumSquaresKeamanan = Math.sqrt(
      data.reduce((sum, k) => sum + k.keamanan * k.keamanan, 0)
    );

    return {
      ...kos,
      normHarga: (kos.harga / sumSquares) * bobot.harga,
      normFasilitas: (kos.fasilitas / sumSquaresFas) * bobot.fasilitas,
      normWaktu: (kos.waktuTempuh / sumSquaresWaktu) * bobot.waktuTempuh,
      normLuas: (kos.luasKamar / sumSquaresLuas) * bobot.luasKamar,
      normKeamanan: (kos.keamanan / sumSquaresKeamanan) * bobot.keamanan
    };
  });

  const idealPositif = {
    harga: Math.min(...normalized.map(k => k.normHarga)),
    fasilitas: Math.max(...normalized.map(k => k.normFasilitas)),
    waktu: Math.min(...normalized.map(k => k.normWaktu)),
    luas: Math.max(...normalized.map(k => k.normLuas)),
    keamanan: Math.max(...normalized.map(k => k.normKeamanan))
  };

  const idealNegatif = {
    harga: Math.max(...normalized.map(k => k.normHarga)),
    fasilitas: Math.min(...normalized.map(k => k.normFasilitas)),
    waktu: Math.max(...normalized.map(k => k.normWaktu)),
    luas: Math.min(...normalized.map(k => k.normLuas)),
    keamanan: Math.min(...normalized.map(k => k.normKeamanan))
  };

  return normalized.map(kos => {
    const dPositif = Math.sqrt(
      Math.pow(kos.normHarga - idealPositif.harga, 2) +
      Math.pow(kos.normFasilitas - idealPositif.fasilitas, 2) +
      Math.pow(kos.normWaktu - idealPositif.waktu, 2) +
      Math.pow(kos.normLuas - idealPositif.luas, 2) +
      Math.pow(kos.normKeamanan - idealPositif.keamanan, 2)
    );

    const dNegatif = Math.sqrt(
      Math.pow(kos.normHarga - idealNegatif.harga, 2) +
      Math.pow(kos.normFasilitas - idealNegatif.fasilitas, 2) +
      Math.pow(kos.normWaktu - idealNegatif.waktu, 2) +
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