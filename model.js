const { Sequelize, DataTypes } = require("sequelize");
const { prettify } = require("sql-log-prettifier");

const sequelize = new Sequelize(process.env.DB_URL, {
  logging: function (unformattedAndUglySql) {
    const prettifiedSQL = prettify(unformattedAndUglySql);
    console.log(prettifiedSQL);
  },
});

const Grade = sequelize.define("grade", {
  grade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  students_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Student = sequelize.define("student", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Attendance = sequelize.define("attendance", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  isPresent: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});
// class table
Grade.hasMany(Student);
Student.belongsTo(Grade);

// Attendance table
Student.hasMany(Attendance);
Attendance.belongsTo(Student);

Grade.hasMany(Attendance);
Attendance.belongsTo(Grade);

async function connection() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connection();

module.exports = { Grade, Student, Attendance };
