module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);
  
      // Broadcast a message to all clients when a user joins
        socket.on("joinRoom", (room) => {
            socket.join(room);
            console.log(`Client ${socket.id} joined room: ${room}`);
            socket.to(room).emit("userJoined", `${socket.id} joined the room.`);
        });
  
      // Handle in-game events (e.g., player movements, attacks, kills)
    socket.on("gameEvent", (data) => {
        console.log("Game Event Received:", data);
        // Broadcast game updates to other players in the same room
        socket.to(data.room).emit("gameUpdate", data);
    });
      // Disconnect handler
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  };