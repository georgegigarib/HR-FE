<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
    </div>
    
    <div class="max-w-md w-full space-y-8 relative z-10">
      <!-- Header -->
      <div class="text-center">
        <!-- Logo/Icon -->
        <div class="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        
        <h2 class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
          {{ $t('auth.login.title') }}
        </h2>
        <p class="mt-3 text-base text-gray-600 font-medium">
          {{ $t('auth.login.subtitle') }}
        </p>
      </div>

      <!-- Login Form -->
      <BaseCard class="mt-8 backdrop-blur-sm bg-white/80 border-0 shadow-2xl" padding="xl">
        <form @submit.prevent="handleLogin" class="space-y-7">
          <!-- Email -->
          <div class="transform transition-all duration-300 hover:scale-[1.02]">
            <BaseInput
              v-model="form.email"
              type="email"
              :label="$t('auth.fields.email')"
              :placeholder="$t('auth.placeholders.email')"
              :error="errors.email"
              required
              autocomplete="email"
              class="focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300"
            />
          </div>

          <!-- Password -->
          <div class="transform transition-all duration-300 hover:scale-[1.02]">
            <BaseInput
              v-model="form.password"
              type="password"
              :label="$t('auth.fields.password')"
              :placeholder="$t('auth.placeholders.password')"
              :error="errors.password"
              required
              autocomplete="current-password"
              class="focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300"
            />
          </div>

          <!-- Remember me -->
          <div class="flex items-center justify-between py-2">
            <div class="flex items-center group">
              <input
                id="remember-me"
                v-model="form.rememberMe"
                type="checkbox"
                class="h-5 w-5 text-blue-600 focus:ring-blue-500 focus:ring-2 border-gray-300 rounded-md transition-all duration-200 group-hover:border-blue-400"
              >
              <label for="remember-me" class="ml-3 block text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors cursor-pointer">
                {{ $t('auth.login.rememberMe') }}
              </label>
            </div>

            <div class="text-sm">
              <router-link
                to="/auth/forgot-password"
                class="font-semibold text-blue-600 hover:text-blue-700 transition-all duration-200 hover:underline underline-offset-2"
              >
                {{ $t('auth.login.forgotPassword') }}
              </router-link>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <BaseButton
              type="submit"
              variant="primary"
              size="lg"
              :loading="authStore.isLoading"
              :loading-text="$t('auth.login.loggingIn')"
              full-width
              class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg py-4"
            >
              {{ $t('auth.login.submit') }}
            </BaseButton>
          </div>
        </form>

        <!-- Divider -->
        <div class="mt-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white/80 text-gray-500 font-medium backdrop-blur-sm">{{ $t('auth.or') }}</span>
            </div>
          </div>
        </div>

        <!-- Register Link -->
        <div class="mt-8 text-center">
          <p class="text-base text-gray-600">
            {{ $t('auth.login.noAccount') }}
            <router-link
              to="/auth/register"
              class="font-semibold text-blue-600 hover:text-blue-700 transition-all duration-200 hover:underline underline-offset-2 ml-1"
            >
              {{ $t('auth.login.signUp') }}
            </router-link>
          </p>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue3-toastify';
import { useAuthStore } from '@/stores/auth';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
});

const errors = ref<Record<string, string>>({});

const validateForm = (): boolean => {
  errors.value = {};
  
  if (!form.email) {
    errors.value.email = t('auth.validation.emailRequired');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.value.email = t('auth.validation.emailInvalid');
  }
  
  if (!form.password) {
    errors.value.password = t('auth.validation.passwordRequired');
  } else if (form.password.length < 6) {
    errors.value.password = t('auth.validation.passwordMinLength');
  }
  
  return Object.keys(errors.value).length === 0;
};

const handleLogin = async () => {
  if (!validateForm()) {
    return;
  }
  
  try {
    await authStore.login({
      email: form.email,
      password: form.password
    });
    
    toast.success(t('auth.login.success'));
    
    // Redirect based on user role
    const redirectPath = authStore.user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/employee';
    router.push(redirectPath);
  } catch (error: any) {
    toast.error(error.message || t('auth.login.error'));
  }
};
</script>