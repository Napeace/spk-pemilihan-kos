import React, { useState, useEffect } from 'react';

const HasilPerhitungan = ({ hasilData, onNavigate, bobot }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset ke halaman 1 jika hasilData berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [hasilData?.length]);

  // Safety check - jika tidak ada data
  if (!hasilData || hasilData.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 max-w-md mx-auto">
          <p className="text-6xl mb-4">⚠️</p>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak Ada Data Hasil</h3>
          <p className="text-gray-600 mb-6">
            Belum ada hasil perhitungan. Silakan kembali dan lakukan perhitungan terlebih dahulu dengan mengklik tombol <strong>"Hitung SAW & TOPSIS"</strong>.
          </p>
          <button
            onClick={() => onNavigate('input')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
          >
            ← Kembali ke Input Data
          </button>
        </div>
      </div>
    );
  }

  // Hitung MSE untuk menentukan metode terbaik
  const hitungMSE = (data, metode) => {
    const scores = data.map(d => metode === 'SAW' ? d.sawScore : d.topsisScore);
    const mean = scores.reduce((sum, s) => sum + s, 0) / scores.length;
    const mse = scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / scores.length;
    return mse;
  };

  const mseSAW = hitungMSE(hasilData, 'SAW');
  const mseTOPSIS = hitungMSE(hasilData, 'TOPSIS');
  
  // Tentukan metode terbaik (MSE terkecil)
  const metodeTerbaik = mseSAW < mseTOPSIS ? 'SAW' : 'TOPSIS';
  
  // Sort berdasarkan ranking metode terbaik (ascending)
  const sortedData = [...hasilData].sort((a, b) => {
    if (metodeTerbaik === 'SAW') {
      return a.rankSAW - b.rankSAW;
    } else {
      return a.rankTOPSIS - b.rankTOPSIS;
    }
  });

  // Hitung pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi navigasi
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust startPage if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 rounded-md font-medium transition ${
            currentPage === i
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📊 Hasil Perhitungan</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">⚖️ Bobot Kriteria yang Digunakan</h3>
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <p className="font-medium">Harga</p>
            <p className="text-2xl font-bold text-blue-600">{(bobot.harga * 100).toFixed(1)}%</p>
            <p className="text-xs text-gray-500">Cost</p>
          </div>
          <div className="text-center">
            <p className="font-medium">Fasilitas</p>
            <p className="text-2xl font-bold text-blue-600">{(bobot.fasilitas * 100).toFixed(1)}%</p>
            <p className="text-xs text-gray-500">Benefit</p>
          </div>
          <div className="text-center">
            <p className="font-medium">Luas Kamar</p>
            <p className="text-2xl font-bold text-blue-600">{(bobot.luasKamar * 100).toFixed(1)}%</p>
            <p className="text-xs text-gray-500">Benefit</p>
          </div>
          <div className="text-center">
            <p className="font-medium">Keamanan</p>
            <p className="text-2xl font-bold text-blue-600">{(bobot.keamanan * 100).toFixed(1)}%</p>
            <p className="text-xs text-gray-500">Benefit</p>
          </div>
        </div>
      </div>

      {/* Info Banner Metode Terbaik */}
      <div className={`border-l-4 p-4 rounded-lg mb-6 ${
        metodeTerbaik === 'SAW' 
          ? 'bg-blue-50 border-blue-500' 
          : 'bg-green-50 border-green-500'
      }`}>
        <h4 className={`font-semibold mb-2 ${
          metodeTerbaik === 'SAW' ? 'text-blue-900' : 'text-green-900'
        }`}>
          🏆 Urutan Berdasarkan Metode Terbaik
        </h4>
        <p className="text-sm text-gray-700">
          Data diurutkan berdasarkan <strong>Rank {metodeTerbaik}</strong> karena metode {metodeTerbaik} memiliki nilai MSE lebih kecil 
          ({metodeTerbaik === 'SAW' ? mseSAW.toFixed(6) : mseTOPSIS.toFixed(6)}) 
          dibanding metode {metodeTerbaik === 'SAW' ? 'TOPSIS' : 'SAW'} 
          ({metodeTerbaik === 'SAW' ? mseTOPSIS.toFixed(6) : mseSAW.toFixed(6)}).
        </p>
        <p className="text-xs text-gray-600 mt-2">
          💡 MSE lebih kecil = hasil ranking lebih konsisten dan akurat.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        {/* Info Data */}
        <div className="mb-3 text-sm text-gray-600">
          Menampilkan <strong>{indexOfFirstItem + 1}</strong> - <strong>{Math.min(indexOfLastItem, sortedData.length)}</strong> dari <strong>{sortedData.length}</strong> data
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Nama Kos</th>
                <th className="px-4 py-2 border">Alamat</th>
                <th className="px-4 py-2 border">SAW Score</th>
                <th className="px-4 py-2 border">TOPSIS Score</th>
                <th className="px-4 py-2 border">Rank SAW</th>
                <th className="px-4 py-2 border">Rank TOPSIS</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((kos, idx) => {
                const actualIndex = indexOfFirstItem + idx;
                return (
                  <tr key={kos.id} className={actualIndex < 3 ? 'bg-green-50' : 'hover:bg-gray-50'}>
                    <td className="px-4 py-2 border text-center">{actualIndex + 1}</td>
                    <td className="px-4 py-2 border font-medium">
                      {kos.nama_kos}
                      {actualIndex === 0 && <span className="ml-2 text-xl">🥇</span>}
                      {actualIndex === 1 && <span className="ml-2 text-xl">🥈</span>}
                      {actualIndex === 2 && <span className="ml-2 text-xl">🥉</span>}
                    </td>
                    <td className="px-4 py-2 border text-sm text-gray-600">{kos.alamat}</td>
                    <td className="px-4 py-2 border text-center">{kos.sawScore.toFixed(4)}</td>
                    <td className="px-4 py-2 border text-center">{kos.topsisScore.toFixed(4)}</td>
                    <td className="px-4 py-2 border text-center font-semibold">{kos.rankSAW}</td>
                    <td className="px-4 py-2 border text-center font-semibold">{kos.rankTOPSIS}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md font-medium transition flex items-center gap-2 ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {renderPageNumbers()}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md font-medium transition flex items-center gap-2 ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Page Info */}
        {totalPages > 1 && (
          <div className="mt-3 text-center text-sm text-gray-500">
            Halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 text-sm">
        <h4 className="font-semibold mb-2">📖 Keterangan:</h4>
        <ul className="space-y-1 text-gray-700">
          <li>• <strong>SAW Score & Rank:</strong> Hasil perhitungan metode Simple Additive Weighting</li>
          <li>• <strong>TOPSIS Score & Rank:</strong> Hasil perhitungan metode TOPSIS</li>
          <li>• Data diurutkan berdasarkan metode dengan MSE terkecil (paling akurat)</li>
          <li>• Top 3 ditandai dengan highlight hijau dan medali 🥇🥈🥉</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => onNavigate('perbandingan')}
          className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 font-semibold transition"
        >
          📊 Lihat Perbandingan MSE
        </button>
        <button
          onClick={() => onNavigate('input')}
          className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 font-semibold transition"
        >
          ← Kembali ke Data Kos
        </button>
      </div>
    </div>
  );
};

export default HasilPerhitungan;