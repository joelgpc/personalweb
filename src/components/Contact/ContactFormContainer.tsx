import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ContactFormContainerProps {
    children: React.ReactNode;
    currentStep: number;
    totalSteps: number;
    onSubmit: (e: React.FormEvent) => void;
    error?: string;
    isSubmitted: boolean;
}

export const ContactFormContainer: React.FC<ContactFormContainerProps> = ({
    children,
    currentStep,
    totalSteps,
    onSubmit,
    error,
    isSubmitted
}) => {
    const { t } = useTranslation('form');
    const [showError, setShowError] = useState(!!error);

    // Ocultar el error después de 5 segundos
    React.useEffect(() => {
        if (error) {
            setShowError(true);
            const timer = setTimeout(() => setShowError(false), 5000);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [error]);

    // Variantes de animación
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-4 relative">
            <div className="w-full max-w-2xl mx-auto">
                {isSubmitted ? (
                    <motion.div 
                        className="flex flex-col items-center justify-center text-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="w-16 h-16 mb-8 rounded-full bg-green-500 flex items-center justify-center"
                        >
                            <svg 
                                className="w-8 h-8 text-white" 
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
                        </motion.div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {t('feedback.success.title')}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            {t('feedback.success.description')}
                        </p>
                    </motion.div>
                ) : (
                    <motion.form
                        onSubmit={onSubmit}
                        className="w-full"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Mensajes de error */}
                        <AnimatePresence>
                            {showError && error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                                >
                                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                                        {error}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Indicador de progreso */}
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
                            <div className="flex space-x-2">
                                {Array.from({ length: totalSteps }, (_, i) => (
                                    <motion.div
                                        key={i}
                                        className={`h-1 rounded-full transition-all duration-300 ${
                                            i + 1 <= currentStep 
                                                ? 'bg-blue-500 dark:bg-blue-400' 
                                                : 'bg-gray-200 dark:bg-gray-700'
                                        }`}
                                        style={{ width: i + 1 === currentStep ? '2rem' : '1rem' }}
                                        animate={{
                                            scale: i + 1 === currentStep ? 1.1 : 1,
                                            opacity: i + 1 === currentStep ? 1 : 0.7
                                        }}
                                    />
                                ))}
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {t('progress.step', { current: currentStep, total: totalSteps })}
                            </span>
                        </div>

                        {/* Contenido del formulario */}
                        <div className="w-full">
                            {children}
                        </div>
                    </motion.form>
                )}
            </div>
        </div>
    );
};
