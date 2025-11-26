import { useState } from 'react';
import { findKosByCriteria } from '../utils/searchAlgorithm';

export const useKosSearch = (kosData, bobot, showToast) => {
  const [hasilData, setHasilData] = useState([]);
  const [selectedKriteria, setSelectedKriteria] = useState(null);

  const handleSearch = (kriteria) => {
    const result = findKosByCriteria(kosData, kriteria, bobot);

    if (!result.success) {
      showToast(result.message, 'error');
      return;
    }

    // Show info if similarity match
    if (result.matchType === 'similarity') {
      showToast(
        `Tidak ada kos yang persis sesuai kriteria.\n\n` +
        `Menampilkan ${result.totalResults} kos yang paling mendekati pilihan Anda.\n` +
        `(Kemiripan rata-rata: ${result.avgSimilarity.toFixed(1)}%)`,
        'info',
        5000
      );
    }

    setHasilData(result.data);
    setSelectedKriteria(kriteria);
  };

  const resetSearch = () => {
    setHasilData([]);
    setSelectedKriteria(null);
  };

  return {
    hasilData,
    selectedKriteria,
    handleSearch,
    resetSearch
  };
};