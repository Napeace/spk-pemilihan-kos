import React, { useState } from 'react';

const UserHasilRekomendasi = ({ hasilData, selectedKriteria, bobot, onBackToHome }) => {
  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sort berdasarkan similarity (primary), lalu SAW score (secondary)
  const sortedData = [...hasilData].sort((a, b) => {
    // Jika ada similarity score, urutkan berdasarkan itu (tertinggi dulu)
    if (a.similarity !== undefined && b.similarity !== undefined) {
      if (Math.abs(a.similarity - b.similarity) > 0.01) {
        return b.similarity - a.similarity;
      }
    }
    // Jika similarity sama atau tidak ada, urutkan berdasarkan SAW score
    return b.sawScore - a.sawScore;
  });

  // Hitung pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🏆 Rekomendasi Kos Terbaik
          </h1>
          <p className="text-gray-600">
            Menampilkan {sortedData.length} kos berdasarkan kriteria Anda
          </p>
        </div>

        {/* Kriteria yang dipilih */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">📋 Kriteria Pencarian Anda:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Harga:</p>
              <p className="font-semibold">{selectedKriteria.harga}</p>
            </div>
            <div>
              <p className="text-gray-600">Fasilitas:</p>
              <p className="font-semibold text-xs">{selectedKriteria.fasilitas}</p>
            </div>
            <div>
              <p className="text-gray-600">Luas Kamar:</p>
              <p className="font-semibold">{selectedKriteria.luasKamar}</p>
            </div>
            <div>
              <p className="text-gray-600">Keamanan:</p>
              <p className="font-semibold text-xs">{selectedKriteria.keamanan}</p>
            </div>
          </div>
        </div>

        {/* Info Metode SAW */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-8">
          <h4 className="font-semibold mb-2 text-blue-900">
            🎯 Menggunakan Metode SAW (Simple Additive Weighting)
          </h4>
          <p className="text-sm text-gray-700">
            Sistem menggunakan metode SAW untuk memberikan rekomendasi kos terbaik berdasarkan kriteria dan bobot yang telah ditentukan.
          </p>
        </div>

        {/* Info Pagination */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 text-center">
          <p className="text-sm text-gray-600">
            Menampilkan <span className="font-semibold">{startIndex + 1}-{Math.min(endIndex, sortedData.length)}</span> dari <span className="font-semibold">{sortedData.length}</span> kos
          </p>
        </div>

        {/* Cards Hasil */}
        <div className="space-y-6 mb-8">
          {currentData.map((kos, idx) => {
            const globalIndex = startIndex + idx; // Index global untuk ranking
            return (
              <div 
                key={kos.id} 
                className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 ${
                  globalIndex === 0 ? 'border-4 border-yellow-400' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-4xl mr-4">
                        {globalIndex === 0 ? '🥇' : globalIndex === 1 ? '🥈' : globalIndex === 2 ? '🥉' : '🏅'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold text-gray-800">{kos.nama_kos}</h3>
                          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full font-semibold">
                            #{globalIndex + 1}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{kos.alamat}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full">
                        <p className="text-xs">Skor SAW</p>
                        <p className="text-xl font-bold">
                          {kos.sawScore.toFixed(4)}
                        </p>
                      </div>
                      {kos.similarity !== undefined && (
                        <div className="mt-2 text-xs text-gray-600">
                          Kemiripan: {kos.similarity.toFixed(1)}%
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">💰 Harga</p>
                      <p className="font-semibold text-sm">{kos.harga}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">🛋️ Fasilitas</p>
                      <p className="font-semibold text-xs">{kos.fasilitas}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">📏 Luas Kamar</p>
                      <p className="font-semibold text-sm">{kos.luas_kamar}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">🔒 Keamanan</p>
                      <p className="font-semibold text-xs">{kos.keamanan}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              ←
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              →
            </button>
          </div>
        )}

        {/* Button Kembali */}
        <div className="text-center">
          <button
            onClick={onBackToHome}
            className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 font-semibold transition inline-flex items-center"
          >
            <span className="mr-2">←</span>
            Cari Kos Lain
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHasilRekomendasi;