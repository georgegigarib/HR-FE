<template>
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <CompanyLogo />

        <!-- Language Selector -->
        <div class="flex items-center space-x-4">
          <LanguageToggle />

          <!-- Desktop Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <router-link
              v-for="item in publicNavigationItems"
              :key="item.path"
              :to="item.path"
              class="transition-colors"
              :class="
                isActiveRoute(item.path)
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              "
            >
              {{ $t(item.labelKey) }}
            </router-link>
          </div>

          <!-- Desktop Auth Buttons -->
          <div class="hidden md:flex items-center space-x-4">
            <router-link to="/login" class="text-gray-600 hover:text-gray-900 transition-colors">
              {{ $t('auth.login.title') }}
            </router-link>
            <BaseButton variant="primary" @click="$router.push('/register')">
              {{ $t('auth.register.title') }}
            </BaseButton>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Bars3Icon class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Sidebar -->
    <div v-if="isMobileMenuOpen" class="fixed inset-0 z-50 md:hidden" @click="closeMobileMenu">
      <div class="fixed inset-y-0 right-0 w-64 bg-white shadow-xl">
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="text-lg font-semibold text-gray-900">{{ $t('navigation.menu') }}</h2>
          <button @click="closeMobileMenu" class="p-2 text-gray-600 hover:text-gray-900">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <div class="p-4 space-y-4">
          <router-link
            v-for="item in publicNavigationItems"
            :key="item.path"
            :to="item.path"
            @click="closeMobileMenu"
            class="block py-2 transition-colors"
            :class="
              isActiveRoute(item.path)
                ? 'text-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-900'
            "
          >
            {{ $t(item.labelKey) }}
          </router-link>

          <hr class="my-4" />

          <router-link
            to="/login"
            @click="closeMobileMenu"
            class="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            {{ $t('auth.login.title') }}
          </router-link>
          <BaseButton
            variant="primary"
            class="w-full"
            @click="
              () => {
                $router.push('/register')
                closeMobileMenu()
              }
            "
          >
            {{ $t('auth.register.title') }}
          </BaseButton>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import CompanyLogo from '@/presentation/shared/CompanyLogo.vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { publicNavigationItems } from '../../../router/navigation'
import LanguageToggle from '@/presentation/common/LanguageToggle.vue'

const route = useRoute()
const isMobileMenuOpen = ref(false)
const isLanguageMenuOpen = ref(false)

const isActiveRoute = (path: string): boolean => {
  return route.path === path
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close language menu when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isLanguageMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
