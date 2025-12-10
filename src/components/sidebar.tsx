"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Users,
    FileText,
    FlaskConical,
    TestTube,
    ClipboardList,
    Settings,
    Building2,
    Beaker,
    Droplets,
    Stethoscope,
    FileBarChart,
    ChevronDown,
    LogOut,
    Shield,
    UserCog,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLogout } from "@/hooks/useLogout"
import { User } from "@/types/User"
import Image from "next/image"

interface SidebarProps {
    user?: User
}

export function Sidebar({ user }: SidebarProps) {
    const pathname = usePathname()
    const router = useRouter()
    const logout = useLogout();
    const [configOpen, setConfigOpen] = useState(pathname.startsWith("/configuracion"))
    const [loggingOut, setLoggingOut] = useState(false)

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Admisión", href: "/admision", icon: ClipboardList },
        { name: "Pacientes", href: "/patients", icon: Users },
        { name: "Órdenes", href: "/ordenes", icon: FileText },
        { name: "Muestras", href: "/muestras", icon: TestTube },
        { name: "Resultados", href: "/Lis", icon: FlaskConical },
        { name: "Reportes", href: "/reportes", icon: FileBarChart },
    ]

    const configNavigation = [
        { name: "Sedes", href: "/configuracion/sedes", icon: Building2 },
        { name: "Áreas", href: "/configuracion/areas", icon: Beaker },
        { name: "Tipos de Muestra", href: "/configuracion/tipos-muestra", icon: Droplets },
        { name: "Exámenes", href: "/configuracion/examenes", icon: FlaskConical },
        { name: "Médicos", href: "/configuracion/medicos", icon: Stethoscope },
        { name: "Usuarios", href: "/configuracion/usuarios", icon: UserCog },
        { name: "Roles", href: "/configuracion/roles", icon: Shield },
    ]

    async function handleLogout() {
        setLoggingOut(true)
        logout()
        router.push("/auth/login")
    }

    // Get user initials
    const initials = user?.username.substring(0, 2).toUpperCase() || "US"

    const displayName = user?.username || "Usuario"

    return (
        <aside className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
            {/* Logo */}
            <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
                    <Image
                        src="/XpectriaWhite.svg"
                        width={100}
                        height={100}
                        alt="Xpectria Icon"
                        className="w-full h-auto m-2"
                    />
                </div>
                <div>
                    <h1 className="text-lg font-semibold">LabSys</h1>
                    <p className="text-xs text-sidebar-foreground/60">Sistema LIS</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                {/* Configuration Section */}
                <div className="mt-6">
                    <button
                        onClick={() => setConfigOpen(!configOpen)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    >
                        <div className="flex items-center gap-3">
                            <Settings className="h-5 w-5" />
                            Configuración
                        </div>
                        <ChevronDown className={cn("h-4 w-4 transition-transform", configOpen && "rotate-180")} />
                    </button>
                    {configOpen && (
                        <ul className="mt-1 space-y-1 pl-4">
                            {configNavigation.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                                isActive
                                                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                                            )}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {item.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </nav>

            <div className="border-t border-sidebar-border p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent">
                        <span className="text-sm font-medium">{initials}</span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-medium">{displayName}</p>
                        <p className="truncate text-xs text-sidebar-foreground/60">{user?.email}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                        onClick={handleLogout}
                        disabled={loggingOut}
                    >
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </aside>
    )
}
