import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";
import Pusher from "pusher-js";
import "./Multiplayer.css";

const Multiplayer = () => {
  const [rooms, setRooms] = useState([]);
  const [pusher, setPusher] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Pusher
    const pusherInstance = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    });
    setPusher(pusherInstance);

    // Subscribe to room updates
    const channel = pusherInstance.subscribe("multiplayer-channel");
    channel.bind("room-updated", (data) => {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === data.room.id ? { ...room, players: data.room.players } : room
        )
      );
    });

    return () => {
      pusherInstance.unsubscribe("multiplayer-channel");
      pusherInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("/api/multiplayer/rooms");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  const joinRoom = async (roomId) => {
    try {
      await axios.post(`/api/multiplayer/rooms/${roomId}/join`);
      navigate(`/battle/${roomId}`);
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  return (
    <div className="multiplayer-container">
      <h2>Available Rooms</h2>
      <div className="rooms-list">
        {rooms.map((room) => (
          <div key={room.id} className="room-card" onClick={() => joinRoom(room.id)}>
            <h3>Room: {room.name}</h3>
            <p>Players: {room.players}/4</p>
            <button>Join</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Multiplayer;
