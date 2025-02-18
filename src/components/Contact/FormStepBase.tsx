import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { BaseStepProps } from './types';

export const FormStepBase: React.FC<BaseStepProps> = ({
  value,
  onChange,
  placeholder,
  onKeyDown,
  fieldError,
  isValid = false,
  type = 'text'
}) => {
  const controls = useAnimation();

  const inputClasses = `
    w-full
    max-w-md
    mx-auto
    bg-transparent
    border-0 border-b-2
    text-center
    ${isValid
      ? 'border-green-500'
      : fieldError
        ? 'border-red-500'
        : 'border-white/20 focus:border-white'
    }
    text-3xl md:text-4xl lg:text-5xl font-light
    text-white
    py-4 px-0
    focus:outline-none focus:ring-0
    transition-all duration-300
    placeholder-white/20
  `;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (fieldError) {
      controls.start({
        x: [-2, 2, -1, 1, 0],
        transition: { duration: 0.3 }
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="relative">
        <motion.input
          type={type}
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          className={inputClasses}
          placeholder={placeholder}
          autoFocus
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.3 }}
        />

        {/* Icono de validación */}
        {isValid && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
          >
            <svg
              className="w-6 h-6"
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
        )}

        {/* Mensaje de error */}
        {fieldError && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 left-0 right-0 text-sm text-red-400 text-center"
          >
            {fieldError}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};