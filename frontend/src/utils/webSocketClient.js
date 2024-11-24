import Pusher from "pusher-js";
import axios from "../services/api";

// Initialize Pusher
const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  encrypted: true,
});

// Subscribe to a channel (e.g., a room)
const room = "game-room";
const channel = pusher.subscribe(room);

// Listen for events broadcasted via Pusher
channel.bind("gameUpdate", (data) => {
  console.log("Game update received:", data);
});

channel.bind("userJoined", (data) => {
  console.log("User joined:", data.message);
});

// Example function to emit a custom game event via the backend
export const emitGameEvent = async (room, eventData) => {
  try {
    const response = await axios.post(`/emit-event`, {
      room,
      eventData,
    });
    console.log("Event sent successfully:", response.data);
  } catch (error) {
    console.error("Failed to send event:", error);
  }
};
