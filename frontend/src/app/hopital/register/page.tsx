"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartPulse,
  faBuildingCircleCheck,
  faCircleNotch,
  faHourglassHalf,
  faEye,
  faEyeSlash,
  faChevronDown,
  faHospital,
  faLocationDot,
  faClock,
  faFileContract,
  faEnvelope,
  faPhone,
  faGlobe,
  faMapPin,
  faIdCard,
  faBuilding,
  faLock,
  faEnvelopeCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { z } from "zod";

// ✅ TYPES D'ÉTABLISSEMENTS
const TYPES_HOPITAL = [
  { value: "hopital_general", label: "Hôpital Général" },
  { value: "clinique_privee", label: "Clinique Privée" },
  { value: "centre_sante", label: "Centre de Santé" },
  { value: "polyclinique", label: "Polyclinique" },
  { value: "dispensaire", label: "Dispensaire" },
  { value: "cabinet_medical", label: "Cabinet Médical" },
  { value: "laboratoire", label: "Laboratoire d'Analyses" },
  { value: "imagerie", label: "Centre d'Imagerie Médicale" },
  { value: "hopital_specialise", label: "Hôpital Spécialisé" },
  { value: "autre", label: "Autre" },
];

// Schéma de validation Zod
const hopitalRegisterSchema = z.object({
  nom: z.string().min(1, "Le nom est obligatoire"),
  type: z.string().min(1, "Le type est obligatoire"),
  slogan: z.string().optional(),
  logoUrl: z.string().optional(),
  email: z.string().email("Email invalide"),
  motDePasse: z.string().min(6, "Mot de passe trop court (minimum 6 caractères)"),
  telephone: z.string().min(1, "Le téléphone est obligatoire"),
  telephoneUrgence: z.string().min(1, "Le téléphone d'urgence est obligatoire"),
  siteWeb: z.string().optional(),
  adresse: z.string().min(1, "L'adresse est obligatoire"),
  ville: z.string().min(1, "La ville est obligatoire"),
  region: z.string().min(1, "La région est obligatoire"),
  localisation: z.string().min(1, "La localisation est obligatoire"),
  heureOuverture: z.string().min(1, "L'heure d'ouverture est obligatoire"),
  heureFermeture: z.string().min(1, "L'heure de fermeture est obligatoire"),
  services: z.string().min(1, "Les services sont obligatoires"),
  nomDirecteurMedical: z.string().min(1, "Le nom du directeur est obligatoire"),
  cinDirecteur: z.string().min(1, "Le CIN est obligatoire"),
  numeroAgrement: z.string().optional(),
  nif: z.string().optional(),
  stat: z.string().optional(),
});

type HopitalRegisterFormValues = z.infer<typeof hopitalRegisterSchema>;

// Fonction d'inscription simulée (à remplacer par votre vraie fonction)
async function inscrireHopital(data: HopitalRegisterFormValues) {
  console.log("Données d'inscription hôpital:", data);
  // Simuler un appel API
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { success: true };
}

