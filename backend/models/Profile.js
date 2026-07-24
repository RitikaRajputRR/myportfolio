const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    about: String,
  },
  {
    collection: "profile",
  }
);

module.exports = mongoose.model("Profile", profileSchema);