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

async function getStudents(id, gradeId) {
  let query;
  if (id) {
    query = { where: { id } };
  } else if (gradeId) {
    query = { where: { gradeId } };
  } else {
    query = {};
  }

  const students = await Student.findAll(query);
  return students.map((student) => student.toJSON());
}

async function updateStudent(data, id) {
  const student = await Student.update(data, { where: { id } });
  return student;
}

async function deleteStudent(id) {
  const student = await Student.destroy({ where: { id } });
  return student;
}
// Attendence
async function createAttendance(data) {
  const { studentId, gradeId } = data;
  const attendance = await Attendance.create(data);
  // const attendances = [];
  // data.forEach((attendance) => {
  //   const attendance = await Attendance.create(data);
  //   attendances.push(attendance);
  // });

  return attendance.toJSON();
}
// function createData(data) {
//   const students = [];
//   data.forEach((student) => {
//     const student = await Student.create(student);
//     students.push(student);
//   });
//   return students;
// }
async function getAttendance(studentId, gradeId) {
  let query;
  if (gradeId) {
    query = { where: { gradeId } };
  } else {
    query = {};
  }
  const attendances = await Attendance.findAll(query);
  return attendances.map((attendance) => attendance.toJSON());
}

async function deleteAttendance(body) {
  const { studentId, gradeId } = body;
  const attendance = await Attendance.destroy({
    where: { studentId, gradeId },
  });
  return attendance;
}

module.exports = {
  createGrade,
  getGrades,
  deleteGrade,
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  createAttendance,
  getAttendance,
  deleteAttendance,
};
