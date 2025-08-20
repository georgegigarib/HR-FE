<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
          </svg>
        </div>
        
        <h2 class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
          {{ $t('auth.register.title') }}
        </h2>
        <p class="mt-3 text-base text-gray-600 font-medium">
          {{ currentStep === 1 ? $t('auth.register.step1Subtitle') : $t('auth.register.step2Subtitle') }}
        </p>
      </div>

      <!-- Progress Steps -->
      <div class="flex items-center justify-center space-x-6 bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
        <div class="flex items-center">
          <div :class="stepClasses(1)" class="transform transition-all duration-300">
            <span class="text-sm font-bold">1</span>
          </div>
          <span class="ml-3 text-sm font-semibold transition-colors duration-300" :class="currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'">
            {{ $t('auth.register.step1') }}
          </span>
        </div>
        <div class="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out" :style="{ width: currentStep >= 2 ? '100%' : '0%' }" />
        </div>
        <div class="flex items-center">
          <div :class="stepClasses(2)" class="transform transition-all duration-300">
            <span class="text-sm font-bold">2</span>
          </div>
          <span class="ml-3 text-sm font-semibold transition-colors duration-300" :class="currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'">
            {{ $t('auth.register.step2') }}
          </span>
        </div>
      </div>

      <!-- Registration Form -->
      <BaseCard class="mt-8 backdrop-blur-sm bg-white/80 border-0 shadow-2xl" padding="lg">
        <!-- Step 1: Basic Information -->
        <form v-if="currentStep === 1" @submit.prevent="handleStep1" class="space-y-6">
          <!-- Full Name -->
          <div class="transform transition-all duration-300 hover:scale-[1.02]">
            <BaseInput
              v-model="form.fullName"
              type="text"
              :label="$t('auth.fields.fullName')"
              :placeholder="$t('auth.placeholders.fullName')"
              :error="errors.fullName"
              required
              autocomplete="name"
              class="focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300"
            />
          </div>

          <!-- First Name -->
          <div class="transform transition-all duration-300 hover:scale-[1.02]">
            <BaseInput
              v-model="form.firstName"
              type="text"
              :label="$t('auth.fields.firstName')"
              :placeholder="$t('auth.placeholders.firstName')"
              :error="errors.firstName"
              required
              autocomplete="given-name"
              class="focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300"
            />
          </div>

          <!-- Last Name -->
          <div class="transform transition-all duration-300 hover:scale-[1.02]">
            <BaseInput
              v-model="form.lastName"
              type="text"
              :label="$t('auth.fields.lastName')"
              :placeholder="$t('auth.placeholders.lastName')"
              :error="errors.lastName"
              required
              autocomplete="family-name"
              class="focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300"
            />
          </div>

          <!-- Email -->
          <div class="transform transition-all duration-300 hover:scale-[1.02]">
            <BaseInput
              v-model="form.email"
              type="email"
              :label="$t('auth.fields.email')"
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
              :hint="$t('auth.hints.password')"
              required
              autocomplete="new-password"
              class="focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300"
            />
          </div>

          <!-- Confirm Password -->
          <div class="transform transition-all duration-300 hover:scale-[1.02]">
            <BaseInput
              v-model="form.confirmPassword"
              type="password"
              :label="$t('auth.fields.confirmPassword')"
              :placeholder="$t('auth.placeholders.confirmPassword')"
              :error="errors.confirmPassword"
              required
              autocomplete="new-password"
              class="focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300"
            />
          </div>

          <!-- Continue Button -->
          <div class="pt-4">
            <BaseButton
              type="submit"
              variant="primary"
              size="lg"
              :loading="validatingStep1"
              :loading-text="$t('auth.register.validating')"
              full-width
              class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg py-4"
            >
              {{ $t('auth.register.continue') }}
            </BaseButton>
          </div>
        </form>

        <!-- Step 2: Role and Company Information -->
        <form v-else-if="currentStep === 2" @submit.prevent="handleStep2" class="space-y-8">
          <!-- Role Selection -->
          <div class="transform transition-all duration-300">
            <label class="block text-lg font-semibold text-gray-800 mb-4">
              {{ $t('auth.fields.role') }}
            </label>
            <div class="grid grid-cols-2 gap-6">
              <button
                type="button"
                @click="form.role = 'admin'"
                :class="roleCardClasses('admin')"
                class="group p-6 border-2 rounded-2xl text-center transition-all duration-300 hover:shadow-xl transform hover:scale-105 bg-gradient-to-br from-white to-gray-50"
              >
                <div class="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">👑</div>
                <div class="font-bold text-lg text-gray-800">{{ $t('auth.roles.admin') }}</div>
                <div class="text-sm text-gray-600 mt-2 leading-relaxed">{{ $t('auth.roles.adminDescription') }}</div>
              </button>
              <button
                type="button"
                @click="form.role = 'employee'"
                :class="roleCardClasses('employee')"
                class="group p-6 border-2 rounded-2xl text-center transition-all duration-300 hover:shadow-xl transform hover:scale-105 bg-gradient-to-br from-white to-gray-50"
              >
                <div class="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">👤</div>
                <div class="font-bold text-lg text-gray-800">{{ $t('auth.roles.employee') }}</div>
                <div class="text-sm text-gray-600 mt-2 leading-relaxed">{{ $t('auth.roles.employeeDescription') }}</div>
              </button>
            </div>
            <div v-if="errors.role" class="mt-3 text-sm text-red-600 font-medium">
              {{ errors.role }}
            </div>
          </div>

          <!-- Company Information -->
          <div v-if="form.role === 'admin'" class="transform transition-all duration-500 hover:scale-[1.02]">
            <!-- Company Name -->
            <BaseInput
              v-model="form.companyName"
              type="text"
              :label="$t('auth.fields.companyName')"
              :placeholder="$t('auth.placeholders.companyName')"
              :error="errors.companyName"
              required
              autocomplete="organization"
              class="focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300"
            />
          </div>

          <div v-else-if="form.role === 'employee'" class="transform transition-all duration-500 hover:scale-[1.02]">
            <!-- Company ID -->
            <BaseInput
              v-model="form.companyId"
              type="text"
              :label="$t('auth.fields.companyId')"
              :placeholder="$t('auth.placeholders.companyId')"
              :error="errors.companyId"
              :hint="$t('auth.hints.companyId')"
              required
              class="focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300"
            />
          </div>

          <!-- Terms and Conditions -->
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
            <div class="flex items-start space-x-4">
              <input
                id="terms"
                v-model="form.acceptTerms"
                type="checkbox"
                class="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 focus:ring-2 border-gray-300 rounded-lg transition-all duration-300 transform hover:scale-110"
              >
              <label for="terms" class="text-sm text-gray-700 leading-relaxed font-medium">
                {{ $t('auth.register.acceptTerms') }}
                <router-link to="/terms" class="text-blue-600 hover:text-blue-700 underline font-semibold transition-colors duration-300">
                  {{ $t('auth.register.termsLink') }}
                </router-link>
                {{ $t('auth.register.and') }}
                <router-link to="/privacy" class="text-blue-600 hover:text-blue-700 underline font-semibold transition-colors duration-300">
                  {{ $t('auth.register.privacyLink') }}
                </router-link>
              </label>
            </div>
            <div v-if="errors.acceptTerms" class="mt-3 text-sm text-red-600 font-medium">
              {{ errors.acceptTerms }}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-6 pt-4">
            <BaseButton
              type="button"
              variant="secondary"
              size="lg"
              @click="currentStep = 1"
              class="flex-1 transform hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg font-semibold py-4"
            >
              {{ $t('auth.register.back') }}
            </BaseButton>
            <BaseButton
              type="submit"
              variant="primary"
              size="lg"
              :loading="authStore.isLoading"
              :loading-text="$t('auth.register.creating')"
              class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl font-semibold py-4"
            >
              {{ $t('auth.register.createAccount') }}
            </BaseButton>
          </div>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <p class="text-base text-gray-700 font-medium">
            {{ $t('auth.register.alreadyHaveAccount') }}
            <router-link
              to="/login"
              class="font-bold text-blue-600 hover:text-blue-700 transition-all duration-300 hover:underline ml-2 transform hover:scale-105 inline-block"
            >
              {{ $t('auth.register.signIn') }}
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
import { UserIcon, UserGroupIcon } from '@heroicons/vue/24/outline';
import { useAuthStore } from '@/stores/auth';
import type { UserRole } from '@/domain/models/User';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();

