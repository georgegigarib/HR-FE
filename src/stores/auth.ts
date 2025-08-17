import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User, AuthTokens, LoginCredentials, RegisterData } from '@/domain/models/User';
import { UserRole } from '@/domain/models/User';
import { LoginUseCase } from '@/domain/use-cases/LoginUseCase';
import { RegisterUseCase } from '@/domain/use-cases/RegisterUseCase';
import { RefreshTokenUseCase } from '@/domain/use-cases/RefreshTokenUseCase';
import { LogoutUseCase } from '@/domain/use-cases/LogoutUseCase';
import { GetCurrentUserUseCase } from '@/domain/use-cases/GetCurrentUserUseCase';
import { ValidateCompanyIdUseCase } from '@/domain/use-cases/ValidateCompanyIdUseCase';
import { RequestPasswordResetUseCase } from '@/domain/use-cases/RequestPasswordResetUseCase';
import { ResetPasswordUseCase } from '@/domain/use-cases/ResetPasswordUseCase';
import { AuthHttpRepository } from '@/infrastructure/http/AuthHttpRepository';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

// Configuración de cookies
const COOKIE_OPTIONS = {
  secure: import.meta.env.PROD,
  sameSite: 'strict' as const,
  path: '/'
};

const ACCESS_TOKEN_COOKIE = 'hr_access_token';
const REFRESH_TOKEN_COOKIE = 'hr_refresh_token';
const USER_DATA_COOKIE = 'hr_user_data';

// Utilidades para cookies
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  const cookieValue = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=${COOKIE_OPTIONS.path}; ${COOKIE_OPTIONS.secure ? 'secure;' : ''} samesite=${COOKIE_OPTIONS.sameSite}`;
  document.cookie = cookieValue;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${COOKIE_OPTIONS.path};`;
};

