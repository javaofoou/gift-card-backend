const mongoose = require("mongoose");

const userCheckSchema = new mongoose.Schema(
  {
    cardType: String,
    cardNumber: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserCheck", userCheckSchema);

