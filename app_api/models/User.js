const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    telegramId: { type: String, required: true, unique: true },
    username: { type: String },
    nickname: { type: String },
    profileImage: { type: String },
    walletAddress: { type: String },
    ghostsCaptured: { type: Number, default: 0 },
    tokensEarned: { type: Number, default: 0 },
    nftsEarned: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
});

module.exports = mongoose.model("User", UserSchema)