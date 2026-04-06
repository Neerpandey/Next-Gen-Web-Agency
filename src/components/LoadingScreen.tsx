import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2 } from 'lucide-react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isExit, setIsExit] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsExit(true), 500);
          setTimeout(onComplete, 1500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExit && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3] 
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[120px]" 
            />
          </div>

          <div className="relative flex flex-col items-center">
            {/* Logo Section */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12 relative"
            >
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center relative z-10 shadow-[0_0_50px_rgba(255,255,255,0.3)] overflow-hidden">
                <img src="/image_7.png" alt="NextGen Logo" className="w-full h-full object-cover" />
              </div>
              {/* Glowing Ring */}
              <motion.div 
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 border-2 border-white rounded-3xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold font-display tracking-tighter text-white mb-8">
                NEXT<span className="text-neon-purple">GEN</span>
              </h2>

              {/* 3D-style Progress Bar */}
              <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden relative border border-white/10">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-purple to-neon-blue shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
                {/* Shimmer effect on bar */}
                <motion.div 
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2"
                />
              </div>
              
              <div className="mt-4 flex justify-between items-center px-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Initializing System</span>
                <span className="text-[10px] font-mono text-neon-purple">{Math.round(progress)}%</span>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-12 left-12">
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                  className="w-1 h-1 bg-white rounded-full"
                />
              ))}
            </div>
          </div>
          
          <div className="absolute top-12 right-12 text-[10px] font-mono text-white/10 tracking-widest">
            VER. 2026.04.06
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
