import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useMemo, useRef, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react'
import { Globe } from 'lucide-react'; // Re-add Globe import
import { useToast } from '../contexts/ToastContext';

interface Language {
  code: string;
  abbr: string;
  label: string;
}

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    { code: 'en', abbr: 'EN', label: 'English' }
  );
  const [showTooltip, setShowTooltip] = useState(false);
  const {  } = useToast();
  const buttonRef = useRef(null);

  const languages: Language[] = [
    { code: 'en', abbr: 'EN', label: 'English' },
    { code: 'es-ES', abbr: 'ES', label: 'Español' }
  ];

  const languageMap = useMemo(() => {
    return languages.reduce((acc: { [key: string]: Language }, lang) => {
      acc[lang.code] = lang;
      return acc;
    }, {});
  }, [languages]);

  useEffect(() => {
    // Solo actualizar el estado si el idioma seleccionado es diferente del actual
    const currentLanguage = languageMap[i18n.language] || languages[0];
    if (currentLanguage.code !== selectedLanguage.code) {
      setSelectedLanguage(currentLanguage);
    }
  }, [i18n.language, languageMap, selectedLanguage.code]);

  const handleLanguageChange = async (language: Language) => {
    try {
      await i18n.changeLanguage(language.code);
      setSelectedLanguage(language);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  return (
    <div className="relative" style={{ position: 'relative' }}> {/* Posición relativa explícita */}
      <Listbox value={selectedLanguage} onChange={handleLanguageChange}>
        {({ open }: { open: boolean }) => (
          <>
            <div className="relative">
              <Listbox.Button
                ref={buttonRef}
                className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-corporateBlue-500 group"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                aria-label={t('navbar.language')}
              >
                <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-corporateBlue-500 dark:group-hover:text-corporateBlue-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{selectedLanguage.abbr}</span>
              </Listbox.Button>
              <Transition
                show={showTooltip && !open}
                as={motion.div}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute right-0 top-full mt-2 px-2 py-1 bg-gray-900 text-white text-sm rounded shadow-lg whitespace-nowrap z-50"
                role="tooltip"
              >
                {t('navbar.languageTooltip')}
              </Transition>
            </div>
            <Transition
              show={open}
              as={motion.div}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              enter="transition-all duration-200"
              enterFrom="opacity-0 y-[-10px]"
              enterTo="opacity-100 y-0"
              leave="transition-all duration-200"
              leaveFrom="opacity-100 y-0"
              leaveTo="opacity-0 y-[-10px]"
            >
              <Listbox.Options
                static
                className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 backdrop-blur-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              >
                {languages.map((language) => (
                  <Listbox.Option
                    key={language.code}
                    className={({ active }: { active: boolean }) => (
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${
                        active ? 'bg-corporateBlue-50 dark:bg-corporateBlue-900/20 text-corporateBlue-600 dark:text-corporateBlue-400' : 'text-gray-700 dark:text-gray-200'
                      }`
                    )}
                    value={language}
                  >
                    {() => (
                      
                        <span className={`block truncate`}>
                          {language.label}
                        </span>
                      
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
}