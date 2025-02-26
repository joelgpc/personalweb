import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactStepNameProps } from './types';

const ContactStepName: React.FC<ContactStepNameProps> = ({
    value,
    onChange,
    onKeyDown,
    fieldError
}) => {
    const { t } = useTranslation('form');
    const [isFocused, setIsFocused] = useState(false);

    // Variantes de animación
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99],
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.4
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99]
            }
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {/* Pregunta principal */}
            <motion.div 
                className="text-center mb-12"
                variants={itemVariants}
            >
                <motion.h2 
                    className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                    layoutId="question"
                >
                    {t('steps.1.title')}
                </motion.h2>
                <motion.p 
                    className="text-lg text-gray-600 dark:text-gray-300"
                    variants={itemVariants}
                >
                    {t('steps.1.description')}
                </motion.p>
            </motion.div>

            {/* Campo de entrada */}
            <motion.div 
                className="w-full max-w-lg mx-auto relative"
                variants={itemVariants}
            >
                <div className={`
                    relative
                    rounded-lg
                    transition-all
                    duration-300
                    ${isFocused ? 'transform scale-[1.02]' : ''}
                    ${fieldError ? 'shadow-error' : ''}
                `}>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={onKeyDown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={t('steps.1.placeholder')}
                        className={`
                            w-full
                            text-3xl md:text-4xl
                            px-6 py-4
                            bg-white dark:bg-gray-800
                            text-gray-900 dark:text-white
                            placeholder-gray-400 dark:placeholder-gray-500
                            border-2
                            rounded-lg
                            transition-all
                            duration-300
                            focus:outline-none
                            ${fieldError 
                                ? 'border-red-500 dark:border-red-500' 
                                : isFocused
                                    ? 'border-blue-500 dark:border-blue-400'
                                    : 'border-gray-200 dark:border-gray-700'
                            }
                            ${value ? 'bg-opacity-50' : ''}
                        `}
                        autoFocus
                    />
                    
                    {/* Ícono de validación */}
                    {value && !fieldError && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Mensaje de error */}
                <AnimatePresence>
                    {fieldError && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute -bottom-8 left-0 right-0"
                        >
                            <p className="text-sm text-red-500 dark:text-red-400 text-center">
                                {fieldError}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Ayuda contextual */}
            <motion.div
                className="mt-16 text-center"
                variants={itemVariants}
            >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('navigation.pressEnter')}
                </p>
            </motion.div>
        </motion.div>
    );
};

export default ContactStepName;