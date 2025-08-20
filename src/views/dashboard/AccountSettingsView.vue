<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/dashboard" class="flex items-center space-x-2">
              <ArrowLeftIcon class="w-5 h-5 text-gray-600" />
              <span class="text-gray-600 hover:text-gray-900">{{ $t('common.back') }}</span>
            </router-link>
          </div>
          
          <h1 class="text-xl font-semibold text-gray-900">
            {{ $t('account.title') }}
          </h1>
          
          <div class="flex items-center space-x-4">
            <!-- User Menu -->
            <div class="relative" ref="userMenuRef">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-medium">{{ userInitials }}</span>
                </div>
                <ChevronDownIcon class="w-4 h-4" />
              </button>
              
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
              >
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {{ $t('auth.logout') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Navigation Tabs -->
      <div class="mb-8">
        <nav class="flex space-x-8">
          <button
            @click="activeTab = 'profile'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ $t('account.tabs.profile') }}
          </button>
          <button
            @click="activeTab = 'security'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'security'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ $t('account.tabs.security') }}
          </button>
          <button
            @click="activeTab = 'notifications'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'notifications'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ $t('account.tabs.notifications') }}
          </button>
        </nav>
      </div>

      <!-- Profile Tab -->
      <div v-if="activeTab === 'profile'">
        <BaseCard class="p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-6">
            {{ $t('account.profile.title') }}
          </h2>
          
          <form @submit.prevent="updateProfile" class="space-y-6">
            <!-- Avatar -->
            <div class="flex items-center space-x-6">
              <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                <span class="text-white text-2xl font-medium">{{ userInitials }}</span>
              </div>
              <div>
                <BaseButton variant="outline" size="sm" @click="changeAvatar">
                  {{ $t('account.profile.changeAvatar') }}
                </BaseButton>
                <p class="text-sm text-gray-500 mt-1">
                  {{ $t('account.profile.avatarHint') }}
                </p>
              </div>
            </div>
            
            <!-- Personal Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BaseInput
                v-model="profileForm.fullName"
                :label="$t('account.profile.fullName')"
                :error="profileErrors.fullName"
                required
              />
              
              <BaseInput
                v-model="profileForm.email"
                type="email"
                :label="$t('account.profile.email')"
                :error="profileErrors.email"
                required
                disabled
              />
              
              <BaseInput
                v-model="profileForm.phone"
                :label="$t('account.profile.phone')"
                :error="profileErrors.phone"
              />
              
              <BaseInput
                v-model="profileForm.position"
                :label="$t('account.profile.position')"
                :error="profileErrors.position"
              />
            </div>
            
            <!-- Company Information -->
            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-md font-medium text-gray-900 mb-4">
                {{ $t('account.profile.companyInfo') }}
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BaseInput
                  v-model="profileForm.companyName"
                  :label="$t('account.profile.companyName')"
                  disabled
                />
                
                <BaseInput
                  v-model="profileForm.role"
                  :label="$t('account.profile.role')"
                  disabled
                />
              </div>
            </div>
            
            <div class="flex justify-end">
              <BaseButton
                type="submit"
                variant="primary"
                :loading="profileLoading"
              >
                {{ $t('account.profile.save') }}
              </BaseButton>
            </div>
          </form>
        </BaseCard>
      </div>

      <!-- Security Tab -->
      <div v-if="activeTab === 'security'">
        <div class="space-y-6">
          <!-- Change Password -->
          <BaseCard class="p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-6">
              {{ $t('account.security.changePassword') }}
            </h2>
            
            <form @submit.prevent="changePassword" class="space-y-6">
              <BaseInput
                v-model="passwordForm.currentPassword"
                type="password"
                :label="$t('account.security.currentPassword')"
                :error="passwordErrors.currentPassword"
                required
              />
              
              <BaseInput
                v-model="passwordForm.newPassword"
                type="password"
                :label="$t('account.security.newPassword')"
                :error="passwordErrors.newPassword"
                :hint="$t('account.security.passwordHint')"
                required
              />
              
              <BaseInput
                v-model="passwordForm.confirmPassword"
                type="password"
                :label="$t('account.security.confirmPassword')"
                :error="passwordErrors.confirmPassword"
                required
              />
              
              <div class="flex justify-end">
                <BaseButton
                  type="submit"
                  variant="primary"
                  :loading="passwordLoading"
                >
                  {{ $t('account.security.updatePassword') }}
                </BaseButton>
              </div>
            </form>
          </BaseCard>
          
          <!-- Active Sessions -->
          <BaseCard class="p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-6">
              {{ $t('account.security.activeSessions') }}
            </h2>
            
            <div class="space-y-4">
              <div 
                v-for="session in activeSessions" 
                :key="session.id"
                class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <ComputerDesktopIcon v-if="session.device === 'desktop'" class="w-5 h-5 text-gray-600" />
                    <DevicePhoneMobileIcon v-else class="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ session.device }} - {{ session.browser }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ session.location }} • {{ $t('account.security.lastActive') }}: {{ formatDate(session.lastActive) }}
                    </p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-2">
                  <span 
                    v-if="session.current"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {{ $t('account.security.currentSession') }}
                  </span>
                  <BaseButton
                    v-else
                    variant="outline"
                    size="sm"
                    @click="terminateSession(session.id)"
                  >
                    {{ $t('account.security.terminate') }}
                  </BaseButton>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>

      <!-- Notifications Tab -->
      <div v-if="activeTab === 'notifications'">
        <BaseCard class="p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-6">
            {{ $t('account.notifications.title') }}
          </h2>
          
          <form @submit.prevent="updateNotifications" class="space-y-6">
            <!-- Email Notifications -->
            <div>
              <h3 class="text-md font-medium text-gray-900 mb-4">
                {{ $t('account.notifications.email') }}
              </h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ $t('account.notifications.processComplete') }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ $t('account.notifications.processCompleteDesc') }}
                    </p>
                  </div>
                  <input
                    v-model="notificationSettings.emailProcessComplete"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ $t('account.notifications.weeklyReport') }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ $t('account.notifications.weeklyReportDesc') }}
                    </p>
                  </div>
                  <input
                    v-model="notificationSettings.emailWeeklyReport"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ $t('account.notifications.accountUpdates') }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ $t('account.notifications.accountUpdatesDesc') }}
                    </p>
                  </div>
                  <input
                    v-model="notificationSettings.emailAccountUpdates"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
            
            <!-- Browser Notifications -->
            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-md font-medium text-gray-900 mb-4">
                {{ $t('account.notifications.browser') }}
              </h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ $t('account.notifications.browserNotifications') }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ $t('account.notifications.browserNotificationsDesc') }}
                    </p>
                  </div>
                  <input
                    v-model="notificationSettings.browserNotifications"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    @change="handleBrowserNotificationToggle"
                  />
                </div>
              </div>
            </div>
            
            <div class="flex justify-end">
              <BaseButton
                type="submit"
                variant="primary"
                :loading="notificationsLoading"
              >
                {{ $t('account.notifications.save') }}
              </BaseButton>
            </div>
          </form>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon
} from '@heroicons/vue/24/outline';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'vue3-toastify';

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();

