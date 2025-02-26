import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  email: z.string()
    .email('Por favor ingresa un email válido'),
  message: z.string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede tener más de 1000 caracteres'),
  recaptchaToken: z.string().optional()
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactFormFields = keyof ContactFormData;

export const contactInitialValues: ContactFormData = {
  name: '',
  email: '',
  message: '',
};

export const fieldValidations = {
  name: (value: string) => {
    if (!value) return 'El nombre es requerido';
    if (value.length < 2) return 'El nombre debe tener al menos 2 caracteres';
    if (value.length > 50) return 'El nombre no puede tener más de 50 caracteres';
    return '';
  },
  email: (value: string) => {
    if (!value) return 'El email es requerido';
    if (!value.includes('@')) return 'Por favor incluye un "@" en la dirección de email';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Por favor ingresa un email válido';
    return '';
  },
  message: (value: string) => {
    if (!value) return 'El mensaje es requerido';
    if (value.length < 10) return 'El mensaje debe tener al menos 10 caracteres';
    if (value.length > 1000) return 'El mensaje no puede tener más de 1000 caracteres';
    return '';
  }
};