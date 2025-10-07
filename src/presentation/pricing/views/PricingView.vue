<template>
  <PublicLayout>
    <PricingIntro />

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
                  <span class="text-gray-700">{{
                    $t('pricing.plans.trial.features.support')
                  }}</span>
                </li>
              </ul>

              <BaseButton variant="outline" class="w-full" @click="selectPlan('trial')">
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
                  <span class="text-gray-700">{{
                    $t('pricing.plans.starter.features.users')
                  }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{ $t('pricing.plans.starter.features.ai') }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{
                    $t('pricing.plans.starter.features.export')
                  }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{
                    $t('pricing.plans.starter.features.support')
                  }}</span>
                </li>
              </ul>

              <BaseButton variant="outline" class="w-full" @click="selectPlan('starter')">
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
                <span class="text-gray-600 ml-1"
                  >/{{ $t('pricing.plans.professional.period') }}</span
                >
              </div>
              <p class="text-gray-600 mb-8">
                {{ $t('pricing.plans.professional.description') }}
              </p>

              <!-- Features -->
              <ul class="space-y-4 mb-8 text-left">
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{
                    $t('pricing.plans.professional.features.cvs')
                  }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{
                    $t('pricing.plans.professional.features.users')
                  }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{
                    $t('pricing.plans.professional.features.ai')
                  }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{
                    $t('pricing.plans.professional.features.export')
                  }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{
                    $t('pricing.plans.professional.features.analytics')
                  }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{
                    $t('pricing.plans.professional.features.support')
                  }}</span>
                </li>
              </ul>

              <BaseButton variant="primary" class="w-full" @click="selectPlan('professional')">
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
                  <span class="text-gray-700">{{
                    $t('pricing.plans.enterprise.features.cvs')
                  }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{
                    $t('pricing.plans.enterprise.features.users')
                  }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{
                    $t('pricing.plans.enterprise.features.ai')
                  }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{
                    $t('pricing.plans.enterprise.features.export')
                  }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{
                    $t('pricing.plans.enterprise.features.analytics')
                  }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{
                    $t('pricing.plans.enterprise.features.api')
                  }}</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                  <span class="text-gray-700">{{
                    $t('pricing.plans.enterprise.features.support')
                  }}</span>
                </li>
              </ul>

              <BaseButton variant="outline" class="w-full" @click="selectPlan('enterprise')">
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
                    <component
                      v-if="typeof feature.trial === 'boolean'"
                      :is="getFeatureIcon(feature.trial)"
                      :class="
                        feature.trial
                          ? 'w-5 h-5 text-green-500 mx-auto'
                          : 'w-5 h-5 text-red-500 mx-auto'
                      "
                    />
                    <span v-else class="font-medium text-gray-900">{{ feature.trial }}</span>
                  </td>
                  <td class="px-6 py-4 text-center text-sm text-gray-600">
                    <component
                      v-if="typeof feature.starter === 'boolean'"
                      :is="getFeatureIcon(feature.starter)"
                      :class="
                        feature.starter
                          ? 'w-5 h-5 text-green-500 mx-auto'
                          : 'w-5 h-5 text-red-500 mx-auto'
                      "
                    />
                    <span v-else class="font-medium text-gray-900">{{ feature.starter }}</span>
                  </td>
                  <td class="px-6 py-4 text-center text-sm text-gray-600 bg-blue-50">
                    <component
                      v-if="typeof feature.professional === 'boolean'"
                      :is="getFeatureIcon(feature.professional)"
                      :class="
                        feature.professional
                          ? 'w-5 h-5 text-green-500 mx-auto'
                          : 'w-5 h-5 text-red-500 mx-auto'
                      "
                    />
                    <span v-else class="font-medium text-gray-900">{{ feature.professional }}</span>
                  </td>
                  <td class="px-6 py-4 text-center text-sm text-gray-600">
                    <component
                      v-if="typeof feature.enterprise === 'boolean'"
                      :is="getFeatureIcon(feature.enterprise)"
                      :class="
                        feature.enterprise
                          ? 'w-5 h-5 text-green-500 mx-auto'
                          : 'w-5 h-5 text-red-500 mx-auto'
                      "
                    />
                    <span v-else class="font-medium text-gray-900">{{ feature.enterprise }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <PricingFAQ />
    <CTASection />
  </PublicLayout>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import PublicLayout from '@/presentation/layouts/PublicLayout.vue'
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import CTASection from '../components/CTASection.vue'
import PricingFAQ from '../components/PricingFAQ.vue'
import PricingIntro from '../components/PricingIntro.vue'

const { t } = useI18n()
const router = useRouter()

const isAnnual = ref(false)

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
])

const getFeatureIcon = (value: any) => {
  if (typeof value === 'boolean') {
    return value ? CheckIcon : XMarkIcon
  }
  return 'span'
}

const selectPlan = (plan: string) => {
  toast.success(t('pricing.messages.planSelected', { plan }))
  router.push('/register')
}
</script>

<style scoped>
/* Custom component for feature values */
.feature-value {
  color: #111827;
  font-weight: 500;
}
</style>
