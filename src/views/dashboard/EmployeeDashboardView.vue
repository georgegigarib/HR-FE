<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- Welcome Message -->
      <div class="mb-8">
        <BaseCard class="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span class="text-white text-lg font-bold">
                  {{ authStore.user?.firstName?.charAt(0) }}{{ authStore.user?.lastName?.charAt(0) }}
                </span>
              </div>
            </div>
            <div class="ml-4">
              <h2 class="text-xl font-bold text-gray-900">
                {{ $t('dashboard.employee.welcome', { name: `${authStore.user?.firstName} ${authStore.user?.lastName}` }) }}
              </h2>
              <p class="text-sm text-gray-600">
                {{ $t('dashboard.employee.welcomeMessage') }}
              </p>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <BaseCard class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <DocumentTextIcon class="h-8 w-8 text-green-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">{{ $t('dashboard.employee.stats.processedCvs') }}</p>
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
              <p class="text-sm font-medium text-gray-500">{{ $t('dashboard.employee.stats.remainingCvs') }}</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.remainingCvs }}</p>
            </div>
          </div>
        </BaseCard>
        
        <BaseCard class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <BriefcaseIcon class="h-8 w-8 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">{{ $t('dashboard.employee.stats.activeProcesses') }}</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.activeProcesses }}</p>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Start Recruitment -->
        <BaseCard class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ $t('dashboard.employee.quickActions.recruitment') }}
          </h3>
          <p class="text-sm text-gray-600 mb-4">
            {{ $t('dashboard.employee.quickActions.recruitmentDesc') }}
          </p>
          <BaseButton
            variant="primary"
            @click="$router.push('/recruitment/step-1')"
            :disabled="stats.remainingCvs === 0"
          >
            {{ $t('dashboard.employee.quickActions.startRecruitment') }}
          </BaseButton>
          <p v-if="stats.remainingCvs === 0" class="text-xs text-red-600 mt-2">
            {{ $t('dashboard.employee.quickActions.noCvsRemaining') }}
          </p>
        </BaseCard>
        
        <!-- View History -->
        <BaseCard class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ $t('dashboard.employee.quickActions.history') }}
          </h3>
          <p class="text-sm text-gray-600 mb-4">
            {{ $t('dashboard.employee.quickActions.historyDesc') }}
          </p>
          <BaseButton
            variant="secondary"
            @click="$router.push('/recruitment/history')"
          >
            {{ $t('dashboard.employee.quickActions.viewHistory') }}
          </BaseButton>
        </BaseCard>
      </div>

      <!-- Recent Processes -->
      <BaseCard class="p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ $t('dashboard.employee.recentProcesses.title') }}
        </h3>
        
        <div v-if="recentProcesses.length > 0" class="space-y-4">
          <div
            v-for="process in recentProcesses"
            :key="process.id"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            @click="$router.push(`/recruitment/results/${process.id}`)"
          >
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <BriefcaseIcon class="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">
                  {{ process.jobTitle }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ $t('dashboard.employee.recentProcesses.candidates', { count: process.candidatesCount }) }} • 
                  {{ formatDate(process.createdAt) }}
                </p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <BaseBadge
                :text="$t(`dashboard.employee.status.${process.status}`)"
                :variant="getStatusVariant(process.status)"
                size="sm"
              />
              <ChevronRightIcon class="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-8">
          <BriefcaseIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">
            {{ $t('dashboard.employee.recentProcesses.empty') }}
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ $t('dashboard.employee.recentProcesses.emptyDesc') }}
          </p>
          <div class="mt-6">
            <BaseButton
              variant="primary"
              @click="$router.push('/recruitment/step-1')"
              :disabled="stats.remainingCvs === 0"
            >
              {{ $t('dashboard.employee.recentProcesses.startFirst') }}
            </BaseButton>
          </div>
        </div>
      </BaseCard>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  DocumentTextIcon,
  ChartBarIcon,
  BriefcaseIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline';
import { useAuthStore } from '@/stores/auth';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';

const { t } = useI18n();
const authStore = useAuthStore();

// Removed showUserMenu as it's now handled by DashboardLayout

const stats = ref({
  processedCvs: 45,
  remainingCvs: 105,
  activeProcesses: 3
});

const recentProcesses = ref([
  {
    id: 1,
    jobTitle: 'Desarrollador Frontend Senior',
    candidatesCount: 12,
    status: 'completed',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: 2,
    jobTitle: 'Diseñador UX/UI',
    candidatesCount: 8,
    status: 'processing',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
  },
  {
    id: 3,
    jobTitle: 'Product Manager',
    candidatesCount: 15,
    status: 'completed',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
  }
]);

// Removed userInitials as it's now handled by DashboardLayout

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

const getStatusVariant = (status: string): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'processing':
      return 'warning';
    case 'failed':
      return 'error';
    default:
      return 'secondary';
  }
};

// Removed handleLogout as it's now handled by DashboardLayout

onMounted(() => {
  // Load dashboard data
  // In a real app, this would fetch from API
});
</script>