const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const router = express.Router();

multer({
  limits: { fieldSize: 25 * 1024 * 1024 }
});

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./images");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
});

router.get("/", (req, res) => {
  res.status(200).send("to upload image use this  /api/upload.");
});

router.post("/api/upload", (req, res) => {
  let upload = multer({ storage: Storage }).single("picture");
  upload(req, res, function (err) {
    if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
    // Display uploaded image for user validation
    res.send(req.file.path); // send uploaded image
  });
});

module.exports = router;
