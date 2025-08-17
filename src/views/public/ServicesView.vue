<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">HR</span>
              </div>
              <span class="text-xl font-bold text-gray-900">CVAnalyzer</span>
            </router-link>
          </div>
          
          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <router-link
              to="/services"
              class="text-blue-600 font-medium"
            >
              {{ $t('navigation.services') }}
            </router-link>
            <router-link
              to="/pricing"
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {{ $t('navigation.pricing') }}
            </router-link>
            <router-link
              to="/help"
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {{ $t('navigation.help') }}
            </router-link>
          </div>
          
          <!-- Auth Buttons -->
          <div class="flex items-center space-x-4">
            <router-link
              to="/auth/login"
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {{ $t('auth.login') }}
            </router-link>
            <BaseButton
              variant="primary"
              @click="$router.push('/auth/register')"
            >
              {{ $t('auth.register') }}
            </BaseButton>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          {{ $t('services.hero.title') }}
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          {{ $t('services.hero.subtitle') }}
        </p>
        <BaseButton
          variant="primary"
          size="lg"
          @click="$router.push('/auth/register')"
        >
          {{ $t('services.hero.cta') }}
        </BaseButton>
      </div>
    </section>

    <!-- Main Services -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('services.main.title') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ $t('services.main.subtitle') }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <!-- CV Analysis -->
          <div class="space-y-6">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <DocumentTextIcon class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900">
                {{ $t('services.cvAnalysis.title') }}
              </h3>
            </div>
            <p class="text-lg text-gray-600">
              {{ $t('services.cvAnalysis.description') }}
            </p>
            <ul class="space-y-3">
              <li class="flex items-center space-x-3">
                <CheckIcon class="w-5 h-5 text-green-500" />
                <span class="text-gray-700">{{ $t('services.cvAnalysis.features.parsing') }}</span>
              </li>
              <li class="flex items-center space-x-3">
                <CheckIcon class="w-5 h-5 text-green-500" />
                <span class="text-gray-700">{{ $t('services.cvAnalysis.features.matching') }}</span>
              </li>
              <li class="flex items-center space-x-3">
                <CheckIcon class="w-5 h-5 text-green-500" />
                <span class="text-gray-700">{{ $t('services.cvAnalysis.features.scoring') }}</span>
              </li>
              <li class="flex items-center space-x-3">
                <CheckIcon class="w-5 h-5 text-green-500" />
                <span class="text-gray-700">{{ $t('services.cvAnalysis.features.insights') }}</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-gray-50 rounded-2xl p-8">
            <div class="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <div class="flex items-center justify-between">
                <span class="font-medium text-gray-900">John Doe</span>
                <div class="flex items-center space-x-2">
                  <div class="w-16 bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full" style="width: 92%"></div>
                  </div>
                  <span class="text-sm font-medium text-green-600">92%</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="font-medium text-gray-900">Jane Smith</span>
                <div class="flex items-center space-x-2">
                  <div class="w-16 bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width: 87%"></div>
                  </div>
                  <span class="text-sm font-medium text-blue-600">87%</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="font-medium text-gray-900">Mike Johnson</span>
                <div class="flex items-center space-x-2">
                  <div class="w-16 bg-gray-200 rounded-full h-2">
                    <div class="bg-yellow-500 h-2 rounded-full" style="width: 78%"></div>
                  </div>
                  <span class="text-sm font-medium text-yellow-600">78%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div class="order-2 lg:order-1">
            <div class="bg-gray-50 rounded-2xl p-8">
              <div class="bg-white rounded-lg shadow-sm p-6">
                <div class="flex items-center space-x-3 mb-4">
                  <SparklesIcon class="w-6 h-6 text-purple-600" />
                  <span class="font-medium text-gray-900">{{ $t('services.aiImprovement.demo.title') }}</span>
                </div>
                <div class="space-y-3">
                  <div class="bg-gray-100 rounded p-3 text-sm text-gray-600">
                    {{ $t('services.aiImprovement.demo.before') }}
                  </div>
                  <div class="flex justify-center">
                    <ArrowDownIcon class="w-5 h-5 text-gray-400" />
                  </div>
                  <div class="bg-blue-50 rounded p-3 text-sm text-gray-700 border border-blue-200">
                    {{ $t('services.aiImprovement.demo.after') }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- AI Job Description Improvement -->
          <div class="order-1 lg:order-2 space-y-6">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <SparklesIcon class="w-8 h-8 text-purple-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900">
                {{ $t('services.aiImprovement.title') }}
              </h3>
            </div>
            <p class="text-lg text-gray-600">
              {{ $t('services.aiImprovement.description') }}
            </p>
            <ul class="space-y-3">
              <li class="flex items-center space-x-3">
                <CheckIcon class="w-5 h-5 text-green-500" />
                <span class="text-gray-700">{{ $t('services.aiImprovement.features.optimization') }}</span>
              </li>
              <li class="flex items-center space-x-3">
                <CheckIcon class="w-5 h-5 text-green-500" />
                <span class="text-gray-700">{{ $t('services.aiImprovement.features.keywords') }}</span>
              </li>
              <li class="flex items-center space-x-3">
                <CheckIcon class="w-5 h-5 text-green-500" />
                <span class="text-gray-700">{{ $t('services.aiImprovement.features.clarity') }}</span>
              </li>
              <li class="flex items-center space-x-3">
                <CheckIcon class="w-5 h-5 text-green-500" />
                <span class="text-gray-700">{{ $t('services.aiImprovement.features.suggestions') }}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Candidate Management -->
          <div class="space-y-6">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <UsersIcon class="w-8 h-8 text-green-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900">
                {{ $t('services.candidateManagement.title') }}
              </h3>
            </div>
            <p class="text-lg text-gray-600">
              {{ $t('services.candidateManagement.description') }}
            </p>
            <ul class="space-y-3">
              <li class="flex items-center space-x-3">
                <CheckIcon class="w-5 h-5 text-green-500" />
                <span class="text-gray-700">{{ $t('services.candidateManagement.features.ranking') }}</span>
              </li>
              <li class="flex items-center space-x-3">
                <CheckIcon class="w-5 h-5 text-green-500" />
                <span class="text-gray-700">{{ $t('services.candidateManagement.features.reports') }}</span>
              </li>
              <li class="flex items-center space-x-3">
                <CheckIcon class="w-5 h-5 text-green-500" />
                <span class="text-gray-700">{{ $t('services.candidateManagement.features.export') }}</span>
              </li>
              <li class="flex items-center space-x-3">
                <CheckIcon class="w-5 h-5 text-green-500" />
                <span class="text-gray-700">{{ $t('services.candidateManagement.features.collaboration') }}</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-gray-50 rounded-2xl p-8">
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center justify-between mb-4">
                <h4 class="font-medium text-gray-900">{{ $t('services.candidateManagement.demo.title') }}</h4>
                <BaseButton variant="outline" size="sm">
                  {{ $t('services.candidateManagement.demo.export') }}
                </BaseButton>
              </div>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-green-50 rounded border border-green-200">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span class="text-xs font-medium text-green-600">1</span>
                    </div>
                    <span class="text-sm font-medium text-gray-900">Top Candidate</span>
                  </div>
                  <span class="text-sm font-medium text-green-600">95%</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span class="text-xs font-medium text-gray-600">2</span>
                    </div>
                    <span class="text-sm font-medium text-gray-900">Good Match</span>
                  </div>
                  <span class="text-sm font-medium text-gray-600">82%</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span class="text-xs font-medium text-gray-600">3</span>
                    </div>
                    <span class="text-sm font-medium text-gray-900">Potential</span>
                  </div>
                  <span class="text-sm font-medium text-gray-600">76%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional Features -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('services.additional.title') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ $t('services.additional.subtitle') }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Security -->
          <BaseCard class="text-center p-6">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheckIcon class="w-6 h-6 text-red-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ $t('services.additional.security.title') }}
            </h3>
            <p class="text-gray-600 text-sm">
              {{ $t('services.additional.security.description') }}
            </p>
          </BaseCard>
          
          <!-- Speed -->
          <BaseCard class="text-center p-6">
            <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BoltIcon class="w-6 h-6 text-yellow-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ $t('services.additional.speed.title') }}
            </h3>
            <p class="text-gray-600 text-sm">
              {{ $t('services.additional.speed.description') }}
            </p>
          </BaseCard>
          
          <!-- Integration -->
          <BaseCard class="text-center p-6">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cog6ToothIcon class="w-6 h-6 text-indigo-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ $t('services.additional.integration.title') }}
            </h3>
            <p class="text-gray-600 text-sm">
              {{ $t('services.additional.integration.description') }}
            </p>
          </BaseCard>
          
          <!-- Support -->
          <BaseCard class="text-center p-6">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChatBubbleLeftRightIcon class="w-6 h-6 text-blue-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ $t('services.additional.support.title') }}
            </h3>
            <p class="text-gray-600 text-sm">
              {{ $t('services.additional.support.description') }}
            </p>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-blue-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
          {{ $t('services.cta.title') }}
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {{ $t('services.cta.subtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton
            variant="secondary"
            size="lg"
            @click="$router.push('/auth/register')"
          >
            {{ $t('services.cta.primary') }}
          </BaseButton>
          <BaseButton
            variant="outline"
            size="lg"
            class="text-white border-white hover:bg-white hover:text-blue-600"
            @click="$router.push('/pricing')"
          >
            {{ $t('services.cta.secondary') }}
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {
  DocumentTextIcon,
  CheckIcon,
  SparklesIcon,
  ArrowDownIcon,
  UsersIcon,
  ShieldCheckIcon,
  BoltIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/vue/24/outline';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';

const { t } = useI18n();
</script>