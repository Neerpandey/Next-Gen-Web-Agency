import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Grocery App",
    image: "/image_0.png",
    link: "https://v0-v0-grocery-app-development-silk.vercel.app/",
    color: "cyan"
  },
  {
    title: "Neer Alingx",
    image: "/image_1.png",
    link: "https://neer-alingx.vercel.app/",
    color: "magenta"
  },
  {
    title: "AI Studio",
    image: "/image_2.png",
    link: "https://neer-ai-studio.vercel.app/",
    color: "cyan"
  },
  {
    title: "Lumina Studio",
    image: "/image_3.png",
    link: "https://lumina-studio-iota.vercel.app/",
    color: "magenta"
  },
  {
    title: "Lumina Pad",
    image: "/image_4.png",
    link: "https://lumina-pad.vercel.app/",
    color: "cyan"
  },
  {
    title: "Tournament App Animations",
    image: "/image_5.png",
    link: "https://v0-tournament-app-animations.vercel.app/",
    color: "magenta"
  },
  {
    title: "AI Assistance",
    image: "/image_6.png",
    link: "https://neer-ai-assistance.vercel.app/",
    color: "cyan"
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const borderColor = project.color === 'cyan' ? 'border-cyan-500/40' : 'border-fuchsia-500/40';
  const glowColor = project.color === 'cyan' ? 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]' : 'group-hover:shadow-[0_0_30px_rgba(217,70,239,0.3)]';

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative w-full aspect-[16/10] rounded-2xl border ${borderColor} bg-white/[0.03] backdrop-blur-[15px] overflow-hidden transition-all duration-500 ${glowColor} cursor-pointer`}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="absolute inset-0 p-4 flex flex-col justify-end"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
            {project.title}
          </h3>
          <motion.div 
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] text-white font-bold uppercase tracking-widest group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300"
          >
            <span>View Demo</span>
            <ExternalLink className="w-3 h-3" />
          </motion.div>
        </div>
      </div>

      {/* Neon Border Glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-2 ${project.color === 'cyan' ? 'border-cyan-500/20' : 'border-fuchsia-500/20'} blur-sm`} />
    </motion.div>
  );
}

export default function ProjectPanel() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-sm ml-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold font-display tracking-tighter text-white">
          Premium <span className="text-cyan-400">Portfolio</span>
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent ml-4" />
      </div>
      
      <div className="space-y-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
