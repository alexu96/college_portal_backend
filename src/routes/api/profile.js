const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/user");

router.get("/", async (req, res) => {
  const data = await User.find({ _id: req.body.id });
  res.send(data);
});

router.put(
  "/",
  check("id", "user id is required").not().isEmpty(),

  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(500).json({ error: error.array() });
    }
    const { id, about, skills, education, experience, projects } = req.body;

    try {
      await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            about: about,
            skills: skills,
            education: education,
            experience: experience,
            projects: projects
          }
        },
        { new: true }
      );
      return res.json("Updated marks");
    } catch (err) {
      console.error(err.message);
      return res.send("server error");
    }
  }
);

module.exports = router;
