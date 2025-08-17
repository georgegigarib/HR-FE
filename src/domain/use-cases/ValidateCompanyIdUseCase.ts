import type { AuthRepository } from '../repositories/AuthRepository';

export class ValidateCompanyIdUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(companyId: string): Promise<{ isValid: boolean; companyName?: string }> {
    return await this.authRepository.validateCompanyId(companyId);
  }
}