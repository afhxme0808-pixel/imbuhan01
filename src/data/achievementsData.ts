import { Lencana } from '../types';

export interface TahapDetail {
  tahapNombor: number;
  nama: string;
  minXp: number;
  maxXp: number;
  penerangan: string;
  lencanaGelaran: string;
}

export const TAHAP_SAINTIS_LIST: TahapDetail[] = [
  {
    tahapNombor: 1,
    nama: 'Pembantu Saintis',
    minXp: 0,
    maxXp: 99,
    penerangan: 'Langkah pertama meneroka makmal bahasa digital.',
    lencanaGelaran: 'Jubah Putih Saintis'
  },
  {
    tahapNombor: 2,
    nama: 'Saintis Junior',
    minXp: 100,
    maxXp: 249,
    penerangan: 'Mula menguasai hukum luluh huruf awal dan awalan asas.',
    lencanaGelaran: 'Kanta Pembesar Bahasa'
  },
  {
    tahapNombor: 3,
    nama: 'Penyelidik Kata',
    minXp: 250,
    maxXp: 449,
    penerangan: 'Mampu membezakan kata satu suku kata dan apitan penting.',
    lencanaGelaran: 'Kelalang Kimia Emas'
  },
  {
    tahapNombor: 4,
    nama: 'Pakar Imbuhan',
    minXp: 450,
    maxXp: 699,
    penerangan: 'Mahir menganalisis morfologi kata dan membina ayat gramatis.',
    lencanaGelaran: 'Mikroskop Tatabahasa'
  },
  {
    tahapNombor: 5,
    nama: 'Profesor Bahasa',
    minXp: 700,
    maxXp: 9999,
    penerangan: 'Tahap tertinggi! Menguasai seluruh rahsia pembentukan kata Bahasa Melayu.',
    lencanaGelaran: 'Mahkota Saintis Unggul'
  }
];

export const INITIAL_LENCANA_LIST: Lencana[] = [
  {
    id: 'lencana-saintis-baharu',
    nama: 'Saintis Baharu',
    penerangan: 'Berjaya menjalankan dan menyelesaikan eksperimen pengimbuhan pertama di makmal.',
    kategori: 'Eksperimen',
    ikon: 'flask',
    syarat: 'Selesaikan 1 eksperimen di Makmal Digital',
    diperoleh: false
  },
  {
    id: 'lencana-pakar-kata-dasar',
    nama: 'Pakar Kata Dasar',
    penerangan: 'Mengenal pasti dan menguji sekurang-kurangnya 5 kata dasar yang berbeza.',
    kategori: 'Morfologi',
    ikon: 'book-open',
    syarat: 'Selesaikan 5 eksperimen kata dasar',
    diperoleh: false
  },
  {
    id: 'lencana-penjelajah-awalan',
    nama: 'Penjelajah Awalan',
    penerangan: 'Kuasai hukum morfofonemik awalan meN- (huruf k, p, s, t luluh).',
    kategori: 'Awalan',
    ikon: 'compass',
    syarat: 'Kuasai 3 eksperimen awalan meN- luluh',
    diperoleh: false
  },
  {
    id: 'lencana-penyelidik-akhiran',
    nama: 'Penyelidik Akhiran & Apitan',
    penerangan: 'Berjaya menyelesaikan eksperimen berkaitan apitan ke-...-an dan meN-...-kan.',
    kategori: 'Apitan',
    ikon: 'layers',
    syarat: 'Selesaikan eksperimen apitan',
    diperoleh: false
  },
  {
    id: 'lencana-detektif-bahasa',
    nama: 'Detektif Bahasa',
    penerangan: 'Mengenal pasti dan membetulkan sekurang-kurangnya 3 kes kesalahan pengimbuhan.',
    kategori: 'Detektif',
    ikon: 'search',
    syarat: 'Selesaikan 3 kes dalam Modul Detektif Kesalahan',
    diperoleh: false
  },
  {
    id: 'lencana-pembina-ayat',
    nama: 'Pakar Pembina Ayat',
    penerangan: 'Membina sekurang-kurangnya 2 ayat gramatis menggunakan perkataan berimbuhan.',
    kategori: 'Sintaksis',
    ikon: 'pen-tool',
    syarat: 'Bina 2 ayat dalam Modul Pembinaan Ayat',
    diperoleh: false
  },
  {
    id: 'lencana-saintis-unggul',
    nama: 'Saintis Bahasa Cemerlang',
    penerangan: 'Mencapai status Profesor Bahasa dengan ketepatan tinggi dan rekod makmal terpuji.',
    kategori: 'Kejayaan Tertinggi',
    ikon: 'award',
    syarat: 'Kumpul lebih 500 XP dan peroleh 5 lencana lain',
    diperoleh: false
  }
];
