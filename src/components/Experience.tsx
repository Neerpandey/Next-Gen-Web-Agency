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
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold font-display tracking-tighter mb-20 text-white"
        >
          Experience
        </motion.h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-[12px] hover:border-neon-purple/50 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-neon-purple transition-colors">{exp.company}</h3>
                  <p className="text-neon-blue font-medium">{exp.role}</p>
                </div>
                <span className="text-white/30 font-mono mt-2 md:mt-0">{exp.period}</span>
              </div>
              <p className="text-white/50 leading-relaxed max-w-3xl">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
