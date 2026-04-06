import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Smartphone, 
  Gamepad2, 
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';

const services = [
  {
    title: "AI SaaS & Assistance",
    description: "Intelligent solutions that automate and elevate your business operations.",
    icon: <Sparkles className="w-8 h-8" />,
    className: "md:col-span-2 md:row-span-2",
    color: "purple"
  },
  {
    title: "Premium Apps",
    description: "High-end mobile and web applications with flawless performance.",
    icon: <Smartphone className="w-8 h-8" />,
    className: "md:col-span-1 md:row-span-1",
    color: "blue"
  },
  {
    title: "Gaming Platforms",
    description: "Robust tournament and gaming systems for competitive communities.",
    icon: <Gamepad2 className="w-8 h-8" />,
    className: "md:col-span-1 md:row-span-2",
    color: "gold"
  },
  {
    title: "Custom E-commerce",
    description: "Tailored shopping experiences that convert visitors into customers.",
    icon: <ShoppingBag className="w-8 h-8" />,
    className: "md:col-span-1 md:row-span-1",
    color: "blue"
  },
  {
    title: "AI Integration",
    description: "Seamlessly embedding AI into your existing infrastructure.",
    icon: <Cpu className="w-8 h-8" />,
    className: "md:col-span-2 md:row-span-1",
    color: "purple"
  }
];

function BentoCard({ service, index }: { service: typeof services[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "relative glass rounded-[2.5rem] p-8 overflow-hidden group",
        service.className
      )}
    >
      <div 
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.1), transparent 80%)`,
          opacity
        }}
      />
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500",
          service.color === 'purple' ? 'bg-neon-purple/10 text-neon-purple' : 
          service.color === 'blue' ? 'bg-neon-blue/10 text-neon-blue' : 'bg-neon-gold/10 text-neon-gold'
        )}>
          {service.icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2 font-display tracking-tight">{service.title}</h3>
          <p className="text-white/40 text-sm leading-relaxed">{service.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function BentoServices() {
  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 font-display tracking-tighter">Services</h2>
          <p className="text-white/40 text-xl max-w-2xl leading-relaxed">We build high-performance digital products for the next generation of businesses.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[800px]">
          {services.map((service, i) => (
            <BentoCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
