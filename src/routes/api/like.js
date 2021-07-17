const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Teacher = require("../../models/teacher");

router.put("/", async (req, res) => {
  if (req.body.name === "teachers") {
    try {
      const teachers = await Teacher.findById(req.body.id);

      if (teachers.like.filter((like) => like === req.body._id).length > 0) {
        return res.status(400).json({ msg: "Post already liked" });
      }

      teachers.like.push(req.body._id);

      await teachers.save();

      res.json(teachers.like);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  } else {
    try {
      const users = await User.findById(req.body.id);

      if (users.like.filter((like) => like === req.body._id).length > 0) {
        return res.status(400).json({ msg: "Post already liked" });
      }

      users.like.push(req.body._id);

      await users.save();

      res.json(users.like);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
});

module.exports = router;
