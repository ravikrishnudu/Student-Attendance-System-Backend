const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_URL);

const Class = sequelize.define("class", {
  class: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  students_count: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 28,
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
    type: DataTypes.DATE,
    allowNull: false,
  },
  isEntered: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// class table
Class.hasMany(Student);
Student.belongsTo(Class);

// Attendance table
Student.hasMany(Attendance);
Attendance.belongsTo(Student);

Class.hasMany(Attendance);
Attendance.belongsTo(Class);

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

module.exports = { Class, Student, Attendance };
