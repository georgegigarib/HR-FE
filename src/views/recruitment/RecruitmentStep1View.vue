<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <button
              @click="$router.back()"
              class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeftIcon class="w-5 h-5" />
            </button>
            <h1 class="text-2xl font-bold text-gray-900">
              {{ $t('recruitment.step1.title') }}
            </h1>
          </div>
          
          <!-- Progress -->
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium text-blue-600">{{ $t('recruitment.step') }} 1 {{ $t('recruitment.of') }} 3</span>
            <div class="w-24 bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" style="width: 33.33%"></div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Job Description Section -->
        <BaseCard class="p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">
                {{ $t('recruitment.step1.jobDescription.title') }}
              </h2>
              <p class="text-sm text-gray-600 mt-1">
                {{ $t('recruitment.step1.jobDescription.subtitle') }}
              </p>
            </div>
            
            <!-- AI Improve Button -->
            <BaseButton
              type="button"
              variant="secondary"
              size="sm"
              :loading="improvingWithAI"
              :loading-text="$t('recruitment.step1.aiImprove.improving')"
              @click="improveWithAI"
              :disabled="!form.jobDescription.trim()"
            >
              <SparklesIcon class="w-4 h-4 mr-2" />
              {{ $t('recruitment.step1.aiImprove.button') }}
            </BaseButton>
          </div>
          
          <BaseTextarea
            v-model="form.jobDescription"
            :label="$t('recruitment.step1.jobDescription.label')"
            :placeholder="$t('recruitment.step1.jobDescription.placeholder')"
            :error="errors.jobDescription"
            :hint="$t('recruitment.step1.jobDescription.hint')"
            :rows="8"
            required
            auto-grow
            show-char-count
          />
        </BaseCard>

        <!-- Preferences Section -->
        <BaseCard class="p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">
            {{ $t('recruitment.step1.preferences.title') }}
          </h2>
          
          <!-- Preference Badges -->
          <div class="flex flex-wrap gap-2 mb-6">
            <BaseBadge
              v-for="preference in preferences"
              :key="preference.key"
              :text="$t(`recruitment.step1.preferences.${preference.key}`)"
              :variant="preference.active ? 'primary' : 'secondary'"
              :addable="!preference.active"
              :closable="preference.active"
              @add="togglePreference(preference.key)"
              @close="togglePreference(preference.key)"
              @click="togglePreference(preference.key)"
              clickable
            />
          </div>
          
          <!-- Active Preference Forms -->
          <div class="space-y-6">
            <div
              v-for="preference in activePreferences"
              :key="preference.key"
              class="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <BaseTextarea
                v-model="form.preferences[preference.key as PreferenceKey]"
                :label="$t(`recruitment.step1.preferences.${preference.key}Form`)"
                :placeholder="$t(`recruitment.step1.preferences.${preference.key}Placeholder`)"
                :rows="3"
                :maxlength="500"
                show-char-count
              />
            </div>
          </div>
          
          <p v-if="activePreferences.length === 0" class="text-sm text-gray-500 italic">
            {{ $t('recruitment.step1.preferences.optional') }}
          </p>
        </BaseCard>

        <!-- Actions -->
        <div class="flex justify-between items-center">
          <BaseButton
            type="button"
            variant="secondary"
            @click="$router.back()"
          >
            {{ $t('common.cancel') }}
          </BaseButton>
          
          <BaseButton
            type="submit"
            variant="primary"
            :loading="loading"
            :loading-text="$t('recruitment.step1.saving')"
          >
            {{ $t('recruitment.step1.continue') }}
          </BaseButton>
        </div>
      </form>
    </main>

    <!-- AI Improvement Modal -->
    <BaseModal
      v-model="showAIModal"
      :title="$t('recruitment.step1.aiImprove.modalTitle')"
      size="lg"
    >
      <div class="space-y-4">
        <div>
          <h3 class="text-sm font-medium text-gray-900 mb-2">
            {{ $t('recruitment.step1.aiImprove.original') }}
          </h3>
          <div class="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 max-h-32 overflow-y-auto">
            {{ form.jobDescription }}
          </div>
        </div>
        
        <div>
          <h3 class="text-sm font-medium text-gray-900 mb-2">
            {{ $t('recruitment.step1.aiImprove.improved') }}
          </h3>
          <div class="bg-blue-50 rounded-lg p-4 text-sm text-gray-700 max-h-32 overflow-y-auto border border-blue-200">
            {{ aiImprovedText }}
          </div>
        </div>
        
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div class="flex">
            <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
            <p class="text-sm text-yellow-800">
              {{ $t('recruitment.step1.aiImprove.warning') }}
            </p>
          </div>
        </div>
      </div>
      
      <template #footer>
        <div class="flex justify-end space-x-3">
          <BaseButton
            variant="secondary"
            @click="showAIModal = false"
          >
            {{ $t('common.cancel') }}
          </BaseButton>
          <BaseButton
            variant="primary"
            @click="acceptAIImprovement"
          >
            {{ $t('recruitment.step1.aiImprove.accept') }}
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue3-toastify';
import {
  ArrowLeftIcon,
  SparklesIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline';
import { useAppStore } from '@/stores/app';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseTextarea from '@/components/ui/BaseTextarea.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseModal from '@/components/ui/BaseModal.vue';

interface PreferencesForm {
  education: string;
  certifications: string;
  titles: string;
  skills: string;
  experience: string;
}

type PreferenceKey = keyof PreferencesForm;

const { t } = useI18n();
const router = useRouter();
const appStore = useAppStore();

const loading = ref(false);
const improvingWithAI = ref(false);
const showAIModal = ref(false);
const aiImprovedText = ref('');

const form = reactive({
  jobDescription: appStore.recruitmentProcess?.jobDescription?.content || '',
  preferences: {
    education: appStore.recruitmentProcess?.jobDescription?.preferences?.education || '',
    certifications: appStore.recruitmentProcess?.jobDescription?.preferences?.certifications || '',
    titles: appStore.recruitmentProcess?.jobDescription?.preferences?.titles || '',
    skills: appStore.recruitmentProcess?.jobDescription?.preferences?.skills || '',
    experience: appStore.recruitmentProcess?.jobDescription?.preferences?.yearsOfExperience || ''
  } as PreferencesForm
});

const errors = ref<Record<string, string>>({});

const preferences = ref<Array<{ key: PreferenceKey; active: boolean }>>([
  { key: 'education', active: false },
  { key: 'certifications', active: false },
  { key: 'titles', active: false },
  { key: 'skills', active: false },
  { key: 'experience', active: false }
]);

const activePreferences = computed(() => {
  return preferences.value.filter(p => p.active);
});

// Initialize active preferences based on existing data
Object.keys(form.preferences).forEach(key => {
  if (form.preferences[key as keyof typeof form.preferences]) {
    const preference = preferences.value.find(p => p.key === key);
    if (preference) {
      preference.active = true;
    }
  }
});

const togglePreference = (key: string) => {
  const preference = preferences.value.find(p => p.key === key);
  if (preference) {
    preference.active = !preference.active;
    
    // Clear the form field if deactivating
    if (!preference.active) {
      form.preferences[key as keyof typeof form.preferences] = '';
    }
  }
};

const validateForm = (): boolean => {
  errors.value = {};
  
  if (!form.jobDescription.trim()) {
    errors.value.jobDescription = t('recruitment.step1.validation.jobDescriptionRequired');
  }
  
  return Object.keys(errors.value).length === 0;
};

const improveWithAI = async () => {
  if (!form.jobDescription.trim()) {
    toast.error(t('recruitment.step1.aiImprove.noContent'));
    return;
  }
  
  improvingWithAI.value = true;
  
  try {
    const improved = await appStore.improveJobDescriptionWithAI(form.jobDescription);
    aiImprovedText.value = improved.improvedText;
    showAIModal.value = true;
  } catch (error: any) {
    toast.error(error.message || t('recruitment.step1.aiImprove.error'));
  } finally {
    improvingWithAI.value = false;
  }
};

const acceptAIImprovement = () => {
  form.jobDescription = aiImprovedText.value;
  showAIModal.value = false;
  toast.success(t('recruitment.step1.aiImprove.accepted'));
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  
  loading.value = true;
  
  try {
    await appStore.createJobDescription(
      {
        content: form.jobDescription,
        preferences: {
          education: form.preferences.education,
          certifications: form.preferences.certifications,
          titles: form.preferences.titles,
          skills: form.preferences.skills,
          yearsOfExperience: form.preferences.experience
        },
        companyId: 'company-1' // Mock company ID for development
      },
      {
        education: form.preferences.education,
        certifications: form.preferences.certifications,
        titles: form.preferences.titles,
        skills: form.preferences.skills,
        yearsOfExperience: form.preferences.experience
      }
    );
    
    toast.success(t('recruitment.step1.success'));
    router.push('/recruitment/step-2');
  } catch (error: any) {
    toast.error(error.message || t('recruitment.step1.error'));
  } finally {
    loading.value = false;
  }
};
</script>