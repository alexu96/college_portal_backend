const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/user");

router.put(
  "/",
  check("id", "user id is required").not().isEmpty(),
  check("assign", "assign marks is required").not().isEmpty(),
  check("quiz", "quiz marks is required").not().isEmpty(),
  check("cie", "CIe marks is required").not().isEmpty(),
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(500).json({ error: error.array() });
    }
    const { assign, quiz, cie } = req.body;

    try {
      await User.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            marks: {
              assign: assign,
              quiz: quiz,
              cie: cie
            }
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
