import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useGameState from "../../../pages/store/gameState";


const HunterOne = ({ id, position }) => {
  const { scene, animations } = useGLTF("/characters/hunterOne/hunterOne.gltf");
  const { actions } = useAnimations(animations, scene);
  const hunterRef = useRef();
  const [currentAction, setCurrentAction] = useState("idle");
  const { hunters, selectedWeapon } = useGameState();


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
    const hunterData = hunters.find((hunter) => hunter.id === id);

    if (hunterData?.weapon === "gun" && hunterData.action === "shoot") {
      setCurrentAction("shoot");
    } else if (hunterData?.weapon === "knife" && hunterData.action === "stab") {
      setCurrentAction("stab");
    } else {
      setCurrentAction("idle");
    }
  });

  return (
    <group ref={hunterRef} position={position}>
      <primitive object={scene} />
    </group>
  );
};

export default HunterOne