const activeTab = ref('profile');
const showUserMenu = ref(false);
const userMenuRef = ref<HTMLElement | null>(null);

// Loading states
const profileLoading = ref(false);
const passwordLoading = ref(false);
const notificationsLoading = ref(false);

// Profile form
const profileForm = reactive({
  fullName: 'Juan Pérez',
  email: 'juan.perez@empresa.com',
  phone: '+1 234 567 8900',
  position: 'Gerente de RRHH',
  companyName: 'Empresa Demo',
  role: 'Empleado'
});

const profileErrors = reactive({
  fullName: '',
  email: '',
  phone: '',
  position: ''
});

// Password form
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const passwordErrors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Notification settings
const notificationSettings = reactive({
  emailProcessComplete: true,
  emailWeeklyReport: false,
  emailAccountUpdates: true,
  browserNotifications: false
});

// Active sessions
const activeSessions = ref([
  {
    id: '1',
    device: 'desktop',
    browser: 'Chrome',
    location: 'Madrid, España',
    lastActive: new Date(),
    current: true
  },
  {
    id: '2',
    device: 'mobile',
    browser: 'Safari',
    location: 'Madrid, España',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    current: false
  }
]);

const userInitials = computed(() => {
  const name = profileForm.fullName || 'Usuario';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
});

const updateProfile = async () => {
  // Reset errors
  Object.keys(profileErrors).forEach(key => {
    profileErrors[key as keyof typeof profileErrors] = '';
  });
  
  // Validate
  if (!profileForm.fullName.trim()) {
    profileErrors.fullName = t('validation.required');
    return;
  }
  
  if (!profileForm.email.trim()) {
    profileErrors.email = t('validation.required');
    return;
  }
  
  profileLoading.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(t('account.messages.profileUpdated'));
  } catch (error) {
    toast.error(t('account.messages.profileUpdateError'));
  } finally {
    profileLoading.value = false;
  }
};

const changePassword = async () => {
  // Reset errors
  Object.keys(passwordErrors).forEach(key => {
    passwordErrors[key as keyof typeof passwordErrors] = '';
  });
  
  // Validate
  if (!passwordForm.currentPassword) {
    passwordErrors.currentPassword = t('validation.required');
    return;
  }
  
  if (!passwordForm.newPassword) {
    passwordErrors.newPassword = t('validation.required');
    return;
  }
  
  if (passwordForm.newPassword.length < 8) {
    passwordErrors.newPassword = t('validation.minLength', { min: 8 });
    return;
  }
  
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordErrors.confirmPassword = t('validation.passwordMismatch');
    return;
  }
  
  passwordLoading.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    passwordForm.currentPassword = '';
    passwordForm.newPassword = '';
    passwordForm.confirmPassword = '';
    
    toast.success(t('account.messages.passwordChanged'));
  } catch (error) {
    toast.error(t('account.messages.passwordChangeError'));
  } finally {
    passwordLoading.value = false;
  }
};

const updateNotifications = async () => {
  notificationsLoading.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(t('account.messages.notificationsUpdated'));
  } catch (error) {
    toast.error(t('account.messages.notificationsUpdateError'));
  } finally {
    notificationsLoading.value = false;
  }
};

const handleBrowserNotificationToggle = async () => {
  if (notificationSettings.browserNotifications) {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        notificationSettings.browserNotifications = false;
        toast.error(t('account.messages.notificationPermissionDenied'));
      }
    } catch (error) {
      notificationSettings.browserNotifications = false;
      toast.error(t('account.messages.notificationPermissionError'));
    }
  }
};

const terminateSession = async (sessionId: string) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    activeSessions.value = activeSessions.value.filter(s => s.id !== sessionId);
    toast.success(t('account.messages.sessionTerminated'));
  } catch (error) {
    toast.error(t('account.messages.sessionTerminateError'));
  }
};

const changeAvatar = () => {
  toast.info(t('account.messages.avatarChangeComingSoon'));
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const handleLogout = async () => {
  try {
    await authStore.logout();
    toast.success(t('auth.messages.logoutSuccess'));
    router.push('/login');
  } catch (error) {
    toast.error(t('auth.messages.logoutError'));
  }
};

const handleClickOutside = (event: Event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target as Node)) {
    showUserMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>