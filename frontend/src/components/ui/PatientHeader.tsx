"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartPulse, faUser, faRightFromBracket, faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface PatientHeaderProps {
  prenom: string;
  nom: string;
}

export default function PatientHeader({ prenom, nom }: PatientHeaderProps) {
  const [ouvert, setOuvert] = useState(false);
  const router = useRouter();
  const initiales = `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();

  function deconnexion() {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.push("/login");
  }

  return (
    <header className="border-b border-line bg-white px-8 py-4">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <Link href="/patient/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-gradient-to-br from-emerald-400 to-emerald-500">
            <FontAwesomeIcon icon={faHeartPulse} className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-display text-lg font-bold">
            <b className="text-emerald-500">Mada</b>Care
          </span>
        </Link>

        <div className="relative">
          <button
            onClick={() => setOuvert((v) => !v)}
            className="flex items-center gap-2.5 rounded-full border border-line py-1.5 pl-1.5 pr-3 hover:bg-canvas"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-mint-100 text-[13px] font-semibold text-forest-700">
              {initiales}
            </div>
            <span className="text-[13.5px] font-medium text-ink">{prenom}</span>
            <FontAwesomeIcon icon={faChevronDown} className="h-2.5 w-2.5 text-mist" />
          </button>

          {ouvert && (
            <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-line bg-white shadow-[0_12px_30px_-10px_rgba(15,42,32,0.2)]">
              <Link href="/patient/monprofil" className="flex items-center gap-2.5 px-4 py-3 text-[13.5px] text-ink hover:bg-canvas">
                <FontAwesomeIcon icon={faUser} className="h-3.5 w-3.5 text-mist" />
                Mon profil
              </Link>
              <button
                onClick={deconnexion}
                className="flex w-full items-center gap-2.5 border-t border-line px-4 py-3 text-left text-[13.5px] text-danger hover:bg-red-50"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="h-3.5 w-3.5" />
                Se déconnecter
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}