export interface JobDescription {
  id?: string;
  content: string;
  preferences: JobPreferences;
  companyId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobPreferences {
  education?: string;
  certifications?: string;
  titles?: string;
  skills?: string;
  yearsOfExperience?: string;
}

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  career: string;
  compatibilityPercentage: number;
  compatibilityReason: string;
  isDiscarded: boolean;
  references: Reference[];
  resumeData: ResumeData;
  createdAt: string;
}

export interface Reference {
  name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface ResumeData {
  education: string[];
  experience: WorkExperience[];
  skills: string[];
  certifications: string[];
  languages: string[];
  summary: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  isCurrent: boolean;
}

export interface RecruitmentProcess {
  id: string;
  jobDescription: JobDescription;
  uploadedFiles: File[];
  resumes: File[];
  candidates: Candidate[];
  status: ProcessStatus;
  createdAt: string;
  updatedAt: string;
}

export enum ProcessStatus {
  DRAFT = 'draft',
  UPLOADING = 'uploading',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  ERROR = 'error'
}

export interface ProcessingStep {
  id: string;
  name: string;
  description: string;
  status: StepStatus;
  progress: number;
}

export enum StepStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ERROR = 'error'
}

export interface AIImprovementRequest {
  originalText: string;
}

export interface AIImprovementResponse {
  improvedText: string;
  suggestions: string[];
}