const { Grade, Student, Attendance } = require("./model");

//class
async function createGrade(data) {
  const grade = await Grade.create(data);
  return grade.toJSON();
}

async function getGrades() {
  const grade = await Grade.findAll();
  return grade;
}
async function deleteGrade(id) {
  const grade = await Grade.destroy({ where: { id } });
  return grade;
}

// student

async function createStudent(data) {
  console.log(data);
  const { gradeId } = data;
  const student = await Student.create(data);
  const grade = await Grade.findOne({ where: { id: gradeId } });
  grade.toJSON();
  const students_count = grade.students_count + 1;
  const updatedGrade = await Grade.update(
    { students_count },
    { where: { id: gradeId } }
  );
  return student;
}

async function getStudents(id, classId) {
  let query;
  if (id) {
    query = { where: { id } };
  } else if (classId) {
    query = { where: { classId } };
  } else {
    query = {};
  }

  const students = await Student.findAll(query);
  return students.map((student) => student.toJSON());
}

// not working need to fix
async function updateStudent(data, id) {
  const student = await Student.update(data, { where: { id } });
  return student;
}
// async function updateStudent(data) {
//   const { id } = data;
//   const oldStudent = await Student.findOne({ where: { id } });
//   const student = await Student.update(data);
//   return student;
// }
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
