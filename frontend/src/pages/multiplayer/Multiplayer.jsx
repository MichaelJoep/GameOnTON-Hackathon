import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/api';
import "./Multiplayer.css";



const Multiplayer = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/multiplayer/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  const joinRoom = (roomId) => {
    navigate(`/battle/${roomId}`);
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
  )
}

export default Multiplayer