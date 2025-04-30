// Bài 1: Danh sách học sinh xuất sắc
// Yêu cầu: Lọc danh sách học sinh có điểm >= 8, kiểm tra xem có học sinh nào đạt điểm 10, và đảm bảo tất cả học sinh đều có điểm trên 5.
const students = [
  { name: "Nguyễn", score: 9 },
  { name: "Lan", score: 10 },
  { name: "Minh", score: 7 },
];
const studentsName = students
  .filter(student => student.score >= 8)
  .map(student => student.name);
console.log(studentsName);

// tính tổng điểm
const studentScore = students.reduce((sum, student) => sum + student.score, 0);
console.log(studentScore);
//Đảm bảo tất cả học sinh đều có điểm trên 5
const studentsEvery = students.every( student => student.score > 5)
console.log(studentsEvery);

// Kiểm tra hoc sinh được điểm 10 
const studentsSome = students.some(student => student.score === 10)
console.log(studentsSome);

// Lọc học sinh có điểm trên 8
const studentsFilter = students.filter(student => student.score >= 8)
console.log(studentsFilter);


