<template>
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
          v-for="language in languages"
          :key="language.code"
          @click="changeLanguage(language.code)"
          class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          :class="{ 'bg-blue-50 text-blue-600': locale === language.code }"
        >
          <span class="text-lg mr-3">{{ language.icon }}</span>
          {{ language.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { LanguageIcon } from '@heroicons/vue/24/outline'

const { locale } = useI18n()
const isLanguageMenuOpen = ref(false)

const toggleLanguageMenu = () => {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value
}

const changeLanguage = (lang: string) => {
  locale.value = lang
  isLanguageMenuOpen.value = false
}

const languages = [
  { code: 'en', name: 'English', icon: '🇺🇸' },
  { code: 'es', name: 'Español', icon: '🇪🇸' }
]
</script>
