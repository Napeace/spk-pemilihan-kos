import React from 'react';

const Navbar = ({ currentPage }) => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold">SPK Pemilihan Kos (SAW & TOPSIS)</h1>
        <p className="text-sm text-blue-100 mt-1">
          {currentPage === 'input' && 'Input Data Kos'}
          {currentPage === 'hasil' && 'Hasil Perhitungan'}
          {currentPage === 'perbandingan' && 'Perbandingan Metode'}
        </p>
      </div>
    </nav>
  );
};

export default Navbar;