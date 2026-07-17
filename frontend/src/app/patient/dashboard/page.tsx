"use client";
import { useEffect, useState } from "react";
import PatientHeader from "../../../components/ui/PatientHeader";
import { recupererMonProfil, PatientProfil } from "../../../lib/auth";

export default function PatientDashboard() {
  const [profil, setProfil] = useState<PatientProfil | null>(null);

  useEffect(() => {
    recupererMonProfil().then(setProfil);
  }, []);

  if (!profil) return <div className="min-h-screen bg-canvas p-8 text-mist">Chargement...</div>;

  return (
    <div className="min-h-screen bg-canvas">
      <PatientHeader prenom={profil.prenom} nom={profil.nom} />
      <div className="mx-auto max-w-[1200px] px-8 py-10">
        <h1 className="font-display text-2xl font-bold text-forest-900">Bonjour {profil.prenom}</h1>
        <p className="mt-1.5 text-[14px] text-mist">
          Votre tableau de bord — prochainement vos rendez-vous et votre dossier médical ici.
        </p>
      </div>
    </div>
  );
}