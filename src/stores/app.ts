import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type {
  RecruitmentProcess,
  JobDescription,
  JobPreferences,
  Candidate,
  ProcessingStep,
  AIImprovementResponse
} from '@/domain/models/Recruitment';
import { ProcessStatus } from '@/domain/models/Recruitment';
import { 
  CreateJobDescriptionUseCase,
  ImproveJobDescriptionWithAIUseCase,
  UploadResumesUseCase,
  ProcessResumesUseCase,
  GetProcessStatusUseCase,
  DiscardCandidateUseCase,
  GenerateCandidateReportUseCase,
  ExportContactListUseCase
} from '@/domain/use-cases/RecruitmentUseCases';
import { RecruitmentHttpRepository } from '@/infrastructure/http/RecruitmentHttpRepository';
import { toast } from 'vue3-toastify';

export const useAppStore = defineStore('app', () => {
  // Repositorio y casos de uso
  const recruitmentRepository = new RecruitmentHttpRepository();
  // Use cases individuales para recruitment
  const createJobDescriptionUseCase = new CreateJobDescriptionUseCase(recruitmentRepository);
  const improveJobDescriptionWithAIUseCase = new ImproveJobDescriptionWithAIUseCase(recruitmentRepository);
  const uploadResumesUseCase = new UploadResumesUseCase(recruitmentRepository);
  const processResumesUseCase = new ProcessResumesUseCase(recruitmentRepository);
  const getProcessStatusUseCase = new GetProcessStatusUseCase(recruitmentRepository);
  const discardCandidateUseCase = new DiscardCandidateUseCase(recruitmentRepository);
  const generateCandidateReportUseCase = new GenerateCandidateReportUseCase(recruitmentRepository);
  const exportContactListUseCase = new ExportContactListUseCase(recruitmentRepository);
  
  // Estado del proceso de reclutamiento
  const currentProcess = ref<RecruitmentProcess | null>(null);
  const processingSteps = ref<ProcessingStep[]>([]);
  const candidates = ref<Candidate[]>([]);
  const isProcessing = ref(false);
  const uploadedFiles = ref<File[]>([]);
  
  // Estado de la aplicación
  const isLoading = ref(false);
  const currentStep = ref(1); // 1: Job Description, 2: Upload PDFs, 3: Processing/Results
  
  // Estado de mejora con IA
  const aiImprovement = ref<AIImprovementResponse | null>(null);
  const isImprovingWithAI = ref(false);
  
  // Computed properties
  const topCandidates = computed(() => {
    return candidates.value
      .filter(c => !c.isDiscarded)
      .sort((a, b) => b.compatibilityPercentage - a.compatibilityPercentage)
      .slice(0, 5);
  });
  
  const otherCandidates = computed(() => {
    return candidates.value
      .filter(c => !c.isDiscarded)
      .sort((a, b) => b.compatibilityPercentage - a.compatibilityPercentage)
      .slice(5);
  });
  
  const discardedCandidates = computed(() => {
    return candidates.value
      .filter(c => c.isDiscarded)
      .sort((a, b) => b.compatibilityPercentage - a.compatibilityPercentage);
  });
  
  const allCandidatesOrdered = computed(() => {
    return [
      ...topCandidates.value,
      ...otherCandidates.value,
      ...discardedCandidates.value
    ];
  });
  
  const canProceedToStep2 = computed(() => {
    return currentProcess.value?.jobDescription?.content ? currentProcess.value.jobDescription.content.trim().length > 0 : false;
  });
  
  const canProceedToStep3 = computed(() => {
    return uploadedFiles.value.length > 0;
  });
  
  const isProcessComplete = computed(() => {
    return currentProcess.value?.status === ProcessStatus.COMPLETED;
  });
  
  // Acciones del proceso de reclutamiento
  const createJobDescription = async (jobDescription: JobDescription, preferences: JobPreferences): Promise<void> => {
    try {
      isLoading.value = true;
      const jobDescriptionData = {
        content: jobDescription.content,
        preferences,
        companyId: 'mock-company-id'
      };
      const createdJobDescription = await createJobDescriptionUseCase.execute(jobDescriptionData);
      
      // Crear el proceso completo
      currentProcess.value = {
        id: createdJobDescription.id!,
        jobDescription: createdJobDescription,
        status: ProcessStatus.DRAFT,
        candidates: [],
        uploadedFiles: [],
        resumes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      toast.success('Descripción del trabajo creada exitosamente');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al crear la descripción del trabajo';
      toast.error(message);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  
  const improveJobDescriptionWithAI = async (jobDescription: string): Promise<AIImprovementResponse> => {
    try {
      isImprovingWithAI.value = true;
      const improvementRequest = {
         originalText: jobDescription
       };
      const improvement = await improveJobDescriptionWithAIUseCase.execute(improvementRequest);
      aiImprovement.value = improvement;
      return improvement;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al mejorar con IA';
      toast.error(message);
      throw error;
    } finally {
      isImprovingWithAI.value = false;
    }
  };
  
  const uploadResumes = async (files: File[]): Promise<void> => {
    try {
      if (!currentProcess.value) {
        throw new Error('No hay proceso activo');
      }
      
      isLoading.value = true;
      
      // const processId = await uploadResumesUseCase.execute(files, currentProcess.value!.jobDescription.id!);
      
      uploadedFiles.value = files;
      toast.success(`${files.length} CVs subidos exitosamente`);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al subir los CVs';
      toast.error(message);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  
  const processResumes = async (): Promise<void> => {
    try {
      if (!currentProcess.value) {
        throw new Error('No hay proceso activo');
      }
      
      isProcessing.value = true;
      
      const processedCandidates = await processResumesUseCase.execute(currentProcess.value.id);
      
      // Actualizar el estado del proceso
      if (currentProcess.value) {
        currentProcess.value.status = ProcessStatus.COMPLETED;
        currentProcess.value.updatedAt = new Date().toISOString();
      }
      
      // Asignar los candidatos procesados
      candidates.value = processedCandidates;
      
      // El procesamiento se maneja directamente en la función processCandidates
      toast.success('Procesamiento completado exitosamente');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al procesar los CVs';
      toast.error(message);
      throw error;
    } finally {
      isProcessing.value = false;
    }
  };
  
  const monitorProcessing = async (): Promise<void> => {
    if (!currentProcess.value) return;
    
    const progressInterval = setInterval(async () => {
      try {
        const processStatus = await getProcessStatusUseCase.execute(currentProcess.value!.id);
        
        // Actualizar el proceso actual con el estado recibido
        if (currentProcess.value) {
          currentProcess.value.status = processStatus.status;
          currentProcess.value.updatedAt = new Date().toISOString();
        }
        
        if (processStatus.status === ProcessStatus.COMPLETED) {
          clearInterval(progressInterval);
          isProcessing.value = false;
          // Obtener candidatos del proceso completado
          candidates.value = processStatus.candidates || [];
          toast.success('¡Procesamiento completado exitosamente!');
        } else if (processStatus.status === ProcessStatus.ERROR) {
          clearInterval(progressInterval);
          isProcessing.value = false;
          toast.error('Error en el procesamiento');
        }
      } catch (error) {
        console.error('Error monitoring process:', error);
        toast.error('Error al monitorear el procesamiento');
        clearInterval(progressInterval);
        isProcessing.value = false;
      }
    }, 2000);
  };
  
  const discardCandidate = async (candidateId: string): Promise<void> => {
    try {
      if (!currentProcess.value) return;
      
      await discardCandidateUseCase.execute(candidateId);
      
      // Actualizar estado local
      const candidate = candidates.value.find(c => c.id === candidateId);
      if (candidate) {
        candidate.isDiscarded = true;
      }
      
      toast.success('Candidato descartado');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al descartar candidato';
      toast.error(message);
      throw error;
    }
  };
  
  const generateCandidateReport = async (candidateId: string): Promise<string> => {
    try {
      if (!currentProcess.value) {
        throw new Error('No hay proceso activo');
      }
      
      const reportBlob = await generateCandidateReportUseCase.execute(candidateId);
      const reportUrl = URL.createObjectURL(reportBlob);
      return reportUrl;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al generar reporte';
      toast.error(message);
      throw error;
    }
  };
  
  const exportContactList = async (): Promise<string> => {
    try {
      if (!currentProcess.value) {
        throw new Error('No hay proceso activo');
      }
      
      const exportBlob = await exportContactListUseCase.execute(candidates.value);
      const exportUrl = URL.createObjectURL(exportBlob);
      toast.success('Lista de contactos exportada exitosamente');
      return exportUrl;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al exportar lista de contactos';
      toast.error(message);
      throw error;
    }
  };
  
  // Acciones de navegación
  const goToStep = (step: number): void => {
    if (step < 1 || step > 3) return;
    
    // Validaciones antes de cambiar de paso
    if (step === 2 && !canProceedToStep2.value) {
      toast.warning('Completa la descripción del trabajo antes de continuar');
      return;
    }
    
    if (step === 3 && !canProceedToStep3.value) {
      toast.warning('Sube al menos un CV antes de continuar');
      return;
    }
    
    currentStep.value = step;
  };
  
  const nextStep = (): void => {
    goToStep(currentStep.value + 1);
  };
  
  const previousStep = (): void => {
    goToStep(currentStep.value - 1);
  };
  
  // Acciones de limpieza
  const resetProcess = (): void => {
    currentProcess.value = null;
    processingSteps.value = [];
    candidates.value = [];
    uploadedFiles.value = [];
    aiImprovement.value = null;
    currentStep.value = 1;
    isProcessing.value = false;
    isLoading.value = false;
    isImprovingWithAI.value = false;
  };
  
  const clearAIImprovement = (): void => {
    aiImprovement.value = null;
  };
  
  return {
    // Estado
    currentProcess,
    recruitmentProcess: currentProcess, // Alias para compatibilidad
    processingSteps,
    candidates,
    isProcessing,
    uploadedFiles,
    isLoading,
    currentStep,
    aiImprovement,
    isImprovingWithAI,
    
    // Computed
    topCandidates,
    otherCandidates,
    discardedCandidates,
    allCandidatesOrdered,
    canProceedToStep2,
    canProceedToStep3,
    isProcessComplete,
    
    // Acciones
    createJobDescription,
    improveJobDescriptionWithAI,
    uploadResumes,
    processResumes,
    discardCandidate,
    generateCandidateReport,
    exportContactList,
    
    // Navegación
    goToStep,
    nextStep,
    previousStep,
    
    // Limpieza
    resetProcess,
    clearAIImprovement
  };
});