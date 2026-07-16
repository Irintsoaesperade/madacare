import { z } from "zod";

// Hypothèse à confirmer avec le DTO réel du backend (types d'établissement)
export const TYPES_HOPITAL = [
  "CSB1",
  "CSB2",
  "CHRD1",
  "CHRD2",
  "CHU",
  "CLINIQUE_PRIVEE",
] as const;

export const hopitalRegisterSchema = z.object({
  nom: z.string().min(1, "Le nom de l'établissement est requis"),
  type: z.enum(TYPES_HOPITAL, { errorMap: () => ({ message: "Sélectionnez un type" }) }),
  slogan: z.string().optional(),
  logoUrl: z.string().url("URL invalide").optional().or(z.literal("")),

  email: z.string().min(1, "L'email est requis").email("Adresse email invalide"),
  motDePasse: z.string().min(8, "8 caractères minimum requis"),
  telephone: z.string().min(1, "Le téléphone est requis"),
  telephoneUrgence: z.string().min(1, "Le téléphone d'urgence est requis"),
  siteWeb: z.string().url("URL invalide").optional().or(z.literal("")),

  adresse: z.string().min(1, "L'adresse est requise"),
  ville: z.string().min(1, "La ville est requise"),
  region: z.string().min(1, "La région est requise"),
  localisation: z.string().min(1, "La localisation est requise"),

  heureOuverture: z.string().min(1, "Heure d'ouverture requise"),
  heureFermeture: z.string().min(1, "Heure de fermeture requise"),
  services: z.string().min(1, "Indiquez au moins un service"),

  nomDirecteurMedical: z.string().min(1, "Le directeur médical est requis"),
  cinDirecteur: z.string().min(1, "Le CIN du directeur est requis"),
  numeroAgrement: z.string().optional(),
  nif: z.string().optional(),
  stat: z.string().optional(),
});

export type HopitalRegisterFormValues = z.infer<typeof hopitalRegisterSchema>;