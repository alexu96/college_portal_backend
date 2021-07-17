const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    dept: {
      type: String
    },
    dob: {
      type: String
    },
    email: {
      type: String
    },
    image: {
      type: String
    },
    skills: {
      type: Array
    },
    subjects: {
      type: Array
    },
    about: {
      type: String
    },
    degree: {
      type: Array
    }
  },
  {
    collection: "teachers"
  }
);

module.exports = mongoose.model("Teacher", teacherSchema);
