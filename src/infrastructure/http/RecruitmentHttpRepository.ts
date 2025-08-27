import type { RecruitmentRepository } from '@/domain/repositories/RecruitmentRepository';
import type {
  JobDescription,
  JobPreferences,
  Candidate,
  RecruitmentProcess,
  ProcessingStep,
  AIImprovementRequest,
  AIImprovementResponse
} from '@/domain/models/Recruitment';
import { ProcessStatus, StepStatus } from '@/domain/models/Recruitment';
import apiClient, { isBypassMode, simulateDelay } from './axiosConfig';

export class RecruitmentHttpRepository implements RecruitmentRepository {
  async createJobDescription(jobDescription: JobDescription): Promise<JobDescription> {
    if (isBypassMode()) {
      await simulateDelay();
      return {
        id: `job_${Date.now()}`,
        content: jobDescription.content,
        preferences: jobDescription.preferences,
        companyId: jobDescription.companyId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    
    const response = await apiClient.post('/recruitment/job-description', jobDescription);
    return response.data;
  }

  async improveJobDescriptionWithAI(request: AIImprovementRequest): Promise<AIImprovementResponse> {
    if (isBypassMode()) {
      await simulateDelay(3000); // Simular tiempo de procesamiento de IA
      return this.getMockAIImprovement(request.originalText);
    }
    
    const response = await apiClient.post('/recruitment/improve-ai', request);
    return response.data;
  }

  async uploadResumes(files: File[], jobDescriptionId: string): Promise<string> {
    if (isBypassMode()) {
      await simulateDelay(2000);
      return `process_${Date.now()}`;
    }
    
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`resumes[${index}]`, file);
    });
    formData.append('jobDescriptionId', jobDescriptionId);
    
    const response = await apiClient.post('/recruitment/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.processId;
  }

  async processResumes(processId: string): Promise<Candidate[]> {
    if (isBypassMode()) {
      await simulateDelay(5000); // Simular procesamiento
      return this.getMockCandidates();
    }
    
    const response = await apiClient.post(`/recruitment/${processId}/process`);
    return response.data;
  }

  async getProcessStatus(processId: string): Promise<RecruitmentProcess> {
    if (isBypassMode()) {
      await simulateDelay(500);
      return this.getMockRecruitmentProcess();
    }
    
    const response = await apiClient.get(`/recruitment/${processId}/status`);
    return response.data;
  }

  async discardCandidate(candidateId: string): Promise<void> {
    if (isBypassMode()) {
      await simulateDelay(300);
      return;
    }
    
    await apiClient.patch(`/recruitment/candidates/${candidateId}/discard`);
  }

  async generateCandidateReport(candidateId: string): Promise<Blob> {
    if (isBypassMode()) {
      await simulateDelay(800);
      const candidate = this.getMockCandidateDetail(candidateId);
      const reportContent = JSON.stringify(candidate, null, 2);
      return new Blob([reportContent], { type: 'application/json' });
    }
    
    const response = await apiClient.get(`/recruitment/candidates/${candidateId}/report`, {
      responseType: 'blob'
    });
    return response.data;
  }

  async exportContactList(candidates: Candidate[]): Promise<Blob> {
    if (isBypassMode()) {
      await simulateDelay(1500);
      const csvContent = this.generateCSV(candidates);
      return new Blob([csvContent], { type: 'text/csv' });
    }
    
    const response = await apiClient.post('/recruitment/export', { candidates }, {
      responseType: 'blob'
    });
    return response.data;
  }

  async getRecruitmentHistory(): Promise<RecruitmentProcess[]> {
    if (isBypassMode()) {
      await simulateDelay();
      return [this.getMockRecruitmentProcess()];
    }
    
    const response = await apiClient.get('/recruitment/history');
    return response.data;
  }

