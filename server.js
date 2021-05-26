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
    const student = await createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/student", async (req, res) => {
  try {
    const student = await getStudents();
    res.status(201).json(student);
  } catch (error) {
    res.status(404).json(error);
  }
});

// app.get("/student", async (req, res) => {
//   try {
//     const { id } = req.query;
//     const student = await getTweets(id);
//     res.json(student);
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });

// not working need to fix
app.put("student/:id", async (req, res) => {
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

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`server is up and listening on ${PORT}`);
});
