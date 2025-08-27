import type { AuthRepository } from '../repositories/AuthRepository';
import type { User, AuthTokens, LoginCredentials } from '../models/User';

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    return await this.authRepository.login(credentials);
  }
}