<template>
  <table class="w-full text-black">

    <thead class="bg-gray-50">
      <tr class="text-center text-sm">
        <th class="px-6 py-4 text-left font-medium">
          {{ t('pricing.comparison.features') }}
        </th>
        <th class="px-6 py-4 font-medium">
          {{ t('pricing.plans.trial.name') }}
        </th>
        <th class="px-6 py-4 font-medium">
          {{ t('pricing.plans.starter.name') }}
        </th>
        <th class="px-6 py-4 font-medium bg-blue-50">
          {{ t('pricing.plans.professional.name') }}
        </th>
        <th class="px-6 py-4 font-medium">
          {{ t('pricing.plans.enterprise.name') }}
        </th>
      </tr>
    </thead>

    <tbody class="divide-y divide-gray-200">
      <tr v-for="feature in comparisonFeatures" :key="feature.name">
        <td class="px-6 py-4 text-sm text-black font-medium">
          {{ feature.name }}
        </td>
        <td class="px-6 py-4 text-center text-sm text-gray-600">
          <component
            v-if="typeof feature.trial === 'boolean'"
            :is="getFeatureIcon(feature.trial)"
            :class="
              feature.trial ? 'w-5 h-5 text-green-500 mx-auto' : 'w-5 h-5 text-red-500 mx-auto'
            "
          />
          <span v-else class="font-medium text-black">{{ feature.trial }}</span>
        </td>
        <td class="px-6 py-4 text-center text-sm text-gray-600">
          <component
            v-if="typeof feature.starter === 'boolean'"
            :is="getFeatureIcon(feature.starter)"
            :class="
              feature.starter ? 'w-5 h-5 text-green-500 mx-auto' : 'w-5 h-5 text-red-500 mx-auto'
            "
          />
          <span v-else class="font-medium text-black">{{ feature.starter }}</span>
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
          <span v-else class="font-medium text-black">{{ feature.professional }}</span>
        </td>
        <td class="px-6 py-4 text-center text-sm text-gray-600">
          <component
            v-if="typeof feature.enterprise === 'boolean'"
            :is="getFeatureIcon(feature.enterprise)"
            :class="
              feature.enterprise ? 'w-5 h-5 text-green-500 mx-auto' : 'w-5 h-5 text-red-500 mx-auto'
            "
          />
          <span v-else class="font-medium text-black">{{ feature.enterprise }}</span>
        </td>
      </tr>
    </tbody>

  </table>
</template>

<script setup lang="ts">
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
