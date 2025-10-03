<template>
  <PublicLayout>
    <!-- Hero Section -->
    <HeroSection>
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          {{ $t('help.hero.title') }}
        </h1>
        <p
          class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
        >
          {{ $t('help.hero.subtitle') }}
        </p>

        <!-- Search Bar -->
        <div class="mt-8 max-w-md mx-auto">
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              :placeholder="$t('help.search.placeholder')"
              class="w-full px-4 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div class="absolute inset-y-0 left-0 flex items-center pl-4">
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </HeroSection>

    <!-- Quick Links section -->
    <QuickLinksSection @scrollToSection="scrollToSection" />

    <!-- FAQ section -->
    <FAQContainer :searchQuery="searchQuery" />

    <!-- Contact section -->
    <ContactSection />
  </PublicLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import PublicLayout from '@/presentation/layouts/PublicLayout.vue'
import HeroSection from '@/presentation/shared/HeroSection.vue'
import QuickLinksSection from '../components/QuickLinksSection.vue'
import FAQContainer from '../components/FAQContainer.vue'
import ContactSection from '../components/ContactSection.vue'
import { scrollToSection } from '@/utils/ScrollToSection'

const searchQuery = ref('')
</script>
