<template>
  <BaseCard
    :class="[
      'relative p-8 border-2 transition-all duration-300',
      plan.highlight ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
    ]"
  >
  
    <PricingCardBadge v-if="plan.badge" :label="plan.badge" />

    <div class="text-center">
      <PricingCardHeader
        :name="plan.name"
        :price="price"
        :period="plan.period"
        :description="plan.description"
      />

      <PricingCardFeatures :features="plan.features" />

      <PricingCardButton
        :id="plan.id"
        :highlight="plan.highlight"
        :cta="plan.cta"
        @selectPlan="selectPlan"
      />
    </div>

  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import { computed } from 'vue'
import type { PricingPlan } from '../data/pricingPlans'
import PricingCardBadge from './PricingCardBadge.vue'
import PricingCardButton from './PricingCardButton.vue'
import PricingCardFeatures from './PricingCardFeatures.vue'
import PricingCardHeader from './PricingCardHeader.vue'

interface Props {
  plan: PricingPlan
  isAnnual: boolean
}

const props = defineProps<Props>()

const price = computed(() => {
  const { monthly, annual } = props.plan.price
  return props.isAnnual ? annual : monthly
})

const emit = defineEmits<{
  selectPlan: [id: PricingPlan['id']]
}>()

const selectPlan = (id: PricingPlan['id']) => {
  emit('selectPlan', id)
}
</script>
