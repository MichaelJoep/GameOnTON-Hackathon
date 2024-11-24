const express = require("express");
const router = express.Router();
const Pusher = require("pusher");
const Room = require("../models/Room");

const pusher = new Pusher({
  appId: process.env.PUSHER_API_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

// Emit custom event to a room
router.post("/emit-event", async (req, res) => {
  const { room, eventData } = req.body;

  try {
    await pusher.trigger(room, "game-update", eventData);
    res.status(200).json({ message: "Event broadcasted successfully" });
  } catch (error) {
    console.error("Error broadcasting event:", error);
    res.status(500).json({ error: "Failed to broadcast event" });
  }
});

// Join a room
router.post("/rooms/:roomId/join", async (req, res) => {
  const { roomId } = req.params;
  const { playerName } = req.body;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    if (room.players.length >= 4) {
      return res.status(400).json({ error: "Room is full" });
    }

    room.players.push(playerName);
    await room.save();

    // Notify room and lobby about the update
    await pusher.trigger(`game-room-${roomId}`, "player-joined", {
      playerName,
      player: { id: playerName, position: [0, 0, 0] },
    });
    await pusher.trigger("multiplayer-channel", "room-updated", { room });

    res.json({ success: true, room });
  } catch (error) {
    console.error("Error joining room:", error);
    res.status(500).json({ error: "An error occurred while joining the room" });
  }
});

module.exports = router;
