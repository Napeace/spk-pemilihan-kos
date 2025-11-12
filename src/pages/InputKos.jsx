import React, { useState } from 'react';
import TableKos from '../components/TableKos';
import FormTambahKos from '../components/FormTambahKos';

const InputKos = ({ kosData, onAddKos, onDeleteKos, onNavigate }) => {
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (newKos) => {
    onAddKos(newKos);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Data Kos</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
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

      <button
        onClick={() => onNavigate('hasil')}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-semibold"
        disabled={kosData.length === 0}
      >
        Hitung SAW & TOPSIS
      </button>
    </div>
  );
};

export default InputKos;