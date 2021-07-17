const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    dept: {
      type: String
    },
    year: {
      type: String
    },
    dob: {
      type: String
    },
    marks: {
      assign: {
        type: Number
      },
      quiz: {
        type: Number
      },
      cie: {
        type: Number
      }
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
    experience: {
      type: Array
    },
    projects: {
      type: Array
    },
    education: {
      type: Array
    },
    about: {
      type: String
    },
    like: {
      type: Array
    },
    dislike: {
      type: Array
    }
  },
  {
    collection: "students"
  }
);

module.exports = mongoose.model("User", UserSchema);
