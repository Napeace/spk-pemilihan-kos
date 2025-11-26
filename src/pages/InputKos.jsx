import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import FormTambahKos from '../components/FormTambahKos';
import TableKos from '../components/TableKos';
import { hitungSAW, hitungTOPSIS } from '../utils/calculations';

const InputKos = ({ kosData, onAddKos, onDeleteKos, onNavigate, bobot, onBobotChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingBobot, setEditingBobot] = useState(false);
  const [tempBobot, setTempBobot] = useState(bobot);

  const handleHitungSAW = () => {
    if (kosData.length === 0) {
      alert('❌ Tidak ada data kos! Tambahkan data kos terlebih dahulu.');
      return;
    }

    console.log('🧮 Menghitung SAW & TOPSIS...');
    console.log('📊 Data Kos:', kosData);
    console.log('⚖️ Bobot:', bobot);
    
    // Hitung SAW & TOPSIS
    const sawResults = hitungSAW(kosData, bobot);
    const topsisResults = hitungTOPSIS(kosData, bobot);
    
    console.log('📈 SAW Results:', sawResults);
    console.log('📈 TOPSIS Results:', topsisResults);
    
    // Gabungkan hasil
    const combined = kosData.map((kos) => {
      const sawData = sawResults.find(s => s.id === kos.id);
      const topsisData = topsisResults.find(t => t.id === kos.id);
      
      return {
        ...kos,
        sawScore: sawData?.sawScore || 0,
        topsisScore: topsisData?.topsisScore || 0
      };
    });
    
    // Tambahkan ranking
    const sortedBySAW = [...combined].sort((a, b) => b.sawScore - a.sawScore);
    const sortedByTOPSIS = [...combined].sort((a, b) => b.topsisScore - a.topsisScore);
    
    combined.forEach(kos => {
      kos.rankSAW = sortedBySAW.findIndex(k => k.id === kos.id) + 1;
      kos.rankTOPSIS = sortedByTOPSIS.findIndex(k => k.id === kos.id) + 1;
    });
    
    console.log('✅ Perhitungan selesai!', combined);
    
    // Simpan ke sessionStorage
    sessionStorage.setItem('hasilPerhitungan', JSON.stringify(combined));
    
    // Kirim hasil ke parent dengan data sebagai parameter kedua
    if (onNavigate) {
      onNavigate('hasil', combined);
    }
  };

  const handleEditBobot = () => {
    setEditingBobot(true);
    setTempBobot({ ...bobot });
  };

  const handleSaveBobot = async () => {
    // Validasi total harus 100%
    const total = Object.values(tempBobot).reduce((sum, val) => sum + val, 0);
    
    if (Math.abs(total - 1.0) > 0.01) {
      alert(`❌ Total bobot harus 100%!\nSaat ini: ${(total * 100).toFixed(1)}%`);
      return;
    }

    try {
      // Update ke Supabase
      const { error } = await supabase
        .from('bobot_kriteria')
        .update({
          harga: tempBobot.harga,
          fasilitas: tempBobot.fasilitas,
          luas_kamar: tempBobot.luasKamar,
          keamanan: tempBobot.keamanan
        })
        .eq('id', 1);

      if (error) throw error;

      onBobotChange(tempBobot);
      setEditingBobot(false);
      alert('✅ Bobot kriteria berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating bobot:', error);
      alert('❌ Gagal update bobot: ' + error.message);
    }
  };

  const handleCancelBobot = () => {
    setTempBobot({ ...bobot });
    setEditingBobot(false);
  };

  const handleBobotChange = (key, value) => {
    setTempBobot({
      ...tempBobot,
      [key]: parseFloat(value)
    });
  };

  return (
    <div>
      {/* Bobot Kriteria Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">⚖️ Bobot Kriteria</h3>
          {!editingBobot ? (
            <button
              onClick={handleEditBobot}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              ✏️ Edit Bobot
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSaveBobot}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                ✅ Simpan
              </button>
              <button
                onClick={handleCancelBobot}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                ❌ Batal
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-4">
          {['harga', 'fasilitas', 'luasKamar', 'keamanan'].map((key) => {
            const labels = {
              harga: 'Harga',
              fasilitas: 'Fasilitas',
              luasKamar: 'Luas Kamar',
              keamanan: 'Keamanan'
            };
            
            return (
              <div key={key} className="text-center">
                <p className="font-medium text-gray-700 mb-2">{labels[key]}</p>
                {editingBobot ? (
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={tempBobot[key]}
                    onChange={(e) => handleBobotChange(key, e.target.value)}
                    className="w-full text-center text-xl font-bold text-blue-600 border-2 border-blue-300 rounded px-2 py-1"
                  />
                ) : (
                  <p className="text-2xl font-bold text-blue-600">
                    {(bobot[key] * 100).toFixed(1)}%
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {key === 'harga' ? 'Cost' : 'Benefit'}
                </p>
              </div>
            );
          })}
        </div>

        {editingBobot && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">
              💡 <strong>Total Bobot:</strong> {(Object.values(tempBobot).reduce((sum, val) => sum + val, 0) * 100).toFixed(1)}% 
              {Math.abs(Object.values(tempBobot).reduce((sum, val) => sum + val, 0) - 1.0) > 0.01 && 
                <span className="text-red-600 ml-2">⚠️ Harus 100%!</span>
              }
            </p>
          </div>
        )}
      </div>

      {/* Tombol Hitung SAW & TOPSIS */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-lg shadow-lg mb-6 text-center">
        <h3 className="text-white text-xl font-bold mb-3">
          🧮 Hitung Rekomendasi Kos Terbaik
        </h3>
        <p className="text-white text-sm mb-4">
          Gunakan metode SAW & TOPSIS untuk mendapatkan ranking kos terbaik
        </p>
        <button
          onClick={handleHitungSAW}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-bold text-lg shadow-md transition transform hover:scale-105"
        >
          📊 Hitung SAW & TOPSIS
        </button>
        <p className="text-white text-xs mt-3">
          Total Data: <strong>{kosData.length} Kos</strong>
        </p>
      </div>

      {/* Data Kos Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">📋 Data Kos ({kosData.length})</h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`px-4 py-2 rounded-md font-semibold transition ${
              showForm 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {showForm ? '❌ Tutup Form' : '➕ Tambah Kos Baru'}
          </button>
        </div>

        {showForm && (
          <div className="mb-6">
            <FormTambahKos onAddKos={onAddKos} onClose={() => setShowForm(false)} />
          </div>
        )}

        <TableKos kosData={kosData} onDeleteKos={onDeleteKos} />
      </div>
    </div>
  );
};

export default InputKos;