import React, { useState } from 'react';
import WeaponCard from '../../components/weaponCard/WeaponCard';
import AssignWeapon from '../../components/AssignWeapon'; 
import BlueArchiveWeapon from "../../assets/models/weapons/blue_archive_weapon.glb";
import AssaultRiffle from "../../assets/models/weapons/Assault Rifle.glb";
import Pistol from "../../assets/models/weapons/Pistol.glb";
import RifleAssaultEast from "../../assets/models/weapons/Rifle Assault East.glb";
import SniperRifleWest from "../../assets/models/weapons/Sniper Rifle West.glb";
import ScarHeavyMK from "../../assets/models/weapons/scar_heavy_mk17.glb";
import { FaAlignJustify } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";
import "./Store.css";



// Mock Data for Weapons
const weapons = [
  { id: 1, name: 'GKS - Blue Archive Weapon', price: 3000, modelPath: BlueArchiveWeapon, scale: [12, 12, 12] },
  { id: 2, name: 'Revolver - Navy Colt 1851 Silver', price: 1500, modelPath: AssaultRiffle, scale: [1.9, 1.9, 1.9] },
  { id: 3, name: 'Assassin Sword', price: 30000, modelPath: Pistol, scale: [3.1, 3.1, 3.1] },
  { id: 4, name: 'Chevalier Sword', price: 20000, modelPath: RifleAssaultEast, scale: [8.7, 8.7, 8.7] },
  { id: 5, name: 'Cross Bow', price: 1500, modelPath: SniperRifleWest, scale: [5.3, 5.3, 5.3] },
  { id: 6, name: 'Scar Heavy MK-17', price: 30000, modelPath: ScarHeavyMK, scale: [4, 4, 4] },
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
      {/* Sidebar Navigation */}

      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className='close-btn' onClick={toggleSidebar}>
          <FaX />
        </button>
      <h2>Store</h2>
        <ul className="sidebar-menu">
          <li>FEATURED</li>
          <li>FOR YOU</li>
          <li>LUCKY BOX</li>
          <li>CRATES</li>
          <li>BUNDLES</li>
          <li>SUPPLY PASS</li>
          <li>CREDIT SHOP</li>
          <li>COD POINTS</li>
          <li>GIFT CENTER</li>
        </ul>
      </aside>

      <button className='open-sidebar-btn' onClick={toggleSidebar}>
        <FaAlignJustify />
      </button>

      {/* Main Content Area */}
      <div className="main-content">

        {/* Points Display */}
        <div className="points-display">
          <p><span className="points-icon">C</span> 27,525</p>
          <p><span className='gun-icon'>CP</span>7</p>
          <span className='plus-icon'>+</span>
        </div>
        {/* Tabs for Weapon Types */}
        <div className="weapon-tabs">
          <button>Assault Rifle</button>
          <button>Sniper Rifle</button>
          <button>SMG</button>
          <button>Shotgun</button>
          <button>LMG</button>
        </div>

        {/* Weapon Grid */}
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