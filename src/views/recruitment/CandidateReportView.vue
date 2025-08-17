<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 print:border-none">
      <div class="max-w-4xl mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <div class="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
              <span class="text-lg font-bold text-white">
                {{ getInitials(candidate?.fullName || '') }}
              </span>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                {{ $t('recruitment.candidateReport.title') }}
              </h1>
              <p class="text-gray-600">
                {{ candidate?.fullName }}
              </p>
            </div>
          </div>
          
          <div class="flex space-x-3 print:hidden">
            <BaseButton
              variant="secondary"
              @click="printReport"
            >
              <PrinterIcon class="w-4 h-4 mr-2" />
              {{ $t('recruitment.candidateReport.print') }}
            </BaseButton>
            <BaseButton
              variant="primary"
              @click="downloadPDF"
              :loading="downloadingPDF"
            >
              <DocumentArrowDownIcon class="w-4 h-4 mr-2" />
              {{ $t('recruitment.candidateReport.downloadPDF') }}
            </BaseButton>
          </div>
        </div>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-4xl mx-auto px-6 py-16">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-600">{{ $t('recruitment.candidateReport.loading') }}</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-4xl mx-auto px-6 py-16">
      <div class="text-center">
        <ExclamationTriangleIcon class="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 class="text-xl font-semibold text-gray-900 mb-2">
          {{ $t('recruitment.candidateReport.error.title') }}
        </h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <BaseButton
          variant="primary"
          @click="loadCandidateData"
        >
          {{ $t('recruitment.candidateReport.error.retry') }}
        </BaseButton>
      </div>
    </div>

    <!-- Report Content -->
    <div v-else-if="candidate" class="max-w-4xl mx-auto px-6 py-8 space-y-8">
      <!-- Basic Information -->
      <BaseCard>
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">
            {{ $t('recruitment.candidateReport.sections.basicInfo') }}
          </h2>
        </div>
        <div class="px-6 py-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('recruitment.candidateReport.fields.fullName') }}
              </label>
              <p class="text-gray-900">{{ candidate.fullName }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('recruitment.candidateReport.fields.email') }}
              </label>
              <p class="text-gray-900">{{ candidate.email }}</p>
            </div>
            <div v-if="candidate.phone">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('recruitment.candidateReport.fields.phone') }}
              </label>
              <p class="text-gray-900">{{ candidate.phone }}</p>
            </div>
            <div v-if="candidate.career">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('recruitment.candidateReport.fields.career') }}
              </label>
              <p class="text-gray-900">{{ candidate.career }}</p>
            </div>
            <div v-if="candidate.resumeData?.experience?.length">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('recruitment.candidateReport.fields.experience') }}
              </label>
              <p class="text-gray-900">
                {{ candidate.resumeData.experience.length }} {{ $t('recruitment.candidateReport.fields.experiencePositions') }}
              </p>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Compatibility Analysis -->
      <BaseCard>
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">
            {{ $t('recruitment.candidateReport.sections.compatibility') }}
          </h2>
        </div>
        <div class="px-6 py-4">
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">
                {{ $t('recruitment.candidateReport.fields.compatibilityScore') }}
              </span>
              <span class="text-2xl font-bold text-green-600">
                {{ candidate.compatibilityPercentage }}%
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div
                class="bg-green-500 h-3 rounded-full transition-all duration-500"
                :style="{ width: `${candidate.compatibilityPercentage}%` }"
              ></div>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('recruitment.candidateReport.fields.compatibilityReason') }}
            </label>
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-gray-800 leading-relaxed">{{ candidate.compatibilityReason }}</p>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Skills & Qualifications -->
      <BaseCard v-if="candidate.resumeData?.skills?.length || candidate.resumeData?.education?.length || candidate.resumeData?.certifications?.length">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">
            {{ $t('recruitment.candidateReport.sections.qualifications') }}
          </h2>
        </div>
        <div class="px-6 py-4 space-y-6">
          <!-- Skills -->
          <div v-if="candidate.resumeData?.skills?.length">
            <label class="block text-sm font-medium text-gray-700 mb-3">
              {{ $t('recruitment.candidateReport.fields.skills') }}
            </label>
            <div class="flex flex-wrap gap-2">
              <BaseBadge
                v-for="skill in candidate.resumeData.skills"
                :key="skill"
                :text="skill"
                variant="info"
                size="sm"
              />
            </div>
          </div>
          
          <!-- Education -->
          <div v-if="candidate.resumeData?.education?.length">
            <label class="block text-sm font-medium text-gray-700 mb-3">
              {{ $t('recruitment.candidateReport.fields.education') }}
            </label>
            <div class="space-y-3">
              <div
                v-for="edu in candidate.resumeData.education"
                :key="edu"
                class="bg-gray-50 rounded-lg p-3"
              >
                <p class="text-gray-800">{{ edu }}</p>
              </div>
            </div>
          </div>
          
          <!-- Certifications -->
          <div v-if="candidate.resumeData?.certifications?.length">
            <label class="block text-sm font-medium text-gray-700 mb-3">
              {{ $t('recruitment.candidateReport.fields.certifications') }}
            </label>
            <div class="space-y-3">
              <div
                v-for="cert in candidate.resumeData.certifications"
                :key="cert"
                class="bg-gray-50 rounded-lg p-3"
              >
                <p class="text-gray-800">{{ cert }}</p>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Work Experience -->
      <BaseCard v-if="candidate.resumeData?.experience?.length">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">
            {{ $t('recruitment.candidateReport.sections.workExperience') }}
          </h2>
        </div>
        <div class="px-6 py-4">
          <div class="space-y-4">
            <div
              v-for="(experience, index) in candidate.resumeData.experience"
              :key="index"
              class="border-l-4 border-blue-200 pl-4"
            >
              <p class="text-gray-800 font-medium">{{ experience }}</p>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- References -->
      <BaseCard v-if="candidate.references?.length">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">
            {{ $t('recruitment.candidateReport.sections.references') }}
          </h2>
        </div>
        <div class="px-6 py-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="(reference, index) in candidate.references"
              :key="index"
              class="bg-gray-50 rounded-lg p-4"
            >
              <h4 class="font-medium text-gray-900 mb-2">{{ reference.name }}</h4>
              <div class="space-y-1 text-sm text-gray-600">
                <p v-if="reference.position">{{ reference.position }}</p>
                <p v-if="reference.company">{{ reference.company }}</p>
                <p v-if="reference.email">{{ reference.email }}</p>
                <p v-if="reference.phone">{{ reference.phone }}</p>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Additional Notes -->
      <BaseCard v-if="candidate.resumeData?.summary">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">
            {{ $t('recruitment.candidateReport.sections.additionalNotes') }}
          </h2>
        </div>
        <div class="px-6 py-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-gray-800 leading-relaxed">{{ candidate.resumeData.summary }}</p>
          </div>
        </div>
      </BaseCard>

      <!-- Report Footer -->
      <div class="text-center text-sm text-gray-500 pt-8 border-t border-gray-200">
        <p>
          {{ $t('recruitment.candidateReport.footer.generatedOn') }}
          {{ formatDate(new Date()) }}
        </p>
        <p class="mt-1">
          {{ $t('recruitment.candidateReport.footer.generatedBy') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue3-toastify';
import {
  PrinterIcon,
  DocumentArrowDownIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline';
import { useAppStore } from '@/stores/app';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import type { Candidate } from '@/domain/models/Recruitment';

const { t } = useI18n();
const route = useRoute();
const appStore = useAppStore();

const loading = ref(true);
const error = ref<string | null>(null);
const candidate = ref<Candidate | null>(null);
const downloadingPDF = ref(false);

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const loadCandidateData = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const candidateId = route.params.id as string;
    
    if (!candidateId) {
      throw new Error(t('recruitment.candidateReport.error.invalidId'));
    }
    
    // Try to find candidate in current results first
    const existingCandidate = appStore.recruitmentProcess?.candidates?.find(
      c => c.id === candidateId
    );
    
    if (existingCandidate) {
      candidate.value = existingCandidate;
    } else {
      // If not found, generate candidate report
      // Generar el reporte y obtener la URL
      // const reportUrl = await appStore.generateCandidateReport(candidateId);
      
      // Obtener los datos del candidato desde la lista de candidatos
      const candidateData = appStore.candidates.find(c => c.id === candidateId);
      if (candidateData) {
        candidate.value = candidateData;
      }
    }
    
    if (!candidate.value) {
      throw new Error(t('recruitment.candidateReport.error.notFound'));
    }
    
  } catch (err: any) {
    error.value = err.message || t('recruitment.candidateReport.error.loadFailed');
  } finally {
    loading.value = false;
  }
};

const printReport = () => {
  window.print();
};

const downloadPDF = async () => {
  downloadingPDF.value = true;
  
  try {
    // In a real implementation, this would generate a PDF
    // For now, we'll simulate the download
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create a blob with the HTML content (simplified approach)
    const printContent = document.documentElement.outerHTML;
    const blob = new Blob([printContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `candidate-report-${candidate.value?.fullName.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    toast.success(t('recruitment.candidateReport.downloadSuccess'));
    
  } catch (err: any) {
    toast.error(err.message || t('recruitment.candidateReport.downloadError'));
  } finally {
    downloadingPDF.value = false;
  }
};

onMounted(() => {
  loadCandidateData();
});
</script>

<style>
@media print {
  .print\:hidden {
    display: none !important;
  }
  
  .print\:border-none {
    border: none !important;
  }
  
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .bg-gray-50 {
    background-color: #f9fafb !important;
  }
  
  .bg-blue-500 {
    background-color: #3b82f6 !important;
  }
  
  .bg-green-500 {
    background-color: #10b981 !important;
  }
}
</style>