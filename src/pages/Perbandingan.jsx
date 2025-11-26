import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Perbandingan = ({ hasilData, onNavigate, bobot }) => {
  // Safety check
  if (!hasilData || hasilData.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 max-w-md mx-auto">
          <p className="text-6xl mb-4">⚠️</p>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak Ada Data</h3>
          <p className="text-gray-600 mb-6">
            Belum ada data untuk dibandingkan. Silakan lakukan perhitungan terlebih dahulu.
          </p>
          <button
            onClick={() => onNavigate('input')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            ← Kembali ke Input Data
          </button>
        </div>
      </div>
    );
  }

  // Hitung MSE
  const hitungMSE = (data, metode) => {
    const scores = data.map(d => metode === 'SAW' ? d.sawScore : d.topsisScore);
    const mean = scores.reduce((sum, s) => sum + s, 0) / scores.length;
    const mse = scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / scores.length;
    return mse;
  };

  const mseSAW = hitungMSE(hasilData, 'SAW');
  const mseTOPSIS = hitungMSE(hasilData, 'TOPSIS');

  // Hitung mean untuk ditampilkan
  const scoresSAW = hasilData.map(d => d.sawScore);
  const scoresTOPSIS = hasilData.map(d => d.topsisScore);
  const meanSAW = scoresSAW.reduce((sum, s) => sum + s, 0) / scoresSAW.length;
  const meanTOPSIS = scoresTOPSIS.reduce((sum, s) => sum + s, 0) / scoresTOPSIS.length;

  // Transform data untuk grafik dengan nama yang lebih pendek
  const chartData = hasilData.map((kos, idx) => ({
    nama: kos.nama_kos.length > 15 
      ? kos.nama_kos.substring(0, 15) + '...' 
      : kos.nama_kos,
    namaLengkap: kos.nama_kos,
    sawScore: kos.sawScore,
    topsisScore: kos.topsisScore,
    no: idx + 1
  }));

  // Custom Tooltip untuk menampilkan nama lengkap
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{payload[0].payload.namaLengkap}</p>
          <p className="text-sm text-blue-600">
            <strong>SAW Score:</strong> {payload[0].value.toFixed(4)}
          </p>
          <p className="text-sm text-green-600">
            <strong>TOPSIS Score:</strong> {payload[1].value.toFixed(4)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📊 Perbandingan Metode SAW & TOPSIS</h2>

      {/* Penjelasan MSE */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">📊 Apa itu MSE (Mean Squared Error)?</h3>
        <p className="text-sm text-gray-700 mb-2">
          MSE digunakan untuk mengukur <strong>konsistensi dan akurasi</strong> dari hasil perhitungan kedua metode. 
          MSE dihitung dari <strong>seluruh {hasilData.length} data kos</strong> yang ada.
        </p>
        <p className="text-sm text-gray-700">
          Semakin <strong>kecil nilai MSE</strong>, semakin baik metode tersebut karena hasil skornya lebih konsisten dan tidak terlalu bervariasi.
        </p>
      </div>

      {/* Card MSE */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className={`bg-white p-6 rounded-lg shadow-md border-2 ${
          mseSAW < mseTOPSIS ? 'border-blue-400 ring-2 ring-blue-200' : 'border-blue-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-blue-700">MSE SAW</h3>
            {mseSAW < mseTOPSIS && <span className="text-2xl">🏆</span>}
          </div>
          <p className="text-4xl font-bold text-blue-600 mb-3">
            {mseSAW.toFixed(6)}
          </p>
          <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
            <p className="font-semibold mb-1">Rumus MSE:</p>
            <p className="mb-2">MSE = Σ(skor - mean)² / n</p>
            <p className="mb-1">Mean SAW = {meanSAW.toFixed(4)}</p>
            <p>Jumlah data (n) = {hasilData.length}</p>
          </div>
        </div>

        <div className={`bg-white p-6 rounded-lg shadow-md border-2 ${
          mseTOPSIS < mseSAW ? 'border-green-400 ring-2 ring-green-200' : 'border-green-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-green-700">MSE TOPSIS</h3>
            {mseTOPSIS < mseSAW && <span className="text-2xl">🏆</span>}
          </div>
          <p className="text-4xl font-bold text-green-600 mb-3">
            {mseTOPSIS.toFixed(6)}
          </p>
          <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
            <p className="font-semibold mb-1">Rumus MSE:</p>
            <p className="mb-2">MSE = Σ(skor - mean)² / n</p>
            <p className="mb-1">Mean TOPSIS = {meanTOPSIS.toFixed(4)}</p>
            <p>Jumlah data (n) = {hasilData.length}</p>
          </div>
        </div>
      </div>

      {/* Kesimpulan dengan highlight */}
      <div className={`p-6 rounded-lg shadow-md mb-6 ${
        mseSAW < mseTOPSIS ? 'bg-blue-50 border-2 border-blue-400' : 'bg-green-50 border-2 border-green-400'
      }`}>
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <span className="text-2xl mr-2">🏆</span>
          Kesimpulan
        </h3>
        <p className="text-gray-800 text-lg">
          {mseSAW < mseTOPSIS ? (
            <>
              Metode <strong className="text-blue-700">SAW</strong> lebih akurat karena memiliki nilai MSE yang lebih kecil 
              (<strong>{mseSAW.toFixed(6)}</strong> {'<'} {mseTOPSIS.toFixed(6)}).
              <br />
              <span className="text-sm text-gray-600 mt-2 block">
                💡 Artinya, hasil ranking dari metode SAW lebih konsisten dan dapat lebih diandalkan untuk memilih kos terbaik.
              </span>
            </>
          ) : (
            <>
              Metode <strong className="text-green-700">TOPSIS</strong> lebih akurat karena memiliki nilai MSE yang lebih kecil 
              (<strong>{mseTOPSIS.toFixed(6)}</strong> {'<'} {mseSAW.toFixed(6)}).
              <br />
              <span className="text-sm text-gray-600 mt-2 block">
                💡 Artinya, hasil ranking dari metode TOPSIS lebih konsisten dan dapat lebih diandalkan untuk memilih kos terbaik.
              </span>
            </>
          )}
        </p>
      </div>

      {/* Grafik */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">📊 Grafik Perbandingan Skor</h3>
        <p className="text-sm text-gray-600 mb-4">
          Grafik ini menampilkan perbandingan skor SAW (biru) dan TOPSIS (hijau) untuk setiap kos.
          Hover pada grafik untuk melihat detail lengkap.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="nama" 
              angle={-45} 
              textAnchor="end" 
              height={100}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              label={{ value: 'Score', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="square"
            />
            <Bar 
              dataKey="sawScore" 
              fill="#3b82f6" 
              name="SAW Score"
              radius={[8, 8, 0, 0]}
            />
            <Bar 
              dataKey="topsisScore" 
              fill="#10b981" 
              name="TOPSIS Score"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tombol Navigasi */}
      <div className="flex gap-4">
        <button
          onClick={() => onNavigate('hasil')}
          className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 font-semibold transition"
        >
          📊 Lihat Hasil Perhitungan
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

export default Perbandingan;