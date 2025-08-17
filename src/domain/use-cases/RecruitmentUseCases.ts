import type { RecruitmentRepository } from '../repositories/RecruitmentRepository';
import type { 
  JobDescription, 
  Candidate, 
  RecruitmentProcess, 
  AIImprovementRequest, 
  AIImprovementResponse 
} from '../models/Recruitment';

export class CreateJobDescriptionUseCase {
  constructor(private recruitmentRepository: RecruitmentRepository) {}

  async execute(jobDescription: JobDescription): Promise<JobDescription> {
    return await this.recruitmentRepository.createJobDescription(jobDescription);
  }
}

export class ImproveJobDescriptionWithAIUseCase {
  constructor(private recruitmentRepository: RecruitmentRepository) {}

  async execute(request: AIImprovementRequest): Promise<AIImprovementResponse> {
    return await this.recruitmentRepository.improveJobDescriptionWithAI(request);
  }
}

export class UploadResumesUseCase {
  constructor(private recruitmentRepository: RecruitmentRepository) {}

  async execute(files: File[], jobDescriptionId: string): Promise<string> {
    if (files.length > 30) {
      throw new Error('Maximum 30 files allowed');
    }
    
    const invalidFiles = files.filter(file => file.type !== 'application/pdf');
    if (invalidFiles.length > 0) {
      throw new Error('Only PDF files are allowed');
    }
    
    return await this.recruitmentRepository.uploadResumes(files, jobDescriptionId);
  }
}

export class ProcessResumesUseCase {
  constructor(private recruitmentRepository: RecruitmentRepository) {}

  async execute(processId: string): Promise<Candidate[]> {
    return await this.recruitmentRepository.processResumes(processId);
  }
}

export class GetProcessStatusUseCase {
  constructor(private recruitmentRepository: RecruitmentRepository) {}

  async execute(processId: string): Promise<RecruitmentProcess> {
    return await this.recruitmentRepository.getProcessStatus(processId);
  }
}

export class DiscardCandidateUseCase {
  constructor(private recruitmentRepository: RecruitmentRepository) {}

  async execute(candidateId: string): Promise<void> {
    return await this.recruitmentRepository.discardCandidate(candidateId);
  }
}

export class GenerateCandidateReportUseCase {
  constructor(private recruitmentRepository: RecruitmentRepository) {}

  async execute(candidateId: string): Promise<Blob> {
    return await this.recruitmentRepository.generateCandidateReport(candidateId);
  }
}

export class ExportContactListUseCase {
  constructor(private recruitmentRepository: RecruitmentRepository) {}

  async execute(candidates: Candidate[]): Promise<Blob> {
    return await this.recruitmentRepository.exportContactList(candidates);
  }
}

export class GetRecruitmentHistoryUseCase {
  constructor(private recruitmentRepository: RecruitmentRepository) {}

  async execute(): Promise<RecruitmentProcess[]> {
    return await this.recruitmentRepository.getRecruitmentHistory();
  }
}