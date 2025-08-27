<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
          {{ $t('auth.resetPassword.title') }}
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ $t('auth.resetPassword.subtitle') }}
        </p>
      </div>

      <!-- Form -->
      <BaseCard class="mt-8" padding="lg">
        <form v-if="!passwordReset" @submit.prevent="handleSubmit" class="space-y-6">
          <!-- New Password -->
          <BaseInput
            v-model="form.password"
            type="password"
            :label="$t('auth.fields.newPassword')"
            :placeholder="$t('auth.placeholders.newPassword')"
            :error="errors.password"
            :hint="$t('auth.hints.password')"
            required
            autocomplete="new-password"
          />

          <!-- Confirm Password -->
          <BaseInput
            v-model="form.confirmPassword"
            type="password"
            :label="$t('auth.fields.confirmPassword')"
            :placeholder="$t('auth.placeholders.confirmPassword')"
            :error="errors.confirmPassword"
            required
            autocomplete="new-password"
          />

          <!-- Submit Button -->
          <BaseButton
            type="submit"
            variant="primary"
            size="lg"
            :loading="loading"
            :loading-text="$t('auth.resetPassword.resetting')"
            full-width
          >
            {{ $t('auth.resetPassword.submit') }}
          </BaseButton>
        </form>

        <!-- Success Message -->
        <div v-else class="text-center space-y-4">
          <div class="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircleIcon class="w-8 h-8 text-green-600" />
          </div>
          
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              {{ $t('auth.resetPassword.success') }}
            </h3>
            <p class="text-sm text-gray-600">
              {{ $t('auth.resetPassword.successMessage') }}
            </p>
          </div>
          
          <div class="pt-4">
            <BaseButton
              variant="primary"
              size="md"
              @click="$router.push('/login')"
            >
              {{ $t('auth.resetPassword.goToLogin') }}
            </BaseButton>
          </div>
        </div>

        <!-- Back to Login -->
        <div v-if="!passwordReset" class="mt-6 text-center">
          <router-link
            to="/login"
            class="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors flex items-center justify-center"
          >
            <ArrowLeftIcon class="w-4 h-4 mr-1" />
            {{ $t('auth.resetPassword.backToLogin') }}
          </router-link>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue3-toastify';
import { CheckCircleIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { useAuthStore } from '@/stores/auth';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const loading = ref(false);
const passwordReset = ref(false);
const token = ref('');

const form = reactive({
  password: '',
  confirmPassword: ''
});

const errors = ref<Record<string, string>>({});

onMounted(() => {
  token.value = route.query.token as string;
  
  if (!token.value) {
    toast.error(t('auth.resetPassword.invalidToken'));
    router.push('/login');
  }
});

const validateForm = (): boolean => {
  errors.value = {};
  
  if (!form.password) {
    errors.value.password = t('auth.validation.passwordRequired');
  } else if (form.password.length < 8) {
    errors.value.password = t('auth.validation.passwordMinLength');
  }
  
  if (!form.confirmPassword) {
    errors.value.confirmPassword = t('auth.validation.confirmPasswordRequired');
  } else if (form.password !== form.confirmPassword) {
    errors.value.confirmPassword = t('auth.validation.passwordsNotMatch');
  }
  
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  
  loading.value = true;
  
  try {
    await authStore.resetPassword(token.value, form.password);
    passwordReset.value = true;
    toast.success(t('auth.resetPassword.successToast'));
  } catch (error: any) {
    toast.error(error.message || t('auth.resetPassword.error'));
  } finally {
    loading.value = false;
  }
};
</script>