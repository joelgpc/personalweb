import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactStepMessageProps } from './types';
import { contactFormSchema } from './types';

export const ContactStepMessage: React.FC<ContactStepMessageProps> = ({ value, onChange, placeholder, onKeyDown, fieldError }) => {
  const { t } = useTranslation();
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const validateMessage = () => {
      try {
        contactFormSchema.shape.message.parse(value);
        setIsValid(true);
        return true;
      } catch {
        setIsValid(false);
        return false;
      }
    };

    validateMessage();
  }, [value]);

  const labelClasses = `
    absolute left-4 top-5 px-2
    text-lightText/50 dark:text-darkText/50
    transform transition-all duration-200
    ${focused || value ? '-translate-y-4 text-sm' : ''}
    ${isValid ? 'text-green-500' : focused ? 'text-[#3272d2]' : ''}
    pointer-events-none
    bg-gradient-to-b from-lightBackground/80 to-lightBackground/80 dark:from-darkBackground/80
  `;

  const textareaClasses = `
    group
    relative
    w-full bg-lightBackground/30 dark:bg-darkBackground/30
    border-2 ${isValid 
      ? 'border-green-500 dark:border-green-400' 
      : 'border-lightText/10 dark:border-darkText/10'
    }
    rounded-xl px-6 pt-8 pb-4 text-lg md:text-xl text-lightText dark:text-darkText
    shadow-lg backdrop-blur-sm
    focus:outline-none focus:border-[#3272d2] focus:ring-2 focus:ring-[#3272d2]/20
    transition-all duration-300 hover:border-[#3272d2]/50
    min-h-[150px] md:min-h-[200px]
    sm:text-base md:text-lg lg:text-xl
    resize-none
  `;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    if (!isValid) {
      controls.start({
        x: [-2, 2, -1, 1, 0],
        transition: { duration: 0.3 }
      });
    }
  };

  return (
    <div className="relative">
      <motion.textarea
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={textareaClasses}
        placeholder={placeholder}
        required
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.3 }}
      />
      <label className={labelClasses}>
        {t('contact.messageLabel')}
      </label>

      {/* Ícono de validación */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isValid ? 1 : 0,
          scale: isValid ? 1 : 0.5,
          transition: { duration: 0.2 }
        }}
        className="absolute right-4 top-8 text-green-500"
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

      {/* Mensaje de error */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: !isValid && value ? 1 : 0,
          y: !isValid && value ? 0 : -10
        }}
        className="absolute -bottom-6 left-0 text-sm text-red-500"
      >
        {!isValid && value && t('contact.messageRequired')}
      </motion.p>
      {/* Display field errors */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: fieldError ? 1 : 0,
          y: fieldError ? 0 : -10
        }}
        className="absolute -bottom-6 left-0 text-sm text-red-500"
      >
        {fieldError}
      </motion.p>
    </div>
  );
};