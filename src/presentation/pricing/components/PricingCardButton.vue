<template>
  <BaseButton :variant="variant" class="w-full" @click="selectPlan">
    {{ t(cta) }}
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PricingPlan } from '@/presentation/pricing/data/pricingPlans'

const { t } = useI18n()

interface Props {
  id: PricingPlan['id']
  highlight: PricingPlan['highlight']
  cta: PricingPlan['cta']
}

const props = defineProps<Props>()

const variant = computed(() => {
  const { highlight } = props
  return highlight ? 'primary' : 'outline'
})

const emit = defineEmits<{
  selectPlan: [id: PricingPlan['id']]
}>()

const selectPlan = () => {
  emit('selectPlan', props.id)
}
</script>
