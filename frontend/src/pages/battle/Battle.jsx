import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useProgress } from "@react-three/drei";
import HunterOne from "../../components/hunters/hunterone/HunterOne";
import Zombie from "../../components/zombie/Zombie";
import useGameState from "../store/gameState";
import {isWebGLAvailable} from "../../utils/webglCheck";
import Pusher from "pusher-js";
import "./Battle.css";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="loader">Loading... {Math.round(progress)}%</div>
    </Html>
  );
};

const Battle = ({ roomId }) => {
  const [webglSupported, setWebglSupported] = useState(true);
  const { zombies, addZombie, addPlayer } = useGameState();

  useEffect(() => {
    // Initialize Pusher for the specific game room
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    });
    const channel = pusher.subscribe(`game-room-${roomId}`);

    // Listen for new players joining
    channel.bind("player-joined", (data) => {
      console.log(`${data.playerName} joined the game`);
      addPlayer(data.player);
    });

    return () => {
      pusher.unsubscribe(`game-room-${roomId}`);
      pusher.disconnect();
    };
  }, [roomId, addPlayer]);

  // Spawn zombies every 1-2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const position = [Math.random() * 10 - 5, 0, Math.random() * 10 + 5];
      addZombie({ position });
    }, Math.random() * 60000 + 60000);
    return () => clearInterval(interval);
  }, [addZombie]);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className="fallback-container">
        <h1>Your device does not support WebGL.</h1>
        <p>Try using a more modern device or browser.</p>
      </div>
    );
  }

  return (
    <div className="battle-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <HunterOne id={1} position={[0, 0, 0]} />

          {zombies.map((zombie, index) => (
            <Zombie key={index} position={zombie.position} />
          ))}

          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Battle;
