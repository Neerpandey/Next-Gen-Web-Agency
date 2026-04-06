import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

const plans = [
  {
    name: "Starter",
    monthly: 166,
    yearly: 149,
    features: ["Single Page App", "Responsive Design", "Basic SEO", "Contact Form"]
  },
  {
    name: "Professional",
    monthly: 388,
    yearly: 349,
    features: ["Multi-page App", "Custom Animations", "Firebase Integration", "Admin Dashboard", "Priority Support"],
    popular: true
  },
  {
    name: "Enterprise",
    monthly: 555,
    yearly: 499,
    features: ["Full-stack Solution", "3D Interactive Elements", "Advanced Analytics", "Lifetime Maintenance", "Custom Branding"]
  }
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 font-display">Pricing</h2>
          
          <div className="flex items-center justify-center gap-4">
            <span className={cn("text-sm transition-colors", !isYearly ? "text-white" : "text-white/40")}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-16 h-8 bg-white/10 rounded-full p-1 relative transition-colors hover:bg-white/20"
            >
              <motion.div
                animate={{ x: isYearly ? 32 : 0 }}
                className="w-6 h-6 bg-white rounded-full"
              />
            </button>
            <span className={cn("text-sm transition-colors", isYearly ? "text-white" : "text-white/40")}>Yearly <span className="text-neon-purple text-xs font-bold ml-1">Save 15%</span></span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "glass p-10 rounded-[2.5rem] flex flex-col relative group transition-all duration-500",
                plan.popular && "border-neon-purple/50 bg-white/[0.05] scale-105 z-10"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neon-purple text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-6 font-display">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-bold font-display">
                  ${isYearly ? plan.yearly : plan.monthly}
                </span>
                <span className="text-white/40 text-sm">/project</span>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-white/60">
                    <div className="w-5 h-5 rounded-full bg-neon-purple/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-neon-purple" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={cn(
                "w-full py-5 rounded-2xl font-bold transition-all duration-300",
                plan.popular ? "bg-neon-purple text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]" : "bg-white/5 text-white hover:bg-white/10"
              )}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
