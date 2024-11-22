const Room = require("../models/Room");

exports.getRooms = async (req, res) => {
    try {
      const rooms = await Room.find({});
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch rooms', details: error.message });
    }
  };
  
  exports.createRoom = async (req, res) => {
    try {
      const newRoom = new Room({ name: req.body.name, players: 0 });
      await newRoom.save();
      res.status(201).json(newRoom);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create room', details: error.message });
    }
  };
  
  exports.joinRoom = async (req, res) => {
    const { roomId } = req.params;
  
    try {
      const room = await Room.findById(roomId);
      if (room.players >= 4) return res.status(400).json({ message: 'Room is full' });
  
      room.players += 1;
      await room.save();
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json({ error: 'Failed to join room', details: error.message });
    }
  };