import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface StepInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder: string;
  type?: string;
  error?: string;
}

const StepInput: React.FC<StepInputProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  type = "text",
  error
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative max-w-lg mx-auto">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`
          w-full
          bg-transparent
          border-b-2
          ${error 
            ? 'border-red-500 dark:border-red-400' 
            : value 
              ? 'border-green-500 dark:border-green-400' 
              : 'border-gray-300 dark:border-gray-600'
          }
          text-gray-900 dark:text-white
          text-3xl md:text-4xl
          py-4
          px-2
          text-center
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none
          focus:border-blue-500 dark:focus:border-blue-400
          transition-all
          duration-300
        `}
        autoFocus
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 left-0 right-0 text-sm text-red-500 dark:text-red-400 text-center"
        >
          {error}
        </motion.p>
      )}
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute -bottom-12 left-0 right-0 text-gray-500 dark:text-gray-400 text-sm text-center"
      >
        {t('form.navigation.pressEnter')}
      </motion.p>
    </div>
  );
}; 