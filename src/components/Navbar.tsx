import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useScrollSpy } from '../hooks/useScrollSpy';

interface NavbarProps {
aboutRef: React.RefObject<HTMLElement>;
skillsRef: React.RefObject<HTMLElement>;
portfolioRef: React.RefObject<HTMLElement>;
contactRef: React.RefObject<HTMLElement>;
}

export default function Navbar({ aboutRef, skillsRef, portfolioRef, contactRef }: NavbarProps) {
const [isOpen, setIsOpen] = useState(false);
const { t } = useTranslation();

  const sectionRefs = [
  aboutRef,
  skillsRef,
  portfolioRef,
  contactRef
];

const activeSection = useScrollSpy({
  sectionElementRefs: sectionRefs,
  offsetPx: -100,
});

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
    <div className="flex justify-around items-center h-20">
      <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-sans font-bold relative group outline-none focus-visible:ring-2 focus-visible:ring-corporateBlue-500 rounded-lg"
          aria-label="Ir al inicio"
        >
          <svg className="w-12 h-12 sm:w-14 sm:h-14" viewBox="0 0 100 100">
            <circle
              className="fill-none stroke-corporateBlue-500 dark:stroke-[#60a5fa] opacity-20"
              cx="50"
              cy="50"
              r="42"
            />
            <g className="transform scale-90 translate-x-[12px] translate-y-[8px]">
              <path
                className="fill-none stroke-corporateBlue-500 dark:stroke-[#60a5fa] stroke-2 stroke-round group-hover:animate-pulse transition-all duration-300"
                d="M35 30v25c0 5-4 9-9 9s-9-4-9-9V30"
              />
              <path
                className="fill-none stroke-corporateBlue-500 dark:stroke-[#60a5fa] stroke-2 stroke-round group-hover:animate-pulse transition-all duration-300"
                d="M55 30l15 15-15 15M55 45h-15"
              />
            </g>
            <circle
              className="fill-none stroke-corporateBlue-500 dark:stroke-[#60a5fa] opacity-10 group-hover:opacity-20 transition-opacity duration-300"
              cx="50"
              cy="50"
              r="48"
              strokeDasharray="4 4"
            />
          </svg>
        </motion.a>

        <div className="hidden md:flex items-center">
          <div className="flex items-center space-x-8">
            <nav className="main-navigation relative" role="navigation" aria-label="Menú principal">
              <ul className="flex items-center space-x-8">
                {['about', 'skills', 'portfolio', 'contact'].map((item) => (
                  <li key={item} className="relative">
                    <motion.a
                      href={`#${item.toLowerCase()}`}
                      
                      className={`nav-link relative text-gray-700 dark:text-gray-200 hover:text-corporateBlue-500 dark:hover:text-corporateBlue-400 transition-colors block py-2 px-1
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-corporateBlue-500 rounded-lg
                        ${activeSection === item ? 'is-active' : ''}
                        ${item === 'contact'
                          ? 'bg-gradient-to-r from-corporateBlue-500 to-corporateBlue-400 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300'
                          : 'after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-corporateBlue-500 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0'}`}
                      aria-current={activeSection === item ? 'page' : undefined}
                      whileHover={{ y: -1 }}
                      whileTap={{ y: 0 }}
                    >
                      <span className="relative z-10 font-medium">{t(`navbar.${item.toLowerCase()}`)}</span>
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
          {['about', 'skills', 'portfolio', 'contact'].map((item) => (
            <li key={item}>
              <motion.a
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className={`block text-center mx-auto max-w-[220px] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-corporateBlue-500
                  ${item === 'contact'
                    ? 'bg-gradient-to-r from-corporateBlue-500 to-corporateBlue-400 text-white px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300'
                    : `text-gray-700 dark:text-gray-200 hover:text-corporateBlue-500 dark:hover:text-corporateBlue-400 py-3 px-4 transition-colors border ${
                      activeSection === item
                        ? 'border-corporateBlue-500/50 bg-corporateBlue-50/20 dark:bg-corporateBlue-900/20'
                        : 'border-transparent hover:border-corporateBlue-500/20 hover:bg-corporateBlue-50/10 dark:hover:bg-corporateBlue-900/10'
                      } rounded-lg`
                  }`}
                aria-current={activeSection === item ? 'page' : undefined}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative font-medium">{t(`navbar.${item.toLowerCase()}`)}</span>
              </motion.a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  </motion.nav>
);
}
