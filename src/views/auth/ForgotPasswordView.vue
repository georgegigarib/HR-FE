<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
          {{ $t('auth.forgotPassword.title') }}
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ $t('auth.forgotPassword.subtitle') }}
        </p>
      </div>

      <!-- Form -->
      <BaseCard class="mt-8" padding="lg">
        <form v-if="!emailSent" @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email -->
          <BaseInput
            v-model="form.email"
            type="email"
            :label="$t('auth.fields.email')"
            :error="errors.email"
            required
            autocomplete="email"
          />

          <!-- Submit Button -->
          <BaseButton
            type="submit"
            variant="primary"
            size="lg"
            :loading="loading"
            :loading-text="$t('auth.forgotPassword.sending')"
            full-width
          >
            {{ $t('auth.forgotPassword.submit') }}
          </BaseButton>
        </form>

        <!-- Success Message -->
        <div v-else class="text-center space-y-4">
          <div class="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircleIcon class="w-8 h-8 text-green-600" />
          </div>
          
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              {{ $t('auth.forgotPassword.emailSent') }}
            </h3>
            <p class="text-sm text-gray-600">
              {{ $t('auth.forgotPassword.checkEmail', { email: form.email }) }}
            </p>
          </div>
          
          <div class="pt-4">
            <BaseButton
              variant="secondary"
              size="md"
              @click="resetForm"
            >
              {{ $t('auth.forgotPassword.sendAnother') }}
            </BaseButton>
          </div>
        </div>

        <!-- Back to Login -->
        <div class="mt-6 text-center">
          <router-link
            to="/login"
            class="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors flex items-center justify-center"
          >
            <ArrowLeftIcon class="w-4 h-4 mr-1" />
            {{ $t('auth.forgotPassword.backToLogin') }}
          </router-link>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue3-toastify';
import { CheckCircleIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { useAuthStore } from '@/stores/auth';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const { t } = useI18n();
const authStore = useAuthStore();

const loading = ref(false);
const emailSent = ref(false);

const form = reactive({
  email: ''
});

const errors = ref<Record<string, string>>({});

const validateForm = (): boolean => {
  errors.value = {};
  
  if (!form.email) {
    errors.value.email = t('auth.validation.emailRequired');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.value.email = t('auth.validation.emailInvalid');
  }
  
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  
  loading.value = true;
  
  try {
    await authStore.requestPasswordReset(form.email);
    emailSent.value = true;
    toast.success(t('auth.forgotPassword.success'));
  } catch (error: any) {
    toast.error(error.message || t('auth.forgotPassword.error'));
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  emailSent.value = false;
  form.email = '';
  errors.value = {};
};
</script>