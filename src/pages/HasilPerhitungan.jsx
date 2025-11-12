import React from 'react';
import { hitungMSE } from '../utils/calculations';

const HasilPerhitungan = ({ hasilData, onNavigate, bobot }) => {
  // Hitung MSE untuk menentukan bobot masing-masing metode
  const mseSAW = hitungMSE(hasilData, 'SAW');
  const mseTOPSIS = hitungMSE(hasilData, 'TOPSIS');
  
  // MSE lebih kecil = lebih akurat = bobot lebih besar
  // Gunakan inverse MSE untuk bobot (1/MSE)
  const inverseMseSAW = 1 / mseSAW;
  const inverseMseTOPSIS = 1 / mseTOPSIS;
  const totalInverse = inverseMseSAW + inverseMseTOPSIS;
  
  // Normalisasi bobot (total = 1)
  const bobotSAW = inverseMseSAW / totalInverse;
  const bobotTOPSIS = inverseMseTOPSIS / totalInverse;

  // Hitung Final Score untuk setiap kos
  const hasilWithFinalScore = hasilData.map(kos => ({
    ...kos,
    finalScore: (kos.sawScore * bobotSAW) + (kos.topsisScore * bobotTOPSIS)
  }));

  // Sort berdasarkan Final Score (descending)
  const sortedData = [...hasilWithFinalScore].sort((a, b) => b.finalScore - a.finalScore);

  // Tambahkan Ranking Final
  const finalData = sortedData.map((kos, idx) => ({
    ...kos,
    rankingFinal: idx + 1
  }));

  const metodeTerbaik = mseSAW < mseTOPSIS ? 'SAW' : 'TOPSIS';

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

      {/* Info Bobot Metode Berdasarkan MSE */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-purple-500 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-purple-900 mb-2">🎯 Perhitungan Ranking Final Berdasarkan MSE</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-700">
              <strong>MSE SAW:</strong> {mseSAW.toFixed(6)}
            </p>
            <p className="text-gray-700">
              <strong>Bobot SAW:</strong> <span className="text-blue-600 font-semibold">{(bobotSAW * 100).toFixed(1)}%</span>
            </p>
          </div>
          <div>
            <p className="text-gray-700">
              <strong>MSE TOPSIS:</strong> {mseTOPSIS.toFixed(6)}
            </p>
            <p className="text-gray-700">
              <strong>Bobot TOPSIS:</strong> <span className="text-green-600 font-semibold">{(bobotTOPSIS * 100).toFixed(1)}%</span>
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-3 pt-3 border-t">
          💡 <strong>Rumus Final Score:</strong> (SAW Score × {(bobotSAW * 100).toFixed(1)}%) + (TOPSIS Score × {(bobotTOPSIS * 100).toFixed(1)}%)
          <br />
          Metode dengan MSE lebih kecil mendapat bobot lebih besar dalam perhitungan final.
        </p>
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
                <th className="px-4 py-2 border bg-purple-50">Final Score</th>
                <th className="px-4 py-2 border bg-yellow-50">
                  <div className="flex items-center justify-center gap-1">
                    <span>🏆 Ranking Final</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {finalData.map((kos, idx) => (
                <tr key={kos.id} className={idx < 3 ? 'bg-green-50' : 'hover:bg-gray-50'}>
                  <td className="px-4 py-2 border text-center">{idx + 1}</td>
                  <td className="px-4 py-2 border font-medium">{kos.nama}</td>
                  <td className="px-4 py-2 border text-center">{kos.sawScore.toFixed(4)}</td>
                  <td className="px-4 py-2 border text-center">{kos.topsisScore.toFixed(4)}</td>
                  <td className="px-4 py-2 border text-center font-semibold">{kos.rankSAW}</td>
                  <td className="px-4 py-2 border text-center font-semibold">{kos.rankTOPSIS}</td>
                  <td className="px-4 py-2 border text-center bg-purple-50 font-semibold text-purple-700">
                    {kos.finalScore.toFixed(4)}
                  </td>
                  <td className="px-4 py-2 border text-center bg-yellow-50">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl font-bold text-yellow-600">
                        #{kos.rankingFinal}
                      </span>
                      {idx === 0 && <span className="text-xl">🥇</span>}
                      {idx === 1 && <span className="text-xl">🥈</span>}
                      {idx === 2 && <span className="text-xl">🥉</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 text-sm">
        <h4 className="font-semibold mb-2">📖 Keterangan:</h4>
        <ul className="space-y-1 text-gray-700">
          <li>• <strong>SAW Score & Rank:</strong> Hasil perhitungan metode Simple Additive Weighting</li>
          <li>• <strong>TOPSIS Score & Rank:</strong> Hasil perhitungan metode TOPSIS</li>
          <li>• <strong>Final Score:</strong> Kombinasi SAW dan TOPSIS dengan bobot berdasarkan akurasi MSE</li>
          <li>• <strong>Ranking Final:</strong> Urutan kos terbaik berdasarkan Final Score (semakin besar semakin baik)</li>
          <li>• Metode dengan MSE lebih kecil mendapat bobot lebih tinggi dalam Final Score</li>
        </ul>
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