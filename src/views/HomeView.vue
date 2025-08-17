<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {{ $t('landing.hero.title') }}
            <span class="text-blue-600">{{ $t('landing.hero.highlight') }}</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {{ $t('landing.hero.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <BaseButton
              variant="primary"
              size="lg"
              @click="router.push('/auth/register')"
            >
              {{ $t('landing.hero.cta') }}
            </BaseButton>
            <BaseButton
              variant="outline"
              size="lg"
              @click="router.push('/auth/login')"
            >
              {{ $t('landing.hero.demo') }}
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('landing.features.title') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            {{ $t('landing.features.subtitle') }}
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DocumentTextIcon class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ $t('landing.features.ai.title') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('landing.features.ai.description') }}
            </p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChartBarIcon class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ $t('landing.features.analysis.title') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('landing.features.analysis.description') }}
            </p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClockIcon class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ $t('landing.features.time.title') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('landing.features.time.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('landing.howItWorks.title') }}
          </h2>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ $t('landing.howItWorks.step1.title') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('landing.howItWorks.step1.description') }}
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ $t('landing.howItWorks.step2.title') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('landing.howItWorks.step2.description') }}
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ $t('landing.howItWorks.step3.title') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('landing.howItWorks.step3.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-blue-600">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          {{ $t('landing.cta.title') }}
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          {{ $t('landing.cta.subtitle') }}
        </p>
        <BaseButton
          variant="secondary"
          size="lg"
          @click="$router.push('/auth/register')"
        >
          {{ $t('landing.cta.button') }}
        </BaseButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { DocumentTextIcon, ChartBarIcon, ClockIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useRouter } from 'vue-router';

const router = useRouter()
</script>
