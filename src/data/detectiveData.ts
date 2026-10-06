import { DetektifSoalan } from '../types';

export const DETEKTIF_SOALAN_LIST: DetektifSoalan[] = [
  {
    id: 'det-1',
    tajukKes: 'Misteri Lantai Berhabuk',
    ayatAsal: 'Ibu sedang mensapu lantai di ruang tamu yang berdebu itu.',
    perkataanSalah: 'mensapu',
    pilihanPembetulan: ['menyapu', 'mempapu', 'mengsapu', 'tersapu'],
    jawapanBetul: 'menyapu',
    penerangan: 'Huruf "s" pada kata dasar sapu mesti luluh menjadi "ny" apabila menerima awalan meN-. Oleh itu, ejaan yang betul ialah "menyapu", bukannya "mensapu".',
    petunjuk: 'Perhatikan huruf pertama kata dasar "sapu". Huruf s akan berubah menjadi ny!',
    situasi: 'Di Ruang Tamu Rumah'
  },
  {
    id: 'det-2',
    tajukKes: 'Surat Sahabat Pena',
    ayatAsal: 'Adik mentulis sepucuk surat kiriman kepada rakannya di Sabah.',
    perkataanSalah: 'mentulis',
    pilihanPembetulan: ['menulis', 'mempulis', 'tertulis', 'tulisan'],
    jawapanBetul: 'menulis',
    penerangan: 'Huruf awal "t" pada kata dasar tulis tergolong dalam kumpulan huruf luluh (k, p, s, t). Huruf t luluh dan digantikan dengan "n" (menulis).',
    petunjuk: 'Huruf t luluh apabila menerima awalan meN-. Jangan biarkan huruf t kekal!',
    situasi: 'Di Meja Belajar'
  },
  {
    id: 'det-3',
    tajukKes: 'Tayar Basikal Kempis',
    ayatAsal: 'Abang mempam tayar basikalnya sebelum mengayuh ke sekolah.',
    perkataanSalah: 'mempam',
    pilihanPembetulan: ['mengepam', 'mempamkan', 'menpam', 'terpam'],
    jawapanBetul: 'mengepam',
    penerangan: 'Kata dasar "pam" hanya mempunyai SATU SUKU KATA. Semua kata dasar satu suku kata menerima awalan "menge-", contohnya mengecat, mengepam, mengepos.',
    petunjuk: 'Kira suku kata bagi perkataan "pam". Ia hanya satu suku kata!',
    situasi: 'Di Garaj Rumah'
  },
  {
    id: 'det-4',
    tajukKes: 'Perlawanan Di Padang',
    ayatAsal: 'Kanak-kanak itu sangat gembira memain bola sepak bersama rakan-rakan.',
    perkataanSalah: 'memain',
    pilihanPembetulan: ['bermain', 'memainkan', 'permainan', 'termain'],
    jawapanBetul: 'bermain',
    penerangan: 'Perkataan "memain" tidak wujud dalam bahasa Melayu. Kata kerja tak transitif untuk aktiviti riadah atau sukan menggunakan awalan "ber-", iaitu "bermain".',
    petunjuk: 'Untuk perbuatan bersukan atau beriadah, gunakan awalan ber-!',
    situasi: 'Di Padang Sekolah'
  },
  {
    id: 'det-5',
    tajukKes: 'Keletihan Waktu Petang',
    ayatAsal: 'Kerana terlalu penat bersukan, Haziq ketiduran di atas kerusi malas.',
    perkataanSalah: 'ketiduran',
    pilihanPembetulan: ['tertidur', 'menidurkan', 'bertidur', 'tiduran'],
    jawapanBetul: 'tertidur',
    penerangan: 'Awalan "ter-" menunjukkan perbuatan yang berlaku secara tidak sengaja atau tidak disedari (tertidur). Bentuk "ketiduran" ialah pengaruh bahasa percakapan pasar.',
    petunjuk: 'Gunakan awalan ter- bagi menyatakan perbuatan yang tidak sengaja berlaku.',
    situasi: 'Di Ruang Rehat'
  },
  {
    id: 'det-6',
    tajukKes: 'Kutipan Sampah Sarap',
    ayatAsal: 'Murid-murid bekerjasama menkutip sampah sarap di sekitar kantin.',
    perkataanSalah: 'menkutip',
    pilihanPembetulan: ['mengutip', 'memkutip', 'terkutip', 'kutipan'],
    jawapanBetul: 'mengutip',
    penerangan: 'Huruf "k" pada kata dasar kutip luluh menjadi bunyi "ng" apabila bergabung dengan awalan meN-, membentuk perkataan "mengutip".',
    petunjuk: 'Huruf k luluh menjadi ng apabila bertemu awalan meN-!',
    situasi: 'Di Kantin Sekolah'
  },
  {
    id: 'det-7',
    tajukKes: 'Taman Mini Nenek',
    ayatAsal: 'Setiap pagi Nenek Salmah mensiram pokok-pokok bunga ros di halaman.',
    perkataanSalah: 'mensiram',
    pilihanPembetulan: ['menyiram', 'memsiram', 'penyiram', 'tersiram'],
    jawapanBetul: 'menyiram',
    penerangan: 'Huruf awal "s" pada siram luluh menjadi "ny" apabila menerima awalan meN-, membentuk ejaan standard "menyiram".',
    petunjuk: 'Kata dasar siram bermula dengan s, jadi s luluh kepada ny.',
    situasi: 'Di Laman Bunga'
  },
  {
    id: 'det-8',
    tajukKes: 'Bilik Darjah Berseri',
    ayatAsal: 'Ketua kelas mengingatkan kami agar menjaga membersihkan bilik darjah.',
    perkataanSalah: 'membersihkan',
    pilihanPembetulan: ['kebersihan', 'pembersihan', 'bersih', 'pembersih'],
    jawapanBetul: 'kebersihan',
    penerangan: 'Selepas kata kerja "menjaga", kita memerlukan kata nama perihal iaitu "kebersihan" (apitan ke-...-an), bukan kata kerja "membersihkan".',
    petunjuk: 'Menjaga apa? Kita menjaga keadaan bersih (kata nama: kebersihan).',
    situasi: 'Di Bilik Darjah'
  }
];
