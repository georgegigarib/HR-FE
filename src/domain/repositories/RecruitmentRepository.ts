import type { 
  JobDescription, 
  Candidate, 
  RecruitmentProcess, 
  AIImprovementRequest, 
  AIImprovementResponse 
} from '../models/Recruitment';

export interface RecruitmentRepository {
  createJobDescription(jobDescription: JobDescription): Promise<JobDescription>;
  improveJobDescriptionWithAI(request: AIImprovementRequest): Promise<AIImprovementResponse>;
  uploadResumes(files: File[], jobDescriptionId: string): Promise<string>;
  processResumes(processId: string): Promise<Candidate[]>;
  getProcessStatus(processId: string): Promise<RecruitmentProcess>;
  discardCandidate(candidateId: string): Promise<void>;
  generateCandidateReport(candidateId: string): Promise<Blob>;
  exportContactList(candidates: Candidate[]): Promise<Blob>;
  getRecruitmentHistory(): Promise<RecruitmentProcess[]>;
}