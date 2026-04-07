import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const message = "Hi Neer, I saw your agency website and want to discuss a project.";
  const whatsappUrl = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 w-16 h-16 glass rounded-full flex items-center justify-center text-green-400 shadow-[0_0_20px_rgba(74,222,128,0.2)] hover:shadow-[0_0_30px_rgba(74,222,128,0.4)] transition-all"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
    </motion.a>
  );
}
