import { MorfemDetail } from '../types';

export const MORFOLOGI_DATABASE: MorfemDetail[] = [
  {
    id: 'exp-sapu-menyapu',
    kataDasar: 'sapu',
    imbuhan: 'meN-',
    jenisImbuhan: 'awalan',
    perkataanTerhasil: 'menyapu',
    perubahanBentuk: 'Huruf awal "s" pada kata dasar berubah menjadi "ny"',
    hukumTatabahasa: 'Apabila kata dasar yang bermula dengan huruf "s" menerima awalan meN-, huruf "s" akan luluh dan bertukar menjadi bentuk "meny-".',
    maksudPerkataan: 'Membersihkan kotoran atau sampah menggunakan penyapu.',
    contohAyat: 'Ibu menyapu lantai ruang tamu yang berhabuk itu sehingga bersih.',
    pilihanRamalan: ['mensapu', 'menyapu', 'mempapu', 'mengsapu'],
    soalanKesimpulan: {
      soalan: 'Apabila kata dasar SAPU menerima awalan meN-, apakah perubahan morfofonemik yang berlaku?',
      pilihan: [
        'Huruf "s" kekal dan menjadi mensapu',
        'Huruf "s" luluh dan bertukar menjadi "meny-" (menyapu)',
        'Huruf "s" bertukar menjadi "ng" (mengsapu)',
        'Huruf "s" digandakan menjadi messapu'
      ],
      jawapanBetul: 'Huruf "s" luluh dan bertukar menjadi "meny-" (menyapu)',
      penerangan: 'Tepat sekali! Dalam sistem morfologi Bahasa Melayu, huruf "s" akan bertukar kepada alomorf "meny-". Bentuk "mensapu" adalah kesalahan ejaan yang lazim.'
    },
    tahapKesukaran: 'Tahun 3',
    kemahiran: 'Awalan meN- (s -> ny)',
    petunjuk: 'Ingat rumus kimia bahasa: s bertukar menjadi ny!',
    kesalahanLazim: 'Murid sering mengeja "mensapu" kerana tidak mengetahui huruf s perlu luluh kepada ny.'
  },
  {
    id: 'exp-sapu-penyapu',
    kataDasar: 'sapu',
    imbuhan: 'peN-',
    jenisImbuhan: 'awalan',
    perkataanTerhasil: 'penyapu',
    perubahanBentuk: 'Huruf awal "s" berubah menjadi "ny" membentuk kata nama alat',
    hukumTatabahasa: 'Awalan peN- bertukar menjadi "peny-" apabila bergabung dengan kata dasar yang bermula dengan huruf "s" untuk membentuk kata nama perkakas/alat.',
    maksudPerkataan: 'Alat untuk menyapu sampah daripada lidi atau sabut.',
    contohAyat: 'Kakak mengambil penyapu lidi untuk membersihkan daun-daun kering di halaman rumah.',
    pilihanRamalan: ['pensapu', 'penyapu', 'pempapu', 'pengsapu'],
    soalanKesimpulan: {
      soalan: 'Kata "penyapu" tergolong dalam golongan kata apa berbanding perkataan "menyapu"?',
      pilihan: [
        'Kata nama (alat atau perkakas)',
        'Kata kerja (perbuatan menyapu)',
        'Kata adjektif (sifat bersih)',
        'Kata seru'
      ],
      jawapanBetul: 'Kata nama (alat atau perkakas)',
      penerangan: 'Cemerlang! Awalan peN- membentuk kata nama (alat/orang yang melakukan), manakala awalan meN- membentuk kata kerja.'
    },
    tahapKesukaran: 'Tahun 4',
    kemahiran: 'Awalan peN- (kata nama alat)',
    petunjuk: 'Awalan peN- menukar kata kerja kepada kata nama alat atau pelaku.',
    kesalahanLazim: 'Mengeja "pensapu" dan keliru fungsi antara kata kerja dengan kata nama alat.'
  },
  {
    id: 'exp-tulis-menulis',
    kataDasar: 'tulis',
    imbuhan: 'meN-',
    jenisImbuhan: 'awalan',
    perkataanTerhasil: 'menulis',
    perubahanBentuk: 'Huruf awal "t" pada kata dasar digugurkan (luluh) dan digantikan dengan "n"',
    hukumTatabahasa: 'Kata dasar yang bermula dengan huruf "t" akan luluh huruf awalnya apabila menerima awalan meN-, lalu menjadi "men-". Oleh itu, tulis menjadi menulis.',
    maksudPerkataan: 'Melahirkan fikiran atau kata-kata dengan huruf, mencatat, mengarang.',
    contohAyat: 'Adik menulis surat kiriman kepada sahabat penanya di Sarawak.',
    pilihanRamalan: ['mentulis', 'menulis', 'mempulis', 'mengtulis'],
    soalanKesimpulan: {
      soalan: 'Apakah yang terjadi kepada huruf awal "t" pada kata dasar TULIS apabila menerima imbuhan meN-?',
      pilihan: [
        'Huruf "t" kekal dieja mentulis',
        'Huruf "t" luluh dan digantikan dengan bunyi "n" (menulis)',
        'Huruf "t" digugurkan tanpa penggantian',
        'Huruf "t" bertukar menjadi "ny"'
      ],
      jawapanBetul: 'Huruf "t" luluh dan digantikan dengan bunyi "n" (menulis)',
      penerangan: 'Hebat! Huruf "t" merupakan salah satu huruf yang luluh (k, p, s, t) apabila menerima awalan meN-.'
    },
    tahapKesukaran: 'Tahun 3',
    kemahiran: 'Awalan meN- (t -> n)',
    petunjuk: 'Huruf t luluh menjadi n (contoh: tolak -> menolak, tulis -> menulis).',
    kesalahanLazim: 'Mengeja "mentulis" kerana mengekalkan huruf "t".'
  },
  {
    id: 'exp-baca-membaca',
    kataDasar: 'baca',
    imbuhan: 'meN-',
    jenisImbuhan: 'awalan',
    perkataanTerhasil: 'membaca',
    perubahanBentuk: 'Kata dasar menerima awalan "mem-" (huruf "b" tidak luluh)',
    hukumTatabahasa: 'Kata dasar yang bermula dengan huruf "b" menerima awalan "mem-" dan huruf "b" tidak digugurkan kerana "b" ialah konsonan bersuara.',
    maksudPerkataan: 'Melihat serta memahami isi apa yang tertulis dengan melisankan atau dalam hati.',
    contohAyat: 'Siti membaca buku cerita di perpustakaan sekolah setiap waktu rehat.',
    pilihanRamalan: ['menbaca', 'membaca', 'mempaca', 'mengbaca'],
    soalanKesimpulan: {
      soalan: 'Mengapakah huruf "b" pada perkataan "baca" tidak digugurkan dalam "membaca"?',
      pilihan: [
        'Kerana huruf "b" ialah konsonan yang kekal bersama awalan mem-',
        'Kerana perkataan itu perkataan pinjaman',
        'Kerana huruf b mesti digugurkan',
        'Kerana awalan yang betul ialah men-'
      ],
      jawapanBetul: 'Kerana huruf "b" ialah konsonan yang kekal bersama awalan mem-',
      penerangan: 'Betul sekali! Huruf "b" tidak luluh (cth: baca -> membaca, baling -> membaling, buka -> membuka).'
    },
    tahapKesukaran: 'Tahun 3',
    kemahiran: 'Awalan meN- (konsonan b kekal)',
    petunjuk: 'Huruf b berpasangan dengan awalan mem- tanpa perlu dibuang.',
    kesalahanLazim: 'Mengeja "menbaca" dengan huruf "n".'
  },
  {
    id: 'exp-masak-memasak',
    kataDasar: 'masak',
    imbuhan: 'meN-',
    jenisImbuhan: 'awalan',
    perkataanTerhasil: 'memasak',
    perubahanBentuk: 'Kata dasar bermula "m" menerima awalan "me-"',
    hukumTatabahasa: 'Kata dasar yang bermula dengan huruf vokal atau konsonan sengau (m, n, ny, ng, r, l, w) menerima alomorf "me-". Jadi me + masak = memasak.',
    maksudPerkataan: 'Membuat atau menyediakan makanan menggunakan haba/api.',
    contohAyat: 'Ayah memasak nasi goreng yang enak untuk sarapan sekeluarga.',
    pilihanRamalan: ['menmasak', 'memmasak', 'memasak', 'mengmasak'],
    soalanKesimpulan: {
      soalan: 'Apabila kata dasar MASAK menerima awalan meN-, bentuk awalan yang bergabung ialah:',
      pilihan: [
        'Awalan "me-" kerana huruf awal kata dasar ialah "m" (memasak)',
        'Awalan "mem-" dengan huruf m ganda (memmasak)',
        'Awalan "men-" (menmasak)',
        'Awalan "meng-" (mengmasak)'
      ],
      jawapanBetul: 'Awalan "me-" kerana huruf awal kata dasar ialah "m" (memasak)',
      penerangan: 'Tepat! Kata dasar berawalkan huruf m, n, ny, ng, r, l, w menerima awalan me- sahaja.'
    },
    tahapKesukaran: 'Tahun 3',
    kemahiran: 'Awalan meN- (konsonan m kekal)',
    petunjuk: 'Bunyi m sudah sedia sengau, cuma tambah "me-".',
    kesalahanLazim: 'Mengeja huruf m berganda seperti "memmasak".'
  },
  {
    id: 'exp-tanam-menanam',
    kataDasar: 'tanam',
    imbuhan: 'meN-',
    jenisImbuhan: 'awalan',
    perkataanTerhasil: 'menanam',
    perubahanBentuk: 'Huruf "t" luluh dan bertukar menjadi "n"',
    hukumTatabahasa: 'Kata dasar berhuruf awal "t" luluh apabila menerima awalan meN-, membentuk perkataan menanam.',
    maksudPerkataan: 'Memasukkan benih atau pokok ke dalam tanah supaya hidup dan membesar.',
    contohAyat: 'Pak Abu menanam pokok rambutan di halaman rumahnya pada petang semalam.',
    pilihanRamalan: ['mentanam', 'menanam', 'memtanam', 'mengtanam'],
    soalanKesimpulan: {
      soalan: 'Perkataan manakah yang tepat bagi perbuatan menaruh benih tumbuhan ke dalam tanah?',
      pilihan: [
        'Menanam (huruf t luluh)',
        'Mentanam (huruf t dikekalkan)',
        'Tertanam (perbuatan tidak sengaja)',
        'Tanaman (hasil tanaman)'
      ],
      jawapanBetul: 'Menanam (huruf t luluh)',
      penerangan: 'Tepat! Menanam ialah kata kerja aktif transitif untuk perbuatan bercucuk tanam.'
    },
    tahapKesukaran: 'Tahun 3',
    kemahiran: 'Awalan meN- (t -> n)',
    petunjuk: 'Huruf t luluh menjadi n seperti pada perkataan tolak -> menolak.',
    kesalahanLazim: 'Mengeja "mentanam" kerana tidak meluluhkan huruf t.'
  },
  {
    id: 'exp-cat-mengecat',
    kataDasar: 'cat',
    imbuhan: 'meN-',
    jenisImbuhan: 'awalan',
    perkataanTerhasil: 'mengecat',
    perubahanBentuk: 'Kata dasar satu suku kata menerima awalan "menge-"',
    hukumTatabahasa: 'Kata dasar yang mengandungi SATU SUKU KATA (seperti cat, pam, pos, bom, tin) menerima alomorf "menge-". Oleh itu ejaan standard yang tepat ialah MENGECAT.',
    maksudPerkataan: 'Menyapu cat pada sesuatu dinding, papan atau perkakas untuk mewarnakannya.',
    contohAyat: 'Para pekerja sedang mengecat dinding dewan serbaguna dengan warna hijau muda.',
    pilihanRamalan: ['mencat', 'mengecat', 'memcat', 'mengcat'],
    soalanKesimpulan: {
      soalan: 'Mengapakah kata dasar CAT menerima awalan "menge-" dan bukan "men-"?',
      pilihan: [
        'Kerana "cat" ialah perkataan SATU suku kata',
        'Kerana huruf c mesti bergabung dengan menge-',
        'Kerana "cat" perkataan yang berasal daripada bahasa lain',
        'Kerana tiada peraturan tatabahasa'
      ],
      jawapanBetul: 'Kerana "cat" ialah perkataan SATU suku kata',
      penerangan: 'Pakar bahasa sejati! Semua kata dasar bahasa Melayu satu suku kata seperti cat, pam, tin, mop menerima awalan "menge-".'
    },
    tahapKesukaran: 'Tahun 4',
    kemahiran: 'Awalan menge- (kata satu suku kata)',
    petunjuk: 'Kira suku kata: CAT = 1 suku kata, gunakan menge-!',
    kesalahanLazim: 'Murid menyangka perkataan bermula huruf c menjadi "mencat", walhal kerana satu suku kata ia menjadi "mengecat".'
  },
  {
    id: 'exp-ajar-mengajar',
    kataDasar: 'ajar',
    imbuhan: 'meN-',
    jenisImbuhan: 'awalan',
    perkataanTerhasil: 'mengajar',
    perubahanBentuk: 'Kata dasar berhuruf vokal "a" menerima awalan "meng-"',
    hukumTatabahasa: 'Kata dasar yang bermula dengan huruf vokal (a, e, i, o, u) menerima alomorf "meng-". Kata mengajar berfungsi sebagai kata kerja aktif transitif (guru yang menyampaikan ilmu).',
    maksudPerkataan: 'Menyampaikan ilmu, petunjuk atau kemahiran kepada orang lain.',
    contohAyat: 'Cikgu Rahman mengajar mata pelajaran Bahasa Melayu dengan penuh dedikasi.',
    pilihanRamalan: ['menajar', 'mengajar', 'memajar', 'meajar'],
    soalanKesimpulan: {
      soalan: 'Apakah perbezaan fungsi antara perkataan "mengajar" dengan "belajar"?',
      pilihan: [
        'Mengajar ialah memberi ilmu (peranan guru), manakala belajar ialah menerima/menuntut ilmu (peranan murid)',
        'Mengajar dan belajar mempunyai maksud yang sama dan boleh ditukar ganti',
        'Mengajar ialah kata nama, manakala belajar ialah kata sendi',
        'Belajar ialah perbuatan guru di dalam kelas'
      ],
      jawapanBetul: 'Mengajar ialah memberi ilmu (peranan guru), manakala belajar ialah menerima/menuntut ilmu (peranan murid)',
      penerangan: 'Sangat tepat! Guru mengajar murid, manakala murid belajar daripada guru. Fungsi kedua-dua perkataan ini berbeza sama sekali.'
    },
    tahapKesukaran: 'Tahun 4',
    kemahiran: 'Awalan meN- (vokal a -> meng-) & Perbezaan Makna',
    petunjuk: 'Huruf vokal a, e, i, o, u sentiasa berpasangan dengan meng-.',
    kesalahanLazim: 'Menggunakan "belajar" pada tempat guru (cth: Cikgu membelajarkan kami tatabahasa).'
  },
  {
    id: 'exp-ajar-belajar',
    kataDasar: 'ajar',
    imbuhan: 'ber-',
    jenisImbuhan: 'awalan',
    perkataanTerhasil: 'belajar',
    perubahanBentuk: 'Huruf "r" pada awalan ber- digugurkan membentuk "be-"',
    hukumTatabahasa: 'Khusus untuk kata dasar ajar, awalan ber- mengalami proses morfofonemik khas di mana huruf "r" digugurkan lalu menjadi "belajar" (bukan berajar).',
    maksudPerkataan: 'Berusaha memperoleh ilmu pengetahuan atau kemahiran.',
    contohAyat: 'Murid-murid Tahun 4 Cemerlang tekun belajar di dalam bilik darjah.',
    pilihanRamalan: ['berajar', 'belajar', 'mengajar', 'perajar'],
    soalanKesimpulan: {
      soalan: 'Mengapakah bentuk awalan ber- bertukar menjadi "belajar" dan bukannya "berajar"?',
      pilihan: [
        'Ia merupakan bentuk pengecualian khas morfofonemik dalam tatabahasa bahasa Melayu',
        'Kerana huruf ajar perlu ditambah huruf l',
        'Kerana awalan ber- tidak wujud',
        'Kerana perkataan itu dieja sesuka hati'
      ],
      jawapanBetul: 'Ia merupakan bentuk pengecualian khas morfofonemik dalam tatabahasa bahasa Melayu',
      penerangan: 'Tepat! Terdapat dua perkataan istimewa bagi awalan ber-: belajar (ajar) dan bekerjasama/berkerja.'
    },
    tahapKesukaran: 'Tahun 4',
    kemahiran: 'Awalan ber- (bentuk khas be-)',
    petunjuk: 'Kata dasar ajar membentuk kata kerja "belajar" yang unik.',
    kesalahanLazim: 'Mengeja perkataan sebagai "berajar".'
  },
  {
    id: 'exp-ajar-pengajaran',
    kataDasar: 'ajar',
    imbuhan: 'peN-...-an',
    jenisImbuhan: 'apitan',
    perkataanTerhasil: 'pengajaran',
    perubahanBentuk: 'Menerima apitan peN-...-an membentuk kata nama abstrak',
    hukumTatabahasa: 'Apitan peN-...-an bergabung dengan kata dasar ajar membentuk perkataan pengajaran yang bermaksud perihal mengajar, petunjuk, nasihat atau iktibar.',
    maksudPerkataan: 'Iktibar, nasihat atau teladan yang diperoleh daripada sesuatu cerita atau peristiwa.',
    contohAyat: 'Pengajaran daripada cerita Sang Kancil mengingatkan kita agar tidak bersikap sombong.',
    pilihanRamalan: ['pelajaran', 'pengajaran', 'belajaran', 'penjaran'],
    soalanKesimpulan: {
      soalan: 'Apakah maksud perkataan "pengajaran" berbanding "pelajaran"?',
      pilihan: [
        'Pengajaran bermaksud nasihat/iktibar/teladan, manakala pelajaran bermaksud bidang ilmu/mata pelajaran',
        'Kedua-duanya sama makna dan boleh ditukar ganti',
        'Pelajaran bermaksud nasihat dan pengajaran bermaksud buku teks',
        'Pengajaran ialah kata kerja aktif'
      ],
      jawapanBetul: 'Pengajaran bermaksud nasihat/iktibar/teladan, manakala pelajaran bermaksud bidang ilmu/mata pelajaran',
      penerangan: 'Cemerlang! Pengajaran ialah iktibar atau teladan (moral value), manakala pelajaran ialah apa yang dipelajari (subject/lesson).'
    },
    tahapKesukaran: 'Tahun 5',
    kemahiran: 'Apitan peN-...-an (Perbezaan makna kata)',
    petunjuk: 'Pengajaran = ada nasihat atau moral yang boleh diteladani.',
    kesalahanLazim: 'Murid sering keliru antara perkataan "pengajaran" (moral value) dengan "pelajaran" (subject).'
  },
  {
    id: 'exp-bersih-membersihkan',
    kataDasar: 'bersih',
    imbuhan: 'meN-...-kan',
    jenisImbuhan: 'apitan',
    perkataanTerhasil: 'membersihkan',
    perubahanBentuk: 'Menerima apitan meN-...-kan (konsonan b kekal)',
    hukumTatabahasa: 'Apitan meN-...-kan berfungsi membentuk kata kerja aktif transitif yang membawa makna perbuatan menjadikan atau menyebabkan sesuatu itu bersih.',
    maksudPerkataan: 'Menjadikan sesuatu bersih, mencuci atau mengemaskan.',
    contohAyat: 'Gotong-royong itu bertujuan membersihkan kawasan longkang sekolah.',
    pilihanRamalan: ['kebersihan', 'membersihkan', 'membersih', 'pembersihan'],
    soalanKesimpulan: {
      soalan: 'Apakah fungsi imbuhan apitan meN-...-kan pada perkataan "membersihkan"?',
      pilihan: [
        'Membentuk kata kerja yang bermaksud menjadikan sesuatu bersih',
        'Membentuk kata nama perihal keadaan',
        'Membentuk kata adjektif pancaindera',
        'Membentuk kata tugas'
      ],
      jawapanBetul: 'Membentuk kata kerja yang bermaksud menjadikan sesuatu bersih',
      penerangan: 'Tepat sekali! Membersihkan bermaksud perbuatan membuatkan sesuatu menjadi bersih.'
    },
    tahapKesukaran: 'Tahun 4',
    kemahiran: 'Apitan meN-...-kan',
    petunjuk: 'Membersihkan membawa maksud menjadikan sesuatu itu berkeadaan bersih.',
    kesalahanLazim: 'Menggunakan "kebersihan" untuk perbuatan (cth: "Murid sedang kebersihan kelas").'
  },
  {
    id: 'exp-bersih-kebersihan',
    kataDasar: 'bersih',
    imbuhan: 'ke-...-an',
    jenisImbuhan: 'apitan',
    perkataanTerhasil: 'kebersihan',
    perubahanBentuk: 'Menerima apitan ke-...-an membentuk kata nama keadaan/perihal',
    hukumTatabahasa: 'Apitan ke-...-an yang bergabung dengan kata sifat/adjektif "bersih" membentuk kata nama abstrak yang merujuk kepada perihal atau keadaan yang bersih.',
    maksudPerkataan: 'Perihal atau keadaan bersih, kesucian atau penjagaan diri daripada kekotoran.',
    contohAyat: 'Semua murid dinasihatkan sentiasa menjaga kebersihan bilik darjah masing-masing.',
    pilihanRamalan: ['membersihkan', 'kebersihan', 'pembersih', 'terbersih'],
    soalanKesimpulan: {
      soalan: 'Dalam ayat "Murid itu prihatin terhadap ______ diri", perkataan manakah yang paling sesuai?',
      pilihan: [
        'Kebersihan (kata nama yang merujuk keadaan bersih)',
        'Membersihkan (kata kerja perbuatan)',
        'Pembersih (alat atau orang)',
        'Bersihkan'
      ],
      jawapanBetul: 'Kebersihan (kata nama yang merujuk keadaan bersih)',
      penerangan: 'Bijak! Frasa sendi nama "terhadap..." memerlukan kata nama sebagai objeknya iaitu "kebersihan".'
    },
    tahapKesukaran: 'Tahun 4',
    kemahiran: 'Apitan ke-...-an (kata nama keadaan)',
    petunjuk: 'Apitan ke-...-an menerangkan keadaan atau perihal sesuatu.',
    kesalahanLazim: 'Murid tersilap meletakkan "membersihkan" di hadapan kata sendi nama.'
  },
  {
    id: 'exp-main-bermain',
    kataDasar: 'main',
    imbuhan: 'ber-',
    jenisImbuhan: 'awalan',
    perkataanTerhasil: 'bermain',
    perubahanBentuk: 'Menerima awalan "ber-" tanpa perubahan huruf kata dasar',
    hukumTatabahasa: 'Awalan ber- bergabung dengan kata dasar main membentuk kata kerja tak transitif bermaksud melakukan aktiviti bermain untuk bersukaria.',
    maksudPerkataan: 'Melakukan sesuatu perbuatan untuk berseronok atau beriadah.',
    contohAyat: 'Kanak-kanak itu gembira bermain layang-layang di padang pada waktu petang.',
    pilihanRamalan: ['memain', 'bermain', 'permainan', 'memainkan'],
    soalanKesimpulan: {
      soalan: 'Mengapakah ayat "Murid sedang memain bola" salah dalam tatabahasa?',
      pilihan: [
        'Kerana bentuk kata kerja yang betul bagi aktiviti riadah ialah "bermain", bukan "memain"',
        'Kerana perkataan bola tidak boleh digabungkan dengan main',
        'Kerana imbuhan memain hanya untuk orang dewasa',
        'Kerana bola ialah kata kerja'
      ],
      jawapanBetul: 'Kerana bentuk kata kerja yang betul bagi aktiviti riadah ialah "bermain", bukan "memain"',
      penerangan: 'Tepat! Bentuk "memain" tidak wujud dalam tatabahasa Melayu. Bentuk yang betul ialah "bermain" atau "memainkan".'
    },
    tahapKesukaran: 'Tahun 3',
    kemahiran: 'Awalan ber- (kata kerja riadah)',
    petunjuk: 'Aktiviti sukan dan riadah menggunakan awalan ber- (bermain bola, berenang, berlari).',
    kesalahanLazim: 'Murid sering menggunakan perkataan tidak standard "memain bola".'
  },
  {
    id: 'exp-main-permainan',
    kataDasar: 'main',
    imbuhan: 'per-...-an',
    jenisImbuhan: 'apitan',
    perkataanTerhasil: 'permainan',
    perubahanBentuk: 'Menerima apitan per-...-an membentuk kata nama',
    hukumTatabahasa: 'Apitan per-...-an bergabung dengan kata kerja main membentuk kata nama yang merujuk kepada sesuatu yang dimainkan atau jenis sukan.',
    maksudPerkataan: 'Sesuatu yang digunakan untuk bermain atau aktiviti permainan seperti congkak dan bola.',
    contohAyat: 'Congkak merupakan sejenis permainan tradisional masyarakat Melayu yang menguji ketangkasan fikiran.',
    pilihanRamalan: ['bermain', 'memainkan', 'permainan', 'pemain'],
    soalanKesimpulan: {
      soalan: 'Perkataan manakah yang merujuk kepada bendanya atau jenis perlawanan?',
      pilihan: [
        'Permainan (kata nama)',
        'Bermain (kata kerja)',
        'Memainkan (kata kerja transitif)',
        'Mainkan'
      ],
      jawapanBetul: 'Permainan (kata nama)',
      penerangan: 'Sangat betul! Permainan ialah kata nama yang merujuk kepada aktiviti, sukan atau alat hiburan itu sendiri.'
    },
    tahapKesukaran: 'Tahun 4',
    kemahiran: 'Apitan per-...-an (kata nama)',
    petunjuk: 'Permainan = kata nama bagi sukan, aktiviti atau alat yang dimainkan.',
    kesalahanLazim: 'Tertukar penggunaan antara "bermain" (perbuatan) dan "permainan" (benda/aktiviti).'
  },
  {
    id: 'exp-tidur-tertidur',
    kataDasar: 'tidur',
    imbuhan: 'ter-',
    jenisImbuhan: 'awalan',
    perkataanTerhasil: 'tertidur',
    perubahanBentuk: 'Menerima awalan "ter-" tanpa sebarang perubahan huruf',
    hukumTatabahasa: 'Awalan ter- membawa makna perbuatan yang berlaku SECARA TIDAK SENGAJA atau tiba-tiba. Jadi "tertidur" bermaksud terlelap tanpa disengajakan.',
    maksudPerkataan: 'Tidur dengan tidak sengaja kerana terlalu letih atau mengantuk.',
    contohAyat: 'Kerana terlalu letih mengulang kaji pelajaran, Danish tertidur di meja belajarnya.',
    pilihanRamalan: ['menidurkan', 'tertidur', 'bertidur', 'ketiduran'],
    soalanKesimpulan: {
      soalan: 'Apakah perbezaan makna yang paling utama antara perkataan "tidur" dengan "tertidur"?',
      pilihan: [
        'Tidur ialah perbuatan sengaja, manakala tertidur ialah perbuatan tanpa sengaja kerana keletihan',
        'Tidur hanya untuk malam, tertidur untuk siang',
        'Tidur untuk orang dewasa, tertidur untuk bayi',
        'Kedua-duanya sama makna tanpa perbezaan'
      ],
      jawapanBetul: 'Tidur ialah perbuatan sengaja, manakala tertidur ialah perbuatan tanpa sengaja kerana keletihan',
      penerangan: 'Luar biasa tepat! Awalan ter- pada tertidur menunjukkan aspek perbuatan yang tidak sengaja (aspek ketidaksengajaan).'
    },
    tahapKesukaran: 'Tahun 4',
    kemahiran: 'Awalan ter- (aspek tidak sengaja)',
    petunjuk: 'Awalan ter- sering menunjukkan perbuatan yang berlaku secara tidak sengaja.',
    kesalahanLazim: 'Murid menyangka "tertidur" sama maksud dengan "tidur biasa".'
  },
  {
    id: 'exp-kutip-mengutip',
    kataDasar: 'kutip',
    imbuhan: 'meN-',
    jenisImbuhan: 'awalan',
    perkataanTerhasil: 'mengutip',
    perubahanBentuk: 'Huruf "k" luluh dan digantikan dengan "ng"',
    hukumTatabahasa: 'Huruf "k" pada kata dasar kutip luluh apabila menerima awalan meN-, bertukar menjadi bunyi "meng-". Ejaan yang betul ialah mengutip.',
    maksudPerkataan: 'Mengambil sesuatu barang yang ada di lantai atau tanah satu demi satu.',
    contohAyat: 'Murid-murid mengutip sampah sarap yang bertaburan di padang sekolah.',
    pilihanRamalan: ['menkutip', 'mengutip', 'memkutip', 'menggkutip'],
    soalanKesimpulan: {
      soalan: 'Huruf apakah yang luluh apabila perkataan KUTIP menerima awalan meN-?',
      pilihan: [
        'Huruf "k" luluh dan bertukar menjadi "ng" (mengutip)',
        'Huruf "k" kekal dieja menkutip',
        'Huruf "t" yang luluh',
        'Huruf "p" yang luluh'
      ],
      jawapanBetul: 'Huruf "k" luluh dan bertukar menjadi "ng" (mengutip)',
      penerangan: 'Tepat sekali! Huruf k tergolong dalam huruf K, P, S, T yang luluh apabila bertemu awalan meN-.'
    },
    tahapKesukaran: 'Tahun 3',
    kemahiran: 'Awalan meN- (k -> ng)',
    petunjuk: 'K luluh menjadi ng: karang -> mengarang, kutip -> mengutip.',
    kesalahanLazim: 'Mengeja "menkutip" atau "mengkutip" tanpa meluluhkan huruf k.'
  },
  {
    id: 'exp-potong-memotong',
    kataDasar: 'potong',
    imbuhan: 'meN-',
    jenisImbuhan: 'awalan',
    perkataanTerhasil: 'memotong',
    perubahanBentuk: 'Huruf "p" luluh dan digantikan dengan "m"',
    hukumTatabahasa: 'Kata dasar yang bermula dengan huruf "p" luluh apabila digabungkan dengan awalan meN-, bertukar menjadi bentuk "mem-". Ejaan yang betul ialah memotong.',
    maksudPerkataan: 'Membahagi atau mengerat sesuatu menggunakan pisau atau gunting.',
    contohAyat: 'Ibu menggunakan pisau yang tajam untuk memotong buah tembikai itu.',
    pilihanRamalan: ['menpotong', 'mempotong', 'memotong', 'mengpotong'],
    soalanKesimpulan: {
      soalan: 'Apakah ejaan yang betul apabila POTONG menerima awalan meN-?',
      pilihan: [
        'Memotong (huruf p luluh kepada m)',
        'Mempotong (huruf p dikekalkan)',
        'Menpotong (ditambah huruf n)',
        'Pengpotong'
      ],
      jawapanBetul: 'Memotong (huruf p luluh kepada m)',
      penerangan: 'Hebat! Huruf "p" luluh kepada "m", contohnya pasang -> memasang, potong -> memotong.'
    },
    tahapKesukaran: 'Tahun 3',
    kemahiran: 'Awalan meN- (p -> m)',
    petunjuk: 'Huruf p luluh menjadi m (contoh: pandu -> memandu, potong -> memotong).',
    kesalahanLazim: 'Mengeja "mempotong" dengan mengekalkan huruf p.'
  },
  {
    id: 'exp-cuci-mencuci',
    kataDasar: 'cuci',
    imbuhan: 'meN-',
    jenisImbuhan: 'awalan',
    perkataanTerhasil: 'mencuci',
    perubahanBentuk: 'Kata dasar bermula huruf "c" menerima alomorf "men-" (huruf c TIDAK luluh)',
    hukumTatabahasa: 'Kata dasar yang bermula dengan huruf "c" menerima awalan "men-" dan huruf "c" TIDAK luluh. Jadi, men + cuci = mencuci.',
    maksudPerkataan: 'Membersihkan pakaian, pinggan atau anggota badan dengan air dan sabun.',
    contohAyat: 'Abang mencuci kasut sekolahnya sehingga bersih berseri pada petang Sabtu.',
    pilihanRamalan: ['menyusi', 'mencuci', 'memcuci', 'mengcuci'],
    soalanKesimpulan: {
      soalan: 'Mengapakah huruf "c" pada perkataan "cuci" TIDAK luluh dalam perkataan "mencuci"?',
      pilihan: [
        'Kerana huruf "c" bukan huruf yang luluh dalam hukum tatabahasa Melayu',
        'Kerana huruf c patut luluh menjadi menyuci',
        'Kerana tiada peraturannya',
        'Kerana ia perkataan pinjaman'
      ],
      jawapanBetul: 'Kerana huruf "c" bukan huruf yang luluh dalam hukum tatabahasa Melayu',
      penerangan: 'Tepat! Huruf yang luluh hanyalah K, P, S, T. Huruf C kekal bersama awalan men- (mencari, mencuci, mencubit).'
    },
    tahapKesukaran: 'Tahun 3',
    kemahiran: 'Awalan meN- (konsonan c kekal)',
    petunjuk: 'Huruf c kekal dan bergabung dengan men- (mencuci, mencakar).',
    kesalahanLazim: 'Murid menyangka huruf c luluh menjadi "menyusi".'
  },
  {
    id: 'exp-siram-menyiram',
    kataDasar: 'siram',
    imbuhan: 'meN-',
    jenisImbuhan: 'awalan',
    perkataanTerhasil: 'menyiram',
    perubahanBentuk: 'Huruf "s" luluh dan bertukar menjadi "ny"',
    hukumTatabahasa: 'Kata dasar berhuruf awal "s" luluh kepada alomorf "meny-". Ejaan yang betul ialah menyiram.',
    maksudPerkataan: 'Mencurahkan air pada pokok bunga atau tumbuhan agar subur.',
    contohAyat: 'Nenek menyiram pokok bunga mawar di taman mini setiap pagi.',
    pilihanRamalan: ['mensiram', 'menyiram', 'memsiram', 'mengsiram'],
    soalanKesimpulan: {
      soalan: 'Pilih ejaan yang tepat bagi perbuatan mencurahkan air ke atas pokok:',
      pilihan: [
        'Menyiram (huruf s luluh menjadi ny)',
        'Mensiram (huruf s dikekalkan)',
        'Tersiram (tidak sengaja)',
        'Penyiram (alat menyiram)'
      ],
      jawapanBetul: 'Menyiram (huruf s luluh menjadi ny)',
      penerangan: 'Pintar! Kata kerja yang betul ialah menyiram (huruf s luluh kepada ny).'
    },
    tahapKesukaran: 'Tahun 3',
    kemahiran: 'Awalan meN- (s -> ny)',
    petunjuk: 'Huruf s luluh menjadi ny (sapu -> menyapu, siram -> menyiram).',
    kesalahanLazim: 'Mengeja "mensiram" kerana pengaruh huruf s asal.'
  }
];

