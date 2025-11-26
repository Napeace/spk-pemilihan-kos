import React, { useState } from 'react';
import { hargaOptions, fasilitasOptions, luasKamarOptions, keamananOptions } from '../data/initialData';

const FormTambahKos = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    nama_kos: '',
    alamat: '',
    harga: '< Rp. 750.000',
    fasilitas: 'Kasur, Lemari, Meja, Dapur, Kipas Angin',
    luas_kamar: '3 x 4',
    keamanan: 'Kunci Kamar, Pagar, Gembok'
  });

  const handleSubmit = () => {
    if (formData.nama_kos && formData.alamat) {
      onAdd(formData);
      setFormData({
        nama_kos: '',
        alamat: '',
        harga: '< Rp. 750.000',
        fasilitas: 'Kasur, Lemari, Meja, Dapur, Kipas Angin',
        luas_kamar: '3 x 4',
        keamanan: 'Kunci Kamar, Pagar, Gembok'
      });
    } else {
      alert('Nama kos dan alamat harus diisi!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Tambah Kos Baru</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Kos *</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.nama_kos}
            onChange={(e) => setFormData({...formData, nama_kos: e.target.value})}
            placeholder="Contoh: Kos Mawar Indah"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Alamat *</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.alamat}
            onChange={(e) => setFormData({...formData, alamat: e.target.value})}
            placeholder="Jl. Contoh No. 123"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Harga</label>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.harga}
            onChange={(e) => setFormData({...formData, harga: e.target.value})}
          >
            {hargaOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
          <label className="block text-sm font-medium mb-1">Luas Kamar</label>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.luas_kamar}
            onChange={(e) => setFormData({...formData, luas_kamar: e.target.value})}
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