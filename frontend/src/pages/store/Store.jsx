import React, { useState } from 'react';
import WeaponCard from '../../components/weaponCard/WeaponCard';
import AssignWeapon from '../../components/AssignWeapon'; 
import { FaAlignJustify } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";
import "./Store.css";



// Mock Data for Weapons
const weapons = [
  { id: 1, name: 'Blue Archive Weapon', price: 3000, modelPath: "/models/weapons/blue_weapon.glb", scale: [8, 8, 8] },
  { id: 2, name: 'Assault Riffle', price: 1500, modelPath: "/models/weapons/AssaultRifle.glb", scale: [1.9, 1.9, 1.9] },
  { id: 3, name: 'Knife', price: 30000, modelPath: "/models/weapons/knife.glb", scale: [3.1, 3.1, 3.1] },
  { id: 4, name: 'Pistol', price: 20000, modelPath: "/models/weapons/Pistol.glb", scale: [8.7, 8.7, 8.7] }
];



const Store = ({ onWeaponSelect }) => {
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const handleSelect = (weapon) => {
    setSelectedWeapon(weapon);
    onWeaponSelect(weapon);
  };


   const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className='store-page'>
     
      {/* Main Content Area */}
      <div className="main-content">

        {/* Weapon Grid */}
        <div className="weapon-grid">
        {weapons.map((weapon) => (
            <WeaponCard
              key={weapon.id}
              weapon={weapon}
              isSelected={selectedWeapon?.id === weapon.id}
              onSelect={handleSelect}
            />
          ))}
        </div>

         {/* Add the AssignWeapon Component */}
         <AssignWeapon />
      </div>
    </div>
  )
}

export default Store