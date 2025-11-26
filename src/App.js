import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useKosData } from './hooks/useKosData';
import { useKosSearch } from './hooks/useKosSearch';
import { useToast, ToastContainer } from './components/Toast'; 
import UserHomePage from './pages/UserHomePage';
import UserHasilRekomendasi from './pages/UserHasilRekomendasi';
import LoginAdmin from './pages/LoginAdmin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('user-home');
  const { user, loading: authLoading, logout } = useAuth();
  const { kosData, bobot, loading: dataLoading, refreshData, setBobot } = useKosData();
  
  const { toasts, showToast, removeToast } = useToast();
  
  const { hasilData, selectedKriteria, handleSearch, resetSearch } = useKosSearch(
    kosData, 
    bobot, 
    showToast 
  );

  // Handle URL routing
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin') {
      setCurrentPage(user ? 'admin' : 'login');
    }
  }, [user]);

  // Navigation handlers
  const handleBackToUserHome = () => {
    setCurrentPage('user-home');
    resetSearch();
  };

  const handleUserSearchClick = (kriteria) => {
    handleSearch(kriteria);
    setCurrentPage('user-hasil');
  };

  const handleLoginSuccess = () => {
    setCurrentPage('admin');
    window.history.pushState({}, '', '/admin');
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('login');
    window.history.pushState({}, '', '/admin');
  };

  // Loading state
  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  // Routing
  if (currentPage === 'login' && !user) {
    return <LoginAdmin onLoginSuccess={handleLoginSuccess} />;
  }

  if ((currentPage === 'admin' || currentPage === 'login') && user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        
        <div className="container mx-auto px-4 py-8">
          <AdminDashboard
            kosData={kosData}
            bobot={bobot}
            onBobotChange={setBobot}
            onLogout={handleLogout}
            onRefresh={refreshData}
          />
        </div>
      </div>
    );
  }

  if (currentPage === 'user-home') {
    return (
      <>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <UserHomePage onSearch={handleUserSearchClick} bobot={bobot} />
      </>
    );
  }

  if (currentPage === 'user-hasil') {
    return (
      <>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <UserHasilRekomendasi
          hasilData={hasilData}
          selectedKriteria={selectedKriteria}
          bobot={bobot}
          onBackToHome={handleBackToUserHome}
        />
      </>
    );
  }

  // Fallback
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Page Not Found</h1>
        <button
          onClick={() => setCurrentPage('user-home')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Kembali ke Home
        </button>
      </div>
    </div>
  );
}

export default App;