const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Community = require("../../models/community");

router.get("/", async (req, res) => {
  const details = await Community.find({});
  res.send(details);
});

router.post(
  "/",
  check("id", " id is required").not().isEmpty(),
  check("name", "name marks is required").not().isEmpty(),
  check("image", "image marks is required").not().isEmpty(),
  check("message", "message marks is required").not().isEmpty(),
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(500).json({ error: error.array() });
    }
    const { id, name, image, message, date } = req.body;

    try {
      const community = new Community({
        id,
        name,
        image,
        message,
        date
      });
      await community.save();

      res.send(community);
    } catch (err) {
      console.error(err.message);
      return res.send("server error");
    }
  }
);

module.exports = router;
