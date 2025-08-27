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
              {{ $t('recruitment.step2.title') }}
            </h1>
          </div>
          
          <!-- Progress -->
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium text-blue-600">{{ $t('recruitment.step') }} 2 {{ $t('recruitment.of') }} 3</span>
            <div class="w-24 bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" style="width: 66.66%"></div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="space-y-8">
        <!-- Instructions -->
        <BaseCard class="p-6">
          <div class="text-center">
            <DocumentIcon class="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 class="text-lg font-semibold text-gray-900 mb-2">
              {{ $t('recruitment.step2.instructions.title') }}
            </h2>
            <p class="text-gray-600 mb-4">
              {{ $t('recruitment.step2.instructions.subtitle') }}
            </p>
            <div class="flex justify-center space-x-6 text-sm text-gray-500">
              <div class="flex items-center">
                <CheckCircleIcon class="w-4 h-4 text-green-500 mr-1" />
                {{ $t('recruitment.step2.instructions.pdfOnly') }}
              </div>
              <div class="flex items-center">
                <CheckCircleIcon class="w-4 h-4 text-green-500 mr-1" />
                {{ $t('recruitment.step2.instructions.maxFiles', { max: 30 }) }}
              </div>
              <div class="flex items-center">
                <CheckCircleIcon class="w-4 h-4 text-green-500 mr-1" />
                {{ $t('recruitment.step2.instructions.maxSize') }}
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- File Upload Area -->
        <BaseCard class="p-6">
          <div
            ref="dropZone"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @dragenter="handleDragEnter"
            @dragleave="handleDragLeave"
            :class="[
              'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            ]"
            @click="triggerFileInput"
          >
            <input
              ref="fileInput"
              type="file"
              multiple
              accept=".pdf"
              @change="handleFileSelect"
              class="hidden"
            />
            
            <div v-if="files.length === 0">
              <CloudArrowUpIcon class="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                {{ $t('recruitment.step2.dropzone.title') }}
              </h3>
              <p class="text-gray-600 mb-4">
                {{ $t('recruitment.step2.dropzone.subtitle') }}
              </p>
              <BaseButton variant="secondary" size="sm">
                {{ $t('recruitment.step2.dropzone.browse') }}
              </BaseButton>
            </div>
            
            <div v-else class="space-y-4">
              <div class="flex items-center justify-center space-x-2">
                <DocumentIcon class="h-8 w-8 text-blue-600" />
                <span class="text-lg font-medium text-gray-900">
                  {{ $t('recruitment.step2.filesSelected', { count: files.length }) }}
                </span>
              </div>
              <BaseButton variant="secondary" size="sm">
                {{ $t('recruitment.step2.addMore') }}
              </BaseButton>
            </div>
          </div>
          
          <!-- File List -->
          <div v-if="files.length > 0" class="mt-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-sm font-medium text-gray-900">
                {{ $t('recruitment.step2.fileList.title') }}
              </h3>
              <button
                @click="clearAllFiles"
                class="text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                {{ $t('recruitment.step2.fileList.clearAll') }}
              </button>
            </div>
            
            <div class="space-y-2 max-h-64 overflow-y-auto">
              <div
                v-for="(file, index) in files"
                :key="index"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
              >
                <div class="flex items-center space-x-3">
                  <DocumentIcon class="h-5 w-5 text-red-600" />
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ file.name }}</p>
                    <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
                  </div>
                </div>
                
                <button
                  @click="removeFile(index)"
                  class="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <XMarkIcon class="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <!-- File Count Warning -->
            <div v-if="files.length >= 25" class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div class="flex">
                <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                <p class="text-sm text-yellow-800">
                  {{ $t('recruitment.step2.warnings.nearLimit', { current: files.length, max: 30 }) }}
                </p>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Actions -->
        <div class="flex justify-between items-center">
          <BaseButton
            variant="secondary"
            @click="$router.back()"
          >
            {{ $t('common.back') }}
          </BaseButton>
          
          <BaseButton
            variant="primary"
            :disabled="files.length === 0"
            :loading="loading"
            :loading-text="$t('recruitment.step2.uploading')"
            @click="handleSubmit"
          >
            {{ $t('recruitment.step2.continue') }}
          </BaseButton>
        </div>
      </div>
    </main>

    <!-- Error Modal -->
    <BaseModal
      v-model="showErrorModal"
      :title="$t('recruitment.step2.errors.title')"
      size="md"
    >
      <div class="space-y-3">
        <div v-for="error in fileErrors" :key="error.file" class="flex items-start space-x-2">
          <XCircleIcon class="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p class="text-sm font-medium text-gray-900">{{ error.file }}</p>
            <p class="text-sm text-red-600">{{ error.message }}</p>
          </div>
        </div>
      </div>
      
      <template #footer>
        <div class="flex justify-end">
          <BaseButton
            variant="primary"
            @click="showErrorModal = false"
          >
            {{ $t('common.ok') }}
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue3-toastify';
import {
  ArrowLeftIcon,
  DocumentIcon,
  CloudArrowUpIcon,
  CheckCircleIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  XCircleIcon
} from '@heroicons/vue/24/outline';
import { useAppStore } from '@/stores/app';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';

