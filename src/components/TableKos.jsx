import React from 'react';
import { getFasilitasLabel, getLuasKamarLabel, getKeamananLabel } from '../data/initialData';

const TableKos = ({ data, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">No</th>
            <th className="px-4 py-2 border">Nama Kos</th>
            <th className="px-4 py-2 border">Harga (Rp)</th>
            <th className="px-4 py-2 border">Fasilitas</th>
            <th className="px-4 py-2 border">Waktu Tempuh (mnt)</th>
            <th className="px-4 py-2 border">Luas Kamar</th>
            <th className="px-4 py-2 border">Keamanan</th>
            <th className="px-4 py-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((kos, idx) => (
            <tr key={kos.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border text-center">{idx + 1}</td>
              <td className="px-4 py-2 border">{kos.nama}</td>
              <td className="px-4 py-2 border text-right">{kos.harga.toLocaleString('id-ID')}</td>
              <td className="px-4 py-2 border text-sm">{getFasilitasLabel(kos.fasilitas)}</td>
              <td className="px-4 py-2 border text-center">{kos.waktuTempuh}</td>
              <td className="px-4 py-2 border text-center">{getLuasKamarLabel(kos.luasKamar)}</td>
              <td className="px-4 py-2 border text-sm">{getKeamananLabel(kos.keamanan)}</td>
              <td className="px-4 py-2 border text-center">
                <button 
                  onClick={() => onDelete(kos.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableKos;