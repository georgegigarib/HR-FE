<template>
  <ul class="space-y-4 mb-8 text-left">

    <li v-for="feature in features" :key="feature" class="flex items-center">
      <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
      <span class="text-gray-700">{{ t(feature) }}</span>
    </li>

  </ul>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import type { PricingPlan } from '@/presentation/pricing/data/pricingPlans'

const { t } = useI18n()

interface Props {
  features: PricingPlan['features']
}

defineProps<Props>()
</script>
