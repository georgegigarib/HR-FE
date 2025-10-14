<template>
  <h3 class="text-2xl font-bold text-gray-900 mb-2">
    {{ $t(name) }}
  </h3>

  <div class="mb-6">
    <span class="text-4xl font-bold text-gray-900">${{ price }}</span>
    <span class="text-gray-600 ml-1">/ {{ $t(period) }}</span>
  </div>

  <p class="text-gray-600 mb-8">{{ $t(description) }}</p>
</template>

<script setup lang="ts">
import type { PricingPlan } from '../data/pricingPlans'

interface Props {
  name: PricingPlan['name']
  price: number
  period: PricingPlan['period']
  description: PricingPlan['description']
}

defineProps<Props>()
</script>
