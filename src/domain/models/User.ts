export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  companyId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee'
}

export interface Company {
  id: string;
  name: string;
  plan: CompanyPlan;
  maxUsers: number;
  currentUsers: number;
  maxCVsPerMonth: number;
  usedCVsThisMonth: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum CompanyPlan {
  TRIAL = 'trial',
  BASIC = 'basic',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise'
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  companyId?: string;
  companyName?: string;
}