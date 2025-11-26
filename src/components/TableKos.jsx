import React, { useState, useEffect } from 'react';

const TableKos = ({ kosData = [], onDeleteKos }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset ke halaman 1 jika kosData berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [kosData.length]);

  // Safety check - jika tidak ada data
  if (!kosData || kosData.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="py-8">
          <p className="text-6xl mb-4">📋</p>
          <p className="text-lg font-semibold text-gray-700">Belum ada data kos</p>
          <p className="text-sm mt-2 text-gray-600">
            Klik tombol <strong>"➕ Tambah Kos Baru"</strong> untuk menambahkan data
          </p>
        </div>
      </div>
    );
  }

  const handleDelete = async (id) => {
    if (window.confirm('⚠️ Apakah Anda yakin ingin menghapus data kos ini?')) {
      try {
        await onDeleteKos(id);
      } catch (error) {
        console.error('Error deleting kos:', error);
        alert('❌ Gagal menghapus data: ' + error.message);
      }
    }
  };

  // Hitung pagination
  const totalPages = Math.ceil(kosData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = kosData.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi navigasi
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust startPage if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 rounded-md font-medium transition ${
            currentPage === i
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div>
      {/* Info Data */}
      <div className="mb-3 text-sm text-gray-600">
        Menampilkan <strong>{indexOfFirstItem + 1}</strong> - <strong>{Math.min(indexOfLastItem, kosData.length)}</strong> dari <strong>{kosData.length}</strong> data
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Nama Kos</th>
              <th className="px-4 py-2 border">Alamat</th>
              <th className="px-4 py-2 border">Harga</th>
              <th className="px-4 py-2 border">Fasilitas</th>
              <th className="px-4 py-2 border">Luas Kamar</th>
              <th className="px-4 py-2 border">Keamanan</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((kos, idx) => (
              <tr key={kos.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-center">{indexOfFirstItem + idx + 1}</td>
                <td className="px-4 py-2 border font-medium">{kos.nama_kos}</td>
                <td className="px-4 py-2 border text-sm">{kos.alamat}</td>
                <td className="px-4 py-2 border text-sm">
                  Rp {kos.harga?.toLocaleString('id-ID') || '-'}
                </td>
                <td className="px-4 py-2 border text-xs">{kos.fasilitas}</td>
                <td className="px-4 py-2 border text-center">{kos.luas_kamar} m²</td>
                <td className="px-4 py-2 border text-xs">{kos.keamanan}</td>
                <td className="px-4 py-2 border text-center">
                  <button 
                    onClick={() => handleDelete(kos.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition"
                  >
                    🗑️ Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          {/* Previous Button */}
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md font-medium transition flex items-center gap-2 ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            {renderPageNumbers()}
          </div>

          {/* Next Button */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md font-medium transition flex items-center gap-2 ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Page Info */}
      {totalPages > 1 && (
        <div className="mt-3 text-center text-sm text-gray-500">
          Halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong>
        </div>
      )}
    </div>
  );
};

export default TableKos;