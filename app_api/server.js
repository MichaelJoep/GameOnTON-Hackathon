const express = require('express');
const http = require('http'); // Required for socket.io
const { Server } = require('socket.io'); // Import socket.io
const registerWebSocketEvents = require('./utils/websocketEvents');
const dotenv = require("dotenv");
dotenv.config()
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const tonRoutes = require("./routes/tonRoutes");
const aeonRoutes = require("./routes/paymentRoutes");
const connectDB = require("./dbConnect/db");

// Log to confirm that the variables are loaded
console.log("Loaded PORT:", process.env.PORT);
console.log("Loaded MONGO_URI_LOCAL:", process.env.MONGO_URI_LOCAL);
console.log("Frontend URL:", process.env.FRONTEND_URL);

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";
console.log("Backend URL:", BACKEND_URL);


const app = express();

const PORT = process.env.PORT || 3000;


//connect to database
connectDB();

//middleware functions
app.use(express.json());

// Initialize the server with `http` for socket.io compatibility
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3005", // Allow frontend connection
    methods: ["GET", "POST"],
    credentials: true,
  },
});





//route database
app.use('/api/auth', authRoutes);
app.use('/api/ton', tonRoutes);
app.use('/api/aeon', aeonRoutes);


registerWebSocketEvents(io);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on ${BACKEND_URL}:${PORT}`);
});
