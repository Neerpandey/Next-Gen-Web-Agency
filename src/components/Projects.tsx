import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "Grocery App",
    description: "A high-performance, modern grocery shopping experience with seamless cart management and real-time inventory.",
    tags: ["React", "Tailwind", "Vite"],
    link: "https://v0-v0-grocery-app-development-silk.vercel.app/",
    image: "https://picsum.photos/seed/grocery/800/600"
  },
  {
    title: "Neer Alingx",
    description: "Next-generation social connectivity platform designed for high-speed interactions and fluid user experiences.",
    tags: ["Next.js", "Social", "Real-time"],
    link: "https://neer-alingx.vercel.app/",
    image: "https://picsum.photos/seed/alingx/800/600"
  },
  {
    title: "AI Studio",
    description: "Advanced AI-powered creative workspace for generating high-fidelity assets and intelligent code snippets.",
    tags: ["AI", "Generative", "Workspace"],
    link: "https://neer-ai-studio.vercel.app/",
    image: "https://picsum.photos/seed/aistudio/800/600"
  },
  {
    title: "Lumina Studio",
    description: "Premium digital production studio focused on high-end visual storytelling and immersive brand experiences.",
    tags: ["Production", "Creative", "Studio"],
    link: "https://lumina-studio-iota.vercel.app/",
    image: "https://picsum.photos/seed/lumina/800/600"
  },
  {
    title: "Lumina Pad",
    description: "Interactive digital notepad with cloud synchronization and advanced markdown support for creative professionals.",
    tags: ["Productivity", "Notes", "Cloud"],
    link: "https://lumina-pad.vercel.app/",
    image: "https://picsum.photos/seed/pad/800/600"
  },
  {
    title: "Tournament App",
    description: "Dynamic e-sports tournament management system with live brackets, player stats, and animated transitions.",
    tags: ["Gaming", "E-sports", "Animations"],
    link: "https://v0-tournament-app-animations.vercel.app/",
    image: "https://picsum.photos/seed/tournament/800/600"
  },
  {
    title: "AI Assistance",
    description: "Intelligent virtual assistant integrated with large language models to streamline complex workflows.",
    tags: ["AI", "Assistant", "LLM"],
    link: "https://neer-ai-assistance.vercel.app/",
    image: "https://picsum.photos/seed/aiassist/800/600"
  }
];

export default function Projects() {
  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-8xl font-bold font-display tracking-tighter text-white">
              Featured <br />
              <span className="text-neon-purple">Projects</span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white/40 max-w-sm text-lg leading-relaxed"
          >
            A curated selection of premium digital experiences, pushing the boundaries of what's possible on the web.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-sm overflow-hidden hover:border-neon-purple/50 transition-all duration-700"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-[-100%] bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),transparent_50%)]" />
              </div>

              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                
                {/* Glassmorphism Border Overlay on Image */}
                <div className="absolute inset-4 border border-white/10 rounded-2xl pointer-events-none group-hover:border-white/20 transition-colors duration-500" />
              </div>

              <div className="p-8 relative">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-neon-purple transition-colors duration-500">
                    {project.title}
                  </h3>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                
                <p className="text-white/40 mb-8 leading-relaxed text-sm group-hover:text-white/60 transition-colors duration-500">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-white/30 text-[10px] font-bold uppercase tracking-widest group-hover:border-neon-purple/20 group-hover:text-neon-purple/60 transition-all duration-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