const currentStep = ref(1);
const validatingStep1 = ref(false);

const form = reactive({
  firstName: '',
  lastName: '',
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '' as 'admin' | 'employee' | '',
  companyId: '',
  companyName: '',
  acceptTerms: false
});

const errors = ref<Record<string, string>>({});

const stepClasses = (step: number) => {
  const baseClasses = 'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300';
  if (currentStep.value >= step) {
    return `${baseClasses} bg-blue-600 text-white`;
  }
  return `${baseClasses} bg-gray-300 text-gray-600`;
};

const roleCardClasses = (role: string) => {
  const baseClasses = 'p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md';
  if (form.role === role) {
    return `${baseClasses} border-blue-500 bg-blue-50`;
  }
  return `${baseClasses} border-gray-200 hover:border-gray-300`;
};

const validateStep1 = (): boolean => {
  errors.value = {};
  
  if (!form.fullName.trim()) {
    errors.value.fullName = t('auth.validation.fullNameRequired');
  }
  
  if (!form.email) {
    errors.value.email = t('auth.validation.emailRequired');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.value.email = t('auth.validation.emailInvalid');
  }
  
  if (!form.password) {
    errors.value.password = t('auth.validation.passwordRequired');
  } else if (form.password.length < 8) {
    errors.value.password = t('auth.validation.passwordMinLength');
  }
  
  if (!form.confirmPassword) {
    errors.value.confirmPassword = t('auth.validation.confirmPasswordRequired');
  } else if (form.password !== form.confirmPassword) {
    errors.value.confirmPassword = t('auth.validation.passwordMismatch');
  }
  
  return Object.keys(errors.value).length === 0;
};

