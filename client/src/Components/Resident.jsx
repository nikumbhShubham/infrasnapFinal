import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Resident=(props)=> {
  // Load the model with useGLTF (path should be relative to public folder or a valid URL)
  const { scene, animations } = useGLTF('/models/residential.glb');
  const modelRef = useRef();
  const mixerRef = useRef();



  return <primitive ref={modelRef} object={scene} {...props}  castShadow receiveShadow />;
}

export default Resident;
