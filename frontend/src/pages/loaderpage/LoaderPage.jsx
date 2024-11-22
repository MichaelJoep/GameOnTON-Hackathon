import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, useProgress } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import "./LoaderPage.css";

// Sound for lightning
import lightningSound from '../../assets/sounds/lightningthunder.wav';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}% loaded</Html>;
}

// Lightning zigzag path creation
const createZigzagPath = () => {
  const points = [];
  let x = 0;
  let y = 10;
  for (let i = 0; i < 20; i++) { // More segments for a longer lightning bolt
    x += Math.random() * 2 - 1; // Random zigzag left or right
    y -= 1 + Math.random() * 0.5; // Move downward with slight randomness
    points.push(new THREE.Vector3(x, y, 0));
  }
  return points;
};

// Lightning component with glow and zigzag effect
const LightningBolt = ({ position }) => {
  const [visible, setVisible] = useState(false);
  const [intensity, setIntensity] = useState(0);
  const lightningRef = useRef();
  const soundRef = useRef(new Audio(lightningSound));

  useEffect(() => {
    if (visible) {
      // Reset the sound to the start and play it
      soundRef.current.currentTime = 0;
      soundRef.current.play().catch((e) => {
        console.warn("Audio play blocked by browser:", e);
      });
    }
  }, [visible]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Trigger the lightning every 2 to 4 seconds randomly
    if (Math.random() > 0.9 && time % 2 < 0.1) {
      setVisible(true);
      setIntensity(20); // Higher intensity for more brightness
      setTimeout(() => {
        setVisible(false);
        setIntensity(0);
      }, 7000); // Lightning visible for 7 seconds, more intense

      // Play the sound on each flash
      // if (soundRef.current) {
      //   soundRef.current.currentTime = 0;
      //   soundRef.current.play();
      // }
    }

    // Update lightning geometry
    if (lightningRef.current) {
      const points = createZigzagPath();
      lightningRef.current.geometry.setFromPoints(points);
    }
  });

  return (
    <>
      {/* Lightning glowing effect */}
      <spotLight
        intensity={intensity}
        position={position}
        angle={0.3}
        penumbra={0.5}
        color="#ffffff"
        castShadow
      />
      {/* Lightning bolt shape */}
      {visible && (
        <line ref={lightningRef}>
          <bufferGeometry />
          <lineBasicMaterial color="white" linewidth={6} />
        </line>
      )}
    </>
  );
};

const LoaderPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Delay for navigating to the landing page
    const timeout = setTimeout(() => {
      console.log("Redirecting to /landing-page");
      setLoading(false);
      navigate('/landing-page');
      
    }, 35000); // 35 seconds delay

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="loader-container">
      {/* Canvas for 3D content */}
      <Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.3} />
          <LightningBolt position={[0, 5, 2]} /> {/* Lightning bolt near the top */}
          <LightningBolt position={[-1, 5, -3]} /> {/* Second lightning bolt */}
        </Suspense>
      </Canvas>

      {/* Loader animation for rolling light */}
      <div className="loader-animation">
        <div className="rolling-light"></div>
      </div>

      {/* Game Title with animation */}
      <div className="game-title">
        GHOST HUNTERS
      </div>
    </div>
  );
};



export default LoaderPage