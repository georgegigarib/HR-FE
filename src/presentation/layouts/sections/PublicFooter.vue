<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Logo and Info -->
        <div class="md:col-span-2">
          <div class="mb-4">
            <CompanyLogo class="text-white" />
          </div>
          <p class="text-gray-400 text-sm leading-6">
            {{ $t('footer.description') }}
          </p>
        </div>

        <!-- Navigation Links -->
        <div>
          <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            {{ $t('footer.navigation') }}
          </h3>
          <ul class="space-y-3">
            <li v-for="item in publicNavigationItems" :key="item.path">
              <router-link
                :to="item.path"
                class="text-gray-400 hover:text-white transition-colors text-sm"
                :class="{ 'text-white font-medium': isActiveRoute(item.path) }"
              >
                {{ $t(item.labelKey) }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Auth Links -->
        <div>
          <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            {{ $t('footer.account') }}
          </h3>
          <ul class="space-y-3">
            <li v-for="item in authNavigationItems" :key="item.path">
              <router-link
                :to="item.path"
                class="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {{ $t(item.labelKey) }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-8 pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            © {{ currentYear }} {{ $t('footer.company') }}. {{ $t('footer.rights') }}
          </p>

          <!-- Language Selector for Footer -->
          <div class="mt-4 md:mt-0">
            <div class="flex items-center space-x-4">
              <button
                @click="changeLanguage('en')"
                class="text-gray-400 hover:text-white transition-colors text-sm"
                :class="{ 'text-white font-medium': locale === 'en' }"
              >
                🇺🇸 English
              </button>
              <span class="text-gray-600">|</span>
              <button
                @click="changeLanguage('es')"
                class="text-gray-400 hover:text-white transition-colors text-sm"
                :class="{ 'text-white font-medium': locale === 'es' }"
              >
                🇪🇸 Español
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CompanyLogo from '@/presentation/shared/CompanyLogo.vue'
import { publicNavigationItems, authNavigationItems } from '../../../router/navigation'

const route = useRoute()
const { locale } = useI18n()

const currentYear = computed(() => new Date().getFullYear())

const isActiveRoute = (path: string): boolean => {
  return route.path === path
}

const changeLanguage = (lang: string) => {
  locale.value = lang
}
</script>
