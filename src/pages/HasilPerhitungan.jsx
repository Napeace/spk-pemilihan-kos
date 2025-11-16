import React from 'react';

const HasilPerhitungan = ({ hasilData, onNavigate, bobot }) => {
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
              {sortedData.map((kos, idx) => (
                <tr key={kos.id} className={idx < 3 ? 'bg-green-50' : 'hover:bg-gray-50'}>
                  <td className="px-4 py-2 border text-center">{idx + 1}</td>
                  <td className="px-4 py-2 border font-medium">
                    {kos.nama}
                    {idx === 0 && <span className="ml-2 text-xl">🥇</span>}
                    {idx === 1 && <span className="ml-2 text-xl">🥈</span>}
                    {idx === 2 && <span className="ml-2 text-xl">🥉</span>}
                  </td>
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