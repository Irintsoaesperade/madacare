"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleNotch, faFloppyDisk, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import PatientHeader from "../../../components/ui/PatientHeader";
import FloatingInput from "../../../components/ui/FloatingInput";
import FloatingSelect from "../../../components/ui/FloatingSelect";
import { modifierProfilSchema, ModifierProfilFormValues } from "../../../lib/validation/patient.schema";
import { recupererMonProfil, mettreAJourProfil, PatientProfil } from "../../../lib/auth";

export default function MonProfilPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bienvenue = searchParams.get("bienvenue") === "1";

  const [profil, setProfil] = useState<PatientProfil | null>(null);
  const [chargement, setChargement] = useState(true);
  const [enregistrement, setEnregistrement] = useState(false);
  const [succes, setSucces] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ModifierProfilFormValues>({ resolver: zodResolver(modifierProfilSchema) });

  useEffect(() => {
    recupererMonProfil().then((data) => {
      setProfil(data);
      reset({
        nom: data.nom,
        prenom: data.prenom,
        dateNaissance: data.dateNaissance ?? "",
        lieuNaissance: data.lieuNaissance ?? "",
        sexe: data.sexe ?? undefined,
        telephone: data.telephone ?? "",
        adresse: data.adresse ?? "",
      });
      setChargement(false);
    });
  }, [reset]);

  async function onSubmit(values: ModifierProfilFormValues) {
    setEnregistrement(true);
    setSucces(false);
    try {
      await mettreAJourProfil(values);
      setSucces(true);
      if (bienvenue) router.push("/patient/dashboard");
    } finally {
      setEnregistrement(false);
    }
  }

  if (chargement || !profil) {
    return <div className="min-h-screen bg-canvas p-8 text-mist">Chargement de votre profil...</div>;
  }

  return (
    <div className="min-h-screen bg-canvas">
      <PatientHeader prenom={profil.prenom} nom={profil.nom} />

      <div className="mx-auto w-full max-w-[720px] px-6 py-10">
        <h1 className="font-display text-2xl font-bold text-forest-900">Mon profil</h1>
        <p className="mt-1.5 text-[14px] text-mist">
          Ces informations sont utilisées pour vos rendez-vous et votre suivi médical.
        </p>

        {bienvenue && (
          <div className="mt-5 flex items-start gap-2.5 rounded-[10px] border border-emerald-500/[0.18] bg-emerald-500/[0.07] p-3.5">
            <FontAwesomeIcon icon={faCircleInfo} className="mt-0.5 h-3.5 w-3.5 text-forest-600" />
            <p className="text-[13px] leading-relaxed text-[#3D554A]">
              Bienvenue sur MadaCare ! Complétez votre profil pour pouvoir prendre rendez-vous.
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 animate-cardIn rounded-[24px] border border-line bg-white p-7 shadow-[0_20px_50px_-24px_rgba(15,42,32,0.2)] md:p-9"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FloatingInput id="prenom" label="Prénom" required error={errors.prenom?.message} {...register("prenom")} />
            <FloatingInput id="nom" label="Nom" required error={errors.nom?.message} {...register("nom")} />
            <FloatingInput id="dateNaissance" label="Date de naissance" type="date" error={errors.dateNaissance?.message} {...register("dateNaissance")} />
            <FloatingInput id="lieuNaissance" label="Lieu de naissance" error={errors.lieuNaissance?.message} {...register("lieuNaissance")} />
            <FloatingSelect id="sexe" label="Sexe" options={["M", "F"]} error={errors.sexe?.message} {...register("sexe")} />
            <FloatingInput id="telephone" label="Téléphone" required error={errors.telephone?.message} {...register("telephone")} />
            <FloatingInput id="adresse" label="Adresse" error={errors.adresse?.message} {...register("adresse")} />
          </div>

          {succes && !bienvenue && (
            <p className="mt-5 flex items-center gap-2 text-[13px] font-medium text-forest-700">
              <FontAwesomeIcon icon={faCircleCheck} className="h-3.5 w-3.5" />
              Profil mis à jour avec succès
            </p>
          )}

          <button
            type="submit"
            disabled={enregistrement}
            className="mt-7 flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-br from-forest-700 to-emerald-500 px-7 py-[13px] text-[14px] font-bold text-white shadow-[0_12px_26px_-10px_rgba(27,67,50,0.55)] transition-transform hover:-translate-y-[1px] disabled:opacity-80"
          >
            <FontAwesomeIcon icon={enregistrement ? faCircleNotch : faFloppyDisk} className={enregistrement ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
            {enregistrement ? "Enregistrement..." : "Enregistrer"}
          </button>
        </form>
      </div>
    </div>
  );
}