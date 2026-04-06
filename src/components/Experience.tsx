import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    company: "NextGen Web Agency",
    role: "Lead Creative Developer",
    period: "2023 - Present",
    description: "Leading the development of high-performance, 3D-integrated web applications for global clients. Specialized in React Three Fiber and Framer Motion."
  },
  {
    company: "TechVision Labs",
    role: "Senior Frontend Engineer",
    period: "2021 - 2023",
    description: "Developed complex SaaS dashboards and AI-driven user interfaces. Optimized performance for large-scale data visualizations."
  },
  {
    company: "Creative Pulse",
    role: "UI/UX Designer & Developer",
    period: "2019 - 2021",
    description: "Bridged the gap between design and code, creating award-winning interactive experiences and brand identities."
  }
];

export default function Experience() {
  return (
    <section id="services" className="relative">
      <div className="relative z-10">
        <div className="mb-16">
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-neon-purple font-mono text-xs uppercase tracking-[0.3em] mb-4"
          >
            Agency
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold font-display tracking-tighter text-white mb-6"
          >
            Our Expertise
          </motion.h2>
          <p className="text-white/30 text-lg font-light max-w-md">
            Delivering high-performance, 3D-integrated web applications for global clients.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-[15px] hover:border-neon-purple/50 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-500"
            >
              <div className="flex flex-col mb-4">
                <span className="text-white/20 font-mono text-xs uppercase tracking-widest mb-2">{exp.period}</span>
                <h3 className="text-2xl font-bold text-white group-hover:text-neon-purple transition-colors">{exp.company}</h3>
                <p className="text-neon-blue font-medium text-sm">{exp.role}</p>
              </div>
              <p className="text-white/40 leading-relaxed text-sm">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
