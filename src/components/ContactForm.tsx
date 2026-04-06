import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { ref, push } from 'firebase/database';
import { database } from '../lib/firebase';
import confetti from 'canvas-confetti';

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  details: z.string().min(10, "Please provide more details")
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await push(ref(database, 'leads'), {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.details,
        timestamp: Date.now()
      });
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#3b82f6', '#ffffff']
      });

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 font-display tracking-tighter">Let's Talk</h2>
            <p className="text-white/40 text-xl mb-12 leading-relaxed">
              Ready to build the next generation of digital products? Tell us about your vision.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <input
                    {...register('name')}
                    placeholder="Your Name"
                    className={`w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 outline-none focus:border-white/20 transition-all ${errors.name ? 'shake border-red-500/50' : ''}`}
                  />
                  {errors.name && <p className="text-red-400 text-xs ml-2">{errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                  <input
                    {...register('email')}
                    placeholder="Your Email"
                    className={`w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 outline-none focus:border-white/20 transition-all ${errors.email ? 'shake border-red-500/50' : ''}`}
                  />
                  {errors.email && <p className="text-red-400 text-xs ml-2">{errors.email.message}</p>}
                </div>

                <div className="space-y-1">
                  <input
                    {...register('phone')}
                    placeholder="Phone Number"
                    className={`w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 outline-none focus:border-white/20 transition-all ${errors.phone ? 'shake border-red-500/50' : ''}`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs ml-2">{errors.phone.message}</p>}
                </div>

                <div className="space-y-1">
                  <textarea
                    {...register('details')}
                    placeholder="Tell us about your project"
                    rows={4}
                    className={`w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 outline-none focus:border-white/20 transition-all resize-none ${errors.details ? 'shake border-red-500/50' : ''}`}
                  />
                  {errors.details && <p className="text-red-400 text-xs ml-2">{errors.details.message}</p>}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full bg-white text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-2 transition-all hover:bg-white/90 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : isSuccess ? "Request Sent!" : "Send Request"}
              </motion.button>
            </form>

            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center text-center p-8 z-50"
                >
                  <div className="relative">
                    <div className="absolute -inset-4 bg-cyan-500/20 blur-2xl rounded-full animate-pulse" />
                    <h3 className="text-4xl font-bold mb-4 font-display tracking-tight text-white relative">
                      Request <span className="text-cyan-400">Sent!</span>
                    </h3>
                    <p className="text-white/60 text-lg relative">
                      We've received your vision. <br />
                      Expect a response within 24 hours.
                    </p>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      className="h-1 bg-cyan-500 mt-6 mx-auto rounded-full"
                      transition={{ duration: 5 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        .shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </section>
  );
}
