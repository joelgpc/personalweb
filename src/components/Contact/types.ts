import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Por favor, introduce tu nombre"),
  email: z.string()
    .min(1, "El email es requerido")
    .email("Por favor, introduce un email válido")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Por favor, introduce un email válido"
    ),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  _honeypot: z.string().optional()
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Props base para todos los pasos del formulario
export interface BaseStepProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  fieldError?: string | null;
  isValid?: boolean;
  type?: string;
}

export interface StepProps {
  value: string;
  onChange: (value: string) => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
  validate: (value: string) => boolean;
  isLoading?: boolean;
}

// Props específicas para cada paso
export interface ContactStepNameProps extends BaseStepProps {
  onKeyDown: (e: React.KeyboardEvent) => void; // Override para hacer requerido
}

export interface ContactStepEmailProps extends BaseStepProps {
  onKeyDown: (e: React.KeyboardEvent) => void; // Override para hacer requerido
}

export interface ContactStepMessageProps extends BaseStepProps {
  // Mantiene onKeyDown como opcional
}
