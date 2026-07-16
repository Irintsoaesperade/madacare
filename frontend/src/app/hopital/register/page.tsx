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
} from "@fortawesome/free-solid-svg-icons";
import FloatingInput from "../../../components/ui/FloatingInput";
import FloatingSelect from "../../../components/ui/FloatingSelect";
import {
  hopitalRegisterSchema,
  HopitalRegisterFormValues,
  TYPES_HOPITAL,
} from "../../../lib/validation/hopital.schema";
import { inscrireHopital } from "../../../lib/auth";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 mt-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-mist first:mt-0">
      {children}
    </p>
  );
}

export default function HopitalRegisterPage() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [soumis, setSoumis] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HopitalRegisterFormValues>({ resolver: zodResolver(hopitalRegisterSchema) });

  async function onSubmit(data: HopitalRegisterFormValues) {
    setLoading(true);
    setServerError(null);
    try {
      await inscrireHopital(data);
      setSoumis(true);
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

  if (soumis) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas p-8">
        <div className="w-full max-w-[460px] animate-cardIn rounded-[28px] bg-white p-10 text-center shadow-[0_30px_70px_-20px_rgba(15,42,32,0.28)]">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-mint-100">
            <FontAwesomeIcon icon={faHourglassHalf} className="h-6 w-6 text-emerald-500" />
          </div>
          <h1 className="font-display text-xl font-bold text-forest-900">
            Dossier soumis
          </h1>
          <p className="mt-3 text-[14.5px] leading-relaxed text-mist">
            Votre établissement est en attente de validation par le Super Admin.
            Vous recevrez un email une fois votre dossier examiné.
          </p>
          <Link
            href="/login"
            className="mt-7 inline-block text-[13.5px] font-semibold text-forest-700 hover:underline"
          >
            Retour à la connexion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas px-6 py-10">
      <div className="mx-auto w-full max-w-[720px] animate-cardIn rounded-[28px] bg-white p-9 shadow-[0_30px_70px_-20px_rgba(15,42,32,0.28)] md:p-12">
        <div className="mb-2 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-gradient-to-br from-emerald-400 to-emerald-500">
            <FontAwesomeIcon icon={faHeartPulse} className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-display text-lg font-bold">
            <b className="text-emerald-500">Mada</b>Care
          </span>
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-forest-900">
          Inscrire votre établissement
        </h1>
        <p className="mt-1.5 text-[14px] text-mist">
          Votre dossier sera examiné par le Super Admin avant activation.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionTitle>Identité de l&apos;établissement</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FloatingInput id="nom" label="Nom de l'établissement" error={errors.nom?.message} {...register("nom")} />
            <FloatingSelect id="type" label="Type d'établissement" options={TYPES_HOPITAL} error={errors.type?.message} {...register("type")} />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FloatingInput id="slogan" label="Slogan (optionnel)" error={errors.slogan?.message} {...register("slogan")} />
            <FloatingInput id="logoUrl" label="URL du logo (optionnel)" error={errors.logoUrl?.message} {...register("logoUrl")} />
          </div>

          <SectionTitle>Contact et accès</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FloatingInput id="email" label="Adresse email" type="email" error={errors.email?.message} {...register("email")} />
            <FloatingInput id="motDePasse" label="Mot de passe" isPassword error={errors.motDePasse?.message} {...register("motDePasse")} />
            <FloatingInput id="telephone" label="Téléphone" error={errors.telephone?.message} {...register("telephone")} />
            <FloatingInput id="telephoneUrgence" label="Téléphone d'urgence" error={errors.telephoneUrgence?.message} {...register("telephoneUrgence")} />
            <FloatingInput id="siteWeb" label="Site web (optionnel)" error={errors.siteWeb?.message} {...register("siteWeb")} />
          </div>

          <SectionTitle>Localisation</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FloatingInput id="adresse" label="Adresse" error={errors.adresse?.message} {...register("adresse")} />
            <FloatingInput id="ville" label="Ville" error={errors.ville?.message} {...register("ville")} />
            <FloatingInput id="region" label="Région" error={errors.region?.message} {...register("region")} />
            <FloatingInput id="localisation" label="Coordonnées GPS" error={errors.localisation?.message} {...register("localisation")} />
          </div>

          <SectionTitle>Horaires et services</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FloatingInput id="heureOuverture" label="Heure d'ouverture" type="time" error={errors.heureOuverture?.message} {...register("heureOuverture")} />
            <FloatingInput id="heureFermeture" label="Heure de fermeture" type="time" error={errors.heureFermeture?.message} {...register("heureFermeture")} />
          </div>
          <div className="mt-4">
            <FloatingInput id="services" label="Services proposés (séparés par des virgules)" error={errors.services?.message} {...register("services")} />
          </div>

          <SectionTitle>Direction et documents légaux</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FloatingInput id="nomDirecteurMedical" label="Directeur médical" error={errors.nomDirecteurMedical?.message} {...register("nomDirecteurMedical")} />
            <FloatingInput id="cinDirecteur" label="CIN du directeur" error={errors.cinDirecteur?.message} {...register("cinDirecteur")} />
            <FloatingInput id="numeroAgrement" label="Numéro d'agrément (optionnel)" error={errors.numeroAgrement?.message} {...register("numeroAgrement")} />
            <FloatingInput id="nif" label="NIF (optionnel)" error={errors.nif?.message} {...register("nif")} />
            <FloatingInput id="stat" label="STAT (optionnel)" error={errors.stat?.message} {...register("stat")} />
          </div>

          {serverError && (
            <p className="mt-5 text-[13px] font-medium text-danger">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-br from-forest-700 to-emerald-500 py-[14px] text-[14.5px] font-bold text-white shadow-[0_12px_26px_-10px_rgba(27,67,50,0.55)] transition-transform hover:-translate-y-[1px] disabled:opacity-80"
          >
            <FontAwesomeIcon
              icon={loading ? faCircleNotch : faBuildingCircleCheck}
              className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"}
            />
            {loading ? "Envoi..." : "Soumettre mon établissement"}
          </button>
        </form>

        <p className="mt-6 text-center text-[13.5px] text-mist">
          Déjà inscrit ?{" "}
          <Link href="/login" className="font-semibold text-forest-700 hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}