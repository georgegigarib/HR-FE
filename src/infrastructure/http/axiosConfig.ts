import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'vue3-toastify';

// Crear instancia de Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener la IP del cliente (simulada para desarrollo)
const getClientIP = (): string => {
  // En producción, esto debería obtenerse del servidor o un servicio externo
  return localStorage.getItem('client_ip') || '127.0.0.1';
};

// Interceptor de request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore();
    
    // Agregar token de autorización si existe
    if (authStore.accessToken) {
      config.headers.set('Authorization', `Bearer ${authStore.accessToken}`);
    }
    
    // Agregar IP del cliente
    config.headers.set('X-Client-IP', getClientIP());
    config.headers.set('X-Request-ID', generateRequestId());
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de response
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const authStore = useAuthStore();
    const originalRequest = error.config;
    
    // Si el error es 401 y no es un retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Intentar refrescar el token
        if (authStore.refreshToken) {
          await authStore.refreshAccessToken();
          
          // Reintentar la request original con el nuevo token
          originalRequest.headers.Authorization = `Bearer ${authStore.accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Si falla el refresh, cerrar sesión
        authStore.logout();
        toast.error('Sesión expirada. Por favor, inicia sesión nuevamente.');
        return Promise.reject(refreshError);
      }
    }
    
    // Manejo de otros errores
    if (error.response?.status === 403) {
      toast.error('No tienes permisos para realizar esta acción.');
    } else if (error.response?.status === 429) {
      toast.error('Demasiadas solicitudes. Por favor, espera un momento.');
    } else if (error.response?.status >= 500) {
      toast.error('Error del servidor. Por favor, intenta más tarde.');
    } else if (!error.response) {
      toast.error('Error de conexión. Verifica tu conexión a internet.');
    }
    
    return Promise.reject(error);
  }
);

// Función para generar ID único de request
const generateRequestId = (): string => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Función para configurar la IP del cliente
export const setClientIP = (ip: string): void => {
  localStorage.setItem('client_ip', ip);
};

// Función para verificar si estamos en modo bypass
export const isBypassMode = (): boolean => {
  return import.meta.env.VITE_BYPASS_MODE === 'true';
};

// Función para simular delay en modo bypass
export const simulateDelay = async (ms?: number): Promise<void> => {
  if (isBypassMode()) {
    const delay = ms || parseInt(import.meta.env.VITE_MOCK_DELAY) || 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
};

export default apiClient;