const { t } = useI18n();
const router = useRouter();
const appStore = useAppStore();

const loading = ref(false);
const isDragging = ref(false);
const showErrorModal = ref(false);
const files = ref<File[]>([]);
const fileErrors = ref<Array<{ file: string; message: string }>>([]);
const dropZone = ref<HTMLElement>();
const fileInput = ref<HTMLInputElement>();

const MAX_FILES = 30;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['application/pdf'];

// Load existing files if any
onMounted(() => {
  if (appStore.recruitmentProcess?.resumes?.length) {
    // Note: We can't restore File objects, so we'll just show the count
    // In a real app, you might store file metadata separately
  }
});

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const validateFile = (file: File): string | null => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return t('recruitment.step2.validation.invalidType');
  }
  
  if (file.size > MAX_FILE_SIZE) {
    return t('recruitment.step2.validation.fileTooLarge');
  }
  
  return null;
};

const validateFiles = (newFiles: FileList | File[]): { valid: File[]; errors: Array<{ file: string; message: string }> } => {
  const valid: File[] = [];
  const errors: Array<{ file: string; message: string }> = [];
  
  const fileArray = Array.from(newFiles);
  
  // Check total count
  if (files.value.length + fileArray.length > MAX_FILES) {
    errors.push({
      file: t('recruitment.step2.validation.general'),
      message: t('recruitment.step2.validation.tooManyFiles', { max: MAX_FILES })
    });
    return { valid, errors };
  }
  
  // Validate each file
  fileArray.forEach(file => {
    const error = validateFile(file);
    if (error) {
      errors.push({ file: file.name, message: error });
    } else {
      // Check for duplicates
      const isDuplicate = files.value.some(existingFile => 
        existingFile.name === file.name && existingFile.size === file.size
      );
      
      if (isDuplicate) {
        errors.push({
          file: file.name,
          message: t('recruitment.step2.validation.duplicate')
        });
      } else {
        valid.push(file);
      }
    }
  });
  
  return { valid, errors };
};

const addFiles = (newFiles: FileList | File[]) => {
  const { valid, errors } = validateFiles(newFiles);
  
  if (valid.length > 0) {
    files.value.push(...valid);
    toast.success(t('recruitment.step2.filesAdded', { count: valid.length }));
  }
  
  if (errors.length > 0) {
    fileErrors.value = errors;
    showErrorModal.value = true;
  }
};

const removeFile = (index: number) => {
  files.value.splice(index, 1);
};

const clearAllFiles = () => {
  files.value = [];
  toast.info(t('recruitment.step2.filesCleared'));
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    addFiles(target.files);
    target.value = ''; // Reset input
  }
};

const handleDragEnter = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = true;
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault();
  // Only set to false if we're leaving the drop zone entirely
  if (!dropZone.value?.contains(event.relatedTarget as Node)) {
    isDragging.value = false;
  }
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = false;
  
  const droppedFiles = event.dataTransfer?.files;
  if (droppedFiles && droppedFiles.length > 0) {
    addFiles(droppedFiles);
  }
};

const handleSubmit = async () => {
  if (files.value.length === 0) {
    toast.error(t('recruitment.step2.validation.noFiles'));
    return;
  }
  
  loading.value = true;
  
  try {
    await appStore.uploadResumes(files.value);
    toast.success(t('recruitment.step2.success'));
    router.push('/recruitment/step-3');
  } catch (error: any) {
    toast.error(error.message || t('recruitment.step2.error'));
  } finally {
    loading.value = false;
  }
};

// Prevent default drag behaviors on the entire page
const preventDefaults = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
};

onMounted(() => {
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    document.addEventListener(eventName, preventDefaults, false);
  });
});

onUnmounted(() => {
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    document.removeEventListener(eventName, preventDefaults, false);
  });
});
</script>