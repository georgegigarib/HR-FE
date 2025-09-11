<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <PublicNavbar />

    <!-- Hero Section -->
    <HeroSection>
      <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
        {{ $t('help.hero.title') }}
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        {{ $t('help.hero.subtitle') }}
      </p>

      <!-- Search Bar -->
      <div class="max-w-2xl mx-auto">
        <div class="relative">
          <MagnifyingGlassIcon
            class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('help.search.placeholder')"
            class="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          />
        </div>
      </div>
    </HeroSection>

    <!-- Quick Links -->
    <QuickLinksSection @scrollToSection="scrollToSection" />

    <!-- FAQ Section -->
    <FAQContainer :searchQuery="searchQuery" />

    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import ContactSection from '../components/ContactSection.vue'
import FAQContainer from '../components/FAQContainer.vue'
import QuickLinksSection from '../components/QuickLinksSection.vue'
import HeroSection from '@/presentation/common/HeroSection.vue'
import PublicNavbar from '@/presentation/common/PublicNavbar.vue'
import { scrollToSection } from '@/utils/ScrollToSection'
import { ref } from 'vue'

const searchQuery = ref('')
</script>
