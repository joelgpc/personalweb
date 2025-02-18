import React from 'react';
import { useTranslation } from 'react-i18next';

interface ContactButtonsProps {
  currentStep: number;
  isLastStep: boolean;
  isValid: boolean;
  handlePrevStep: () => void;
}

const ContactButtons: React.FC<ContactButtonsProps> = ({ currentStep, isLastStep, isValid, handlePrevStep }) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center w-full mt-4">
      {currentStep > 1 && (
        <button
          type="button"
          onClick={handlePrevStep}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {t("previous")}
        </button>
      )}

      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-50"
        disabled={!isValid}
      >
        {isLastStep ? t("send") : t("next")}
      </button>
    </div>
  );
};

export default ContactButtons; 