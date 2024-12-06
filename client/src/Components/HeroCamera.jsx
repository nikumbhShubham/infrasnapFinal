import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

const HeroCamera = ({ isMobile, children }) => {
  const group = useRef();
  let oscillationTime = 0; // Used for animations

  useFrame((state, delta) => {
    if (!state.camera || !group.current) return;

    // Floating effect for smooth Y-axis motion
    oscillationTime += delta;
    const floatY = Math.sin(oscillationTime * 0.5) * 0.5; // Oscillates between -0.5 and 0.5

    // Parallax effect with mouse movements
    const pointerX = state.pointer.x * 2;
    const pointerY = state.pointer.y * 2;

    // Camera orbital motion (rotates around a circular path)
    const orbitalRadius = 7;
    const orbitalSpeed = 0.2; // Adjust speed of rotation
    const cameraX = Math.sin(oscillationTime * orbitalSpeed) * orbitalRadius;
    const cameraZ = Math.cos(oscillationTime * orbitalSpeed) * orbitalRadius;

    // Smoothly move camera position
    easing.damp3(
      state.camera.position,
      [cameraX + pointerX, floatY, cameraZ + pointerY], // Combine orbital motion and parallax
      0.3,
      delta
    );

    // Smooth rotation for the group
    const targetRotation = [
      floatY / 10, // Add floating effect to tilt
      -pointerX / 8, // Horizontal parallax rotation
      Math.sin(oscillationTime * 0.1) * 0.1, // Subtle swaying
    ];
    easing.dampE(group.current.rotation, targetRotation, 0.3, delta);

    // Ensure the camera is looking at the scene center
    state.camera.lookAt(0, 0, 0);
  });

  return <group ref={group}>{children}</group>;
};

export default HeroCamera;