const validateStep2 = (): boolean => {
  errors.value = {};
  
  if (!form.role) {
    errors.value.role = t('auth.validation.roleRequired');
  }
  
  if (form.role === 'employee' && !form.companyId.trim()) {
    errors.value.companyId = t('auth.validation.companyIdRequired');
  }
  
  if (form.role === 'admin' && !form.companyName.trim()) {
    errors.value.companyName = t('auth.validation.companyNameRequired');
  }
  
  if (!form.acceptTerms) {
    errors.value.acceptTerms = t('auth.validation.termsRequired');
  }
  
  return Object.keys(errors.value).length === 0;
};

const handleStep1 = async () => {
  if (!validateStep1()) {
    return;
  }
  
  validatingStep1.value = true;
  
  try {
    // Simulate email validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    currentStep.value = 2;
  } catch (error: any) {
    toast.error(error.message || t('auth.register.step1Error'));
  } finally {
    validatingStep1.value = false;
  }
};

const handleStep2 = async () => {
  if (!validateStep2()) {
    return;
  }
  
  try {
    // Validate company ID if employee
    if (form.role === 'employee') {
      const isValidCompany = await authStore.validateCompanyId(form.companyId);
      if (!isValidCompany) {
        errors.value.companyId = t('auth.validation.companyIdInvalid');
        return;
      }
    }
    
    await authStore.register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      role: form.role as UserRole,
      companyId: form.role === 'employee' ? form.companyId : undefined,
      companyName: form.role === 'admin' ? form.companyName : undefined
    });
    
    toast.success(t('auth.register.success'));
    
    // Redirect to login
    router.push('/login');
  } catch (error: any) {
    toast.error(error.message || t('auth.register.error'));
  }
};
</script>