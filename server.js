// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const rateLimit = require("express-rate-limit");
// Routes
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

const app = express();


const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ======================
   MIDDLEWARES
====================== */

// 🔥 REQUIRED MIDDLEWARE
app.use(cors());
app.use(express.json()); // <-- THIS WAS MISSING
app.use(express.urlencoded({ extended: true }));
/* ======================
   DATABASE CONNECTION
====================== */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

/* ======================
   ROUTES
====================== */
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);



const userLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests
  message: {
    message: "Too many requests, please wait"
  }
});

app.use("/api/user", userLimiter);

/* ======================
   HEALTH CHECK
====================== */
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Gift Card Checker API is running"
  });
});

/* ======================
   SERVER LISTEN
   (Vercel Compatible)
====================== */
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
