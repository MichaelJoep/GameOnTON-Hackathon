import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";
import Pusher from "pusher-js";
import "./Multiplayer.css";

const Multiplayer = () => {
  const [rooms, setRooms] = useState([]);
   const [joinedRoom, setJoinedRoom] = useState(null); // To store the joinRoom response
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
        if (Array.isArray(response.data)) {
          setRooms(response.data);
        } else {
          console.error("Unexpected rooms data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  const joinRoom = async (roomId) => {
    try {
      const response = await axios.post(`/api/multiplayer/rooms/${roomId}/join`, {
        playerName
      });
      setJoinedRoom(response.data); // Store the response in state
      navigate(`/battle/${roomId}`);
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  return (
    <div className="multiplayer-container">
      <h2>Available Rooms</h2>
      {rooms.length === 0 ? (
        <p>No rooms available. Please create one.</p>
      ) : (
        <div className="rooms-list">
          {rooms.map((room) => (
            <div key={room._id} className="room-card" onClick={() => joinRoom(room._id)}>
              <h3>Room: {room.name}</h3>
              <p>Players: {room.players.length}/4</p>
              <button>Join</button>
            </div>
          ))}
        </div>
      )}

      {joinedRoom && (
        <div className="joined-room-info">
          <h3>Joined Room Details</h3>
          <p>Room Name: {joinedRoom.roomName}</p>
          <p>Room ID: {joinedRoom.roomId}</p>
          <p>Players Count: {joinedRoom.playersCount}</p>
        </div>
      )}
    </div>
  );
};

export default Multiplayer;
