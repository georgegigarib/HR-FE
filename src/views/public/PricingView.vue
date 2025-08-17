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
              class="text-blue-600 font-medium"
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
          {{ $t('pricing.hero.title') }}
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          {{ $t('pricing.hero.subtitle') }}
        </p>
        
        <!-- Billing Toggle -->
        <div class="flex items-center justify-center mb-12">
          <span class="text-gray-600 mr-3">{{ $t('pricing.billing.monthly') }}</span>
          <button
            @click="isAnnual = !isAnnual"
            :class="[
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
              isAnnual ? 'bg-blue-600' : 'bg-gray-200'
            ]"
          >
            <span
              :class="[
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                isAnnual ? 'translate-x-6' : 'translate-x-1'
              ]"
            />
          </button>
          <span class="text-gray-600 ml-3">
            {{ $t('pricing.billing.annual') }}
            <span class="text-green-600 font-medium ml-1">
              ({{ $t('pricing.billing.save20') }})
            </span>
          </span>
        </div>
      </div>
    </section>

    <!-- Pricing Plans -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Trial Plan -->
          <BaseCard class="relative p-8 border-2 border-gray-200">
            <div class="text-center">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">
                {{ $t('pricing.plans.trial.name') }}
              </h3>
              <div class="mb-6">
                <span class="text-4xl font-bold text-gray-900">$0</span>
                <span class="text-gray-600 ml-1">/{{ $t('pricing.plans.trial.period') }}</span>
              </div>
              <p class="text-gray-600 mb-8">
                {{ $t('pricing.plans.trial.description') }}
              </p>
              
              <!-- Features -->
              <ul class="space-y-4 mb-8 text-left">
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.trial.features.cvs') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.trial.features.users') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.trial.features.ai') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.trial.features.support') }}</span>
                </li>
              </ul>
              
              <BaseButton 
                variant="outline" 
                class="w-full"
                @click="selectPlan('trial')"
              >
                {{ $t('pricing.plans.trial.cta') }}
              </BaseButton>
            </div>
          </BaseCard>

          <!-- Starter Plan -->
          <BaseCard class="relative p-8 border-2 border-gray-200">
            <div class="text-center">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">
                {{ $t('pricing.plans.starter.name') }}
              </h3>
              <div class="mb-6">
                <span class="text-4xl font-bold text-gray-900">
                  ${{ isAnnual ? '39' : '49' }}
                </span>
                <span class="text-gray-600 ml-1">/{{ $t('pricing.plans.starter.period') }}</span>
              </div>
              <p class="text-gray-600 mb-8">
                {{ $t('pricing.plans.starter.description') }}
              </p>
              
              <!-- Features -->
              <ul class="space-y-4 mb-8 text-left">
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.starter.features.cvs') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.starter.features.users') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.starter.features.ai') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.starter.features.export') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.starter.features.support') }}</span>
                </li>
              </ul>
              
              <BaseButton 
                variant="outline" 
                class="w-full"
                @click="selectPlan('starter')"
              >
                {{ $t('pricing.plans.starter.cta') }}
              </BaseButton>
            </div>
          </BaseCard>

          <!-- Professional Plan -->
          <BaseCard class="relative p-8 border-2 border-blue-500 bg-blue-50">
            <!-- Popular Badge -->
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                {{ $t('pricing.plans.professional.badge') }}
              </span>
            </div>
            
            <div class="text-center">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">
                {{ $t('pricing.plans.professional.name') }}
              </h3>
              <div class="mb-6">
                <span class="text-4xl font-bold text-gray-900">
                  ${{ isAnnual ? '79' : '99' }}
                </span>
                <span class="text-gray-600 ml-1">/{{ $t('pricing.plans.professional.period') }}</span>
              </div>
              <p class="text-gray-600 mb-8">
                {{ $t('pricing.plans.professional.description') }}
              </p>
              
              <!-- Features -->
              <ul class="space-y-4 mb-8 text-left">
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.professional.features.cvs') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.professional.features.users') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.professional.features.ai') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.professional.features.export') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.professional.features.analytics') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.professional.features.support') }}</span>
                </li>
              </ul>
              
              <BaseButton 
                variant="primary" 
                class="w-full"
                @click="selectPlan('professional')"
              >
                {{ $t('pricing.plans.professional.cta') }}
              </BaseButton>
            </div>
          </BaseCard>

          <!-- Enterprise Plan -->
          <BaseCard class="relative p-8 border-2 border-gray-200">
            <div class="text-center">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">
                {{ $t('pricing.plans.enterprise.name') }}
              </h3>
              <div class="mb-6">
                <span class="text-4xl font-bold text-gray-900">
                  ${{ isAnnual ? '159' : '199' }}
                </span>
                <span class="text-gray-600 ml-1">/{{ $t('pricing.plans.enterprise.period') }}</span>
              </div>
              <p class="text-gray-600 mb-8">
                {{ $t('pricing.plans.enterprise.description') }}
              </p>
              
              <!-- Features -->
              <ul class="space-y-4 mb-8 text-left">
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.enterprise.features.cvs') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.enterprise.features.users') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.enterprise.features.ai') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.enterprise.features.export') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.enterprise.features.analytics') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.enterprise.features.api') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.enterprise.features.support') }}</span>
                </li>
              </ul>
              
              <BaseButton 
                variant="outline" 
                class="w-full"
                @click="selectPlan('enterprise')"
              >
                {{ $t('pricing.plans.enterprise.cta') }}
              </BaseButton>
            </div>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- Features Comparison -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('pricing.comparison.title') }}
          </h2>
          <p class="text-xl text-gray-600">
            {{ $t('pricing.comparison.subtitle') }}
          </p>
        </div>
        
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    {{ $t('pricing.comparison.features') }}
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-medium text-gray-900">
                    {{ $t('pricing.plans.trial.name') }}
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-medium text-gray-900">
                    {{ $t('pricing.plans.starter.name') }}
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-medium text-gray-900 bg-blue-50">
                    {{ $t('pricing.plans.professional.name') }}
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-medium text-gray-900">
                    {{ $t('pricing.plans.enterprise.name') }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="feature in comparisonFeatures" :key="feature.name">
                  <td class="px-6 py-4 text-sm text-gray-900 font-medium">
                    {{ feature.name }}
                  </td>
                  <td class="px-6 py-4 text-center text-sm text-gray-600">
                    <component :is="getFeatureIcon(feature.trial)" :value="feature.trial" />
                  </td>
                  <td class="px-6 py-4 text-center text-sm text-gray-600">
                    <component :is="getFeatureIcon(feature.starter)" :value="feature.starter" />
                  </td>
                  <td class="px-6 py-4 text-center text-sm text-gray-600 bg-blue-50">
                    <component :is="getFeatureIcon(feature.professional)" :value="feature.professional" />
                  </td>
                  <td class="px-6 py-4 text-center text-sm text-gray-600">
                    <component :is="getFeatureIcon(feature.enterprise)" :value="feature.enterprise" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('pricing.faq.title') }}
          </h2>
          <p class="text-xl text-gray-600">
            {{ $t('pricing.faq.subtitle') }}
          </p>
        </div>
        
        <div class="space-y-4">
          <div 
            v-for="faq in pricingFAQs" 
            :key="faq.id"
            class="border border-gray-200 rounded-lg"
          >
            <button
              @click="toggleFAQ(faq.id)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span class="font-medium text-gray-900">{{ faq.question }}</span>
              <ChevronDownIcon 
                :class="[
                  'w-5 h-5 text-gray-500 transition-transform',
                  openFAQs.includes(faq.id) ? 'rotate-180' : ''
                ]"
              />
            </button>
            <div 
              v-if="openFAQs.includes(faq.id)"
              class="px-6 pb-4 text-gray-600 border-t border-gray-100"
            >
              <div class="pt-4" v-html="faq.answer"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-blue-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-6">
          {{ $t('pricing.cta.title') }}
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          {{ $t('pricing.cta.subtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton 
            variant="secondary" 
            size="lg"
            @click="$router.push('/auth/register')"
          >
            {{ $t('pricing.cta.startTrial') }}
          </BaseButton>
          <BaseButton 
            variant="outline" 
            size="lg"
            class="text-white border-white hover:bg-white hover:text-blue-600"
            @click="contactSales"
          >
            {{ $t('pricing.cta.contactSales') }}
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import { toast } from 'vue3-toastify';

const { t } = useI18n();
const router = useRouter();

const isAnnual = ref(false);
const openFAQs = ref<string[]>([]);

const comparisonFeatures = computed(() => [
  {
    name: t('pricing.comparison.table.cvAnalysis'),
    trial: '5',
    starter: '50',
    professional: '200',
    enterprise: t('pricing.comparison.table.unlimited')
  },
  {
    name: t('pricing.comparison.table.users'),
    trial: '1',
    starter: '3',
    professional: '8',
    enterprise: '10+'
  },
  {
    name: t('pricing.comparison.table.aiImprovement'),
    trial: true,
    starter: true,
    professional: true,
    enterprise: true
  },
  {
    name: t('pricing.comparison.table.exportContacts'),
    trial: false,
    starter: true,
    professional: true,
    enterprise: true
  },
  {
    name: t('pricing.comparison.table.analytics'),
    trial: false,
    starter: false,
    professional: true,
    enterprise: true
  },
  {
    name: t('pricing.comparison.table.apiAccess'),
    trial: false,
    starter: false,
    professional: false,
    enterprise: true
  },
  {
    name: t('pricing.comparison.table.support'),
    trial: t('pricing.comparison.table.emailSupport'),
    starter: t('pricing.comparison.table.emailSupport'),
    professional: t('pricing.comparison.table.prioritySupport'),
    enterprise: t('pricing.comparison.table.dedicatedSupport')
  }
]);

const pricingFAQs = computed(() => [
  {
    id: 'pricing-1',
    question: t('pricing.faq.q1.question'),
    answer: t('pricing.faq.q1.answer')
  },
  {
    id: 'pricing-2',
    question: t('pricing.faq.q2.question'),
    answer: t('pricing.faq.q2.answer')
  },
  {
    id: 'pricing-3',
    question: t('pricing.faq.q3.question'),
    answer: t('pricing.faq.q3.answer')
  },
  {
    id: 'pricing-4',
    question: t('pricing.faq.q4.question'),
    answer: t('pricing.faq.q4.answer')
  },
  {
    id: 'pricing-5',
    question: t('pricing.faq.q5.question'),
    answer: t('pricing.faq.q5.answer')
  }
]);

const getFeatureIcon = (value: any) => {
  if (typeof value === 'boolean') {
    return value ? 'CheckIcon' : 'XMarkIcon';
  }
  return 'FeatureValue';
};

const toggleFAQ = (id: string) => {
  const index = openFAQs.value.indexOf(id);
  if (index > -1) {
    openFAQs.value.splice(index, 1);
  } else {
    openFAQs.value.push(id);
  }
};

const selectPlan = (plan: string) => {
  toast.success(t('pricing.messages.planSelected', { plan }));
  router.push('/auth/register');
};

const contactSales = () => {
  window.location.href = 'mailto:sales@cvanalyzer.com?subject=Enterprise Plan Inquiry';
};
</script>

<style scoped>
/* Custom component for feature values */
.feature-value {
  color: #111827;
  font-weight: 500;
}
</style>