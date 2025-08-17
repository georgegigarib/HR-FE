import type { UserRepository } from '@/domain/repositories/UserRepository';
import type { User, Company, AuthTokens, LoginCredentials, RegisterData } from '@/domain/models/User';
import { UserRole, CompanyPlan } from '@/domain/models/User';
import apiClient, { isBypassMode, simulateDelay } from './axiosConfig';

export class UserHttpRepository implements UserRepository {
  async getUsers(companyId: string, page: number = 1, limit: number = 10): Promise<{ users: User[]; total: number; page: number; totalPages: number }> {
    if (isBypassMode()) {
      await simulateDelay();
      return this.getMockUsers(page, limit);
    }
    
    const response = await apiClient.get(`/companies/${companyId}/users?page=${page}&limit=${limit}`);
    return response.data;
  }

  async getUserById(userId: string): Promise<User> {
    if (isBypassMode()) {
      await simulateDelay();
      return this.getMockUser(userId);
    }
    
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    if (isBypassMode()) {
      await simulateDelay();
      return this.getMockCreatedUser(userData);
    }
    
    const response = await apiClient.post('/users', userData);
    return response.data;
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    if (isBypassMode()) {
      await simulateDelay();
      return this.getMockUpdatedUser(userId, userData);
    }
    
    const response = await apiClient.patch(`/users/${userId}`, userData);
    return response.data;
  }

  async deleteUser(userId: string): Promise<void> {
    if (isBypassMode()) {
      await simulateDelay();
      return;
    }
    
    await apiClient.delete(`/users/${userId}`);
  }

  async approveUser(userId: string): Promise<User> {
    if (isBypassMode()) {
      await simulateDelay();
      return this.getMockApprovedUser(userId);
    }
    
    const response = await apiClient.patch(`/users/${userId}/approve`);
    return response.data;
  }

  async getCompany(companyId: string): Promise<Company> {
    if (isBypassMode()) {
      await simulateDelay();
      return this.getMockCompany(companyId);
    }
    
    const response = await apiClient.get(`/companies/${companyId}`);
    return response.data;
  }

  async updateCompany(companyId: string, companyData: Partial<Company>): Promise<Company> {
    if (isBypassMode()) {
      await simulateDelay();
      return this.getMockUpdatedCompany(companyId, companyData);
    }
    
    const response = await apiClient.patch(`/companies/${companyId}`, companyData);
    return response.data;
  }

  async getSubscriptionPlans(): Promise<{ plans: any[]; currentPlan?: any }> {
    if (isBypassMode()) {
      await simulateDelay();
      return this.getMockSubscriptionPlans();
    }
    
    const response = await apiClient.get('/subscription/plans');
    return response.data;
  }

  async updateSubscriptionPlan(companyId: string, planId: string): Promise<{ success: boolean; newPlan: any }> {
    if (isBypassMode()) {
      await simulateDelay(2000);
      return {
        success: true,
        newPlan: this.getMockSubscriptionPlans().plans.find(p => p.id === planId)
      };
    }
    
    const response = await apiClient.patch(`/companies/${companyId}/subscription`, { planId });
    return response.data;
  }

  // Métodos privados para respuestas mockeadas
  private getMockUsers(page: number, limit: number): { users: User[]; total: number; page: number; totalPages: number } {
    const allUsers: User[] = [
      {
        id: 'user_1',
        email: 'admin@company.com',
        firstName: 'Juan',
        lastName: 'Pérez',
        role: UserRole.ADMIN,
        companyId: 'company_123',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'user_2',
        email: 'maria.gonzalez@company.com',
        firstName: 'María',
        lastName: 'González',
        role: UserRole.EMPLOYEE,
        companyId: 'company_123',
        isActive: true,
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z'
      },
      {
        id: 'user_3',
        email: 'carlos.ruiz@company.com',
        firstName: 'Carlos',
        lastName: 'Ruiz',
        role: UserRole.EMPLOYEE,
        companyId: 'company_123',
        isActive: false,
        createdAt: '2024-01-03T00:00:00Z',
        updatedAt: '2024-01-03T00:00:00Z'
      }
    ];
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const users = allUsers.slice(startIndex, endIndex);
    
    return {
      users,
      total: allUsers.length,
      page,
      totalPages: Math.ceil(allUsers.length / limit)
    };
  }

  private getMockUser(userId?: string): User {
    return {
      id: userId || 'user_123',
      email: 'admin@company.com',
      firstName: 'Juan',
      lastName: 'Pérez',
      role: UserRole.ADMIN,
      companyId: 'company_123',
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    };
  }

