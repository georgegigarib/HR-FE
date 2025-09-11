<template>
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <CompanyLogo />

        <!-- Language Selector -->
        <div class="flex items-center space-x-4">
          <div class="relative">
            <button
              @click="toggleLanguageMenu"
              class="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              :title="$t('navigation.changeLanguage')"
            >
              <LanguageIcon class="w-5 h-5" />
            </button>

            <!-- Language Dropdown -->
            <div
              v-if="isLanguageMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
            >
              <div class="py-1">
                <button
                  @click="changeLanguage('en')"
                  class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  :class="{ 'bg-blue-50 text-blue-600': locale === 'en' }"
                >
                  <span class="text-lg mr-3">🇺🇸</span>
                  English
                </button>
                <button
                  @click="changeLanguage('es')"
                  class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  :class="{ 'bg-blue-50 text-blue-600': locale === 'es' }"
                >
                  <span class="text-lg mr-3">🇪🇸</span>
                  Español
                </button>
              </div>
            </div>
          </div>

          <!-- Desktop Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <router-link
              to="/services"
              class="transition-colors"
              :class="
                isActiveRoute('/services')
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              "
            >
              {{ $t('navigation.services') }}
            </router-link>
            <router-link
              to="/pricing"
              class="transition-colors"
              :class="
                isActiveRoute('/pricing')
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              "
            >
              {{ $t('navigation.pricing') }}
            </router-link>
            <router-link
              to="/help"
              class="transition-colors"
              :class="
                isActiveRoute('/help')
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              "
            >
              {{ $t('navigation.help') }}
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
            to="/services"
            @click="closeMobileMenu"
            class="block py-2 transition-colors"
            :class="
              isActiveRoute('/services')
                ? 'text-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-900'
            "
          >
            {{ $t('navigation.services') }}
          </router-link>
          <router-link
            to="/pricing"
            @click="closeMobileMenu"
            class="block py-2 transition-colors"
            :class="
              isActiveRoute('/pricing')
                ? 'text-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-900'
            "
          >
            {{ $t('navigation.pricing') }}
          </router-link>
          <router-link
            to="/help"
            @click="closeMobileMenu"
            class="block py-2 transition-colors"
            :class="
              isActiveRoute('/help')
                ? 'text-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-900'
            "
          >
            {{ $t('navigation.help') }}
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
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/ui/BaseButton.vue'
import CompanyLogo from '@/presentation/shared/CompanyLogo.vue'
import { Bars3Icon, XMarkIcon, LanguageIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const { locale } = useI18n()
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

const toggleLanguageMenu = () => {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value
}

const changeLanguage = (lang: string) => {
  locale.value = lang
  isLanguageMenuOpen.value = false
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
