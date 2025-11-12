import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { hitungMSE } from '../utils/calculations';

const Perbandingan = ({ hasilData, onNavigate }) => {
  const mseSAW = hitungMSE(hasilData, 'SAW');
  const mseTOPSIS = hitungMSE(hasilData, 'TOPSIS');

  // Hitung mean untuk ditampilkan
  const scoresSAW = hasilData.map(d => d.sawScore);
  const scoresTOPSIS = hasilData.map(d => d.topsisScore);
  const meanSAW = scoresSAW.reduce((sum, s) => sum + s, 0) / scoresSAW.length;
  const meanTOPSIS = scoresTOPSIS.reduce((sum, s) => sum + s, 0) / scoresTOPSIS.length;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Perbandingan Metode SAW & TOPSIS</h2>

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
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-200">
          <h3 className="text-lg font-semibold mb-3 text-blue-700">MSE SAW</h3>
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

        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-200">
          <h3 className="text-lg font-semibold mb-3 text-green-700">MSE TOPSIS</h3>
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
                Artinya, hasil ranking dari metode SAW lebih konsisten dan dapat lebih diandalkan untuk memilih kos terbaik.
              </span>
            </>
          ) : (
            <>
              Metode <strong className="text-green-700">TOPSIS</strong> lebih akurat karena memiliki nilai MSE yang lebih kecil 
              (<strong>{mseTOPSIS.toFixed(6)}</strong> {'<'} {mseSAW.toFixed(6)}).
              <br />
              <span className="text-sm text-gray-600 mt-2 block">
                Artinya, hasil ranking dari metode TOPSIS lebih konsisten dan dapat lebih diandalkan untuk memilih kos terbaik.
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
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={hasilData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nama" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sawScore" fill="#3b82f6" name="SAW Score" />
            <Bar dataKey="topsisScore" fill="#10b981" name="TOPSIS Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <button
        onClick={() => onNavigate('input')}
        className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 font-semibold transition"
      >
        ← Kembali ke Data Kos
      </button>
    </div>
  );
};

export default Perbandingan;