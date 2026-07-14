"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartPulse, faArrowRightToBracket, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import AuthGreetPanel from "../../components/ui/AuthGreetPanel";
import FloatingInput from "../../components/ui/FloatingInput";
import { loginSchema, LoginFormValues } from "../../lib/validation/auth.schema";
import { seConnecter, decoderToken, redirectionSelonRole } from "../../lib/auth";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginFormValues) {
    setLoading(true);
    setServerError(null);
    try {
      const reponse = await seConnecter(data.email, data.motDePasse);
      const payload = decoderToken(reponse.accessToken);
      router.push(redirectionSelonRole(payload.role));
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 401) {
        setServerError(err.response.data.message ?? "Email ou mot de passe incorrect");
      } else {
        setServerError("Une erreur est survenue. Réessayez.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas p-8">
      <div className="grid w-full max-w-[980px] animate-cardIn grid-cols-1 overflow-hidden rounded-[28px] bg-white shadow-[0_30px_70px_-20px_rgba(15,42,32,0.28)] md:grid-cols-[44%_56%]">
        <AuthGreetPanel
          title="Bonjour"
          subtitle="Connectez-vous pour retrouver vos rendez-vous et votre dossier médical."
        />

        <main className="flex flex-col justify-center p-9 md:p-12">
          <div className="mb-9 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-gradient-to-br from-emerald-400 to-emerald-500">
              <FontAwesomeIcon icon={faHeartPulse} className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-display text-lg font-bold">
              <b className="text-emerald-500">Mada</b>Care
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FloatingInput
              id="email"
              label="Email ou identifiant"
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

            <div className="-mt-1 flex items-center justify-between">
              <label className="flex items-center gap-2 text-[13px] text-mist">
                <input type="checkbox" className="h-[15px] w-[15px] accent-forest-600" />
                Se souvenir de moi
              </label>
              <Link href="#" className="text-[13px] font-semibold text-forest-700 hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>

            {serverError && (
              <p className="text-[13px] font-medium text-danger">{serverError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-br from-forest-700 to-emerald-500 py-[14px] text-[14.5px] font-bold text-white shadow-[0_12px_26px_-10px_rgba(27,67,50,0.55)] transition-transform hover:-translate-y-[1px] disabled:opacity-80"
            >
              <FontAwesomeIcon
                icon={loading ? faCircleNotch : faArrowRightToBracket}
                className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"}
              />
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <p className="mt-6 text-center text-[13.5px] text-mist">
            Pas encore de compte ?{" "}
            <Link href="/register" className="font-semibold text-forest-700 hover:underline">
              Créer un compte
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}