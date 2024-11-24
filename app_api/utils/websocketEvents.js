const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_API_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Handle room joining
    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`Client ${socket.id} joined room: ${room}`);

      // Notify other players in the room
      pusher.trigger(room, "player-joined", {
        message: `A new player joined: ${socket.id}`,
        playerId: socket.id,
      });
    });

    // Handle game events (e.g., movements, attacks, updates)
    socket.on("gameEvent", (data) => {
      console.log("Game Event Received:", data);

      const { room, eventType, payload } = data;

      // Broadcast the event to other players in the room via Pusher
      pusher.trigger(room, "game-update", {
        eventType,
        payload,
      });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};
