// Data siswa menggunakan Array + Object
const students = [
    {
        name: "Asep",
        className: "XI RPL",
        scores: [95, 88, 92],
        attendance: 96,
        hasViolation: false
    },
    {
        name: "Budi",
        className: "XI RPL",
        scores: [78, 82, 75],
        attendance: 88,
        hasViolation: false
    },
    {
        name: "Cahyo",
        className: "XI RPL",
        scores: [65, 73, 68],
        attendance: 85,
        hasViolation: false
    }
];

// TANGGAL LAPORAN

const reportDate = new Date();

const day = reportDate.getDate();
const month = reportDate.getMonth() + 1;
const year = reportDate.getFullYear();


// HEADER

console.log("================================================");
console.log("          HSI STUDENT REPORT CARD");
console.log("================================================");
console.log(`Tanggal Laporan : ${day}/${month}/${year}`);


// PROSES SEMUA SISWA

for (let i = 0; i < students.length; i++) {

    const student = students[i];

    // Menghitung total nilai
    let total = 0;

    for (let j = 0; j < student.scores.length; j++) {
        total += student.scores[j];
    }


    // Menghitung rata-rata dan membulatkannya
    const average = Math.round(total / student.scores.length);


    // Menentukan Grade
    let grade;

    if (average >= 90) {
        grade = "A";
    } else if (average >= 80) {
        grade = "B";
    } else if (average >= 70) {
        grade = "C";
    } else {
        grade = "D";
    }


    // Menentukan status pelanggaran
    let violation;

    if (student.hasViolation) {
        violation = "Ada";
    } else {
        violation = "Tidak Ada";
    }


    // Menentukan status kelulusan
    let status;

    if (
        average >= 75 &&
        student.attendance >= 80 &&
        !student.hasViolation
    ) {
        status = "LULUS 🎉";
    } else {
        status = "BELUM LULUS";
    }

    // OUTPUT REPORT

    console.log("");
    console.log(`👤 STUDENT #${i + 1}`);
    console.log("-----------------------------------------------");

    console.log(`
Nama         : ${student.name}
Kelas        : ${student.className}
Kehadiran    : ${student.attendance}%

Nilai        : ${student.scores.join(", ")}
Total        : ${total}
Rata-rata    : ${average}
Grade        : ${grade}

Pelanggaran  : ${violation}
Status       : ${status}
`);
}


// FOOTER

console.log("================================================");