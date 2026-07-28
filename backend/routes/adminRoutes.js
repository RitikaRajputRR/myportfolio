const express = require("express");
const router = express.Router();

const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// ================= Register =================
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).json({
      message: "Admin Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= Login =================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: admin._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      username: admin.username,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= Get All Admins =================
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");

    res.json(admins);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= Get Single Admin =================
router.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password");

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    res.json(admin);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= Update Admin =================
router.put("/:id", async (req, res) => {
  try {
    const { username, email } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      {
        username,
        email,
      },
      { new: true }
    ).select("-password");

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    res.json({
      message: "Admin updated successfully",
      admin,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= Delete Admin =================
router.delete("/:id", async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    res.json({
      message: "Admin deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;