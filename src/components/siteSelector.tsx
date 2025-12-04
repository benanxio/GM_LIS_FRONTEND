// src/components/SedeSelector.tsx
"use client";

import { useState } from "react";
import { useMe } from "@/hooks/useMe";
import { api } from "@/lib/api";

export function SedeSelector() {
  const { user, reload } = useMe();
  const [loading, setLoading] = useState(false);

  if (!user) return null;
  if (!user.sedes || user.sedes.length <= 1) return null;

  const currentId = user.current_sede?.id ?? "";

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sedeId = Number(e.target.value);
    setLoading(true);
    try {
      await api.patch("/api/auth/current-sede/", { sede_id: sedeId });
      await reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <select value={currentId} onChange={onChange} disabled={loading}>
      {user.sedes.map((s) => (
        <option key={s.id} value={s.id}>
          {s.name}
        </option>
      ))}
    </select>
  );
}
