import React, {Suspense, lazy} from 'react';
import {Canvas} from "@react-three/fiber";
import {OrbitControls, useGLTF, Html, useProgress} from "@react-three/drei";
import "./WeaponCard.css";


const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="loader">Loading... {Math.round(progress)}%</div>
    </Html>
  );
};

// Component to Load and Render .glb Model
const WeaponModel = ({ modelPath, scale = 45 }) => {
  const { scene } = useGLTF(modelPath, true);

  console.log(`Loaded model from ${modelPath}`);
  return <primitive object={scene} scale={Array.isArray(scale) ? scale : [scale, scale, scale]} />;
};


const WeaponCard = ({ weapon, isSelected, onSelect }) => {
  return (
    <div
      className={`weapon-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(weapon)}
    >
      {/* Render 3D Weapon Model */}
      <Canvas className="weapon-canvas">
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <Suspense fallback={ <Loader />}>
           <WeaponModel modelPath={weapon.modelPath} scale={weapon.scale}/>
        </Suspense>
      </Canvas>
      <div className="weapon-info">
        <h3 className="weapon-name">{weapon.name}</h3>
        <p className="weapon-price">C{weapon.price}</p>
      </div>
      {/* <div className="price-tag">C {weapon.price}</div> */}
      {isSelected && <p className="selected-label">Selected</p>}
    </div>
  )
}

export default WeaponCard