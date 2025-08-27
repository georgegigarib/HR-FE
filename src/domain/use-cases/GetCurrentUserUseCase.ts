import type { AuthRepository } from '../repositories/AuthRepository';
import type { User } from '../models/User';

export class GetCurrentUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<User> {
    return await this.authRepository.getCurrentUser();
  }
}