// src/hooks/useLogout.ts
"use client";

import { api } from "@/lib/api";
import { useMe } from "./useMe";
import { useRouter } from "next/navigation";

export function useLogout() {
  const { reload } = useMe();
  const router = useRouter();

  const logout = async () => {
    try {
      await api.post("/api/auth/logout/"); // Django limpia cookies
    } catch (e) {
      console.error(e);
    } finally {
      await reload(); // borrará el user de SWR
      router.replace("/login");
    }
  };

  return logout;
}