export const IMBUHAN_LIST = [
  { id: 'meN-', label: 'meN-', jenis: 'awalan', desc: 'Awalan kata kerja aktif' },
  { id: 'peN-', label: 'peN-', jenis: 'awalan', desc: 'Awalan kata nama alat/pelaku' },
  { id: 'ber-', label: 'ber-', jenis: 'awalan', desc: 'Awalan kata kerja perbuatan/keadaan' },
  { id: 'ter-', label: 'ter-', jenis: 'awalan', desc: 'Awalan aspek ketidaksengajaan/paling' },
  { id: '-kan', label: '-kan', jenis: 'akhiran', desc: 'Akhiran kata kerja transitif' },
  { id: '-i', label: '-i', jenis: 'akhiran', desc: 'Akhiran kata kerja lokatif/kausatif' },
  { id: 'ke-...-an', label: 'ke-...-an', jenis: 'apitan', desc: 'Apitan kata nama keadaan/perihal' },
  { id: 'peN-...-an', label: 'peN-...-an', jenis: 'apitan', desc: 'Apitan kata nama proses/hal' },
  { id: 'per-...-an', label: 'per-...-an', jenis: 'apitan', desc: 'Apitan kata nama perihal/hasil' },
  { id: 'meN-...-kan', label: 'meN-...-kan', jenis: 'apitan', desc: 'Apitan kata kerja menyebabkan' }
];

