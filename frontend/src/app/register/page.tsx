"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartPulse,
  faUserPlus,
  faCircleNotch,
  faEnvelopeCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import AuthGreetPanel from "../../components/ui/AuthGreetPanel";
import FloatingInput from "../../components/ui/FloatingInput";
import { registerSchema, RegisterFormValues } from "../../lib/validation/auth.schema";
import { inscrirePatient } from "../../lib/auth";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [inscritEmail, setInscritEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(data: RegisterFormValues) {
    setLoading(true);
    setServerError(null);
    try {
      await inscrirePatient(data);
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

  // Écran affiché après inscription réussie — remplace le formulaire
  if (inscritEmail) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas p-8">
        <div className="w-full max-w-[440px] animate-cardIn rounded-[28px] bg-white p-10 text-center shadow-[0_30px_70px_-20px_rgba(15,42,32,0.28)]">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-mint-100">
            <FontAwesomeIcon icon={faEnvelopeCircleCheck} className="h-6 w-6 text-emerald-500" />
          </div>
          <h1 className="font-display text-xl font-bold text-forest-900">
            Vérifiez votre boîte mail
          </h1>
          <p className="mt-3 text-[14.5px] leading-relaxed text-mist">
            Un email de confirmation a été envoyé à{" "}
            <span className="font-semibold text-ink">{inscritEmail}</span>.
            Cliquez sur le lien reçu pour activer votre compte.
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
    <div className="flex min-h-screen items-center justify-center bg-canvas p-8">
      <div className="grid w-full max-w-[980px] animate-cardIn grid-cols-1 overflow-hidden rounded-[28px] bg-white shadow-[0_30px_70px_-20px_rgba(15,42,32,0.28)] md:grid-cols-[44%_56%]">
        <AuthGreetPanel
          title="Bienvenue"
          subtitle="Créez votre compte patient MadaCare en moins d'une minute."
          steps={[
            { label: "Créez votre compte", done: true },
            { label: "Complétez votre profil" },
            { label: "Prenez rendez-vous" },
          ]}
        />

        <main className="flex flex-col justify-center p-9 md:p-12">
          <div className="mb-7 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-gradient-to-br from-emerald-400 to-emerald-500">
              <FontAwesomeIcon icon={faHeartPulse} className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-display text-lg font-bold">
              <b className="text-emerald-500">Mada</b>Care
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FloatingInput
              id="nom"
              label="Nom"
              error={errors.nom?.message}
              {...register("nom")}
            />

            <FloatingInput
              id="prenom"
              label="Prénom"
              error={errors.prenom?.message}
              {...register("prenom")}
            />

            <FloatingInput
              id="email"
              label="Adresse email"
              type="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <FloatingInput
              id="motDePasse"
              label="Mot de passe"
              isPassword
              error={errors.motDePasse?.message}
              {...register("motDePasse")}
            />

            {serverError && (
              <p className="text-[13px] font-medium text-danger">{serverError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-br from-forest-700 to-emerald-500 py-[14px] text-[14.5px] font-bold text-white shadow-[0_12px_26px_-10px_rgba(27,67,50,0.55)] transition-transform hover:-translate-y-[1px] disabled:opacity-80"
            >
              <FontAwesomeIcon
                icon={loading ? faCircleNotch : faUserPlus}
                className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"}
              />
              {loading ? "Création..." : "Créer mon compte"}
            </button>
          </form>

          <p className="mt-6 text-center text-[13.5px] text-mist">
            Déjà inscrit ?{" "}
            <Link href="/login" className="font-semibold text-forest-700 hover:underline">
              Se connecter
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}