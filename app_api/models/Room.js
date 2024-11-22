const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: String,
  players: { type: Number, default: 0 },
});

module.exports = mongoose.model('Room', RoomSchema);