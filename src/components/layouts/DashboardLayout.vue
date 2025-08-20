<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header/Topbar -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo and Navigation -->
          <div class="flex items-center space-x-8">
            <!-- Logo -->
            <router-link to="/dashboard" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">HR</span>
              </div>
              <span class="text-xl font-bold text-gray-900">{{ $t('app.name') }}</span>
            </router-link>
            
            <!-- Navigation Menu -->
            <nav class="hidden md:flex space-x-6">
              <router-link
                to="/admin/dashboard"
                v-if="authStore.isAdmin"
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                active-class="text-blue-600 bg-blue-50"
              >
                {{ $t('navigation.dashboard') }}
              </router-link>
              
              <router-link
                to="/employee/dashboard"
                v-if="authStore.isEmployee"
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                active-class="text-blue-600 bg-blue-50"
              >
                {{ $t('navigation.dashboard') }}
              </router-link>
              
              <router-link
                to="/recruitment/step-1"
                v-if="authStore.isAdmin"
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                active-class="text-blue-600 bg-blue-50"
              >
                {{ $t('navigation.recruitment') }}
              </router-link>
              
              <router-link
                to="/dashboard/employees"
                v-if="authStore.isAdmin"
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                active-class="text-blue-600 bg-blue-50"
              >
                {{ $t('navigation.employees') }}
              </router-link>
              
              <router-link
                to="/dashboard/settings"
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                active-class="text-blue-600 bg-blue-50"
              >
                {{ $t('navigation.settings') }}
              </router-link>
            </nav>
          </div>
          
          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            <!-- Role Badge -->
            <div class="hidden sm:block">
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="{
                  'bg-blue-100 text-blue-800': authStore.isAdmin,
                  'bg-green-100 text-green-800': authStore.isEmployee
                }"
              >
                {{ authStore.isAdmin ? $t('roles.admin') : $t('roles.employee') }}
              </span>
            </div>
            
            <!-- User Dropdown -->
            <div class="relative">
              <button
                @click="toggleMenu"
                class="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-3 py-2 transition-colors"
              >
                <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-medium">
                    {{ userInitials }}
                  </span>
                </div>
                <span class="hidden sm:block">{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}</span>
                <ChevronDownIcon class="w-4 h-4" />
              </button>
              
              <!-- Dropdown Menu -->
              <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="showUserMenu"
                  v-click-outside="() => showUserMenu = false"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                >
                <div class="px-4 py-2 border-b border-gray-100">
                  <p class="text-sm font-medium text-gray-900">{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}</p>
                  <p class="text-xs text-gray-500">{{ authStore.user?.email }}</p>
                </div>
                
                <router-link
                  to="/dashboard/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  @click="showUserMenu = false"
                >
                  <UserIcon class="w-4 h-4 inline mr-2" />
                  {{ $t('dashboard.menu.profile') }}
                </router-link>
                
                <router-link
                  to="/dashboard/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  @click="showUserMenu = false"
                >
                  <CogIcon class="w-4 h-4 inline mr-2" />
                  {{ $t('dashboard.menu.settings') }}
                </router-link>
                
                <div class="border-t border-gray-100">
                  <button
                    @click="handleLogout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <ArrowRightOnRectangleIcon class="w-4 h-4 inline mr-2" />
                    {{ $t('dashboard.menu.logout') }}
                  </button>
                </div>
                </div>
              </Transition>
            </div>
            
            <!-- Mobile Menu Button -->
            <button
              @click="showMobileMenu = !showMobileMenu"
              class="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Bars3Icon v-if="!showMobileMenu" class="w-6 h-6" />
              <XMarkIcon v-else class="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <!-- Mobile Navigation -->
        <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200 py-4">
          <nav class="space-y-2">
            <router-link
              to="/admin/dashboard"
              v-if="authStore.isAdmin"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              active-class="text-blue-600 bg-blue-50"
              @click="showMobileMenu = false"
            >
              {{ $t('navigation.dashboard') }}
            </router-link>
            
            <router-link
              to="/employee/dashboard"
              v-if="authStore.isEmployee"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              active-class="text-blue-600 bg-blue-50"
              @click="showMobileMenu = false"
            >
              {{ $t('navigation.dashboard') }}
            </router-link>
            
            <router-link
              to="/recruitment/step-1"
              v-if="authStore.isAdmin"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              active-class="text-blue-600 bg-blue-50"
              @click="showMobileMenu = false"
            >
              {{ $t('navigation.recruitment') }}
            </router-link>
            
            <router-link
              to="/dashboard/employees"
              v-if="authStore.isAdmin"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              active-class="text-blue-600 bg-blue-50"
              @click="showMobileMenu = false"
            >
              {{ $t('navigation.employees') }}
            </router-link>
            
            <router-link
              to="/dashboard/settings"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              active-class="text-blue-600 bg-blue-50"
              @click="showMobileMenu = false"
            >
              {{ $t('navigation.settings') }}
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue3-toastify';
import {
  ChevronDownIcon,
  UserIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline';
import { useAuthStore } from '@/stores/auth';

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();

const showUserMenu = ref(false);
const showMobileMenu = ref(false);

const userInitials = computed(() => {
  const user = authStore.user;
  if (!user?.firstName || !user?.lastName) return 'U';
  return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
});

const toggleMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};
const handleLogout = async () => {
  try {
    await authStore.logout();
    toast.success(t('auth.logout.success'));
    router.push('/login');
  } catch (error: any) {
    toast.error(error.message || t('auth.logout.error'));
  }
  showUserMenu.value = false;
};

// Click outside directive
const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      // Check if the click is outside the element
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value();
      }
    };
    // Use a slight delay to avoid immediate closure when opening
    setTimeout(() => {
      document.addEventListener('click', el.clickOutsideEvent);
    }, 0);
  },
  unmounted(el: any) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent);
    }
  }
};
</script>