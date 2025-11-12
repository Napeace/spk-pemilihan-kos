import React, { useState } from 'react';
import TableKos from '../components/TableKos';
import FormTambahKos from '../components/FormTambahKos';

const InputKos = ({ kosData, onAddKos, onDeleteKos, onNavigate, bobot, onBobotChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [editBobot, setEditBobot] = useState(false);
  const [tempBobot, setTempBobot] = useState({
    harga: (bobot.harga * 100).toString(),
    fasilitas: (bobot.fasilitas * 100).toString(),
    waktuTempuh: (bobot.waktuTempuh * 100).toString(),
    luasKamar: (bobot.luasKamar * 100).toString(),
    keamanan: (bobot.keamanan * 100).toString()
  });

  const handleAdd = (newKos) => {
    onAddKos(newKos);
    setShowForm(false);
  };

  const handleBobotChange = (key, value) => {
    // Hanya izinkan angka dan satu titik desimal
    const sanitized = value.replace(/[^\d.]/g, '');
    // Hapus leading zeros kecuali untuk 0.x
    const cleaned = sanitized.replace(/^0+(?=\d)/, '');
    setTempBobot({
      ...tempBobot,
      [key]: cleaned
    });
  };

  const totalBobot = Object.values(tempBobot).reduce((sum, val) => {
    const num = parseFloat(val) || 0;
    return sum + num;
  }, 0);

  const handleSaveBobot = () => {
    if (Math.abs(totalBobot - 100) < 0.01) {
      onBobotChange({
        harga: parseFloat(tempBobot.harga) / 100,
        fasilitas: parseFloat(tempBobot.fasilitas) / 100,
        waktuTempuh: parseFloat(tempBobot.waktuTempuh) / 100,
        luasKamar: parseFloat(tempBobot.luasKamar) / 100,
        keamanan: parseFloat(tempBobot.keamanan) / 100
      });
      setEditBobot(false);
    } else {
      alert(`Total bobot harus 100%! Saat ini: ${totalBobot.toFixed(1)}%`);
    }
  };

  const handleCancelBobot = () => {
    setTempBobot({
      harga: (bobot.harga * 100).toString(),
      fasilitas: (bobot.fasilitas * 100).toString(),
      waktuTempuh: (bobot.waktuTempuh * 100).toString(),
      luasKamar: (bobot.luasKamar * 100).toString(),
      keamanan: (bobot.keamanan * 100).toString()
    });
    setEditBobot(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Data Kos</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          {showForm ? 'Tutup Form' : '+ Tambah Kos'}
        </button>
      </div>

      {showForm && (
        <FormTambahKos 
          onAdd={handleAdd} 
          onCancel={() => setShowForm(false)} 
        />
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <TableKos data={kosData} onDelete={onDeleteKos} />
      </div>

      {/* Section Bobot Kriteria */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">⚖️ Bobot Kriteria</h3>
          {!editBobot && (
            <button
              onClick={() => setEditBobot(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm transition"
            >
              ✏️ Ubah Bobot
            </button>
          )}
        </div>

        {!editBobot ? (
          // Mode Tampilan
          <div className="grid grid-cols-5 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Harga</p>
              <p className="text-2xl font-bold text-blue-600">{(bobot.harga * 100).toFixed(0)}%</p>
              <p className="text-xs text-gray-500 mt-1">Cost</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Fasilitas</p>
              <p className="text-2xl font-bold text-blue-600">{(bobot.fasilitas * 100).toFixed(0)}%</p>
              <p className="text-xs text-gray-500 mt-1">Benefit</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Waktu Tempuh</p>
              <p className="text-2xl font-bold text-blue-600">{(bobot.waktuTempuh * 100).toFixed(0)}%</p>
              <p className="text-xs text-gray-500 mt-1">Cost</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Luas Kamar</p>
              <p className="text-2xl font-bold text-blue-600">{(bobot.luasKamar * 100).toFixed(0)}%</p>
              <p className="text-xs text-gray-500 mt-1">Benefit</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Keamanan</p>
              <p className="text-2xl font-bold text-blue-600">{(bobot.keamanan * 100).toFixed(0)}%</p>
              <p className="text-xs text-gray-500 mt-1">Benefit</p>
            </div>
          </div>
        ) : (
          // Mode Edit
          <div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Penting:</strong> Total bobot harus 100%. 
                Saat ini: <strong className={Math.abs(totalBobot - 100) < 0.01 ? 'text-green-600' : 'text-red-600'}>
                  {totalBobot.toFixed(1)}%
                </strong>
              </p>
            </div>

            <div className="grid grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Harga (%)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={tempBobot.harga}
                  onChange={(e) => handleBobotChange('harga', e.target.value)}
                  placeholder="25"
                />
                <p className="text-xs text-gray-500 mt-1">Cost</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Fasilitas (%)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={tempBobot.fasilitas}
                  onChange={(e) => handleBobotChange('fasilitas', e.target.value)}
                  placeholder="20"
                />
                <p className="text-xs text-gray-500 mt-1">Benefit</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Waktu Tempuh (%)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={tempBobot.waktuTempuh}
                  onChange={(e) => handleBobotChange('waktuTempuh', e.target.value)}
                  placeholder="15"
                />
                <p className="text-xs text-gray-500 mt-1">Cost</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Luas Kamar (%)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={tempBobot.luasKamar}
                  onChange={(e) => handleBobotChange('luasKamar', e.target.value)}
                  placeholder="20"
                />
                <p className="text-xs text-gray-500 mt-1">Benefit</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Keamanan (%)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={tempBobot.keamanan}
                  onChange={(e) => handleBobotChange('keamanan', e.target.value)}
                  placeholder="20"
                />
                <p className="text-xs text-gray-500 mt-1">Benefit</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSaveBobot}
                className={`px-4 py-2 rounded-md text-white transition ${
                  Math.abs(totalBobot - 100) < 0.01
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={Math.abs(totalBobot - 100) >= 0.01}
              >
                💾 Simpan Bobot
              </button>
              <button
                onClick={handleCancelBobot}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 text-xs text-gray-600 bg-gray-50 p-3 rounded">
          <p><strong>💡 Tip:</strong> Bobot menentukan seberapa penting setiap kriteria dalam pemilihan kos.</p>
          <p className="mt-1">• <strong>Cost</strong> = Semakin rendah semakin baik (Harga, Waktu Tempuh)</p>
          <p>• <strong>Benefit</strong> = Semakin tinggi semakin baik (Fasilitas, Luas Kamar, Keamanan)</p>
        </div>
      </div>

      <button
        onClick={() => onNavigate('hasil')}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-semibold transition"
        disabled={kosData.length === 0}
      >
        🧮 Hitung SAW & TOPSIS
      </button>
    </div>
  );
};

export default InputKos;