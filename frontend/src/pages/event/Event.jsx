import React from 'react';
import {Canvas} from "@react-three/fiber"
import "./Event.css";



const Event = () => {
  console.log(WebGLRenderingContext !== undefined);

  return (
    <>
   <Canvas style={{ width: "100vw", height: "100vh" }}>
    <ambientLight />
    <mesh>
      <boxGeometry />
      <meshStandardMaterial color="skyblue" />
    </mesh>
  </Canvas>
    </>
  )
}

export default Event