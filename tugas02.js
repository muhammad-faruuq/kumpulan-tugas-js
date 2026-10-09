console.log("========================================");
console.log("          PENGOLAH DATA SISWA");
console.log("========================================");

// DATA AWAL

const studentName = "  mUhammAd FaRuuq  ";
const ageText = "17 tahun";
const scoreText = "85.678";
const registrationText = "21-08-2026";

// BAGIAN 1 - MEMBERSIHKAN NAMA

// Menghapus spasi di awal dan akhir
const namaBersih = studentName.trim();

// Mengubah semua huruf menjadi huruf kecil
const namaKecil = namaBersih.toLowerCase();

// Memisahkan nama menjadi Array
const namaArray = namaKecil.split(" ");

// Mengambil nama depan dan nama belakang
const namaDepan = namaArray[0];
const namaBelakang = namaArray[1];

// Mengubah huruf pertama menjadi huruf besar
const namaDepanBesar =
    namaDepan.slice(0, 1).toUpperCase() +
    namaDepan.slice(1);

const namaBelakangBesar =
    namaBelakang.slice(0, 1).toUpperCase() +
    namaBelakang.slice(1);

// Menggabungkan kembali nama
const cleanName =
    [namaDepanBesar, namaBelakangBesar].join(" ");


// Membuat username
const username =
    namaKecil.split(" ").join(".").toLowerCase();

// PART 2 - ANALISIS NAMA

// Mengecek apakah nama mengandung "Ahmad"
const cekAhmad =
    cleanName.includes("Ahmad");

// Mengambil 5 karakter pertama
const limaKarakter =
    cleanName.slice(0, 5);

// Mengganti nama Ahmad menjadi Budi
const namaPengganti =
    cleanName.replace("Ahmad", "Budi");

// PART 3 - MENGOLAH UMUR

// Mengambil angka dari "17 tahun"
const age =
    parseInt(ageText);

// Mengambil tahun sekarang
const sekarang =
    new Date();

const tahunSekarang =
    sekarang.getFullYear();

// Menghitung tahun lahir
const tahunLahir =
    tahunSekarang - age;

// PART 4 - MENGOALH NILAI

// Mengubah String menjadi Number
const score =
    parseFloat(scoreText);

// Membuat 2 angka di belakang koma
const scoreDuaKoma =
    score.toFixed(2);

// Pembulatan nilai
const scoreRound =
    Math.round(score);

const scoreFloor =
    Math.floor(score);

const scoreCeil =
    Math.ceil(score);

// PART 5 - MENETUKAN GRADE

let grade;

if (score >= 90) {

    grade = "A";

} else if (score >= 80) {

    grade = "B";

} else if (score >= 70) {

    grade = "C";

} else if (score >= 60) {

    grade = "D";

} else {

    grade = "E";
}

// PART 6 - MENGOLAH TANGGAL PENDAFTARAN

// Memisahkan tanggal menggunakan split
const tanggalArray =
    registrationText.split("-");

// Mengubah String menjadi Number
const tanggal =
    Number(tanggalArray[0]);

const bulan =
    Number(tanggalArray[1]);

const tahun =
    Number(tanggalArray[2]);

// PART 7 - TANGGAL DAN WAKTU SEKARANG

const now =
    new Date();

const tahunLaporan =
    now.getFullYear();

const bulanLaporan =
    now.getMonth() + 1;

const tanggalLaporan =
    now.getDate();

const hariLaporan =
    now.getDay();

const jamLaporan =
    now.getHours();

const menitLaporan =
    now.getMinutes();

// NAMA HARI

const hariIndo = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu"
];

const namaHari =
    hariIndo[hariLaporan];

// PART 8 - FORMAT TANGGAL

function formatDate(date) {

    const hari =
        String(date.getDate())
        .padStart(2, "0");

    const bulan =
        String(date.getMonth() + 1)
        .padStart(2, "0");

    const tahun =
        date.getFullYear();

    return `${hari}/${bulan}/${tahun}`;
}


// Format tanggal laporan
const tanggalLaporanFormat =
    formatDate(now);


// Format waktu
const jam =
    String(jamLaporan)
    .padStart(2, "0");

const menit =
    String(menitLaporan)
    .padStart(2, "0");

const waktuLaporan =
    `${jam}:${menit}`;


// PART 9 - DADU ACAK

// Menghasilkan angka 1 sampai 6
const dadu =
    Math.floor(Math.random() * 6) + 1;

let hasilDadu;

if (dadu === 6) {

    hasilDadu = "JACKPOT!";

} else if (dadu === 1) {

    hasilDadu = "NASIB BURUK!";

} else {

    hasilDadu = "BERUNTUNG!";
}
// PART 10 - LAPORAN AKHIR

console.log("");
console.log("========================================");
console.log("          LAPORAN DATA SISWA");
console.log("========================================");

console.log(`
Nama          : ${cleanName}
Username      : ${username}
Umur          : ${age} tahun
Tahun Lahir   : ${tahunLahir}

Nilai         : ${scoreDuaKoma}
Pembulatan    : ${scoreRound}
Pembulatan Bawah : ${scoreFloor}
Pembulatan Atas  : ${scoreCeil}
Grade         : ${grade}

Tanggal Daftar: ${String(tanggal).padStart(2, "0")}/${String(bulan).padStart(2, "0")}/${tahun}

Tanggal Laporan : ${tanggalLaporanFormat}
Hari            : ${namaHari}
Waktu           : ${waktuLaporan}

Dadu            : ${dadu}
Hasil           : ${hasilDadu}
`);

console.log("========================================");
console.log("          PROSES SELESAI");
console.log("========================================");