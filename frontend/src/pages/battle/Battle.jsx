import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls,  Html, useProgress } from "@react-three/drei";
import HunterOne from "../../components/hunters/hunterone/HunterOne";
import Zombie from "../../components/zombie/Zombie";
import useGameState from "../store/gameState";
import * as THREE from "three";

import "./Battle.css";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="loader">Loading... {Math.round(progress)}%</div>
    </Html>
  );
};



const Battle = () => {
  const { zombies, addZombie } = useGameState();

  // Spawn zombies every 1-2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const position = [Math.random() * 10 - 5, 0, Math.random() * 10 + 5];
      addZombie({ position });
    }, Math.random() * 60000 + 60000);
    return () => clearInterval(interval);
  }, [addZombie]);

  
  return (
    <div className="battle-container">
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Suspense fallback={<Loader />}>
        {/* Ambient Light */}
        <ambientLight intensity={0.5} />
        {/* Directional Light */}
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <HunterOne id={1} position={[0, 0, 0]} />


          {/* Render Zombies */}
          {zombies.map((zombie, index) => (
            <Zombie key={index} position={zombie.position} />
          ))}

        {/* Orbit Controls */}
        <OrbitControls />
      </Suspense>
    </Canvas>
  </div>
  
  )
}

export default Battle