import { useState, useEffect } from 'react';
import { fetchKosData, fetchBobot } from '../services/kosService';

export const useKosData = () => {
  const [kosData, setKosData] = useState([]);
  const [bobot, setBobot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [kos, bobotData] = await Promise.all([
        fetchKosData(),
        fetchBobot()
      ]);
      
      setKosData(kos);
      setBobot(bobotData);
    } catch (err) {
      setError(err.message);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => loadData();

  return { kosData, bobot, loading, error, refreshData, setBobot };
};