import { z } from "zod";

const REGEX_NOM = /^[a-zA-ZÀ-ÿ\s'-]+$/;
const REGEX_TELEPHONE = /^0[0-9]{9}$/;

export const modifierProfilSchema = z.object({
  nom: z.string().min(1, "Le nom est requis").regex(REGEX_NOM, "Le nom ne doit contenir que des lettres"),
  prenom: z.string().min(1, "Le prénom est requis").regex(REGEX_NOM, "Le prénom ne doit contenir que des lettres"),
  dateNaissance: z
    .string()
    .optional()
    .refine((val) => !val || new Date(val) <= new Date(), "La date de naissance ne peut pas être dans le futur"),
  lieuNaissance: z
    .string()
    .regex(REGEX_NOM, "Le lieu de naissance ne doit contenir que des lettres")
    .optional()
    .or(z.literal("")),
  sexe: z.enum(["M", "F"]).optional(),
  telephone: z.string().regex(REGEX_TELEPHONE, "Format malgache requis (10 chiffres, commence par 0)"),
  adresse: z.string().optional(),
});

export type ModifierProfilFormValues = z.infer<typeof modifierProfilSchema>;