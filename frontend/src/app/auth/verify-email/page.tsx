"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { api } from "../../../lib/api";

type Statut = "chargement" | "succes" | "erreur";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [statut, setStatut] = useState<Statut>("chargement");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatut("erreur");
      setMessage("Lien de vérification invalide.");
      return;
    }

    api
      .get("/auth/verify-email", { params: { token } })
      .then((res) => {
        setStatut("succes");
        setMessage(res.data.message);
      })
      .catch(() => {
        setStatut("erreur");
        setMessage("Ce lien est invalide ou a expiré.");
      });
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas p-8">
      <div className="w-full max-w-[440px] animate-cardIn rounded-[28px] bg-white p-10 text-center shadow-[0_30px_70px_-20px_rgba(15,42,32,0.28)]">
        {statut === "chargement" && (
          <>
            <FontAwesomeIcon icon={faCircleNotch} className="mx-auto h-8 w-8 animate-spin text-emerald-500" />
            <p className="mt-4 text-[14.5px] text-mist">Vérification en cours...</p>
          </>
        )}

        {statut === "succes" && (
          <>
            <FontAwesomeIcon icon={faCircleCheck} className="mx-auto h-10 w-10 text-emerald-500" />
            <h1 className="mt-4 font-display text-xl font-bold text-forest-900">
              Email vérifié
            </h1>
            <p className="mt-2 text-[14.5px] text-mist">{message}</p>
            <Link
              href="/login"
              className="mt-6 inline-block rounded-xl bg-gradient-to-br from-forest-700 to-emerald-500 px-6 py-3 text-[14px] font-bold text-white"
            >
              Se connecter
            </Link>
          </>
        )}

        {statut === "erreur" && (
          <>
            <FontAwesomeIcon icon={faCircleXmark} className="mx-auto h-10 w-10 text-danger" />
            <h1 className="mt-4 font-display text-xl font-bold text-forest-900">
              Lien invalide
            </h1>
            <p className="mt-2 text-[14.5px] text-mist">{message}</p>
          </>
        )}
      </div>
    </div>
  );
}