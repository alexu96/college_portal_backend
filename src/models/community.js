const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String
  },
  image: {
    type: String
  },
  message: {
    type: String
  },
  date: {
    type: Date,
    Default: Date.now
  }
});

module.exports = mongoose.model("Community", communitySchema);
