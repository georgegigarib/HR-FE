import type { User, Company } from '../models/User';

export interface UserRepository {
  getUsers(companyId: string, page?: number, limit?: number): Promise<{ users: User[]; total: number; page: number; totalPages: number }>;
  createUser(userData: Partial<User>): Promise<User>;
  updateUser(userId: string, userData: Partial<User>): Promise<User>;
  deleteUser(userId: string): Promise<void>;
  approveUser(userId: string): Promise<User>;
  getCompanyInfo(companyId: string): Promise<Company>;
  updateCompanyInfo(companyId: string, companyData: Partial<Company>): Promise<Company>;
  getAvailablePlans(): Promise<{ id: string; name: string; price: number; features: string[] }[]>;
  upgradePlan(companyId: string, planId: string): Promise<Company>;
}