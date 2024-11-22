import React, { useEffect, useRef } from "react";
import useGameState from '../../pages/store/gameState';
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Zombie = ({ id, position }) => {
  const { scene, animations } = useGLTF("/characters/zombie/zombie.gltf");
  const { actions } = useAnimations(animations, scene);
  const zombieRef = useRef();
  const [currentAction, setCurrentAction] = useState("run");
  const { hunters, killZombie } = useGameState();

  useEffect(() => {
    // Play the current animation
    if (actions[currentAction]) {
      actions[currentAction].reset().fadeIn(0.2).play();
    }

    return () => {
      if (actions[currentAction]) {
        actions[currentAction].fadeOut(0.2).stop();
      }
    };
  }, [currentAction, actions]);

  useFrame(() => {
    const nearestHunter = hunters.reduce((closest, hunter) => {
      const distance = Math.hypot(
        position[0] - hunter.position[0],
        position[2] - hunter.position[2]
      );
      return distance < closest.distance
        ? { hunter, distance }
        : closest;
    }, { hunter: null, distance: Infinity });

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