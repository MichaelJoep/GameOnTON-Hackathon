const express = require('express');
const http = require('http'); // Required for socket.io
const { Server } = require('socket.io'); // Import socket.io
const registerWebSocketEvents = require('./utils/websocketEvents');
const websocketRoutes = require("./routes/websocketRoutes")
const dotenv = require("dotenv");
dotenv.config()
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const tonRoutes = require("./routes/tonRoutes");
const aeonRoutes = require("./routes/paymentRoutes");
const connectDB = require("./dbConnect/db");


const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3005";

const app = express();

const PORT = process.env.PORT || 3000;


// Log to confirm that the variables are loaded
console.log("Loaded PORT:", process.env.PORT);
console.log("Loaded MONGO_URI_ONLINE:", process.env.MONGO_URI_ONLINE);
console.log("Frontend URL:", FRONTEND_URL);
console.log("Backend URL:", BACKEND_URL);




//connect to database
connectDB();

//middleware functions
app.use(express.json());
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:3005"], 
    methods: ["GET", "POST"],
    credentials: true,
  })
);



//route database
app.use('/api/auth', authRoutes);
app.use('/api/ton', tonRoutes);
app.use('/api/aeon', aeonRoutes);

//websocket middleware
app.use("/api/websocket", websocketRoutes);

// Root route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Ghost Hunter API!");
});



// WebSocket setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [FRONTEND_URL, "http://localhost:3005"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
registerWebSocketEvents(io);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on ${BACKEND_URL}`);
});
