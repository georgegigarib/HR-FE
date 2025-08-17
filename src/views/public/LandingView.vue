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
              class="text-gray-600 hover:text-gray-900 transition-colors"
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
          
          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            <Bars3Icon v-if="!mobileMenuOpen" class="w-6 h-6" />
            <XMarkIcon v-else class="w-6 h-6" />
          </button>
        </div>
        
        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 py-4">
          <div class="space-y-4">
            <router-link
              to="/services"
              class="block text-gray-600 hover:text-gray-900 transition-colors"
              @click="mobileMenuOpen = false"
            >
              {{ $t('navigation.services') }}
            </router-link>
            <router-link
              to="/pricing"
              class="block text-gray-600 hover:text-gray-900 transition-colors"
              @click="mobileMenuOpen = false"
            >
              {{ $t('navigation.pricing') }}
            </router-link>
            <router-link
              to="/help"
              class="block text-gray-600 hover:text-gray-900 transition-colors"
              @click="mobileMenuOpen = false"
            >
              {{ $t('navigation.help') }}
            </router-link>
            <div class="pt-4 border-t border-gray-200 space-y-2">
              <router-link
                to="/auth/login"
                class="block text-gray-600 hover:text-gray-900 transition-colors"
                @click="mobileMenuOpen = false"
              >
                {{ $t('auth.login') }}
              </router-link>
              <BaseButton
                variant="primary"
                full-width
                @click="$router.push('/auth/register'); mobileMenuOpen = false"
              >
                {{ $t('auth.register') }}
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Hero Content -->
          <div class="space-y-8">
            <div class="space-y-4">
              <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {{ $t('landing.hero.title') }}
                <span class="text-blue-600">{{ $t('landing.hero.titleHighlight') }}</span>
              </h1>
              <p class="text-xl text-gray-600 leading-relaxed">
                {{ $t('landing.hero.subtitle') }}
              </p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4">
              <BaseButton
                variant="primary"
                size="lg"
                @click="$router.push('/auth/register')"
              >
                {{ $t('landing.hero.cta.primary') }}
              </BaseButton>
              <BaseButton
                variant="secondary"
                size="lg"
                @click="$router.push('/services')"
              >
                {{ $t('landing.hero.cta.secondary') }}
              </BaseButton>
            </div>
            
            <!-- Stats -->
            <div class="grid grid-cols-3 gap-8 pt-8">
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600">10K+</div>
                <div class="text-sm text-gray-600">{{ $t('landing.hero.stats.cvs') }}</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600">500+</div>
                <div class="text-sm text-gray-600">{{ $t('landing.hero.stats.companies') }}</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600">95%</div>
                <div class="text-sm text-gray-600">{{ $t('landing.hero.stats.accuracy') }}</div>
              </div>
            </div>
          </div>
          
          <!-- Hero Image -->
          <div class="relative">
            <div class="bg-white rounded-2xl shadow-2xl p-8">
              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <DocumentTextIcon class="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div class="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div class="h-3 bg-gray-100 rounded w-24"></div>
                  </div>
                </div>
                
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="h-3 bg-gray-200 rounded w-20"></div>
                    <div class="flex items-center space-x-2">
                      <div class="w-16 bg-gray-200 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full" style="width: 85%"></div>
                      </div>
                      <span class="text-sm font-medium text-green-600">85%</span>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="h-3 bg-gray-200 rounded w-24"></div>
                    <div class="flex items-center space-x-2">
                      <div class="w-16 bg-gray-200 rounded-full h-2">
                        <div class="bg-blue-500 h-2 rounded-full" style="width: 92%"></div>
                      </div>
                      <span class="text-sm font-medium text-blue-600">92%</span>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="h-3 bg-gray-200 rounded w-28"></div>
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
            
            <!-- Floating Elements -->
            <div class="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
            <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-indigo-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('landing.features.title') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ $t('landing.features.subtitle') }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <BaseCard class="text-center p-8 hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CpuChipIcon class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t('landing.features.ai.title') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('landing.features.ai.description') }}
            </p>
          </BaseCard>
          
          <!-- Feature 2 -->
          <BaseCard class="text-center p-8 hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ChartBarIcon class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t('landing.features.analytics.title') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('landing.features.analytics.description') }}
            </p>
          </BaseCard>
          
          <!-- Feature 3 -->
          <BaseCard class="text-center p-8 hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ClockIcon class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t('landing.features.speed.title') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('landing.features.speed.description') }}
            </p>
          </BaseCard>
          
          <!-- Feature 4 -->
          <BaseCard class="text-center p-8 hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheckIcon class="w-8 h-8 text-orange-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t('landing.features.security.title') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('landing.features.security.description') }}
            </p>
          </BaseCard>
          
          <!-- Feature 5 -->
          <BaseCard class="text-center p-8 hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <UsersIcon class="w-8 h-8 text-red-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t('landing.features.collaboration.title') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('landing.features.collaboration.description') }}
            </p>
          </BaseCard>
          
          <!-- Feature 6 -->
          <BaseCard class="text-center p-8 hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <DocumentArrowDownIcon class="w-8 h-8 text-indigo-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t('landing.features.export.title') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('landing.features.export.description') }}
            </p>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('landing.howItWorks.title') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ $t('landing.howItWorks.subtitle') }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="text-center">
            <div class="relative mb-8">
              <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <span class="text-2xl font-bold text-white">1</span>
              </div>
              <div class="hidden md:block absolute top-10 left-full w-full h-0.5 bg-blue-200 -translate-y-0.5"></div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t('landing.howItWorks.step1.title') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('landing.howItWorks.step1.description') }}
            </p>
          </div>
          
          <!-- Step 2 -->
          <div class="text-center">
            <div class="relative mb-8">
              <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <span class="text-2xl font-bold text-white">2</span>
              </div>
              <div class="hidden md:block absolute top-10 left-full w-full h-0.5 bg-blue-200 -translate-y-0.5"></div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t('landing.howItWorks.step2.title') }}
            </h3>
            <p class="text-gray-600">
              {{ $t('landing.howItWorks.step2.description') }}
            </p>
          </div>
          
          <!-- Step 3 -->
          <div class="text-center">
            <div class="relative mb-8">
              <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <span class="text-2xl font-bold text-white">3</span>
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
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
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
          {{ $t('landing.cta.title') }}
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {{ $t('landing.cta.subtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton
            variant="secondary"
            size="lg"
            @click="$router.push('/auth/register')"
          >
            {{ $t('landing.cta.primary') }}
          </BaseButton>
          <BaseButton
            variant="outline"
            size="lg"
            class="text-white border-white hover:bg-white hover:text-blue-600"
            @click="$router.push('/pricing')"
          >
            {{ $t('landing.cta.secondary') }}
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">HR</span>
              </div>
              <span class="text-xl font-bold">CVAnalyzer</span>
            </div>
            <p class="text-gray-400">
              {{ $t('landing.footer.description') }}
            </p>
          </div>
          
          <!-- Product Links -->
          <div>
            <h3 class="font-semibold mb-4">{{ $t('landing.footer.product') }}</h3>
            <div class="space-y-2">
              <router-link to="/services" class="block text-gray-400 hover:text-white transition-colors">
                {{ $t('navigation.services') }}
              </router-link>
              <router-link to="/pricing" class="block text-gray-400 hover:text-white transition-colors">
                {{ $t('navigation.pricing') }}
              </router-link>
              <router-link to="/help" class="block text-gray-400 hover:text-white transition-colors">
                {{ $t('navigation.help') }}
              </router-link>
            </div>
          </div>
          
          <!-- Company Links -->
          <div>
            <h3 class="font-semibold mb-4">{{ $t('landing.footer.company') }}</h3>
            <div class="space-y-2">
              <a href="#" class="block text-gray-400 hover:text-white transition-colors">
                {{ $t('landing.footer.about') }}
              </a>
              <a href="#" class="block text-gray-400 hover:text-white transition-colors">
                {{ $t('landing.footer.contact') }}
              </a>
              <a href="#" class="block text-gray-400 hover:text-white transition-colors">
                {{ $t('landing.footer.privacy') }}
              </a>
            </div>
          </div>
          
          <!-- Support Links -->
          <div>
            <h3 class="font-semibold mb-4">{{ $t('landing.footer.support') }}</h3>
            <div class="space-y-2">
              <router-link to="/help" class="block text-gray-400 hover:text-white transition-colors">
                {{ $t('landing.footer.helpCenter') }}
              </router-link>
              <a href="#" class="block text-gray-400 hover:text-white transition-colors">
                {{ $t('landing.footer.documentation') }}
              </a>
              <a href="#" class="block text-gray-400 hover:text-white transition-colors">
                {{ $t('landing.footer.status') }}
              </a>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 CVAnalyzer. {{ $t('landing.footer.rights') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Bars3Icon,
  XMarkIcon,
  DocumentTextIcon,
  CpuChipIcon,
  ChartBarIcon,
  ClockIcon,
  ShieldCheckIcon,
  UsersIcon,
  DocumentArrowDownIcon
} from '@heroicons/vue/24/outline';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';

const { t } = useI18n();
const mobileMenuOpen = ref(false);
</script>