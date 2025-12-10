"use client";

import { SWRConfig } from "swr";
import { ReactNode } from "react";
import { api } from "@/lib/api";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        refreshInterval: 0,
      }}
    >
      {children}
    </SWRConfig>
  );
}