  // Métodos privados para respuestas mockeadas
  private getMockRecruitmentProcess(): RecruitmentProcess {
    return {
      id: `process_${Date.now()}`,
      jobDescription: {
        id: '1',
        content: 'Desarrollador Frontend con experiencia en Vue.js',
        preferences: {
          education: 'Ingeniería en Sistemas o afín',
          skills: 'Vue.js, TypeScript, HTML, CSS',
          yearsOfExperience: '3 años mínimo',
          titles: 'Desarrollador Frontend, Frontend Developer'
        },
        companyId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      status: ProcessStatus.DRAFT,
      uploadedFiles: [],
      resumes: [],
      candidates: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  private getMockAIImprovement(originalDescription: string): AIImprovementResponse {
    return {
      improvedText: `${originalDescription}\n\nMejorado con IA:\n- Agregamos requisitos específicos de experiencia\n- Incluimos habilidades técnicas detalladas\n- Definimos responsabilidades claras\n- Especificamos el perfil ideal del candidato`,
      suggestions: [
        'Agregar años de experiencia específicos',
        'Incluir tecnologías y herramientas requeridas',
        'Definir responsabilidades del puesto',
        'Especificar modalidad de trabajo'
      ],

    };
  }

  private getMockProcessStatus(): { status: ProcessStatus; steps: ProcessingStep[]; candidates?: Candidate[] } {
    return {
      status: ProcessStatus.COMPLETED,
      steps: [
        {
          id: '1',
          name: 'Conversión de PDFs',
          description: 'Convirtiendo archivos PDF a texto',
          status: StepStatus.COMPLETED,
          progress: 100
        },
        {
          id: '2',
          name: 'Análisis con IA',
          description: 'Analizando candidatos con inteligencia artificial',
          status: StepStatus.COMPLETED,
          progress: 100
        },
        {
          id: '3',
          name: 'Generación de resultados',
          description: 'Generando resultados finales del análisis',
          status: StepStatus.COMPLETED,
          progress: 100
        }
      ],
      candidates: this.getMockCandidates()
    };
  }

  private getMockCandidates(): Candidate[] {
    return [
      {
        id: 'candidate_1',
        fullName: 'María González',
        email: 'maria.gonzalez@email.com',
        phone: '+52 55 1234 5678',
        career: 'Ingeniería en Sistemas',
        compatibilityPercentage: 95,
        compatibilityReason: 'Excelente match con React, Node.js y 5 años de experiencia. Tiene certificaciones AWS y experiencia en proyectos similares.',
        resumeData: {
          education: ['Ingeniería en Sistemas - UNAM'],
          skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
          experience: [
            {
              company: 'TechCorp',
              position: 'Senior Full Stack Developer',
              startDate: '2020-01-01',
              endDate: '2024-01-01',
              description: 'Desarrollo de aplicaciones web con React y Node.js',
              isCurrent: false
            }
          ],
          certifications: ['AWS Solutions Architect', 'React Developer'],
          languages: ['Español', 'Inglés'],
          summary: 'Desarrollador Full Stack con 5 años de experiencia en React y Node.js'
        },
        references: [
          {
            name: 'Carlos Ruiz',
            position: 'Tech Lead',
            company: 'TechCorp',
            email: 'carlos.ruiz@techcorp.com',
            phone: '+52 55 9876 5432',
            relationship: 'Supervisor directo'
          }
        ],
        isDiscarded: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'candidate_2',
        fullName: 'Juan Pérez',
        email: 'juan.perez@email.com',
        phone: '+52 55 2345 6789',
        career: 'Ingeniería en Computación',
        compatibilityPercentage: 88,
        compatibilityReason: 'Buen match con las tecnologías requeridas. Tiene 4 años de experiencia y conocimientos sólidos en React y Node.js.',
        resumeData: {
          education: ['Ingeniería en Computación - IPN'],
          skills: ['React', 'Node.js', 'JavaScript', 'PostgreSQL'],
          experience: [
            {
              company: 'StartupXYZ',
              position: 'Full Stack Developer',
              startDate: '2020-06-01',
              endDate: '2024-01-01',
              description: 'Desarrollo de plataforma web con React y Node.js',
              isCurrent: false
            }
          ],
          certifications: ['JavaScript Developer'],
          languages: ['Español', 'Inglés'],
          summary: 'Desarrollador Full Stack con experiencia en React y Node.js'
        },
        references: [],
        isDiscarded: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'candidate_3',
        fullName: 'Ana López',
        email: 'ana.lopez@email.com',
        phone: '+52 55 3456 7890',
        career: 'Ingeniería de Software',
        compatibilityPercentage: 82,
        compatibilityReason: 'Buena experiencia en desarrollo web. Le falta experiencia específica en Node.js pero tiene bases sólidas.',
        resumeData: {
          education: ['Ingeniería de Software - ITESM'],
          skills: ['React', 'Vue.js', 'Python', 'Django'],
          experience: [
            {
              company: 'WebDev Inc',
              position: 'Frontend Developer',
              startDate: '2021-01-01',
              endDate: '2024-01-01',
              description: 'Desarrollo frontend con React y Vue.js',
              isCurrent: false
            }
          ],
          certifications: [],
          languages: ['Español'],
          summary: 'Desarrolladora Frontend especializada en React y Vue.js'
        },
        references: [],
        isDiscarded: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'candidate_4',
        fullName: 'Roberto Silva',
        email: 'roberto.silva@email.com',
        phone: '+52 55 4567 8901',
        career: 'Ingeniería en Sistemas',
        compatibilityPercentage: 78,
        compatibilityReason: 'Experiencia relevante pero principalmente en backend. Necesitaría capacitación en React.',
        resumeData: {
          education: ['Ingeniería en Sistemas - UAM'],
          skills: ['Node.js', 'Python', 'MySQL', 'Docker'],
          experience: [
            {
              company: 'Backend Solutions',
              position: 'Backend Developer',
              startDate: '2019-01-01',
              endDate: '2024-01-01',
              description: 'Desarrollo de APIs con Node.js y Python',
              isCurrent: false
            }
          ],
          certifications: ['Docker Certified'],
          languages: ['Español', 'Inglés'],
          summary: 'Desarrollador Backend con experiencia en Node.js y Python'
        },
        references: [],
        isDiscarded: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'candidate_5',
        fullName: 'Laura Martínez',
        email: 'laura.martinez@email.com',
        phone: '+52 55 5678 9012',
        career: 'Ingeniería en Computación',
        compatibilityPercentage: 75,
        compatibilityReason: 'Junior con potencial. Tiene conocimientos básicos pero le falta experiencia práctica.',
        resumeData: {
          education: ['Ingeniería en Computación - UNAM'],
          skills: ['JavaScript', 'HTML', 'CSS', 'React'],
          experience: [
            {
              company: 'Junior Dev Corp',
              position: 'Junior Developer',
              startDate: '2022-01-01',
              endDate: '2024-01-01',
              description: 'Desarrollo web con JavaScript y React',
              isCurrent: false
            }
          ],
          certifications: [],
          languages: ['Español'],
          summary: 'Desarrolladora Junior con conocimientos en JavaScript y React'
        },
        references: [],
        isDiscarded: false,
        createdAt: new Date().toISOString()
      }
    ];
  }

  private getMockCandidateDetail(candidateId: string): Candidate {
    const candidates = this.getMockCandidates();
    return candidates.find(c => c.id === candidateId) || candidates[0];
  }

  private generateCSV(candidates: Candidate[]): string {
    const headers = ['Nombre', 'Porcentaje de Compatibilidad', 'Email', 'Teléfono', 'Referencias'];
    const csvRows = [headers.join(',')];
    
    candidates.forEach(candidate => {
      const references = candidate.references?.map(ref => `${ref.name} (${ref.company})`).join('; ') || 'N/A';
      const row = [
        candidate.fullName,
        `${candidate.compatibilityPercentage}%`,
        candidate.email,
        candidate.phone,
        references
      ];
      csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
  }
}