<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">
              {{ $t('dashboard.admin.title') }}
            </h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- User Menu -->
            <div class="relative">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-3 py-2"
              >
                <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-medium">
                    {{ userInitials }}
                  </span>
                </div>
                <span>{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}</span>
                <ChevronDownIcon class="w-4 h-4" />
              </button>
              
              <!-- Dropdown Menu -->
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
              >
                <router-link
                  to="/dashboard/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="showUserMenu = false"
                >
                  {{ $t('dashboard.menu.settings') }}
                </router-link>
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {{ $t('dashboard.menu.logout') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <BaseCard class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <UsersIcon class="h-8 w-8 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">{{ $t('dashboard.admin.stats.totalEmployees') }}</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalEmployees }}</p>
            </div>
          </div>
        </BaseCard>
        
        <BaseCard class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <DocumentTextIcon class="h-8 w-8 text-green-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">{{ $t('dashboard.admin.stats.processedCvs') }}</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.processedCvs }}</p>
            </div>
          </div>
        </BaseCard>
        
        <BaseCard class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <ChartBarIcon class="h-8 w-8 text-purple-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">{{ $t('dashboard.admin.stats.remainingCvs') }}</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.remainingCvs }}</p>
            </div>
          </div>
        </BaseCard>
        
        <BaseCard class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <CreditCardIcon class="h-8 w-8 text-yellow-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">{{ $t('dashboard.admin.stats.currentPlan') }}</p>
              <p class="text-lg font-bold text-gray-900">{{ stats.currentPlan }}</p>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Start Recruitment -->
        <BaseCard class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ $t('dashboard.admin.quickActions.recruitment') }}
          </h3>
          <p class="text-sm text-gray-600 mb-4">
            {{ $t('dashboard.admin.quickActions.recruitmentDesc') }}
          </p>
          <BaseButton
            variant="primary"
            @click="$router.push('/recruitment/step-1')"
            :disabled="stats.remainingCvs === 0"
          >
            {{ $t('dashboard.admin.quickActions.startRecruitment') }}
          </BaseButton>
        </BaseCard>
        
        <!-- Manage Employees -->
        <BaseCard class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ $t('dashboard.admin.quickActions.employees') }}
          </h3>
          <p class="text-sm text-gray-600 mb-4">
            {{ $t('dashboard.admin.quickActions.employeesDesc') }}
          </p>
          <BaseButton
            variant="secondary"
            @click="$router.push('/dashboard/employees')"
          >
            {{ $t('dashboard.admin.quickActions.manageEmployees') }}
          </BaseButton>
        </BaseCard>
      </div>

      <!-- Recent Activity -->
      <BaseCard class="p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ $t('dashboard.admin.recentActivity.title') }}
        </h3>
        
        <div v-if="recentActivity.length > 0" class="space-y-4">
          <div
            v-for="activity in recentActivity"
            :key="activity.id"
            class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <DocumentTextIcon class="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">
                {{ activity.description }}
              </p>
              <p class="text-sm text-gray-500">
                {{ formatDate(activity.createdAt) }}
              </p>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-8">
          <DocumentTextIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">
            {{ $t('dashboard.admin.recentActivity.empty') }}
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ $t('dashboard.admin.recentActivity.emptyDesc') }}
          </p>
        </div>
      </BaseCard>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue3-toastify';
import {
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CreditCardIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline';
import { useAuthStore } from '@/stores/auth';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();

const showUserMenu = ref(false);

const stats = ref({
  totalEmployees: 5,
  processedCvs: 127,
  remainingCvs: 23,
  currentPlan: 'Professional'
});

const recentActivity = ref([
  {
    id: 1,
    description: 'Procesamiento de 15 CVs para posición de Desarrollador Frontend',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: 2,
    description: 'Nuevo empleado agregado: María González',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
  },
  {
    id: 3,
    description: 'Exportación de lista de contactos completada',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
  }
]);

const userInitials = computed(() => {
  const user = authStore.user;
  if (!user?.firstName || !user?.lastName) return 'AD';
  return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
});

const formatDate = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return t('dashboard.time.daysAgo', { count: days });
  } else if (hours > 0) {
    return t('dashboard.time.hoursAgo', { count: hours });
  } else {
    return t('dashboard.time.justNow');
  }
};

const handleLogout = async () => {
  try {
    await authStore.logout();
    toast.success(t('auth.logout.success'));
    router.push('/auth/login');
  } catch (error: any) {
    toast.error(error.message || t('auth.logout.error'));
  }
  showUserMenu.value = false;
};

onMounted(() => {
  // Load dashboard data
  // In a real app, this would fetch from API
});
</script>