export const KATA_DASAR_LIST = [
  { kata: 'sapu', sukuKata: 2, hurufAwal: 's', jenis: 'kata kerja/kata nama' },
  { kata: 'tulis', sukuKata: 2, hurufAwal: 't', jenis: 'kata kerja' },
  { kata: 'baca', sukuKata: 2, hurufAwal: 'b', jenis: 'kata kerja' },
  { kata: 'masak', sukuKata: 2, hurufAwal: 'm', jenis: 'kata kerja' },
  { kata: 'tanam', sukuKata: 2, hurufAwal: 't', jenis: 'kata kerja' },
  { kata: 'cat', sukuKata: 1, hurufAwal: 'c', jenis: 'kata nama/kata kerja' },
  { kata: 'ajar', sukuKata: 2, hurufAwal: 'a', jenis: 'kata kerja' },
  { kata: 'bersih', sukuKata: 2, hurufAwal: 'b', jenis: 'kata adjektif' },
  { kata: 'main', sukuKata: 2, hurufAwal: 'm', jenis: 'kata kerja' },
  { kata: 'tidur', sukuKata: 2, hurufAwal: 't', jenis: 'kata kerja' },
  { kata: 'kutip', sukuKata: 2, hurufAwal: 'k', jenis: 'kata kerja' },
  { kata: 'potong', sukuKata: 2, hurufAwal: 'p', jenis: 'kata kerja' },
  { kata: 'cuci', sukuKata: 2, hurufAwal: 'c', jenis: 'kata kerja' },
  { kata: 'siram', sukuKata: 2, hurufAwal: 's', jenis: 'kata kerja' }
];
