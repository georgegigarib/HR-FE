import type { AuthRepository } from '../repositories/AuthRepository';
import type { AuthTokens } from '../models/User';

export class RefreshTokenUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(refreshToken: string): Promise<AuthTokens> {
    return await this.authRepository.refreshToken(refreshToken);
  }
}