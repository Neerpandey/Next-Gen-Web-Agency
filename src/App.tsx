import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { Code2 } from 'lucide-react';

import ScrollyCharacter from './components/ScrollyCharacter';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import MagneticButton from './components/MagneticButton';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
      <div className="noise" />
      <WhatsAppButton />
      
      {/* Dynamic Background Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.05), transparent 80%)`
        }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-neon-purple/20 rounded-xl blur-lg group-hover:bg-neon-purple/40 transition-all duration-500" />
              <div className="relative w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-2xl">
                <Code2 className="w-7 h-7 text-black group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-display tracking-tighter leading-none">NextGen</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">Web Agency</span>
            </div>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-12 text-xs font-bold uppercase tracking-widest text-white/50">
            <a href="#services" className="hover:text-white transition-colors relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-purple group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#work" className="hover:text-white transition-colors relative group">
              Work
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-purple group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#contact" className="hover:text-white transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-purple group-hover:w-full transition-all duration-300" />
            </a>
          </div>

          <MagneticButton>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-white text-black rounded-full font-bold text-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
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

      {/* Projects Section */}
      <div id="work">
        <Projects />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <ContactForm />
      </div>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-display tracking-tighter leading-none">NextGen</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">Web Agency</span>
              </div>
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
    </div>
  );
}
