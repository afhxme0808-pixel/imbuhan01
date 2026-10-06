import { BinaAyatLatihan } from '../types';

export const BINA_AYAT_LIST: BinaAyatLatihan[] = [
  {
    id: 'ayat-1',
    kataBerimbuhan: 'MENYAPU',
    kataDasar: 'sapu',
    jenisImbuhan: 'Awalan meN- (s -> ny)',
    maksud: 'Membersihkan kotoran/sampah menggunakan penyapu',
    bankPerkataan: {
      subjek: ['Ibu', 'Kakak', 'Aminah', 'Murid-murid'],
      predikat: ['sedang menyapu', 'rajin menyapu', 'membantu ibu menyapu'],
      objekKeterangan: ['sampah di halaman rumah.', 'lantai bilik darjah yang kotor.', 'daun-daun kering di bawah pokok.']
    },
    contohAyatModel: 'Ibu sedang menyapu sampah di halaman rumah.',
    kataKunciWajib: ['menyapu'],
    petunjuk: 'Pastikan ayat mengandungi Subjek (orang yang buat), Kata Kerja (menyapu), dan Objek atau Keterangan.'
  },
  {
    id: 'ayat-2',
    kataBerimbuhan: 'MENANAM',
    kataDasar: 'tanam',
    jenisImbuhan: 'Awalan meN- (t -> n)',
    maksud: 'Menaruh benih atau pokok ke dalam tanah supaya hidup',
    bankPerkataan: {
      subjek: ['Pak Abu', 'Datuk', 'Cikgu Kamal', 'Penduduk kampung'],
      predikat: ['sedang menanam', 'tekun menanam', 'bergotong-royong menanam'],
      objekKeterangan: ['anak pokok mangga di kebun.', 'pokok cili di belakang rumah.', 'sayur-sayuran organik di batas tanah.']
    },
    contohAyatModel: 'Pak Abu sedang menanam pokok cili di belakang rumah.',
    kataKunciWajib: ['menanam'],
    petunjuk: 'Gunakan perkataan "menanam" untuk menyatakan perbuatan bercucuk tanam.'
  },
  {
    id: 'ayat-3',
    kataBerimbuhan: 'MENGECAT',
    kataDasar: 'cat',
    jenisImbuhan: 'Awalan menge- (1 suku kata)',
    maksud: 'Menyapu cat pada dinding atau perkakas',
    bankPerkataan: {
      subjek: ['Ayah dan abang', 'Pekerja sekolah', 'Encik Hakimi', 'Murid-murid bertugas'],
      predikat: ['sedang mengecat', 'bekerjasama mengecat', 'rajin mengecat'],
      objekKeterangan: ['dinding pagar dengan cat biru.', 'tiang dewan terbuka sekolah.', 'papan kenyataan makmal sains.']
    },
    contohAyatModel: 'Ayah dan abang sedang mengecat dinding pagar dengan cat biru.',
    kataKunciWajib: ['mengecat'],
    petunjuk: 'Perkataan cat mempunyai 1 suku kata, gunakan ejaan betul: mengecat.'
  },
  {
    id: 'ayat-4',
    kataBerimbuhan: 'MEMBERSIHKAN',
    kataDasar: 'bersih',
    jenisImbuhan: 'Apitan meN-...-kan',
    maksud: 'Menjadikan sesuatu berkeadaan bersih',
    bankPerkataan: {
      subjek: ['Semua warga sekolah', 'Siti dan rakan-rakannya', 'Ibu bapa', 'Kami sekeluarga'],
      predikat: ['bergotong-royong membersihkan', 'sedang membersihkan', 'membantu membersihkan'],
      objekKeterangan: ['kawasan longkang sekolah.', 'taman sains yang penuh semak.', 'ruang dapur selepas majlis kenduri.']
    },
    contohAyatModel: 'Kami sekeluarga bergotong-royong membersihkan kawasan longkang sekolah.',
    kataKunciWajib: ['membersihkan'],
    petunjuk: 'Apitan meN-...-kan menyatakan perbuatan menyebabkan sesuatu menjadi bersih.'
  },
  {
    id: 'ayat-5',
    kataBerimbuhan: 'TERTIDUR',
    kataDasar: 'tidur',
    jenisImbuhan: 'Awalan ter- (tidak sengaja)',
    maksud: 'Tidur tanpa sengaja kerana keletihan',
    bankPerkataan: {
      subjek: ['Adik kecil', 'Danish', 'Atuk', 'Ahmad'],
      predikat: ['tertidur lena', 'tertidur di atas', 'akhirnya tertidur'],
      objekKeterangan: ['sofa empuk di ruang tamu.', 'meja belajar kerana mengantuk.', 'pangkuan ibu selepas menangis.']
    },
    contohAyatModel: 'Danish tertidur lena di atas sofa empuk di ruang tamu.',
    kataKunciWajib: ['tertidur'],
    petunjuk: 'Awalan ter- pada tertidur menunjukkan tidur tanpa niat/tidak sengaja kerana terlalu letih.'
  },
  {
    id: 'ayat-6',
    kataBerimbuhan: 'MENGAJAR',
    kataDasar: 'ajar',
    jenisImbuhan: 'Awalan meN- (vokal a -> meng-)',
    maksud: 'Menyampaikan ilmu pengetahuan kepada orang lain',
    bankPerkataan: {
      subjek: ['Cikgu Zulaikha', 'Ustaz Hamdan', 'Guru Bahasa Melayu', 'Ibu saya'],
      predikat: ['sedang mengajar', 'tekun mengajar', 'suka mengajar'],
      objekKeterangan: ['tatabahasa dengan kaedah yang seronok.', 'murid-murid di dalam bilik darjah.', 'bacaan al-Quran di surau kampung.']
    },
    contohAyatModel: 'Cikgu Zulaikha tekun mengajar tatabahasa dengan kaedah yang seronok.',
    kataKunciWajib: ['mengajar'],
    petunjuk: 'Gunakan "mengajar" bagi tugas guru menyampaikan pelajaran kepada murid.'
  }
];
