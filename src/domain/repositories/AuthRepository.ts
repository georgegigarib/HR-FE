import type { User, AuthTokens, LoginCredentials, RegisterData } from '../models/User';

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }>;
  register(data: RegisterData): Promise<{ user: User; tokens: AuthTokens }>;
  refreshToken(refreshToken: string): Promise<AuthTokens>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User>;
  validateCompanyId(companyId: string): Promise<{ isValid: boolean; companyName?: string }>;
  requestPasswordReset(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
  checkHealth(): Promise<{ status: string; timestamp: string }>;
}