// Composant Input avec icône
function FormInput({
  label,
  error,
  type = "text",
  register,
  name,
  required = false,
  placeholder,
  icon,
}: {
  label: string;
  error?: string;
  type?: string;
  register: any;
  name: string;
  required?: boolean;
  placeholder?: string;
  icon?: any;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="w-full">
      <label className="block text-[10px] font-medium text-[#1a2e2a] mb-1 tracking-wide">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7a7a]">
            <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5" />
          </div>
        )}
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder || label}
          {...register(name)}
          className={`
            w-full rounded-lg border px-3 py-2 text-sm
            transition-all duration-200
            ${icon ? "pl-9" : ""}
            ${error 
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
              : "border-[#e2e8f0] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            }
            bg-white hover:border-[#cbd5e1] focus:bg-white outline-none
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#6b7a7a]"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-4 w-4" />
          </button>
        )}
      </div>
      {error && <p className="mt-0.5 text-[9px] text-red-500">{error}</p>}
    </div>
  );
}

// Composant Select avec icône
function FormSelect({
  label,
  error,
  options,
  register,
  name,
  required = false,
  icon,
}: {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  register: any;
  name: string;
  required?: boolean;
  icon?: any;
}) {
  return (
    <div className="w-full">
      <label className="block text-[10px] font-medium text-[#1a2e2a] mb-1 tracking-wide">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7a7a]">
            <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5" />
          </div>
        )}
        <select
          {...register(name)}
          className={`
            w-full rounded-lg border px-3 py-2 text-sm appearance-none
            transition-all duration-200
            ${icon ? "pl-9" : ""}
            ${error 
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
              : "border-[#e2e8f0] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            }
            bg-white hover:border-[#cbd5e1] focus:bg-white outline-none
          `}
        >
          <option value="">Sélectionnez...</option>
          {options.map((opt, index) => (
            <option key={`${opt.value}-${index}`} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none">
          <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
        </div>
      </div>
      {error && <p className="mt-0.5 text-[9px] text-red-500">{error}</p>}
    </div>
  );
}

// Section avec titre et icône
function SectionTitle({ 
  children, 
  icon 
}: { 
  children: React.ReactNode;
  icon?: any;
}) {
  return (
    <div className="col-span-full mt-2 mb-1.5 first:mt-0">
      <div className="flex items-center gap-2">
        {icon && (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <FontAwesomeIcon icon={icon} className="h-2.5 w-2.5" />
          </div>
        )}
        <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#6b7a7a]">
          {children}
        </p>
        <div className="flex-1 border-t border-[#e2e8f0]" />
      </div>
    </div>
  );
}

export default function HopitalRegisterPage() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [inscritEmail, setInscritEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HopitalRegisterFormValues>({
    resolver: zodResolver(hopitalRegisterSchema),
  });

  async function onSubmit(data: HopitalRegisterFormValues) {
    setLoading(true);
    setServerError(null);
    try {
      await inscrireHopital(data);
      setInscritEmail(data.email);
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 409) {
        setServerError("Cet email est déjà utilisé");
      } else {
        setServerError("Une erreur est survenue. Réessayez.");
      }
    } finally {
      setLoading(false);
    }
  }

  // ✅ Écran affiché après inscription réussie — remplace le formulaire
  if (inscritEmail) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8faf9] p-6">
        <div className="w-full max-w-[440px] rounded-2xl bg-white p-10 text-center shadow-[0_20px_60px_-16px_rgba(15,42,32,0.12)] border border-[#e2e8f0]">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <FontAwesomeIcon icon={faEnvelopeCircleCheck} className="h-6 w-6 text-emerald-500" />
          </div>
          <h1 className="text-xl font-bold text-[#1a2e2a]">
            Vérifiez votre boîte mail
          </h1>
          <p className="mt-3 text-[14.5px] leading-relaxed text-[#6b7a7a]">
            Un email de confirmation a été envoyé à{" "}
            <span className="font-semibold text-[#1a2e2a]">{inscritEmail}</span>.
            Cliquez sur le lien reçu pour activer votre compte établissement.
          </p>
          <Link
            href="/login"
            className="mt-7 inline-block text-[13.5px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            Retour à la connexion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf9] overflow-hidden flex flex-col">
      {/* Header */}
      <header className="border-b border-[#e2e8f0] bg-white/95 px-6 py-3 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-sm">
              <FontAwesomeIcon icon={faHeartPulse} className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="font-display text-base font-bold tracking-tight">
                <span className="text-emerald-600">Mada</span>Care
              </span>
              <span className="ml-2 text-[10px] font-medium text-[#94a3b8]">
                Inscription Établissement
              </span>
            </div>
          </div>
          <Link 
            href="/login" 
            className="text-[11px] font-medium text-[#6b7a7a] hover:text-emerald-600 transition-colors"
          >
            Déjà inscrit ?
          </Link>
        </div>
      </header>

      {/* Contenu */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-[#f8faf9]">
        <div className="max-w-[1440px] mx-auto">
          {/* En-tête */}
          <div className="mb-3">
            <h1 className="font-display text-xl font-bold text-[#1a2e2a] tracking-tight">
              Inscrire votre établissement
            </h1>
            <p className="text-[11px] text-[#6b7a7a] mt-0.5">
              Votre dossier sera examiné par le Super Admin. Les champs marqués d&apos;un{" "}
              <span className="text-red-500">*</span> sont obligatoires.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Grille 5 colonnes */}
            <div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-3 lg:grid-cols-5">
              
              {/* IDENTITÉ */}
              <SectionTitle icon={faHospital}>Identité de l'établissement</SectionTitle>
              
              <FormInput
                label="Nom"
                required
                register={register}
                name="nom"
                error={errors.nom?.message}
                icon={faBuilding}
              />
              <FormSelect
                label="Type"
                required
                options={TYPES_HOPITAL}
                register={register}
                name="type"
                error={errors.type?.message}
                icon={faHospital}
              />
              <FormInput
                label="Slogan"
                register={register}
                name="slogan"
                error={errors.slogan?.message}
                icon={faBuilding}
              />
              <FormInput
                label="Logo URL"
                register={register}
                name="logoUrl"
                error={errors.logoUrl?.message}
                icon={faGlobe}
              />

              {/* CONTACT */}
              <SectionTitle icon={faEnvelope}>Contact et accès</SectionTitle>
              
              <FormInput
                label="Email"
                type="email"
                required
                register={register}
                name="email"
                error={errors.email?.message}
                icon={faEnvelope}
              />
              <FormInput
                label="Mot de passe"
                type="password"
                required
                register={register}
                name="motDePasse"
                error={errors.motDePasse?.message}
                icon={faLock}
              />
              <FormInput
                label="Téléphone"
                required
                register={register}
                name="telephone"
                error={errors.telephone?.message}
                icon={faPhone}
              />
              <FormInput
                label="Urgence"
                required
                register={register}
                name="telephoneUrgence"
                error={errors.telephoneUrgence?.message}
                icon={faPhone}
              />
              <FormInput
                label="Site web"
                register={register}
                name="siteWeb"
                error={errors.siteWeb?.message}
                icon={faGlobe}
              />

              {/* LOCALISATION */}
              <SectionTitle icon={faLocationDot}>Localisation</SectionTitle>
              
              <FormInput
                label="Adresse"
                required
                register={register}
                name="adresse"
                error={errors.adresse?.message}
                icon={faMapPin}
              />
              <FormInput
                label="Ville"
                required
                register={register}
                name="ville"
                error={errors.ville?.message}
                icon={faLocationDot}
              />
              <FormInput
                label="Région"
                required
                register={register}
                name="region"
                error={errors.region?.message}
                icon={faMapPin}
              />
              <FormInput
                label="GPS"
                required
                register={register}
                name="localisation"
                error={errors.localisation?.message}
                icon={faLocationDot}
              />

              {/* HORAIRES */}
              <SectionTitle icon={faClock}>Horaires et services</SectionTitle>
              
              <FormInput
                label="Ouverture"
                type="time"
                required
                register={register}
                name="heureOuverture"
                error={errors.heureOuverture?.message}
                icon={faClock}
              />
              <FormInput
                label="Fermeture"
                type="time"
                required
                register={register}
                name="heureFermeture"
                error={errors.heureFermeture?.message}
                icon={faClock}
              />
              <FormInput
                label="Services (séparés par ,)"
                required
                register={register}
                name="services"
                error={errors.services?.message}
                icon={faBuilding}
              />

              {/* DIRECTION */}
              <SectionTitle icon={faFileContract}>Direction et documents légaux</SectionTitle>
              
              <FormInput
                label="Directeur médical"
                required
                register={register}
                name="nomDirecteurMedical"
                error={errors.nomDirecteurMedical?.message}
                icon={faIdCard}
              />
              <FormInput
                label="CIN"
                required
                register={register}
                name="cinDirecteur"
                error={errors.cinDirecteur?.message}
                icon={faIdCard}
              />
              <FormInput
                label="Agrément"
                register={register}
                name="numeroAgrement"
                error={errors.numeroAgrement?.message}
                icon={faFileContract}
              />
              <FormInput
                label="NIF"
                register={register}
                name="nif"
                error={errors.nif?.message}
                icon={faFileContract}
              />
              <FormInput
                label="STAT"
                register={register}
                name="stat"
                error={errors.stat?.message}
                icon={faFileContract}
              />
            </div>

            {serverError && (
              <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-[11px] font-medium text-red-600">{serverError}</p>
              </div>
            )}

            {/* Boutons */}
            <div className="mt-3 flex flex-col items-start gap-2 border-t border-[#e2e8f0] pt-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-2.5 px-7 text-[12px] font-semibold text-white shadow-[0_4px_14px_-4px_rgba(16,185,129,0.4)] transition-all hover:shadow-[0_4px_20px_-4px_rgba(16,185,129,0.6)] hover:-translate-y-0.5 disabled:opacity-80 disabled:hover:translate-y-0 sm:w-auto"
              >
                <FontAwesomeIcon
                  icon={loading ? faCircleNotch : faBuildingCircleCheck}
                  className={loading ? "h-3.5 w-3.5 animate-spin" : "h-3.5 w-3.5"}
                />
                {loading ? "Envoi en cours..." : "Soumettre le dossier"}
              </button>

              <p className="text-[11px] text-[#94a3b8]">
                Déjà inscrit ?{" "}
                <Link 
                  href="/login" 
                  className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors hover:underline"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}