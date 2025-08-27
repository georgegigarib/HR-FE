<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <button
              v-if="!isProcessing && !isCompleted"
              @click="$router.back()"
              class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeftIcon class="w-5 h-5" />
            </button>
            <h1 class="text-2xl font-bold text-gray-900">
              {{ $t('recruitment.step3.title') }}
            </h1>
          </div>
          
          <!-- Progress -->
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium text-blue-600">{{ $t('recruitment.step') }} 3 {{ $t('recruitment.of') }} 3</span>
            <div class="w-24 bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" style="width: 100%"></div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Processing Phase -->
    <div v-if="isProcessing" class="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div class="text-center space-y-8">
        <!-- Current Step Indicator -->
        <div class="space-y-4">
          <div class="flex justify-center space-x-4">
            <template v-for="(step, index) in processingSteps" :key="index">
              <div
                :class="[
                  'flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500',
                  currentStep > index
                    ? 'bg-green-500 border-green-500 text-white'
                    : currentStep === index
                    ? 'bg-blue-500 border-blue-500 text-white animate-pulse'
                    : 'bg-gray-200 border-gray-300 text-gray-500'
                ]"
              >
                <CheckIcon v-if="currentStep > index" class="w-6 h-6" />
                <span v-else class="text-sm font-medium">{{ index + 1 }}</span>
              </div>
              
              <div
                v-if="index < processingSteps.length - 1"
                :class="[
                  'flex-1 h-0.5 self-center transition-all duration-500',
                  currentStep > index ? 'bg-green-500' : 'bg-gray-300'
                ]"
              />
            </template>
          </div>
          
          <h2 class="text-2xl font-bold text-gray-900">
            {{ $t(`recruitment.step3.processing.${processingSteps[currentStep].key}.title`) }}
          </h2>
          <p class="text-gray-600">
            {{ $t(`recruitment.step3.processing.${processingSteps[currentStep].key}.description`) }}
          </p>
        </div>
        
        <!-- Loading Animation -->
        <div class="flex justify-center">
          <div class="relative">
            <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <component :is="processingSteps[currentStep].icon" class="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div class="max-w-md mx-auto">
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>{{ $t('recruitment.step3.processing.progress') }}</span>
            <span>{{ Math.round(progress) }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
        </div>
        
        <!-- Processing Info -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
          <p class="text-sm text-blue-800">
            {{ $t('recruitment.step3.processing.info') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Results Phase -->
    <div v-else-if="isCompleted" class="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="space-y-6">
        <!-- Results Header -->
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">
              {{ $t('recruitment.step3.results.title') }}
            </h2>
            <p class="text-gray-600 mt-1">
              {{ $t('recruitment.step3.results.subtitle', { count: candidates.length }) }}
            </p>
          </div>
          
          <BaseButton
            variant="secondary"
            @click="exportContacts"
            :loading="exportingContacts"
          >
            <DocumentArrowDownIcon class="w-4 h-4 mr-2" />
            {{ $t('recruitment.step3.results.exportContacts') }}
          </BaseButton>
        </div>
        
        <!-- Top Candidates Section -->
        <BaseCard class="overflow-hidden">
          <div class="px-6 py-4 bg-green-50 border-b border-green-200">
            <h3 class="text-lg font-semibold text-green-800 flex items-center">
              <TrophyIcon class="w-5 h-5 mr-2" />
              {{ $t('recruitment.step3.results.topCandidates') }}
            </h3>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ $t('recruitment.step3.results.table.name') }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ $t('recruitment.step3.results.table.career') }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ $t('recruitment.step3.results.table.compatibility') }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ $t('recruitment.step3.results.table.actions') }}
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <template v-for="(candidate) in topCandidates" :key="candidate.id">
                  <tr
                    :class="[
                      'hover:bg-gray-50 cursor-pointer transition-colors',
                      expandedRows.includes(candidate.id) ? 'bg-blue-50' : ''
                    ]"
                    @click="toggleRowExpansion(candidate.id)"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                            <span class="text-sm font-medium text-white">
                              {{ getInitials(candidate.fullName) }}
                            </span>
                          </div>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ candidate.fullName }}</div>
                          <div class="text-sm text-gray-500">{{ candidate.email }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ candidate.career || $t('recruitment.step3.results.table.notSpecified') }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-1 mr-3">
                          <div class="w-full bg-gray-200 rounded-full h-2">
                            <div
                              class="bg-green-500 h-2 rounded-full"
                              :style="{ width: `${candidate.compatibilityPercentage}%` }"
                            ></div>
                          </div>
                        </div>
                        <span class="text-sm font-medium text-gray-900">
                          {{ candidate.compatibilityPercentage }}%
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="relative" @click.stop>
                        <button
                          @click="toggleActionMenu(candidate.id)"
                          class="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <EllipsisVerticalIcon class="w-5 h-5" />
                        </button>
                        
                        <div
                          v-if="activeActionMenu === candidate.id"
                          class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                        >
                          <div class="py-1">
                            <button
                              @click="discardCandidate(candidate.id)"
                              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <XMarkIcon class="w-4 h-4 inline mr-2" />
                              {{ $t('recruitment.step3.results.actions.discard') }}
                            </button>
                            <button
                              @click="generateReport(candidate)"
                              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <DocumentTextIcon class="w-4 h-4 inline mr-2" />
                              {{ $t('recruitment.step3.results.actions.report') }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Expanded Row -->
                  <tr v-if="expandedRows.includes(candidate.id)" class="bg-blue-50">
                    <td colspan="4" class="px-6 py-4">
                      <div class="text-sm text-gray-700">
                        <h4 class="font-medium text-gray-900 mb-2">
                          {{ $t('recruitment.step3.results.expandedRow.title') }}
                        </h4>
                        <p>{{ candidate.compatibilityReason }}</p>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </BaseCard>
        
        <!-- Other Candidates Section -->
        <BaseCard v-if="otherCandidates.length > 0" class="overflow-hidden">
          <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">
              {{ $t('recruitment.step3.results.otherCandidates') }}
            </h3>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ $t('recruitment.step3.results.table.name') }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ $t('recruitment.step3.results.table.career') }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ $t('recruitment.step3.results.table.compatibility') }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ $t('recruitment.step3.results.table.actions') }}
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <template v-for="candidate in otherCandidates" :key="candidate.id">
                  <tr
                    :class="[
                      'hover:bg-gray-50 cursor-pointer transition-colors',
                      expandedRows.includes(candidate.id) ? 'bg-blue-50' : '',
                      candidate.isDiscarded ? 'opacity-50' : ''
                    ]"
                    @click="toggleRowExpansion(candidate.id)"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <div class="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center">
                            <span class="text-sm font-medium text-white">
                              {{ getInitials(candidate.fullName) }}
                            </span>
                          </div>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ candidate.fullName }}</div>
                          <div class="text-sm text-gray-500">{{ candidate.email }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ candidate.career || $t('recruitment.step3.results.table.notSpecified') }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-1 mr-3">
                          <div class="w-full bg-gray-200 rounded-full h-2">
                            <div
                              class="bg-yellow-500 h-2 rounded-full"
                              :style="{ width: `${candidate.compatibilityPercentage}%` }"
                            ></div>
                          </div>
                        </div>
                        <span class="text-sm font-medium text-gray-900">
                          {{ candidate.compatibilityPercentage }}%
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="relative" @click.stop>
                        <button
                          @click="toggleActionMenu(candidate.id)"
                          class="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <EllipsisVerticalIcon class="w-5 h-5" />
                        </button>
                        
                        <div
                          v-if="activeActionMenu === candidate.id"
                          class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                        >
                          <div class="py-1">
                            <button
                              @click="discardCandidate(candidate.id)"
                              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <XMarkIcon class="w-4 h-4 inline mr-2" />
                              {{ $t('recruitment.step3.results.actions.discard') }}
                            </button>
                            <button
                              @click="generateReport(candidate)"
                              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <DocumentTextIcon class="w-4 h-4 inline mr-2" />
                              {{ $t('recruitment.step3.results.actions.report') }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Expanded Row -->
                  <tr v-if="expandedRows.includes(candidate.id)" class="bg-blue-50">
                    <td colspan="4" class="px-6 py-4">
                      <div class="text-sm text-gray-700">
                        <h4 class="font-medium text-gray-900 mb-2">
                          {{ $t('recruitment.step3.results.expandedRow.title') }}
                        </h4>
                        <p>{{ candidate.compatibilityReason }}</p>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </BaseCard>
        
        <!-- Actions -->
        <div class="flex justify-between items-center">
          <BaseButton
            variant="secondary"
            @click="startNewProcess"
          >
            {{ $t('recruitment.step3.results.startNew') }}
          </BaseButton>
          
          <BaseButton
            variant="primary"
            @click="$router.push('/dashboard')"
          >
            {{ $t('recruitment.step3.results.backToDashboard') }}
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Initial State -->
    <div v-else class="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <PlayIcon class="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          {{ $t('recruitment.step3.ready.title') }}
        </h2>
        <p class="text-gray-600 mb-8">
          {{ $t('recruitment.step3.ready.description') }}
        </p>
        <BaseButton
          variant="primary"
          size="lg"
          @click="startProcessing"
        >
          {{ $t('recruitment.step3.ready.start') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue3-toastify';
import {
  ArrowLeftIcon,
  CheckIcon,
  DocumentArrowDownIcon,
  TrophyIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
  DocumentTextIcon,
  PlayIcon,
  DocumentIcon,
  CpuChipIcon,
  ChartBarIcon
} from '@heroicons/vue/24/outline';
import { useAppStore } from '@/stores/app';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import type { Candidate } from '@/domain/models/Recruitment';

const { t } = useI18n();
const router = useRouter();
const appStore = useAppStore();

const isProcessing = ref(false);
const isCompleted = ref(false);
const currentStep = ref(0);
const progress = ref(0);
const expandedRows = ref<string[]>([]);
const activeActionMenu = ref<string | null>(null);
const exportingContacts = ref(false);

const processingSteps = [
  { key: 'convert', icon: DocumentIcon },
  { key: 'analyze', icon: CpuChipIcon },
  { key: 'results', icon: ChartBarIcon }
];

const candidates = computed(() => appStore.recruitmentProcess?.candidates || []);
const topCandidates = computed(() => 
  candidates.value
    .filter(c => !c.isDiscarded)
    .sort((a, b) => b.compatibilityPercentage - a.compatibilityPercentage)
    .slice(0, 5)
);
const otherCandidates = computed(() => 
  candidates.value
    .filter(c => !topCandidates.value.includes(c))
    .sort((a, b) => {
      if (a.isDiscarded && !b.isDiscarded) return 1;
      if (!a.isDiscarded && b.isDiscarded) return -1;
      return b.compatibilityPercentage - a.compatibilityPercentage;
    })
);

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const toggleRowExpansion = (candidateId: string) => {
  const index = expandedRows.value.indexOf(candidateId);
  if (index > -1) {
    expandedRows.value.splice(index, 1);
  } else {
    expandedRows.value.push(candidateId);
  }
};

const toggleActionMenu = (candidateId: string) => {
  activeActionMenu.value = activeActionMenu.value === candidateId ? null : candidateId;
};

const discardCandidate = async (candidateId: string) => {
  try {
    await appStore.discardCandidate(candidateId);
    toast.success(t('recruitment.step3.results.candidateDiscarded'));
  } catch (error: any) {
    toast.error(error.message || t('recruitment.step3.results.discardError'));
  } finally {
    activeActionMenu.value = null;
  }
};

const generateReport = (candidate: Candidate) => {
  activeActionMenu.value = null;
  const reportUrl = `/recruitment/candidate-report/${candidate.id}`;
  window.open(reportUrl, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
};

const exportContacts = async () => {
  exportingContacts.value = true;
  
  try {
    await appStore.exportContactList();
    toast.success(t('recruitment.step3.results.contactsExported'));
  } catch (error: any) {
    toast.error(error.message || t('recruitment.step3.results.exportError'));
  } finally {
    exportingContacts.value = false;
  }
};

const startNewProcess = () => {
  appStore.resetProcess();
  router.push('/recruitment/step-1');
};

const startProcessing = async () => {
  isProcessing.value = true;
  currentStep.value = 0;
  progress.value = 0;
  
  try {
    // Step 1: Convert PDFs to base64
    await simulateStep(0, async () => {
      // Simular conversión a base64
      await new Promise(resolve => setTimeout(resolve, 2000));
    });
    
    // Step 2: Send to backend for analysis
    await simulateStep(1, async () => {
      // Simular análisis de CVs
      await new Promise(resolve => setTimeout(resolve, 3000));
    });
    
    // Step 3: Process results
    await simulateStep(2, async () => {
      // Procesar resultados del análisis
      await appStore.processResumes();
    });
    
    isProcessing.value = false;
    isCompleted.value = true;
    toast.success(t('recruitment.step3.processing.completed'));
    
  } catch (error: any) {
    isProcessing.value = false;
    toast.error(error.message || t('recruitment.step3.processing.error'));
  }
};

const simulateStep = async (stepIndex: number, action: () => Promise<void>) => {
  currentStep.value = stepIndex;
  
  // Simulate progress within the step
  const stepProgress = stepIndex * 33.33;
  const stepDuration = 3000; // 3 seconds per step
  const progressInterval = 50; // Update every 50ms
  const progressIncrement = 33.33 / (stepDuration / progressInterval);
  
  const progressTimer = setInterval(() => {
    if (progress.value < stepProgress + 33.33) {
      progress.value += progressIncrement;
    }
  }, progressInterval);
  
  try {
    await action();
    await new Promise(resolve => setTimeout(resolve, stepDuration));
  } finally {
    clearInterval(progressTimer);
    progress.value = stepProgress + 33.33;
  }
};

// Close action menu when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    activeActionMenu.value = null;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  
  // Check if we should auto-start processing
  if (appStore.recruitmentProcess?.resumes?.length && !appStore.recruitmentProcess?.candidates?.length) {
    // Auto-start if we have resumes but no results yet
    setTimeout(() => {
      startProcessing();
    }, 1000);
  } else if (appStore.recruitmentProcess?.candidates?.length) {
    // Show results if we already have them
    isCompleted.value = true;
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>