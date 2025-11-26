import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import InputKos from './InputKos';
import HasilPerhitungan from './HasilPerhitungan';
import Perbandingan from './Perbandingan';

const AdminDashboard = ({ kosData, onAddKos, onDeleteKos, bobot, onBobotChange, onLogout, onRefresh }) => {
  const [adminPage, setAdminPage] = useState('input');
  const [hasilData, setHasilData] = useState([]);

  // Load data dari sessionStorage saat mount atau page change
  useEffect(() => {
    if (adminPage === 'hasil' || adminPage === 'perbandingan') {
      const stored = sessionStorage.getItem('hasilPerhitungan');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setHasilData(parsed);
          console.log('✅ Data loaded from sessionStorage:', parsed);
        } catch (e) {
          console.error('❌ Error parsing stored data:', e);
          setHasilData([]);
        }
      } else {
        console.warn('⚠️ No data found in sessionStorage');
        setHasilData([]);
      }
    }
  }, [adminPage]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // Clear session data
      sessionStorage.removeItem('hasilPerhitungan');
      onLogout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleNavigate = (page, data = null) => {
    console.log('📍 Navigate to:', page, 'with data:', data);
    
    // Jika ada data baru, update state dan sessionStorage
    if (data) {
      setHasilData(data);
      sessionStorage.setItem('hasilPerhitungan', JSON.stringify(data));
      console.log('💾 Data saved:', data.length, 'items');
    }
    
    setAdminPage(page);
  };

  return (
    <div>
      {/* Header Admin */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 mb-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">🔧 Admin Dashboard</h2>
            <p className="text-sm text-blue-100 mt-1">Kelola Data Kos & Bobot Kriteria</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 font-semibold transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Routing Admin Pages */}
      {adminPage === 'input' && (
        <InputKos 
          kosData={kosData}
          onAddKos={onAddKos}
          onDeleteKos={onDeleteKos}
          onNavigate={handleNavigate}
          bobot={bobot}
          onBobotChange={onBobotChange}
        />
      )}

      {adminPage === 'hasil' && (
        <HasilPerhitungan
          hasilData={hasilData}
          onNavigate={handleNavigate}
          bobot={bobot}
        />
      )}

      {adminPage === 'perbandingan' && (
        <Perbandingan
          hasilData={hasilData}
          onNavigate={handleNavigate}
          bobot={bobot}
        />
      )}
    </div>
  );
};

export default AdminDashboard;