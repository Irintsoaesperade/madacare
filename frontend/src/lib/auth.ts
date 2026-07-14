import { api } from "./api";
import Cookies from "js-cookie";

export type Role = "PATIENT" | "MEDECIN" | "HOPITAL_ADMIN" | "SUPER_ADMIN";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  doitChangerMotDePasse: boolean;
}

interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
  exp: number;
}

export async function seConnecter(email: string, motDePasse: string) {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    email,
    motDePasse,
  });

  Cookies.set("accessToken", data.accessToken, { expires: 1 }); // 1 jour
  Cookies.set("refreshToken", data.refreshToken, { expires: 30 }); // 30 jours

  return data;
}

export function decoderToken(token: string): JwtPayload {
  const payload = token.split(".")[1];
  const decoded = JSON.parse(atob(payload));
  return decoded as JwtPayload;
}

export function redirectionSelonRole(role: Role): string {
  switch (role) {
    case "PATIENT":
      return "/patient/dashboard";
    case "MEDECIN":
      return "/medecin/dashboard";
    case "HOPITAL_ADMIN":
      return "/hopital/dashboard";
    case "SUPER_ADMIN":
      return "/admin/dashboard";
    default:
      return "/login";
  }
}