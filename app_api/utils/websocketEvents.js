const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.SECRET_KEY,
  secret: process.env.MERCHANT_PASSWORD,
  cluster: "us2", 
  useTLS: true,
});



module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);
  
      // Broadcast a message to all clients when a user joins
        socket.on("joinRoom", (room) => {
            socket.join(room);
            console.log(`Client ${socket.id} joined room: ${room}`);
            pusher.trigger(room, "userJoined", { message: `${socket.id} joined the room.` });
        });
  
      // Handle in-game events (e.g., player movements, attacks, kills)
    socket.on("gameEvent", (data) => {
        console.log("Game Event Received:", data);
        // Broadcast game updates to other players in the same room
        pusher.trigger(data.room, "gameUpdate", data);
    });
      // Disconnect handler
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  };