const aeonService = require("../services/aeonService");
const User = require("../models/User")


exports.initiatePayment = async (req, res) => {

    try {
        const { userId, amount } = req.body;
        const payment = await aeonService.createPayment(userId, amount);
        res.status(201).json({ message: "Payment initiated", payment })
    } catch (error) {
        res.status(500).json({ error: "Error initiating payment", details: error.message });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
      const { transactionId } = req.body;
      const verification = await aeonService.verifyPayment(transactionId);
      res.status(200).json({ message: "Payment verified", verification });
    } catch (error) {
      res.status(500).json({ error: "Error verifying payment", details: error.message });
    }
  };



exports.aeonWebhook = async (req, res) => {
    try {
      const { transactionId, status, userId } = req.body;
  
      if (status === "SUCCESS") {
        // Update user's tokens or NFTs
        await User.findByIdAndUpdate(userId, { $inc: { tokenEarned: 1 } });
      }
  
      res.status(200).send("Webhook processed");
    } catch (error) {
      res.status(500).json({ error: "Error processing webhook", details: error.message });
    }
  };