const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Profile = require("../models/Profile");

router.get("/", async (req, res) => {
  try {
    console.log("Database:", mongoose.connection.name);
    console.log("Collection:", Profile.collection.name);

    const count = await Profile.countDocuments();
    console.log("Total Documents:", count);

    const profile = await Profile.findOne();
    console.log("Profile:", profile);

    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;