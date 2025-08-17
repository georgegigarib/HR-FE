import type { AuthRepository } from '@/domain/repositories/AuthRepository';
import type { User, AuthTokens, LoginCredentials, RegisterData } from '@/domain/models/User';
import { UserRole, CompanyPlan } from '@/domain/models/User';
import apiClient, { isBypassMode, simulateDelay } from './axiosConfig';

export class AuthHttpRepository implements AuthRepository {
  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    if (isBypassMode()) {
      await simulateDelay();
      return this.getMockLoginResponse(credentials.email);
    }
    
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  }

  async register(data: RegisterData): Promise<{ user: User; tokens: AuthTokens }> {
    if (isBypassMode()) {
      await simulateDelay();
      return this.getMockRegisterResponse(data);
    }
    
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    if (isBypassMode()) {
      await simulateDelay(500);
      return this.getMockTokens();
    }
    
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    return response.data;
  }

  async logout(): Promise<void> {
    if (isBypassMode()) {
      await simulateDelay(300);
      return;
    }
    
    await apiClient.post('/auth/logout');
  }

  async getCurrentUser(): Promise<User> {
    if (isBypassMode()) {
      await simulateDelay(500);
      return this.getMockUser();
    }
    
    const response = await apiClient.get('/auth/me');
    return response.data;
  }

  async validateCompanyId(companyId: string): Promise<{ isValid: boolean; companyName?: string }> {
    if (isBypassMode()) {
      await simulateDelay(800);
      return this.getMockCompanyValidation(companyId);
    }
    
    const response = await apiClient.get(`/companies/${companyId}/validate`);
    return response.data;
  }

  async requestPasswordReset(email: string): Promise<void> {
    if (isBypassMode()) {
      await simulateDelay(1200);
      return;
    }
    
    await apiClient.post('/auth/password-reset/request', { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    if (isBypassMode()) {
      await simulateDelay(1000);
      return;
    }
    
    await apiClient.post('/auth/password-reset/confirm', { token, newPassword });
  }

  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    if (isBypassMode()) {
      await simulateDelay(200);
      return {
        status: 'ok',
        timestamp: new Date().toISOString()
      };
    }
    
    const response = await apiClient.get('/health');
    return response.data;
  }

  // Métodos privados para respuestas mockeadas
  private getMockLoginResponse(email: string): { user: User; tokens: AuthTokens } {
    const user = this.getMockUser(email);
    const tokens = this.getMockTokens();
    return { user, tokens };
  }

  private getMockRegisterResponse(data: RegisterData): { user: User; tokens: AuthTokens } {
    const user: User = {
      id: `user_${Date.now()}`,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      companyId: data.companyId || `company_${Date.now()}`,
      isActive: data.role === UserRole.ADMIN,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const tokens = this.getMockTokens();
    return { user, tokens };
  }

  private getMockUser(email?: string): User {
    return {
      id: 'user_123',
      email: email || 'admin@company.com',
      firstName: 'Juan',
      lastName: 'Pérez',
      role: UserRole.ADMIN,
      companyId: 'company_123',
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    };
  }

  private getMockTokens(): AuthTokens {
    return {
      accessToken: `mock_access_token_${Date.now()}`,
      refreshToken: `mock_refresh_token_${Date.now()}`,
      expiresIn: 3600
    };
  }

  private getMockCompanyValidation(companyId: string): { isValid: boolean; companyName?: string } {
    const validCompanies = {
      'COMP001': 'TechCorp Solutions',
      'COMP002': 'Innovate Industries',
      'COMP003': 'Digital Dynamics',
      'TEST123': 'Test Company'
    };
    
    const companyName = validCompanies[companyId as keyof typeof validCompanies];
    return {
      isValid: !!companyName,
      companyName
    };
  }
}