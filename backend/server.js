require("dotenv").config();
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/adminRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/contact", contactRoutes);
app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("DB Name:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});