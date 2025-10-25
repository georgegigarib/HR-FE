<template>
  <PublicLayout>
    <PricingIntro :is-annual="isAnnual" @toggle-annual="toggleAnnual" />
    <PricingPlans :is-annual="isAnnual" />

    <!-- Features Comparison -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {{ t('pricing.comparison.title') }}
          </h2>
          <p class="text-xl text-gray-600">
            {{ t('pricing.comparison.subtitle') }}
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    {{ t('pricing.comparison.features') }}
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-medium text-gray-900">
                    {{ t('pricing.plans.trial.name') }}
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-medium text-gray-900">
                    {{ t('pricing.plans.starter.name') }}
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-medium text-gray-900 bg-blue-50">
                    {{ t('pricing.plans.professional.name') }}
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-medium text-gray-900">
                    {{ t('pricing.plans.enterprise.name') }}
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
import PublicLayout from '@/presentation/layouts/PublicLayout.vue'
import { useToggleState } from '@/presentation/shared/composables/useToggleState'
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CTASection from '@/presentation/pricing/components/CTASection.vue'
import PricingFAQ from '@/presentation/pricing/components/PricingFAQ.vue'
import PricingIntro from '@/presentation/pricing/components/PricingIntro.vue'
import PricingPlans from '@/presentation/pricing/components/PricingPlans.vue'

const { t } = useI18n()

const { state: isAnnual, toggle: toggleAnnual } = useToggleState(false)

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
</script>

<style scoped>
/* Custom component for feature values */
.feature-value {
  color: #111827;
  font-weight: 500;
}
</style>
