import React, { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment, ContactShadows, Preload, useProgress, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll as useFramerScroll, useTransform, useSpring } from 'framer-motion';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
          <motion.div 
            className="h-full bg-neon-purple"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Loading Experience {Math.round(progress)}%</p>
      </div>
    </Html>
  );
}

function Model({ url, scrollYProgress }: { url: string, scrollYProgress: any }) {
  const { scene, animations } = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const { viewport } = useThree();

  useEffect(() => {
    if (animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]);
      action.play();
    }
  }, [scene, animations]);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
    
    if (group.current) {
      const progress = scrollYProgress.get();
      
      // Smooth rotation
      const targetRotation = progress * Math.PI * 4;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotation, 0.05);
      
      // Responsive positioning
      const isMobile = viewport.width < 5;
      const xOffset = isMobile ? 0 : (progress < 0.5 ? progress * 6 : (1 - progress) * 6) - 3;
      const yOffset = isMobile ? -1 : -2;
      
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, xOffset, 0.05);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, yOffset, 0.05);
      
      // Scale pulse & responsive scale
      const baseScale = isMobile ? 1.8 : 2.5;
      const pulse = Math.sin(progress * 10) * 0.1;
      group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, baseScale + pulse, 0.05));
    }
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

export default function ScrollyCharacter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useFramerScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll progress for 3D sync
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.75, 0.9, 1], [0, 1, 1]);

  const y1 = useTransform(scrollYProgress, [0, 0.25], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0.35, 0.65], [50, -50]);
  const y3 = useTransform(scrollYProgress, [0.75, 1], [50, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Canvas 
          shadows 
          dpr={[1, 1.5]} 
          gl={{ 
            antialias: true, 
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            alpha: true
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
          <ambientLight intensity={0.8} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
          
          <Suspense fallback={<Loader />}>
            <Model 
              url="https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb" 
              scrollYProgress={smoothProgress}
            />
            <Environment preset="city" />
            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={15} blur={2.5} far={4.5} />
            <Preload all />
          </Suspense>
        </Canvas>

        {/* Overlay Text - Spatial Layering */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="h-full w-full flex flex-col items-center justify-center text-center px-6">
            <motion.div 
              style={{ opacity: opacity1, y: y1 }} 
              className="absolute"
            >
              <h2 className="text-6xl md:text-9xl font-bold font-display tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20">
                Innovation
              </h2>
              <p className="text-white/40 text-lg md:text-2xl max-w-xl mx-auto font-light leading-relaxed">
                We push the boundaries of what's possible with AI and 3D technology.
              </p>
            </motion.div>

            <motion.div 
              style={{ opacity: opacity2, y: y2 }} 
              className="absolute"
            >
              <h2 className="text-6xl md:text-9xl font-bold font-display tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20">
                Precision
              </h2>
              <p className="text-white/40 text-lg md:text-2xl max-w-xl mx-auto font-light leading-relaxed">
                Every pixel, every line of code is crafted with meticulous attention to detail.
              </p>
            </motion.div>

            <motion.div 
              style={{ opacity: opacity3, y: y3 }} 
              className="absolute"
            >
              <h2 className="text-6xl md:text-9xl font-bold font-display tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20">
                Excellence
              </h2>
              <p className="text-white/40 text-lg md:text-2xl max-w-xl mx-auto font-light leading-relaxed">
                Join us in creating the next generation of digital experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
