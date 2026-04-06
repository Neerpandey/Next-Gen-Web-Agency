import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from '@studio-freight/lenis';
import { Code2 } from 'lucide-react';

import ScrollyCharacter from './components/ScrollyCharacter';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ProjectPanel from './components/ProjectPanel';
import ContactForm from './components/ContactForm';
import MagneticButton from './components/MagneticButton';
import WhatsAppButton from './components/WhatsAppButton';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black selection:bg-white selection:text-black">
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      <div className="noise" />
      <WhatsAppButton />
      
      {/* Dynamic Background Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.05), transparent 80%)`
        }}
      />

      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-8">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.5)] border border-white/20">
                    <img src="/image_7.png" alt="NextGen Logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-2xl font-bold font-display tracking-tighter">NextGen</span>
                </motion.div>
                
                <div className="hidden md:flex items-center gap-12 text-xs font-bold uppercase tracking-widest text-white/50">
                  <a href="#services" className="hover:text-white transition-colors">Services</a>
                  <a href="#work" className="hover:text-white transition-colors">Work</a>
                  <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                </div>

                <MagneticButton>
                  <button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-3 bg-white text-black rounded-full font-bold text-sm hover:scale-105 transition-transform"
                  >
                    Start Project
                  </button>
                </MagneticButton>
              </div>
            </nav>

            {/* Scrollytelling Character Hero */}
            <ScrollyCharacter />

            {/* Experience Section */}
            <div id="services">
              <Experience />
            </div>

            {/* Work Section with Right Panel */}
            <section id="work" className="py-32 px-6 bg-black relative overflow-hidden">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div className="flex flex-col justify-center">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-6xl md:text-8xl font-bold font-display tracking-tighter text-white mb-8 leading-none"
                  >
                    CRAFTING <br />
                    <span className="text-cyan-400">DIGITAL</span> <br />
                    EXCELLENCE
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-white/40 text-xl max-w-md leading-relaxed mb-12"
                  >
                    We push the boundaries of the web with premium animations, 3D experiences, and cutting-edge AI integrations.
                  </motion.p>
                  
                  <div className="hidden lg:block opacity-20 pointer-events-none grayscale scale-75 origin-left">
                    <Projects />
                  </div>
                </div>
                
                <div className="relative">
                  <ProjectPanel />
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <div id="contact">
              <ContactForm />
            </div>

            {/* Footer */}
            <footer className="py-24 px-6 border-t border-white/5">
              <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-8">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.5)] border border-white/20">
                        <img src="/image_7.png" alt="NextGen Logo" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-3xl font-bold font-display tracking-tighter">NextGen</span>
                    </div>
                  <p className="text-white/30 max-w-sm text-lg leading-relaxed">
                    Pushing the boundaries of digital excellence. One pixel at a time.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-white/20">Socials</h4>
                  <ul className="space-y-4 text-white/40">
                    <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Dribbble</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-white/20">Location</h4>
                  <p className="text-white/40">Silicon Valley, CA<br />Remote Worldwide</p>
                </div>
              </div>
              <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
                <p className="text-white/20 text-xs uppercase tracking-widest">© 2026 NextGen. All rights reserved.</p>
                <div className="flex gap-8 text-white/20 text-xs uppercase tracking-widest">
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms of Service</a>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
