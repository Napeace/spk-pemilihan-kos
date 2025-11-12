import React, { useState } from 'react';

const FormTambahKos = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    nama: '',
    harga: '',
    fasilitas: '3',
    waktuTempuh: '',
    luasKamar: '',
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
        luasKamar: '',
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
            className="w-full px-3 py-2 border rounded-md"
            value={formData.nama}
            onChange={(e) => setFormData({...formData, nama: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Harga Sewa (Rp)</label>
          <input
            type="number"
            required
            className="w-full px-3 py-2 border rounded-md"
            value={formData.harga}
            onChange={(e) => setFormData({...formData, harga: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fasilitas (1-5)</label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={formData.fasilitas}
            onChange={(e) => setFormData({...formData, fasilitas: e.target.value})}
          >
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Waktu Tempuh (menit)</label>
          <input
            type="number"
            required
            className="w-full px-3 py-2 border rounded-md"
            value={formData.waktuTempuh}
            onChange={(e) => setFormData({...formData, waktuTempuh: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Luas Kamar (m²)</label>
          <input
            type="number"
            required
            className="w-full px-3 py-2 border rounded-md"
            value={formData.luasKamar}
            onChange={(e) => setFormData({...formData, luasKamar: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Keamanan (1-5)</label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={formData.keamanan}
            onChange={(e) => setFormData({...formData, keamanan: e.target.value})}
          >
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="col-span-2 flex gap-2">
          <button 
            onClick={handleSubmit} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Tambah
          </button>
          <button 
            onClick={onCancel} 
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormTambahKos;