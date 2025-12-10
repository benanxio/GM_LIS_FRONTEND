import axios, { AxiosError } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Lógica de refresco
const refreshAuthLogic = async (failedRequest: any) => {
  try {
    // Llamamos al endpoint de refresh en Django
    // No mandamos nada, Django lee refresh desde cookie httpOnly
    await api.post("/api/token/refresh/");

    // El backend debería setear un nuevo access cookie.
    // Aquí simplemente reintentamos la request original
    return Promise.resolve();
  } catch (err) {
    // Si falla el refresh, lanzamos error para que el front cierre sesión
    return Promise.reject(err);
  }
};

// Interceptor global: si recibe 401, intenta refresh y reintenta
createAuthRefreshInterceptor(api, refreshAuthLogic, {
  statusCodes: [401],
});

// Interceptor para añadir cualquier header común (opcional)
api.interceptors.request.use((config) => {
  // Por si quieres enviar algo extra
  return config;
});

// Interceptor de respuesta para manejar errores globales (opcional)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Aquí NO manejamos 401, eso ya lo hace axios-auth-refresh
    return Promise.reject(error);
  }
);
