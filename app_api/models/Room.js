const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  players: { type: [String], default: [] }, 
});

module.exports = mongoose.model('Room', RoomSchema);