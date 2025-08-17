import type { AuthRepository } from '../repositories/AuthRepository';

export class RequestPasswordResetUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string): Promise<void> {
    return await this.authRepository.requestPasswordReset(email);
  }
}