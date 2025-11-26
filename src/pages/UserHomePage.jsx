import React, { useState } from 'react';
import { hargaOptions, fasilitasOptions, luasKamarOptions, keamananOptions } from '../data/initialData';

const UserHomePage = ({ onSearch, bobot }) => {
  const [selectedKriteria, setSelectedKriteria] = useState({
    harga: '< Rp. 750.000',
    fasilitas: 'Kasur, Lemari, Meja, Dapur, Kipas Angin',
    luasKamar: '3 x 4',
    keamanan: 'Kunci Kamar, Pagar, Gembok'
  });

  const handleChange = (key, value) => {
    setSelectedKriteria({
      ...selectedKriteria,
      [key]: value
    });
  };

  const handleSearch = () => {
    onSearch(selectedKriteria);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white p-4 rounded-full shadow-lg mb-6">
            <span className="text-6xl">🏠</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Sistem Pendukung Keputusan Pemilihan Kos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan kos terbaik sesuai kebutuhan Anda dengan teknologi SAW & TOPSIS
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              📝
            </span>
            Pilih Kriteria Kos Idaman Anda
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Harga */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                💰 Harga Sewa per Bulan
              </label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={selectedKriteria.harga}
                onChange={(e) => handleChange('harga', e.target.value)}
              >
                {hargaOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Fasilitas */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🛋️ Fasilitas yang Diinginkan
              </label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={selectedKriteria.fasilitas}
                onChange={(e) => handleChange('fasilitas', e.target.value)}
              >
                {fasilitasOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Luas Kamar */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📏 Luas Kamar (meter)
              </label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={selectedKriteria.luasKamar}
                onChange={(e) => handleChange('luasKamar', e.target.value)}
              >
                {luasKamarOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Keamanan */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔒 Keamanan
              </label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={selectedKriteria.keamanan}
                onChange={(e) => handleChange('keamanan', e.target.value)}
              >
                {keamananOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bobot Info */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
            <p className="text-sm text-blue-800 mb-2">
              <strong>ℹ️ Bobot Kriteria yang Digunakan:</strong>
            </p>
            <div className="grid grid-cols-4 gap-2 text-xs text-blue-700">
              <div>Harga: <strong>{(bobot.harga * 100).toFixed(1)}%</strong></div>
              <div>Fasilitas: <strong>{(bobot.fasilitas * 100).toFixed(1)}%</strong></div>
              <div>Luas: <strong>{(bobot.luasKamar * 100).toFixed(1)}%</strong></div>
              <div>Keamanan: <strong>{(bobot.keamanan * 100).toFixed(1)}%</strong></div>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            🔍 Cari Kos Terbaik
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-800 mb-1">Metode SAW</h3>
            <p className="text-sm text-gray-600">Simple Additive Weighting</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-1">Metode TOPSIS</h3>
            <p className="text-sm text-gray-600">Technique for Order Preference</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="font-semibold text-gray-800 mb-1">Top 5 Rekomendasi</h3>
            <p className="text-sm text-gray-600">Kos terbaik untuk Anda</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;