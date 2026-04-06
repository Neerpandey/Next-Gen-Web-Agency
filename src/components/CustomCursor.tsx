import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsHoveringText(!!target.closest('h1, h2, p, span, a, button'));
      setIsHoveringImage(!!target.closest('img, .parallax-image'));
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center overflow-hidden"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: isHoveringImage ? 3 : isHoveringText ? 2 : 1,
      }}
    >
      {isHoveringImage && (
        <span className="text-[4px] font-bold text-black uppercase tracking-tighter">View</span>
      )}
    </motion.div>
  );
}
