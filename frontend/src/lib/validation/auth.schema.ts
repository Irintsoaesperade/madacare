import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "L'email est requis").email("Adresse email invalide"),
  motDePasse: z.string().min(1, "Le mot de passe est requis"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  prenom: z
    .string()
    .min(1, "Le prénom est requis")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le prénom ne doit contenir que des lettres"),
  nom: z
    .string()
    .min(1, "Le nom est requis")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le nom ne doit contenir que des lettres"),
  email: z.string().min(1, "L'email est requis").email("Adresse email invalide"),
  motDePasse: z.string().min(8, "8 caractères minimum requis"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;