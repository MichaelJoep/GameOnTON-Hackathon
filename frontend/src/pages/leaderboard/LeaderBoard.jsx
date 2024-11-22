import React, { useEffect, useState } from 'react';
import axios from '../../services/api';
import "./LeaderBoard.css";



const LeaderBoard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        const response = await axios.get('/api/leaderboard');
        setPlayers(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };
    fetchLeaderBoard();
  }, []);


  return (
    <div className="leaderboard-container">
      <h2>LeaderBoard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Nickname</th>
            <th>Ghosts Captured</th>
            <th>Tokens Earned</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id}>
              <td>{index + 1}</td>
              <td>{player.nickname}</td>
              <td>{player.ghostsCaptured}</td>
              <td>{player.tokensEarned}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaderBoard