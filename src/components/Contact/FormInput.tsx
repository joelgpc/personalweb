import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface FormInputProps {
  name: string;
  type?: string;
  placeholderKey: string;
}

const FormInput: React.FC<FormInputProps> = ({ name, type = "text", placeholderKey }) => {
  const { register, formState: { errors } } = useFormContext();
  const { t } = useTranslation();

  return (
    <div>
      <input
        {...register(name, { required: true })}
        type={type}
        placeholder={t(`contact.placeholders.${placeholderKey}`)}
        className="w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-black dark:text-white px-3 py-2 text-lg"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {t(`contact.invalid${name.charAt(0).toUpperCase() + name.slice(1)}`)}
        </p>
      )}
    </div>
  );
};

export default FormInput; 