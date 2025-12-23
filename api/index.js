const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const connectDB = require("../lib/db");

const userRoutes = require("../routes/user");
const adminRoutes = require("../routes/admin");

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// Connect MongoDB (ONLY THIS — no mongoose.connect here)
connectDB(process.env.MONGO_URL);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// Export for Vercel
module.exports = serverless(app);


