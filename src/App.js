import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import InputKos from './pages/InputKos';
import HasilPerhitungan from './pages/HasilPerhitungan';
import Perbandingan from './pages/Perbandingan';
import { initialKosData, defaultBobot } from './data/initialData';
import { hitungSAW, hitungTOPSIS } from './utils/calculations';

const App = () => {
  const [page, setPage] = useState('input');
  const [kosData, setKosData] = useState([]);
  const [hasilData, setHasilData] = useState([]);
  const [bobot, setBobot] = useState(defaultBobot);

  useEffect(() => {
    const saved = localStorage.getItem('kosData');
    const savedBobot = localStorage.getItem('bobot');
    
    if (saved) {
      setKosData(JSON.parse(saved));
    } else {
      setKosData(initialKosData);
      localStorage.setItem('kosData', JSON.stringify(initialKosData));
    }

    if (savedBobot) {
      setBobot(JSON.parse(savedBobot));
    }
  }, []);

  const handleAddKos = (newKos) => {
    const id = kosData.length > 0 ? Math.max(...kosData.map(k => k.id)) + 1 : 1;
    const updated = [...kosData, { ...newKos, id }];
    setKosData(updated);
    localStorage.setItem('kosData', JSON.stringify(updated));
  };

  const handleDeleteKos = (id) => {
    const updated = kosData.filter(k => k.id !== id);
    setKosData(updated);
    localStorage.setItem('kosData', JSON.stringify(updated));
  };

  const handleBobotChange = (newBobot) => {
    setBobot(newBobot);
    localStorage.setItem('bobot', JSON.stringify(newBobot));
  };

  const handleNavigate = (targetPage) => {
    if (targetPage === 'hasil') {
      const saw = hitungSAW(kosData, bobot);
      const topsis = hitungTOPSIS(kosData, bobot);
      
      const sawSorted = [...saw].sort((a, b) => b.sawScore - a.sawScore);
      const topsisSorted = [...topsis].sort((a, b) => b.topsisScore - a.topsisScore);
      
      const combined = kosData.map(kos => {
        const sawData = sawSorted.find(s => s.id === kos.id);
        const topsisData = topsisSorted.find(t => t.id === kos.id);
        return {
          ...kos,
          sawScore: sawData.sawScore,
          topsisScore: topsisData.topsisScore,
          rankSAW: sawSorted.findIndex(s => s.id === kos.id) + 1,
          rankTOPSIS: topsisSorted.findIndex(t => t.id === kos.id) + 1
        };
      });

      setHasilData(combined);
    }
    
    setPage(targetPage);
    
    // Smooth scroll ke atas
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={page} />
      
      <div className="container mx-auto px-4 py-8">
        {page === 'input' && (
          <InputKos 
            kosData={kosData}
            onAddKos={handleAddKos}
            onDeleteKos={handleDeleteKos}
            onNavigate={handleNavigate}
            bobot={bobot}
            onBobotChange={handleBobotChange}
          />
        )}

        {page === 'hasil' && (
          <HasilPerhitungan 
            hasilData={hasilData}
            onNavigate={handleNavigate}
            bobot={bobot}
          />
        )}

        {page === 'perbandingan' && (
          <Perbandingan 
            hasilData={hasilData}
            onNavigate={handleNavigate}
          />
        )}
      </div>
    </div>
  );
};

export default App;