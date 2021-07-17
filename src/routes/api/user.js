const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.send(users);
  console.log(users);
});

router.post("/dept", async (req, res) => {
  const users = await User.find({ dept: req.body.dept });

  res.json({ users });
  console.log(users);
});

//login
router.post(
  "/",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let users = await User.findOne({ email });
      console.log(users);

      if (!users) {
        return res
          .status(400)
          .json({ error: [{ msg: "Invalid Credentials " }] });
      }
      console.log(password);

      if (password !== users.dob) {
        return res.status(400).json({ errors: [{ msg: "Invalid password " }] });
      }

      const payload = {
        users: {
          id: users.id
        }
      };

      jwt.sign(
        payload,
        config.get("jsontoken"),
        { expiresIn: 5000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, users });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
