import React, { useRef, Suspense, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment, ContactShadows, Preload, useProgress, Html, useScroll, ScrollControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll as useFramerScroll, useTransform, useSpring } from 'framer-motion';

function RobotScene() {
  const { scene, animations } = useGLTF("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb");
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  const robotRef = useRef<THREE.Group>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const screenLight = useRef<THREE.PointLight>(null);
  const laptopGroup = useRef<THREE.Group>(null);
  const { viewport, camera } = useThree();

  // Animation clips
  const actions = useMemo(() => {
    if (!animations.length) return {};
    const mixerInstance = new THREE.AnimationMixer(scene);
    mixer.current = mixerInstance;
    const clips: Record<string, THREE.AnimationAction> = {};
    animations.forEach(clip => {
      clips[clip.name] = mixerInstance.clipAction(clip);
    });
    return clips;
  }, [scene, animations]);

  // Find face mesh for morph targets
  const faceMesh = useMemo(() => {
    let mesh: THREE.Mesh | null = null;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).morphTargetDictionary) {
        mesh = child as THREE.Mesh;
      }
    });
    return mesh;
  }, [scene]);

  useEffect(() => {
    if (actions.Standing) actions.Standing.play();
  }, [actions]);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
    
    const offset = scroll.offset; // 0 to 1
    
    // 1. Camera Path Logic
    // 0-20%: Zoom in on Face
    if (offset < 0.2) {
      const t = offset / 0.2;
      camera.position.z = THREE.MathUtils.lerp(2.5, 8, t);
      camera.position.y = THREE.MathUtils.lerp(0.6, 0, t);
      camera.lookAt(0, 0.6, 0);
    } else {
      camera.position.z = 8;
      camera.position.y = 0;
    }

    // 2. Facial Expressions (Morph Targets)
    if (faceMesh && faceMesh.morphTargetDictionary && faceMesh.morphTargetInfluences) {
      const dict = faceMesh.morphTargetDictionary;
      
      // Reset all
      faceMesh.morphTargetInfluences.fill(0);

      if (offset < 0.2) {
        // Surprised at start
        const t = 1 - (offset / 0.2);
        if (dict['Surprised'] !== undefined) faceMesh.morphTargetInfluences[dict['Surprised']] = t;
      } else if (offset > 0.5) {
        // Angry/Focused while typing
        const t = (offset - 0.5) / 0.5;
        if (dict['Angry'] !== undefined) faceMesh.morphTargetInfluences[dict['Angry']] = t;
      }
    }

    // 2. Animation Sequence
    // 0-20%: Standing
    // 20-50%: Transition to Sitting
    // 50-100%: Typing (simulated with high-speed Sitting/Idle or specific clip if found)
    if (actions.Standing && actions.Sitting) {
      if (offset < 0.2) {
        actions.Standing.weight = 1;
        actions.Sitting.weight = 0;
        actions.Standing.play();
      } else if (offset < 0.5) {
        const t = (offset - 0.2) / 0.3;
        actions.Standing.weight = 1 - t;
        actions.Sitting.weight = t;
        actions.Sitting.play();
      } else {
        actions.Standing.weight = 0;
        actions.Sitting.weight = 1;
        actions.Sitting.play();
        
        // Typing simulation: increase timeScale
        if (offset > 0.5) {
          mixer.current!.timeScale = 1 + (offset - 0.5) * 4;
        }
      }
    }

    // 3. Laptop & Glow Logic
    if (laptopGroup.current) {
      laptopGroup.current.visible = true;
      // Open laptop between 50-70%
      const laptopT = THREE.MathUtils.clamp((offset - 0.5) / 0.2, 0, 1);
      laptopGroup.current.rotation.x = THREE.MathUtils.lerp(0, -1.5, laptopT);
      
      if (screenLight.current) {
        screenLight.current.intensity = laptopT * 20;
      }
    }

    // 4. Robot "Look at User"
    if (robotRef.current) {
      const targetRotation = (state.mouse.x * 0.3);
      robotRef.current.rotation.y = THREE.MathUtils.lerp(robotRef.current.rotation.y, Math.PI + targetRotation, 0.1);
    }

    // 5. Canvas Shift (Split Screen)
    // At 40% scroll, shift to left 50%
    const isMobile = viewport.width < 5;
    if (!isMobile) {
      const shiftT = THREE.MathUtils.smoothstep(offset, 0.3, 0.5);
      group.current!.position.x = THREE.MathUtils.lerp(0, -viewport.width / 4, shiftT);
    } else {
      group.current!.position.x = 0;
      group.current!.position.y = 1; // Move up on mobile
    }
  });

  return (
    <group ref={group}>
      <group ref={robotRef}>
        <primitive object={scene} scale={1.8} position={[0, -2.5, 0]} />
      </group>

      {/* High-tech Bench */}
      <mesh position={[0, -2.5, -0.5]}>
        <boxGeometry args={[3, 0.2, 1.5]} />
        <meshStandardMaterial color="#050505" metalness={1} roughness={0.1} />
      </mesh>
      <mesh position={[0, -3.5, -0.5]}>
        <boxGeometry args={[2.8, 2, 1.3]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Bench Neon */}
      <mesh position={[0, -2.4, 0.26]}>
        <boxGeometry args={[3.1, 0.02, 0.02]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>

      {/* Laptop */}
      <group ref={laptopGroup} position={[0, -1.2, 0.8]}>
        {/* Base */}
        <mesh>
          <boxGeometry args={[1.2, 0.05, 0.8]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Screen Group */}
        <group position={[0, 0.025, -0.4]}>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[1.2, 0.8, 0.05]} />
            <meshStandardMaterial color="#050505" />
          </mesh>
          {/* Screen Display */}
          <mesh position={[0, 0.4, 0.03]}>
            <planeGeometry args={[1.1, 0.7]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
          </mesh>
          <pointLight ref={screenLight} position={[0, 0.4, 0.2]} color="#3b82f6" intensity={0} distance={4} />
        </group>
      </group>
    </group>
  );
}

export default function ScrollyCharacter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useFramerScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Canvas 
          shadows 
          dpr={[1, 2]} 
          gl={{ 
            antialias: true, 
            powerPreference: "high-performance",
            alpha: true
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0.5, 3]} fov={35} />
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
          
          <Suspense fallback={null}>
            <ScrollControls pages={5} damping={0.1}>
              <RobotScene />
            </ScrollControls>
            <Environment preset="city" />
            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
            <Preload all />
          </Suspense>
        </Canvas>

        {/* Hero Text Overlay (Only for initial state) */}
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center text-center px-6">
          <motion.div style={{ opacity: opacity1 }} className="absolute">
            <h1 className="text-7xl md:text-9xl font-bold font-display tracking-tighter mb-6 text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20">
              Neural Core
            </h1>
            <p className="text-white/40 text-xl md:text-2xl max-w-xl mx-auto font-light tracking-widest uppercase">
              The Future of Digital Agency
            </p>
          </motion.div>

          <motion.div style={{ opacity: opacity2 }} className="absolute">
            <h2 className="text-5xl md:text-7xl font-bold font-display tracking-tighter mb-6 text-white">
              Initializing...
            </h2>
            <p className="text-white/40 text-lg md:text-xl max-w-md mx-auto font-light">
              Preparing the workspace for your next big idea.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
