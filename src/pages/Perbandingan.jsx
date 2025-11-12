import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { hitungMSE } from '../utils/calculations';

const Perbandingan = ({ hasilData, onNavigate }) => {
  const mseSAW = hitungMSE(hasilData, 'SAW');
  const mseTOPSIS = hitungMSE(hasilData, 'TOPSIS');

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Perbandingan Metode SAW & TOPSIS</h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">MSE SAW</h3>
          <p className="text-3xl font-bold text-blue-600">
            {mseSAW.toFixed(6)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">MSE TOPSIS</h3>
          <p className="text-3xl font-bold text-green-600">
            {mseTOPSIS.toFixed(6)}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Kesimpulan</h3>
        <p className="text-gray-700">
          {mseSAW < mseTOPSIS 
            ? 'Metode SAW lebih akurat karena memiliki nilai MSE yang lebih kecil.'
            : 'Metode TOPSIS lebih akurat karena memiliki nilai MSE yang lebih kecil.'}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Grafik Perbandingan Skor</h3>
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
        className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 font-semibold"
      >
        Kembali ke Data Kos
      </button>
    </div>
  );
};

export default Perbandingan;