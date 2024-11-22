const mongoose = require('mongoose');


const RewardSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rewardType: { type: String, enum: ['token', 'nft'], required: true },
    amount: { type: Number, default: 0 },
    dateClaimed: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Reward', RewardSchema);