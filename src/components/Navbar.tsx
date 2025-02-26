import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollSpy } from '../hooks/useScrollSpy';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { Logo } from './Logo';

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useScrollSpy(['about', 'skills', 'portfolio', 'contact']);

  const navItems = [
    { id: 'about', label: t('navigation.about') },
    { id: 'skills', label: t('navigation.skills') },
    { id: 'portfolio', label: t('navigation.portfolio') },
    { id: 'contact', label: t('navigation.contact') }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.history.pushState(null, '', window.location.pathname);
      
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      aria-label="Navegación principal"
      role="navigation"
      className="sticky top-0 w-full z-[9999] bg-[#F9F9F9]/95 dark:bg-[#0b251c]/95 backdrop-blur-xl border-b border-[#be906a]/30 dark:border-[#855645]/30 transition-all duration-300 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#" className="flex items-center">
            <Logo />
          </a>

          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-8">
              <nav className="main-navigation relative" role="navigation" aria-label="Menú principal">
                <ul className="flex items-center space-x-8">
                  {navItems.map(({ id, label }) => (
                    <li key={id} className="relative">
                      <motion.a
                        href={`#${id.toLowerCase()}`}
                        onClick={() => scrollToSection(id)}
                        className={`nav-link relative text-gray-700 dark:text-gray-200 hover:text-corporateBlue-500 dark:hover:text-corporateBlue-400 transition-colors block py-2 px-1
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-corporateBlue-500 rounded-lg
                          ${activeSection === id ? 'is-active' : ''}
                          ${id === 'contact'
                            ? 'bg-gradient-to-r from-corporateBlue-500 to-corporateBlue-400 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300'
                            : 'after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-corporateBlue-500 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0'}`}
                        aria-current={activeSection === id ? 'page' : undefined}
                        whileHover={{ y: -1 }}
                        whileTap={{ y: 0 }}
                      >
                        <span className="relative z-10 font-medium">{label}</span>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex items-center space-x-4">
                <div className="hover:rotate-180 transition-transform duration-300">
                  <ThemeToggle />
                </div>
                <LanguageSelector />
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSelector />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#0b185b]/80 dark:text-[#aaeb94]/80 hover:text-corporateBlue-500 dark:hover:text-corporateBlue-400 transition-colors p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-corporateBlue-500"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        id="mobile-menu"
        className={`md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 ${
          isOpen ? 'block' : 'hidden'
        }`}
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}
      >
        <nav className="px-6 py-8" aria-label="Menú móvil">
          <ul className="space-y-6">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <motion.a
                  href={`#${id.toLowerCase()}`}
                  onClick={() => scrollToSection(id)}
                  className={`block text-center mx-auto max-w-[220px] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-corporateBlue-500
                    ${id === 'contact'
                      ? 'bg-gradient-to-r from-corporateBlue-500 to-corporateBlue-400 text-white px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300'
                      : `text-gray-700 dark:text-gray-200 hover:text-corporateBlue-500 dark:hover:text-corporateBlue-400 py-3 px-4 transition-colors border ${
                        activeSection === id
                          ? 'border-corporateBlue-500/50 bg-corporateBlue-50/20 dark:bg-corporateBlue-900/20'
                          : 'border-transparent hover:border-corporateBlue-500/20 hover:bg-corporateBlue-50/10 dark:hover:bg-corporateBlue-900/10'
                      } rounded-lg`
                    }`}
                  aria-current={activeSection === id ? 'page' : undefined}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative font-medium">{label}</span>
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