  private getMockCreatedUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    return {
      ...userData,
      id: `user_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  private getMockUpdatedUser(userId: string, userData: Partial<User>): User {
    const baseUser = this.getMockUser(userId);
    return {
      ...baseUser,
      ...userData,
      updatedAt: new Date().toISOString()
    };
  }

  private getMockApprovedUser(userId: string): User {
    const user = this.getMockUser(userId);
    return {
      ...user,
      isActive: true,
      updatedAt: new Date().toISOString()
    };
  }

  private getMockCompany(companyId?: string): Company {
    return {
      id: companyId || 'company_123',
      name: 'TechCorp Solutions',
      plan: CompanyPlan.PROFESSIONAL,
      maxUsers: 5,
      currentUsers: 3,
      maxCVsPerMonth: 100,
      usedCVsThisMonth: 25,
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    };
  }

  private getMockUpdatedCompany(companyId: string, companyData: Partial<Company>): Company {
    const baseCompany = this.getMockCompany(companyId);
    return {
      ...baseCompany,
      ...companyData,
      updatedAt: new Date().toISOString()
    };
  }

  private getMockSubscriptionPlans(): { plans: any[]; currentPlan?: any } {
    const plans = [
      {
        id: 'trial',
        name: 'Prueba Gratuita',
        price: 0,
        duration: '7 días',
        maxUsers: 3,
        maxCVsPerMonth: 10,
        features: [
          'Hasta 3 usuarios',
          '10 CVs por mes',
          'Análisis básico con IA',
          'Soporte por email'
        ],
        isPopular: false
      },
      {
        id: 'basic',
        name: 'Básico',
        price: 29,
        duration: 'mes',
        maxUsers: 5,
        maxCVsPerMonth: 50,
        features: [
          'Hasta 5 usuarios',
          '50 CVs por mes',
          'Análisis avanzado con IA',
          'Exportación de reportes',
          'Soporte prioritario'
        ],
        isPopular: false
      },
      {
        id: 'professional',
        name: 'Profesional',
        price: 59,
        duration: 'mes',
        maxUsers: 8,
        maxCVsPerMonth: 100,
        features: [
          'Hasta 8 usuarios',
          '100 CVs por mes',
          'Análisis premium con IA',
          'Reportes personalizados',
          'Integraciones API',
          'Soporte 24/7'
        ],
        isPopular: true
      },
      {
        id: 'enterprise',
        name: 'Empresarial',
        price: 99,
        duration: 'mes',
        maxUsers: 10,
        maxCVsPerMonth: 200,
        features: [
          'Hasta 10 usuarios',
          '200 CVs por mes',
          'Análisis ilimitado con IA',
          'Reportes avanzados',
          'API completa',
          'Soporte dedicado',
          'Onboarding personalizado'
        ],
        isPopular: false
      }
    ];
    
    return {
      plans,
      currentPlan: plans[1] // Plan básico como actual
    };
  }

  async upgradePlan(companyId: string, planId: string): Promise<Company> {
    if (isBypassMode()) {
      await simulateDelay();
      return {
        id: '1',
        name: 'Tech Solutions Inc.',
        plan: CompanyPlan.PROFESSIONAL,
        maxUsers: 10,
        currentUsers: 3,
        maxCVsPerMonth: 100,
        usedCVsThisMonth: 15,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: new Date().toISOString()
      };
    }

    const response = await apiClient.put(`/companies/${companyId}/plan`, { planId });
    return response.data;
  }

  async getCompanyInfo(companyId: string): Promise<Company> {
    if (isBypassMode()) {
      await simulateDelay();
      return {
        id: companyId,
        name: 'Tech Solutions Inc.',
        plan: CompanyPlan.BASIC,
        maxUsers: 5,
        currentUsers: 3,
        maxCVsPerMonth: 50,
        usedCVsThisMonth: 15,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: new Date().toISOString()
      };
    }

    const response = await apiClient.get(`/companies/${companyId}`);
    return response.data;
  }

  async updateCompanyInfo(companyId: string, companyData: Partial<Company>): Promise<Company> {
    if (isBypassMode()) {
      await simulateDelay();
      return {
        id: companyId,
        name: companyData.name || 'Tech Solutions Inc.',
        plan: CompanyPlan.BASIC,
        maxUsers: 5,
        currentUsers: 3,
        maxCVsPerMonth: 50,
        usedCVsThisMonth: 15,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: new Date().toISOString()
      };
    }

    const response = await apiClient.put(`/companies/${companyId}`, companyData);
    return response.data;
  }

  async getAvailablePlans(): Promise<{ id: string; name: string; price: number; features: string[] }[]> {
    if (isBypassMode()) {
      await simulateDelay();
      return [
        {
          id: 'plan-1',
          name: 'Plan Básico',
          price: 99,
          features: ['Hasta 5 usuarios', '50 CVs por mes', 'Análisis básico']
        },
        {
          id: 'plan-2',
          name: 'Plan Premium',
          price: 199,
          features: ['Hasta 10 usuarios', '100 CVs por mes', 'Análisis avanzado', 'Reportes detallados']
        },
        {
          id: 'plan-3',
          name: 'Plan Enterprise',
          price: 399,
          features: ['Usuarios ilimitados', 'CVs ilimitados', 'Análisis completo', 'Soporte prioritario']
        }
      ];
    }

    const response = await apiClient.get('/plans');
    return response.data;
  }
}