import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Instagram, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  const handleEmailClick = () => {
    window.location.href = 'mailto:contacto@joelmercado.es?subject=New%20message%20from%20Web%20JM';
  };

  return (
    <footer className="py-8 px-4 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-6">
          <motion.a
            href="https://www.linkedin.com/in/joelmercado"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, color: '#3272d2' }}
            className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] dark:hover:text-[#0ea5e9] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://github.com/joelgpc"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, color: '#3272d2' }}
            className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] dark:hover:text-[#0ea5e9] transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://www.instagram.com/asesorjoelmercado/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, color: '#3272d2' }}
            className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] dark:hover:text-[#0ea5e9] transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://wa.me/34643296890"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, color: '#48bb78' }}
            className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.a>

          <motion.button
            onClick={handleEmailClick}
            whileHover={{ y: -2, color: '#3272d2' }}
            className="text-gray-600 dark:text-gray-400 hover:text-[#0ea5e9] dark:hover:text-[#0ea5e9] transition-colors"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </motion.button>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2025 Escala365. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

