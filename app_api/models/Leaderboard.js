const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    kills: { type: Number, default: 0 },
    tokensEarned: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);