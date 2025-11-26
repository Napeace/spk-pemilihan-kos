import { 
  konversiHarga, 
  konversiFasilitas, 
  konversiLuasKamar, 
  konversiKeamanan 
} from './converter';
import { hitungSAW, hitungTOPSIS } from './calculations';

export const findKosByCriteria = (kosData, kriteria, bobot) => {
  console.log('🔍 Searching with criteria:', kriteria);

  // Convert user criteria to numeric
  const userNumerik = {
    harga: konversiHarga(kriteria.harga),
    fasilitas: konversiFasilitas(kriteria.fasilitas),
    luasKamar: konversiLuasKamar(kriteria.luasKamar),
    keamanan: konversiKeamanan(kriteria.keamanan)
  };

  console.log('👤 User criteria (numeric):', userNumerik);

  // Step 1: Find exact matches
  const exactMatch = kosData.filter(kos => {
    return (
      kos.harga === kriteria.harga &&
      kos.fasilitas === kriteria.fasilitas &&
      kos.luas_kamar === kriteria.luasKamar &&
      kos.keamanan === kriteria.keamanan
    );
  });

  console.log('📋 Exact matches:', exactMatch.length);

  let dataToProcess = [];
  let matchType = 'exact';
  let avgSimilarity = 100;

  if (exactMatch.length > 0) {
    dataToProcess = exactMatch;
    console.log('✅ Using exact matches');
  } else {
    // Step 2: Calculate similarity for all kos
    console.log('⚠️ No exact match, calculating similarity...');
    
    const kosWithSimilarity = kosData.map(kos => {
      const kosNumerik = {
        harga: konversiHarga(kos.harga),
        fasilitas: konversiFasilitas(kos.fasilitas),
        luasKamar: konversiLuasKamar(kos.luas_kamar),
        keamanan: konversiKeamanan(kos.keamanan)
      };

      // Calculate Euclidean distance
      const distance = Math.sqrt(
        Math.pow(kosNumerik.harga - userNumerik.harga, 2) +
        Math.pow(kosNumerik.fasilitas - userNumerik.fasilitas, 2) +
        Math.pow(kosNumerik.luasKamar - userNumerik.luasKamar, 2) +
        Math.pow(kosNumerik.keamanan - userNumerik.keamanan, 2)
      );

      const similarity = Math.max(0, 100 - (distance * 10));

      return { ...kos, similarity, distance };
    });

    // Sort by similarity
    kosWithSimilarity.sort((a, b) => b.similarity - a.similarity);

    console.log('📊 Top 5 closest kos:', 
      kosWithSimilarity.slice(0, 5).map(k => ({
        nama: k.nama_kos,
        similarity: k.similarity.toFixed(2)
      }))
    );

    // Take top 20 or all if less
    const topSimilar = kosWithSimilarity.slice(0, Math.min(20, kosWithSimilarity.length));
    dataToProcess = topSimilar;
    matchType = 'similarity';
    
    if (topSimilar.length > 0) {
      avgSimilarity = topSimilar.reduce((sum, k) => sum + k.similarity, 0) / topSimilar.length;
    }
  }

  if (dataToProcess.length === 0) {
    return {
      success: false,
      message: '❌ Tidak ada data kos yang tersedia.'
    };
  }

  // Calculate SAW & TOPSIS
  const sawResults = hitungSAW(dataToProcess, bobot);
  const topsisResults = hitungTOPSIS(dataToProcess, bobot);

  // Combine results
  const combined = dataToProcess.map((kos) => {
    const sawData = sawResults.find(s => s.id === kos.id);
    const topsisData = topsisResults.find(t => t.id === kos.id);

    return {
      ...kos,
      sawScore: sawData?.sawScore || 0,
      topsisScore: topsisData?.topsisScore || 0
    };
  });

  // Add rankings
  const sortedBySAW = [...combined].sort((a, b) => b.sawScore - a.sawScore);
  const sortedByTOPSIS = [...combined].sort((a, b) => b.topsisScore - a.topsisScore);

  combined.forEach(kos => {
    kos.rankSAW = sortedBySAW.findIndex(k => k.id === kos.id) + 1;
    kos.rankTOPSIS = sortedByTOPSIS.findIndex(k => k.id === kos.id) + 1;
  });

  return {
    success: true,
    data: combined,
    matchType,
    avgSimilarity,
    totalResults: combined.length
  };
};