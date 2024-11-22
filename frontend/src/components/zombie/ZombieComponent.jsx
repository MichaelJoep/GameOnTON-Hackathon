import React from 'react';
import useGameState from '../../pages/store/gameState';

const ZombieComponent = () => {
    const { zombies, killZombie } = useGameState();

  const handleKillZombie = (zombieId) => {
    killZombie(zombieId);
  };

  return (
    <div>
    <h2>Zombies</h2>
    {zombies.map((zombie) => (
      <div key={zombie.id} style={{ marginBottom: "10px" }}>
        <p>
          Zombie ID: {zombie.id}, Position: ({zombie.position.join(", ")})
        </p>
        <button onClick={() => handleKillZombie(zombie.id)}>Kill Zombie</button>
      </div>
    ))}
  </div>
  )
}

export default ZombieComponent