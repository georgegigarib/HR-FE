import type { AuthRepository } from '../repositories/AuthRepository';
import type { User, AuthTokens, RegisterData } from '../models/User';

export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: RegisterData): Promise<{ user: User; tokens: AuthTokens }> {
    return await this.authRepository.register(data);
  }
}