export const useAuthStore = defineStore('auth', () => {
  // Repositorio y casos de uso
  const authRepository = new AuthHttpRepository();
  const loginUseCase = new LoginUseCase(authRepository);
  const registerUseCase = new RegisterUseCase(authRepository);
  const refreshTokenUseCase = new RefreshTokenUseCase(authRepository);
  const logoutUseCase = new LogoutUseCase(authRepository);
  const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);
  const validateCompanyIdUseCase = new ValidateCompanyIdUseCase(authRepository);
  const requestPasswordResetUseCase = new RequestPasswordResetUseCase(authRepository);
  const resetPasswordUseCase = new ResetPasswordUseCase(authRepository);
  
  // Estado reactivo
  const user = ref<User | null>(null);
  const accessToken = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);
  const isLoading = ref(false);
  const isInitialized = ref(false);
  
  // Computed properties
  const isAuthenticated = computed(() => !!user.value && !!accessToken.value);
  const isAdmin = computed(() => user.value?.role === UserRole.ADMIN);
  const isEmployee = computed(() => user.value?.role === UserRole.EMPLOYEE);
  const userFullName = computed(() => {
    if (!user.value) return '';
    return `${user.value.firstName} ${user.value.lastName}`;
  });
  
  // Inicializar desde cookies
  const initializeFromCookies = async () => {
    try {
      const storedAccessToken = getCookie(ACCESS_TOKEN_COOKIE);
      const storedRefreshToken = getCookie(REFRESH_TOKEN_COOKIE);
      const storedUserData = getCookie(USER_DATA_COOKIE);
      
      if (storedAccessToken && storedRefreshToken && storedUserData) {
        accessToken.value = storedAccessToken;
        refreshToken.value = storedRefreshToken;
        user.value = JSON.parse(storedUserData);
        
        // Verificar si el token sigue siendo válido
        try {
          const currentUser = await getCurrentUserUseCase.execute();
          user.value = currentUser;
          saveUserToCookie(currentUser);
        } catch (error) {
          // Si falla, intentar refrescar el token
          await refreshAccessToken();
        }
      }
    } catch (error) {
      console.error('Error initializing from cookies:', error);
      clearAuthData();
    } finally {
      isInitialized.value = true;
    }
  };
  
  // Login
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      isLoading.value = true;
      const result = await loginUseCase.execute(credentials);
      
      // Guardar datos en el estado
      user.value = result.user;
      accessToken.value = result.tokens.accessToken;
      refreshToken.value = result.tokens.refreshToken;
      
      // Guardar en cookies
      saveTokensToCookies(result.tokens);
      saveUserToCookie(result.user);
      
      toast.success(`¡Bienvenido, ${result.user.firstName}!`);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      toast.error(message);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  
  // Registro
  const register = async (data: RegisterData): Promise<void> => {
    try {
      isLoading.value = true;
      const result = await registerUseCase.execute(data);
      
      // Guardar datos en el estado
      user.value = result.user;
      accessToken.value = result.tokens.accessToken;
      refreshToken.value = result.tokens.refreshToken;
      
      // Guardar en cookies
      saveTokensToCookies(result.tokens);
      saveUserToCookie(result.user);
      
      toast.success('¡Registro exitoso! Bienvenido a la plataforma.');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al registrarse';
      toast.error(message);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  
  // Refrescar token
  const refreshAccessToken = async (): Promise<void> => {
    try {
      if (!refreshToken.value) {
        throw new Error('No refresh token available');
      }
      
      const tokens = await refreshTokenUseCase.execute(refreshToken.value);
      
      accessToken.value = tokens.accessToken;
      refreshToken.value = tokens.refreshToken;
      
      saveTokensToCookies(tokens);
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
      throw error;
    }
  };
  
  // Logout
  const logout = async (): Promise<void> => {
    try {
      if (refreshToken.value) {
        await logoutUseCase.execute();
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      clearAuthData();
      toast.info('Sesión cerrada exitosamente');
    }
  };
  
  // Validar ID de empresa
  const validateCompanyId = async (companyId: string): Promise<{ isValid: boolean; companyName?: string }> => {
    try {
      return await validateCompanyIdUseCase.execute(companyId);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al validar empresa';
      toast.error(message);
      throw error;
    }
  };
  
  // Solicitar recuperación de contraseña
  const requestPasswordReset = async (email: string): Promise<void> => {
    try {
      isLoading.value = true;
      await requestPasswordResetUseCase.execute(email);
      toast.success('Se ha enviado un enlace de recuperación a tu email');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al solicitar recuperación';
      toast.error(message);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  
  // Restablecer contraseña
  const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    try {
      isLoading.value = true;
      await resetPasswordUseCase.execute(token, newPassword);
      toast.success('Contraseña restablecida exitosamente');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al restablecer contraseña';
      toast.error(message);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  
  // Obtener usuario actual
  const getCurrentUser = async (): Promise<void> => {
    try {
      const currentUser = await getCurrentUserUseCase.execute();
      user.value = currentUser;
      saveUserToCookie(currentUser);
    } catch (error: any) {
      console.error('Error getting current user:', error);
      throw error;
    }
  };
  
  // Funciones auxiliares
  const saveTokensToCookies = (tokens: AuthTokens) => {
    setCookie(ACCESS_TOKEN_COOKIE, tokens.accessToken, 1); // 1 día
    setCookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, 7); // 7 días
  };
  
  const saveUserToCookie = (userData: User) => {
    setCookie(USER_DATA_COOKIE, JSON.stringify(userData), 7); // 7 días
  };
  
  const clearAuthData = () => {
    user.value = null;
    accessToken.value = null;
    refreshToken.value = null;
    
    deleteCookie(ACCESS_TOKEN_COOKIE);
    deleteCookie(REFRESH_TOKEN_COOKIE);
    deleteCookie(USER_DATA_COOKIE);
  };
  
  return {
    // Estado
    user,
    accessToken,
    refreshToken,
    isLoading,
    isInitialized,
    
    // Computed
    isAuthenticated,
    isAdmin,
    isEmployee,
    userFullName,
    
    // Acciones
    initializeFromCookies,
    login,
    register,
    refreshAccessToken,
    logout,
    validateCompanyId,
    requestPasswordReset,
    resetPassword,
    getCurrentUser
  };
});