import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Por favor, introduce tu nombre"),
  email: z.string().email("Por favor, introduce un email válido"),
  phone: z.string()
    .regex(/^\+?[0-9\s\-]*$/, "Número inválido")
    .optional(),
  budget: z.number()
    .min(0, "El presupuesto no puede ser negativo")
    .max(100000, "Máximo €100.000")
    .optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  _honeypot: z.string().optional() // Campo anti-spam
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// New interfaces for individual contact form steps:
export interface ContactStepNameProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onKeyDown: (e: React.KeyboardEvent) => void;
  fieldError?: string; // Prop para mostrar errores de validación
}

export interface ContactStepEmailProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onKeyDown: (e: React.KeyboardEvent) => void;
  fieldError?: string; // Prop para mostrar errores de validación
}

export interface ContactStepMessageProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string; // Added placeholder here
  onKeyDown?: (e: React.KeyboardEvent) => void;
  fieldError?: string; // Prop para mostrar errores de validación
}
