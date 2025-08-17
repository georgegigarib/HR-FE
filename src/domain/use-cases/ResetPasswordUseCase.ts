import type { AuthRepository } from '../repositories/AuthRepository';

export class ResetPasswordUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(token: string, newPassword: string): Promise<void> {
    return await this.authRepository.resetPassword(token, newPassword);
  }
}