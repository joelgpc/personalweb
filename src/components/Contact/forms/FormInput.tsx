import React, { forwardRef, InputHTMLAttributes } from 'react';

export interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'ref'> {
  label?: string | undefined;
  error?: string | undefined;
  type?: string | undefined;
  multiline?: boolean | undefined;
  rows?: number | undefined;
}

export const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(
  ({ 
    label, 
    error, 
    type = 'text', 
    multiline = false, 
    rows = 4, 
    className = '', 
    ...props 
  }, ref) => {
    const baseClasses = "w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0284c7] dark:focus:ring-[#38bdf8] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300";
    const errorClasses = error ? "border-red-500 focus:ring-red-500" : "";
    const combinedClasses = `${baseClasses} ${errorClasses} ${className}`.trim();

    const InputComponent = multiline ? 'textarea' as const : 'input' as const;

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        
        <InputComponent
          ref={ref as any}
          type={!multiline ? type : undefined}
          rows={multiline ? rows : undefined}
          className={combinedClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id || ''}-error` : undefined}
          {...props}
        />

        {error && (
          <p 
            className="text-sm text-red-600 dark:text-red-400"
            id={`${props.id || ''}-error`}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';