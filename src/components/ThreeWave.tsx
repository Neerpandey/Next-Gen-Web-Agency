import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Wave() {
  const meshRef = useRef<THREE.Points>(null);
  
  const [positions, step] = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * count * 3);
    const step = 0.2;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        positions[(i * count + j) * 3] = (i - count / 2) * step;
        positions[(i * count + j) * 3 + 1] = 0;
        positions[(i * count + j) * 3 + 2] = (j - count / 2) * step;
      }
    }
    return [positions, step];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        const idx = (i * 100 + j) * 3;
        const x = pos[idx];
        const z = pos[idx + 2];
        pos[idx + 1] = Math.sin(x * 0.5 + time) * Math.cos(z * 0.5 + time) * 0.5;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Mouse interaction
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, state.mouse.x * 0.2, 0.05);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -state.mouse.y * 0.1, 0.05);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#a855f7"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function ThreeWave() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <Wave />
      </Canvas>
    </div>
  );
}
