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
      await api.post("/api/logout/");
    } catch (e) {
      console.error(e);
    } finally {
      await reload();
      router.replace("/login");
    }
  };

  return logout;
}
