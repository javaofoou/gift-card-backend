const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  defaultBalance: {
    type: Number,
    default: 100
  }
});

module.exports = mongoose.model("Settings", settingsSchema);
