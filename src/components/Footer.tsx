import { motion } from 'framer-motion';
import { Linkedin, Github, Instagram, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  const handleEmailClick = () => {
    window.location.href = 'mailto:contacto@joelmercado.es?subject=New%20message%20from%20Web%20JM';
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-12 relative overflow-hidden bg-white/5 dark:bg-darkBackground/10 backdrop-blur-lg border-t border-lightSecondary/20 dark:border-darkSecondary/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Social Media and Contact Icons */}
          <div className="flex space-x-6">
            <motion.a
              href="https://www.linkedin.com/in/joelmercado"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, color: '#3272d2' }}
              className="text-lightText/80 dark:text-darkText/80 hover:text-lightPrimary dark:hover:text-darkPrimary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://github.com/joelgpc"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, color: '#3272d2' }}
              className="text-lightText/80 dark:text-darkText/80 hover:text-lightPrimary dark:hover:text-darkPrimary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://www.instagram.com/asesorjoelmercado/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, color: '#3272d2' }}
              className="text-lightText/80 dark:text-darkText/80 hover:text-lightPrimary dark:hover:text-darkPrimary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://wa.me/34643296890"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, color: '#48bb78' }}
              className="text-lightText/80 dark:text-darkText/80 hover:text-green-500 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </motion.a>

            <motion.button
              onClick={handleEmailClick}
              whileHover={{ y: -2, color: '#3272d2' }}
              className="text-lightText/80 dark:text-darkText/80 hover:text-lightPrimary dark:hover:text-darkPrimary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Personal Signature */}
          <div className="text-center space-y-3">
            <p className="text-sm text-lightText/60 dark:text-darkText/60">
              © 2025 Escala365. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

