import React, { useState } from 'react';
import { fasilitasOptions, luasKamarOptions, keamananOptions } from '../data/initialData';

const FormTambahKos = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    nama: '',
    harga: '',
    fasilitas: '3',
    waktuTempuh: '',
    luasKamar: '12',
    keamanan: '3'
  });

  const handleSubmit = () => {
    if (formData.nama && formData.harga && formData.waktuTempuh && formData.luasKamar) {
      onAdd({
        ...formData,
        harga: parseInt(formData.harga),
        fasilitas: parseInt(formData.fasilitas),
        waktuTempuh: parseInt(formData.waktuTempuh),
        luasKamar: parseInt(formData.luasKamar),
        keamanan: parseInt(formData.keamanan)
      });
      setFormData({
        nama: '',
        harga: '',
        fasilitas: '3',
        waktuTempuh: '',
        luasKamar: '12',
        keamanan: '3'
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Tambah Kos Baru</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Kos</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.nama}
            onChange={(e) => setFormData({...formData, nama: e.target.value})}
            placeholder="Contoh: Kos Mawar"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Harga Sewa (Rp/bulan)</label>
          <input
            type="number"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.harga}
            onChange={(e) => setFormData({...formData, harga: e.target.value})}
            placeholder="500000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fasilitas</label>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.fasilitas}
            onChange={(e) => setFormData({...formData, fasilitas: e.target.value})}
          >
            {fasilitasOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Waktu Tempuh ke Kampus (menit)</label>
          <input
            type="number"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.waktuTempuh}
            onChange={(e) => setFormData({...formData, waktuTempuh: e.target.value})}
            placeholder="10"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Luas Kamar</label>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.luasKamar}
            onChange={(e) => setFormData({...formData, luasKamar: e.target.value})}
          >
            {luasKamarOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Keamanan</label>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.keamanan}
            onChange={(e) => setFormData({...formData, keamanan: e.target.value})}
          >
            {keamananOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2 flex gap-2">
          <button 
            onClick={handleSubmit} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Tambah
          </button>
          <button 
            onClick={onCancel} 
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormTambahKos;