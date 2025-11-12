import React from 'react';

const HasilPerhitungan = ({ hasilData, onNavigate, bobot }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Hasil Perhitungan</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">⚖️ Bobot Kriteria yang Digunakan</h3>
        <div className="grid grid-cols-5 gap-4 text-sm">
          <div className="text-center">
            <p className="font-medium">Harga</p>
            <p className="text-2xl font-bold text-blue-600">{(bobot.harga * 100).toFixed(0)}%</p>
            <p className="text-xs text-gray-500">Cost</p>
          </div>
          <div className="text-center">
            <p className="font-medium">Fasilitas</p>
            <p className="text-2xl font-bold text-blue-600">{(bobot.fasilitas * 100).toFixed(0)}%</p>
            <p className="text-xs text-gray-500">Benefit</p>
          </div>
          <div className="text-center">
            <p className="font-medium">Waktu Tempuh</p>
            <p className="text-2xl font-bold text-blue-600">{(bobot.waktuTempuh * 100).toFixed(0)}%</p>
            <p className="text-xs text-gray-500">Cost</p>
          </div>
          <div className="text-center">
            <p className="font-medium">Luas Kamar</p>
            <p className="text-2xl font-bold text-blue-600">{(bobot.luasKamar * 100).toFixed(0)}%</p>
            <p className="text-xs text-gray-500">Benefit</p>
          </div>
          <div className="text-center">
            <p className="font-medium">Keamanan</p>
            <p className="text-2xl font-bold text-blue-600">{(bobot.keamanan * 100).toFixed(0)}%</p>
            <p className="text-xs text-gray-500">Benefit</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Nama Kos</th>
                <th className="px-4 py-2 border">SAW Score</th>
                <th className="px-4 py-2 border">TOPSIS Score</th>
                <th className="px-4 py-2 border">Rank SAW</th>
                <th className="px-4 py-2 border">Rank TOPSIS</th>
              </tr>
            </thead>
            <tbody>
              {hasilData.sort((a, b) => a.rankSAW - b.rankSAW).map((kos, idx) => (
                <tr key={kos.id} className={idx < 3 ? 'bg-green-50' : 'hover:bg-gray-50'}>
                  <td className="px-4 py-2 border text-center">{idx + 1}</td>
                  <td className="px-4 py-2 border">{kos.nama}</td>
                  <td className="px-4 py-2 border text-center">{kos.sawScore.toFixed(4)}</td>
                  <td className="px-4 py-2 border text-center">{kos.topsisScore.toFixed(4)}</td>
                  <td className="px-4 py-2 border text-center font-semibold">{kos.rankSAW}</td>
                  <td className="px-4 py-2 border text-center font-semibold">{kos.rankTOPSIS}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => onNavigate('perbandingan')}
          className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 font-semibold transition"
        >
          📊 Lihat Perbandingan
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