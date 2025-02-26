import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactStepMessageProps } from './types';

const MIN_CHARS = 10;

const ContactStepMessage: React.FC<ContactStepMessageProps> = ({
    value,
    onChange,
    onKeyDown,
    fieldError
}) => {
    const { t } = useTranslation('form');
    const [isFocused, setIsFocused] = useState(false);

    const characterCount = value.length;
    const isValid = characterCount >= MIN_CHARS;

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
                    {t('steps.3.title')}
                </motion.h2>
                <motion.p 
                    className="text-lg text-gray-600 dark:text-gray-300"
                    variants={itemVariants}
                >
                    {t('steps.3.description')}
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
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey && isValid) {
                                e.preventDefault();
                                onKeyDown?.(e);
                            }
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={t('steps.3.placeholder')}
                        className={`
                            w-full
                            min-h-[200px]
                            text-xl md:text-2xl
                            px-6 py-4
                            bg-white dark:bg-gray-800
                            text-gray-900 dark:text-white
                            placeholder-gray-400 dark:placeholder-gray-500
                            border-2
                            rounded-lg
                            transition-all
                            duration-300
                            focus:outline-none
                            resize-none
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
                    
                    {/* Contador de caracteres */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`
                            absolute -bottom-8 right-2
                            text-sm
                            ${isValid
                                ? 'text-green-500 dark:text-green-400'
                                : 'text-gray-400 dark:text-gray-500'
                            }
                        `}
                    >
                        {t('progress.chars', { count: MIN_CHARS })}
                        <span className="ml-2">({characterCount}/{MIN_CHARS})</span>
                    </motion.div>

                    {/* Ícono de validación */}
                    {isValid && !fieldError && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-4 top-4"
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
                                {t('validation.minLength', { count: MIN_CHARS })}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Ayuda contextual */}
            <motion.div
                className="mt-20 text-center"
                variants={itemVariants}
            >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('navigation.pressEnterToSubmit')}
                </p>
            </motion.div>
        </motion.div>
    );
};

export default ContactStepMessage;