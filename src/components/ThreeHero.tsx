import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function AbstractSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const { x, y } = state.mouse;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.5, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.5, 0.1);
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.8}>
        <MeshDistortMaterial
          color="#a855f7"
          speed={3}
          distort={0.4}
          radius={1}
        />
      </Sphere>
    </Float>
  );
}

function ParticleWave() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions, count] = useMemo(() => {
    const count = 10000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return [positions, count];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#3b82f6"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function ThreeHero() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-black">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
        <AbstractSphere />
        <ParticleWave />
      </Canvas>
    </div>
  );
}
