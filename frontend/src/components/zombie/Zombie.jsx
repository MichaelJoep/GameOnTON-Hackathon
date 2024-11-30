import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useGameState from "../../pages/store/gameState";

const Zombie = ({ id, position }) => {
  const zombieRef = useRef();
  const [currentAction, setCurrentAction] = useState("run");
  const { hunters, killZombie } = useGameState();

  // Load model and animations
  let scene, animations, actions;
  try {
    ({ scene, animations } = useGLTF("/models/characters/zombie/zombie.gltf"));
    ({ actions } = useAnimations(animations, scene));
  } catch (error) {
    console.error("Error loading zombie model:", error);
    return null; // Render nothing if model fails to load
  }

  useEffect(() => {
    // Play the current animation
    if (actions && actions[currentAction]) {
      actions[currentAction].reset().fadeIn(0.2).play();
    }

    return () => {
      if (actions && actions[currentAction]) {
        actions[currentAction].fadeOut(0.2).stop();
      }
    };
  }, [currentAction, actions]);

  useFrame(() => {
    const nearestHunter = hunters.reduce(
      (closest, hunter) => {
        const distance = Math.hypot(
          position[0] - hunter.position[0],
          position[2] - hunter.position[2]
        );
        return distance < closest.distance
          ? { hunter, distance }
          : closest;
      },
      { hunter: null, distance: Infinity }
    );

    if (nearestHunter.distance < 1) {
      setCurrentAction("attack");
      killZombie(id); // Remove zombie when killed
    } else {
      setCurrentAction("death");
    }
  });

  return (
    <group ref={zombieRef} position={position}>
      <primitive object={scene} />
    </group>
  );
};


export default Zombie