const mongoose = require("mongoose");

const giftCardSchema = new mongoose.Schema(
  {
    cardNumber: String,
    cardType: String,
    balance: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("GiftCard", giftCardSchema);
