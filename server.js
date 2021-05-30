require("dotenv").config();
const express = require("express");
const cors = require("cors");

const {
  createGrade,
  getGrades,
  deleteGrade,
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  createAttendance,
  deleteAttendance,
  getAttendance,
} = require("./handler");

const app = express();

app.use(express.json());
app.use(cors());

//class
app.post("/grade", async (req, res) => {
  try {
    const grade = await createGrade(req.body);
    res.status(201).json(grade);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/grade", async (req, res) => {
  try {
    const grade = await getGrades();
    res.status(201).json(grade);
  } catch (error) {
    res.status(404).json(error);
  }
});

app.delete("/grade/:id", async (req, res) => {
  let { id } = req.params;
  const grade = await deleteGrade(id);
  res.json(grade);
});
// student

app.post("/student", async (req, res) => {
  try {
    // console.log(req.body);
    const student = await createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.get("/student", async (req, res) => {
  try {
    const { id, gradeId } = req.query;
    const student = await getStudents(id, gradeId);
    res.json(student);
  } catch (error) {
    res.status(404).json(error);
  }
});

app.put("/student/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const student = await updateStudent(req.body, id);
    res.status(201).json(student);
  } catch (error) {
    res.status(404).json(error);
  }
});
app.delete("/student/:id", async (req, res) => {
  let { id } = req.params;
  const student = await deleteStudent(id);
  res.json(student);
});
// Attendence
app.post("/attendance", async (req, res) => {
  try {
    const attendance = await createAttendance(req.body);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/attendance", async (req, res) => {
  const { studentId, gradeId } = req.query;

  const attendance = await getAttendance(studentId, gradeId);
  res.json(attendance);
});

app.delete("/attendance", async (req, res) => {
  try {
    const attendance = await deleteAttendance(req.body);
    res.json(attendance);
  } catch (error) {
    res.status(400).json(error);
  }
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`server is up and listening on ${PORT}`);
});
