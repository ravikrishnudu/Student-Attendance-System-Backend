const { Class, Student, Attendance } = require("./model");

//class
async function createGrade(data) {
  const grade = await Class.create(data);
  return grade.toJSON();
}

async function getGrades() {
  const grade = await Class.findAll();
  return grade;
}
async function deleteGrade(id) {
  const grade = await Class.destroy({ where: { id } });
  return grade;
}
// student

async function createStudent(data) {
  const student = await Student.create(data);
  return student.toJSON();
}

async function getStudents() {
  const student = await Student.findAll();
  return student;
}

// async function getStudents(id) {
//   let query, grade;
//   if (id) {
//     grade = await Class.findOne({ where: { id } });
//     query = { where: { classId: grade.id } };
//   } else {
//     query = {};
//   }

//   const students = await Student.findAll(query);
//   return students.map((student) => student.toJSON());
// }

// not working need to fix
async function updateStudent(data, id) {
  const student = await Student.update(data, { where: { id } });
  return student;
}

async function deleteStudent(id) {
  const student = await Student.destroy({ where: { id } });
  return student;
}
module.exports = {
  createGrade,
  getGrades,
  deleteGrade,
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
};
