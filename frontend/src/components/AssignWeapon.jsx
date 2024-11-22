import React from 'react';
import useGameState from '../pages/store/gameState';



const AssignWeapon = () => {
  const { selectedWeapon, assignWeaponToHunter, hunters } = useGameState();

  const handleAssignWeapon = (hunterId) => {
    if (selectedWeapon) {
      assignWeaponToHunter(hunterId, selectedWeapon);
      console.log(`Assigned ${selectedWeapon.name} to Hunter ${hunterId}`);
    } else {
      console.log("No weapon selected!");
    }
  };

  return (
    <div>
      <h2>Assign Weapon</h2>
      {hunters.map((hunter) => (
        <div key={hunter.id}>
          <button onClick={() => handleAssignWeapon(hunter.id)}>
            Assign Weapon to Hunter {hunter.id}
          </button>
          <p>Current Weapon: {hunter.weapon?.name || "None"}</p>
        </div>
      ))}
    </div>
  );
};

export default AssignWeapon