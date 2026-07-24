const express = require("express");
const router = express.Router();

const Profile = require("../models/Profile");

router.get("/", async (req, res) => {
  console.log("Profile route hit");
  console.log("Collection:", Profile.collection.name);

  try {
    const profile = await Profile.findOne();
    console.log(profile);

    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;