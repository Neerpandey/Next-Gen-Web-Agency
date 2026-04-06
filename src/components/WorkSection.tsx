import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import MagneticButton from './MagneticButton';

const projects = [
  {
    name: "Grocery App",
    url: "https://v0-v0-grocery-app-development-silk.vercel.app/",
    image: "https://picsum.photos/seed/grocery/1200/800"
  },
  {
    name: "Neer Alingx",
    url: "https://neer-alingx.vercel.app/",
    image: "https://picsum.photos/seed/alingx/1200/800"
  },
  {
    name: "Lumina Studio",
    url: "https://lumina-studio-iota.vercel.app/",
    image: "https://picsum.photos/seed/studio/1200/800"
  },
  {
    name: "Neer AI Studio",
    url: "https://neer-ai-studio.vercel.app/",
    image: "https://picsum.photos/seed/aistudio/1200/800"
  },
  {
    name: "Neer AI Assistance",
    url: "https://neer-ai-assistance.vercel.app/",
    image: "https://picsum.photos/seed/assistance/1200/800"
  },
  {
    name: "Tournament App",
    url: "https://v0-tournament-app-animations.vercel.app/",
    image: "https://picsum.photos/seed/tournament/1200/800"
  },
  {
    name: "Lumina Pad",
    url: "https://lumina-pad.vercel.app/",
    image: "https://picsum.photos/seed/pad/1200/800"
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  return (
    <motion.div 
      className="relative h-[500px] w-[400px] md:w-[600px] flex-shrink-0 group overflow-hidden rounded-[2.5rem] glass"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <img
        src={project.image}
        alt={project.name}
        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      
      <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
        <div>
          <h3 className="text-3xl font-bold font-display tracking-tight mb-4">{project.name}</h3>
          <MagneticButton>
            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-white/90 transition-colors"
            >
              Live Demo <ExternalLink className="w-4 h-4" />
            </a>
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="px-6 mb-12 absolute top-24 left-0 z-10">
          <h2 className="text-6xl md:text-8xl font-bold font-display tracking-tighter">Selected Work</h2>
        </div>
        <motion.div style={{ x }} className="flex gap-8 px-24">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
