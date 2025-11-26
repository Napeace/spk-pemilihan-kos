import { supabase } from '../lib/supabaseClient';
import { defaultBobot } from '../data/initialData';

export const fetchKosData = async () => {
  const { data, error } = await supabase
    .from('data_kos')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const fetchBobot = async () => {
  const { data, error } = await supabase
    .from('bobot_kriteria')
    .select('*')
    .limit(1);

  if (error) throw error;

  if (data && data.length > 0) {
    const bobotObj = data[0];
    return {
      harga: bobotObj.harga,
      fasilitas: bobotObj.fasilitas,
      luasKamar: bobotObj.luas_kamar,
      keamanan: bobotObj.keamanan
    };
  }

  return defaultBobot;
};

export const addKos = async (newKos) => {
  const { data, error } = await supabase
    .from('data_kos')
    .insert([newKos])
    .select();

  if (error) throw error;
  return data[0];
};

export const deleteKos = async (id) => {
  const { error } = await supabase
    .from('data_kos')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const updateBobot = async (bobot) => {
  const { error } = await supabase
    .from('bobot_kriteria')
    .update({
      harga: bobot.harga,
      fasilitas: bobot.fasilitas,
      luas_kamar: bobot.luasKamar,
      keamanan: bobot.keamanan
    })
    .eq('id', 1); // assuming single row

  if (error) throw error;
};