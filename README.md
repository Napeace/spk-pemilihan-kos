# Sistem Pendukung Keputusan Pemilihan Kos Mahasiswa UNEJ

Sistem Pendukung Keputusan (SPK) berbasis web untuk membantu mahasiswa Universitas Jember dalam memilih tempat kos yang sesuai dengan preferensi mereka menggunakan metode **SAW (Simple Additive Weighting)** dan **TOPSIS (Technique for Order Preference by Similarity to Ideal Solution)**.

## 🔗 Demo
**Live Website:** [https://spk-pemilihan-kos.vercel.app/](https://spk-pemilihan-kos.vercel.app/)

## 📋 Deskripsi Proyek

Penelitian ini bertujuan mengembangkan Sistem Penunjang Pengambilan Keputusan (SPPK) Pemilihan Kos dengan mengimplementasikan dan melakukan perbandingan antara metode SAW dan TOPSIS. Sistem ini membantu mahasiswa melakukan evaluasi kos secara objektif, sistematis, dan terstruktur berdasarkan empat kriteria utama:

- **Harga** (Cost) - Semakin murah semakin baik
- **Fasilitas** (Benefit) - Semakin lengkap semakin baik
- **Luas Kamar** (Benefit) - Semakin luas semakin baik
- **Keamanan** (Benefit) - Semakin aman semakin baik

## 🎯 Fitur Utama

### Untuk Pengguna (Mahasiswa)
- **Form Input Kriteria** - Pilih preferensi kos melalui 4 dropdown kriteria
- **Rekomendasi Kos** - Dapatkan 20 rekomendasi kos terbaik berdasarkan metode dengan MSE terkecil
- **Perbandingan Skor** - Lihat skor SAW dan TOPSIS untuk setiap alternatif kos
- **Pagination** - Navigasi mudah dengan 5 kos per halaman

### Untuk Admin
- **Dashboard Admin** - Kelola sistem secara menyeluruh
- **Update Bobot Kriteria** - Ubah bobot preferensi berdasarkan survei terbaru
- **CRUD Data Kos** - Tambah, edit, hapus data alternatif kos
- **Hasil Perhitungan** - Lihat skor SAW dan TOPSIS seluruh data kos
- **Perbandingan MSE** - Visualisasi grafik perbandingan metode menggunakan Recharts

## 🛠️ Teknologi yang Digunakan

- **Frontend:** React JS
- **Styling:** Tailwind CSS
- **Visualisasi Data:** Recharts
- **Deployment:** Vercel
- **Metode:** SAW & TOPSIS

## 📊 Hasil Penelitian

Berdasarkan analisis Mean Squared Error (MSE) terhadap 55 data karakteristik kos mahasiswa UNEJ:

| Metode | Nilai MSE | Status |
|--------|-----------|--------|
| **SAW** | **7.1247** | ✅ **Lebih Akurat** |
| TOPSIS | 7.6614 | Kurang Akurat |

**Kesimpulan:** Metode SAW terbukti lebih akurat dengan selisih 7.0%, sehingga digunakan sebagai basis pengurutan rekomendasi dalam sistem.

## 🚀 Cara Menjalankan Proyek

### Prasyarat
- Node.js (versi 14 atau lebih baru)
- npm atau yarn

### Instalasi

1. **Clone repository**
```bash
   git clone https://github.com/Napeace/spk-pemilihan-kos.git
   cd spk-pemilihan-kos
```

2. **Install dependencies**
```bash
   npm install
   # atau
   yarn install
```

3. **Jalankan development server**
```bash
   npm run dev
   # atau
   yarn dev
```

4. **Buka browser**
```
   http://localhost:3000
```

## 📁 Struktur Proyek
```
spk-pemilihan-kos/
├── src/
│   ├── components/        # Komponen React
│   ├── utils/
│   │   ├── converter.js      # Konversi kategori ke numerik
│   │   ├── calculations.js   # Implementasi SAW & TOPSIS
│   │   └── searchAlgorithm.js # Logika pencarian kos
│   ├── pages/            # Halaman aplikasi
│   └── styles/           # File styling
├── public/               # Asset publik
└── package.json
```

## 🔐 Akses Admin

Untuk mengakses dashboard admin:
1. Buka URL: `https://spk-pemilihan-kos.vercel.app/admin`
2. Login menggunakan kredensial admin
3. Kelola data kos dan bobot kriteria

## 👥 Tim Pengembang

**Kelompok 4 - Sistem Informasi UNEJ 2025**

1. Muhammad Najmi Nafis Zuhair (232410101066)
2. Fadhlurrahman Aqil Supartha (232410101076)
3. Reyvandi Adji Pramudya (232410101091)

## 📚 Referensi

- Adriantama, T., & Brianorman, Y. (2021). Sistem Pendukung Keputusan Dalam Seleksi Tempat Tinggal (Kost) Mahasiswa Dengan Metode Simple Additive Weighting (SAW).
- Abdillah, M. F., & Dafitri, H. (2023). Sistem Pendukung Keputusan Pemilihan Indekos Terbaik Di Sekitar Universitas Harapan Medan Menggunakan Metode TOPSIS.
- Tirta, D. S. W. M. M., et al. (2023). Penerapan Sistem Pendukung Keputusan Pemilihan Bibit Padi yang Berkualitas Menggunakan Metode SAW dan TOPSIS.

## 📝 Lisensi

Proyek ini dibuat untuk keperluan akademis - Tugas Akhir SPPK Universitas Jember 2025.

## 🙏 Acknowledgments

- Dosen Pembimbing SPPK
- Mahasiswa UNEJ yang telah berpartisipasi dalam survei
- Fakultas Ilmu Komputer Universitas Jember

---

**⭐ Jika proyek ini bermanfaat, jangan lupa berikan star!**
