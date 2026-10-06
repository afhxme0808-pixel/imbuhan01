import { GuruRekodMurid } from '../types';

export const CONTOH_MURID_GURU: GuruRekodMurid[] = [
  {
    id: 'murid-01',
    nama: 'Adam Rayyan bin Firdaus',
    tahapTahun: 'Tahun 4 Cemerlang',
    jumlahEksperimen: 14,
    ketepatan: 92,
    kataDasarPenguasaan: 95,
    imbuhanPenguasaan: 90,
    pembentukanKataPenguasaan: 92,
    ayatPenguasaan: 88,
    ralatLazim: 'Kadangkala keliru antara fungsi "belajar" dan "mengajar".',
    cadanganIntervensi: 'Diberikan cabaran apitan lanjutan dan aktiviti mencipta perenggan cerita.'
  },
  {
    id: 'murid-02',
    nama: 'Nur Ain Batrisya binti Rizal',
    tahapTahun: 'Tahun 4 Cemerlang',
    jumlahEksperimen: 12,
    ketepatan: 85,
    kataDasarPenguasaan: 90,
    imbuhanPenguasaan: 82,
    pembentukanKataPenguasaan: 86,
    ayatPenguasaan: 82,
    ralatLazim: 'Kecenderungan mengeja "mensapu" (lupa huruf s luluh menjadi ny).',
    cadanganIntervensi: 'Latihan berfokus kepada rumus alomorf "meny-" menggunakan kad imbasan bergambar.'
  },
  {
    id: 'murid-03',
    nama: 'Tan Wei Lun',
    tahapTahun: 'Tahun 4 Cemerlang',
    jumlahEksperimen: 15,
    ketepatan: 78,
    kataDasarPenguasaan: 85,
    imbuhanPenguasaan: 75,
    pembentukanKataPenguasaan: 76,
    ayatPenguasaan: 75,
    ralatLazim: 'Mengekalkan huruf t (cth: "mentulis", "mentanam").',
    cadanganIntervensi: 'Bimbingan rakan sebaya dalam modul Detektif Kesalahan untuk meluluhkan huruf t kepada n.'
  },
  {
    id: 'murid-04',
    nama: 'Michelle anak Jeffery',
    tahapTahun: 'Tahun 4 Cemerlang',
    jumlahEksperimen: 11,
    ketepatan: 88,
    kataDasarPenguasaan: 92,
    imbuhanPenguasaan: 85,
    pembentukanKataPenguasaan: 87,
    ayatPenguasaan: 86,
    ralatLazim: 'Keliru kata satu suku kata (mengecat disangka mencat).',
    cadanganIntervensi: 'Aktiviti mengira suku kata perkataan sebelum memilih imbuhan alomorf menge-.'
  },
  {
    id: 'murid-05',
    nama: 'Muhammad Haziq bin Azlan',
    tahapTahun: 'Tahun 4 Cemerlang',
    jumlahEksperimen: 8,
    ketepatan: 68,
    kataDasarPenguasaan: 72,
    imbuhanPenguasaan: 65,
    pembentukanKataPenguasaan: 66,
    ayatPenguasaan: 68,
    ralatLazim: 'Keliru perbezaan kata kerja perbuatan dengan kata nama alat (menyapu vs penyapu).',
    cadanganIntervensi: 'Intervensi pemulihan interaktif: Eksperimen modul peN- dan meN- secara bersebelahan.'
  },
  {
    id: 'murid-06',
    nama: 'Siti Nur Aisyah binti Osman',
    tahapTahun: 'Tahun 4 Cemerlang',
    jumlahEksperimen: 16,
    ketepatan: 96,
    kataDasarPenguasaan: 98,
    imbuhanPenguasaan: 94,
    pembentukanKataPenguasaan: 96,
    ayatPenguasaan: 94,
    ralatLazim: 'Tiada ralat ketara; konsisten dalam semua latihan.',
    cadanganIntervensi: 'Dilantik sebagai Pembantu Saintis Cilik untuk membimbing murid lain.'
  },
  {
    id: 'murid-07',
    nama: 'Kavitha a/p Subramaniam',
    tahapTahun: 'Tahun 4 Cemerlang',
    jumlahEksperimen: 10,
    ketepatan: 74,
    kataDasarPenguasaan: 80,
    imbuhanPenguasaan: 70,
    pembentukanKataPenguasaan: 72,
    ayatPenguasaan: 74,
    ralatLazim: 'Penggunaan kata pasar "ketiduran" berbanding "tertidur".',
    cadanganIntervensi: 'Pendedahan kepada aspek makna awalan ter- (tidak sengaja) melalui situasi cerita pendek.'
  }
];

export const DEMO_STATISTIK_KEMAHIRAN = [
  { kemahiran: 'Awalan meN- (Konsonan Bersuara b, c)', ketepatan: 91, status: 'Dikuasai' },
  { kemahiran: 'Awalan meN- Luluh k, p, s, t', ketepatan: 73, status: 'Perlu Latihan' },
  { kemahiran: 'Awalan menge- (Satu Suku Kata)', ketepatan: 79, status: 'Sedang Belajar' },
  { kemahiran: 'Awalan peN- (Kata Nama Alat/Pelaku)', ketepatan: 82, status: 'Dikuasai' },
  { kemahiran: 'Awalan ber- & ter- (Aspek Makna)', ketepatan: 86, status: 'Dikuasai' },
  { kemahiran: 'Apitan ke-...-an & meN-...-kan', ketepatan: 76, status: 'Sedang Belajar' },
  { kemahiran: 'Pembinaan Ayat Gramatis', ketepatan: 84, status: 'Dikuasai' }
];

export const DEMO_KATEGORI_RALAT = [
  { kategori: 'Lupa luluh huruf awal s (mensapu)', peratusan: 38, bilangan: 24 },
  { kategori: 'Lupa luluh huruf awal t (mentulis)', peratusan: 26, bilangan: 16 },
  { kategori: 'Keliru kata satu suku kata (mencat)', peratusan: 18, bilangan: 11 },
  { kategori: 'Keliru fungsi makna (belajar vs mengajar)', peratusan: 12, bilangan: 8 },
  { kategori: 'Pengaruh bahasa percakapan (ketiduran)', peratusan: 6, bilangan: 4 }
];
