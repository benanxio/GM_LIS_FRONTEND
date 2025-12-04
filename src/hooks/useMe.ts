// src/hooks/useMe.ts
"use client";

import useSWR from "swr";

export type Sede = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  username: string;
  email?: string;
  current_sede?: Sede | null;
  sedes: Sede[];
  modules: string[];
};

export function useMe() {
  const { data, error, isLoading, mutate } = useSWR<User>(
    "/api/user/info/",
    // fetcher global ya usa axios, no hace falta pasar uno aquí
  );

  return {
    user: data ?? null,
    loading: isLoading,
    error,
    isAuthenticated: !!data,
    reload: mutate,
  };
}
