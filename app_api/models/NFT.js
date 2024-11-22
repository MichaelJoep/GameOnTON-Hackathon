const mongoose = require("mongoose");

const NFTSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  metadata: { type: Object, required: true },
  mintDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("NFT", NFTSchema);