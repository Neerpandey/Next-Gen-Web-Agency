import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "AI SaaS Platform",
    description: "A comprehensive AI-driven platform for automated content generation and management.",
    tags: ["Next.js", "OpenAI", "Tailwind"],
    image: "https://picsum.photos/seed/ai-saas/800/600"
  },
  {
    title: "Premium E-commerce",
    description: "High-end e-commerce experience with smooth transitions and 3D product previews.",
    tags: ["React Three Fiber", "Framer Motion", "Stripe"],
    image: "https://picsum.photos/seed/ecommerce/800/600"
  },
  {
    title: "Creative Portfolio",
    description: "Award-winning portfolio design with complex animations and interactive elements.",
    tags: ["Three.js", "GSAP", "Lenis"],
    image: "https://picsum.photos/seed/portfolio/800/600"
  }
];

function ProjectCard({ project, index }: { project: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-[12px] overflow-hidden hover:border-neon-purple/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] transition-all duration-500"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="aspect-video overflow-hidden"
      >
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
      </div>
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-purple transition-colors">{project.title}</h3>
        <p className="text-white/50 mb-6 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag: string, i: number) => (
            <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-white/40 text-xs font-mono">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <Github className="w-4 h-4" />
            <span>Code</span>
          </button>
          <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ExternalLink className="w-4 h-4" />
            <span>Live</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold font-display tracking-tighter mb-20 text-white"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
