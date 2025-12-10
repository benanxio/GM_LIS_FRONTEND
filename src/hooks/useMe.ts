// src/hooks/useMe.ts
"use client";

import { User } from "@/types/User";
import useSWR from "swr";

export function useMe() {
  const { data, error, isLoading, mutate } = useSWR<User>(
    "/api/user/info/",
  );

  return {
    user: data,
    loading: isLoading,
    error,
    isAuthenticated: !!data,
    reload: mutate,
  };
}
