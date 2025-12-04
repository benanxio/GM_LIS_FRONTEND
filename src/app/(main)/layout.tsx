// app/app/layout.tsx
"use client";

import { useMe } from "@/hooks/useMe";
import { useLogout } from "@/hooks/useLogout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAuthenticated } = useMe();
  const logout = useLogout();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return <p>Cargando sesión...</p>;
  if (!isAuthenticated) return null;

  return (
    <div>
      <header
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          padding: "8px 16px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <strong>Mi App</strong>
        <span style={{ marginLeft: "auto" }}>
          {user?.username}{" "}
          {user?.current_sede && `– ${user.current_sede.name}`}
        </span>
        <button onClick={logout}>Salir</button>
      </header>
      <main>{children}</main>
    </div>
  );
}
