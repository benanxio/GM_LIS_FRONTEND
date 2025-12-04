"use client";

import { FormEvent, useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { useMe } from "@/hooks/useMe";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeClosedIcon } from "lucide-react";

export default function LoginPage() {
    return (
        <Suspense fallback={null /* or some spinner */}>
            <LoginPageContent />
        </Suspense>
    );
}

function LoginPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isAuthenticated, reload } = useMe();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const redirectTo = searchParams.get("from") || "/Lis";

    useEffect(() => {
        if (isAuthenticated) {
            router.replace(redirectTo);
        }
    }, [isAuthenticated, redirectTo, router]);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const form = new FormData(e.currentTarget);
        const username = String(form.get("username"));
        const password = String(form.get("password"));

        console.log({ username, password });

        try {

            await api.post("/api/token/", { username, password });

            await reload();
            router.replace(redirectTo);
        } catch (err: any) {
            console.error(err);
            setError("Credenciales inválidas o error en el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-full w-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4 mt-4">
                {/* <Image
                    className="mx-auto h-14 w-auto"
                    src="/Xpectria_logo_color.svg"
                    alt="Xpectria"
                    width={480}
                    height={480}
                /> */}
                <h2 className="mt-6 text-center text-xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                    Iniciar sesión en su cuenta
                </h2>
            </div>
            <div className="mt-8 px-4 sm:px-0 sm:mx-auto w-full sm:max-w-md">
                <div className="border border-gray-200 py-8 px-4 shadow-sm rounded-lg sm:px-8">
                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Usuario
                            </label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="block w-full mt-1 xpectria-input sm:text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Contraseña
                            </label>
                            <div className="relative mt-1">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full xpectria-input sm:text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-700 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeIcon
                                            className="h-5 w-5 text-gray-500 hover:text-gray-400"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <EyeClosedIcon
                                            className="h-5 w-5 text-gray-500 hover:text-gray-400"
                                            aria-hidden="true"
                                        />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* <div className="flex justify-end">
                            <Link
                                href="/password/forgot"
                                className="text-sm font-medium text-common-main sm:text-common-main/70 hover:text-common-main transition-colors"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div> */}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center rounded-md bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-black/50 focus:outline-none"
                        >
                            {loading ? (
                                'Ingresando...'
                            ) : (
                                'Ingresar'
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
