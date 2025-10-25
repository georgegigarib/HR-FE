<template>
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <PricingCard
          v-for="plan in plans"
          :key="plan.id"
          :plan="plan"
          :is-annual="isAnnual"
          @select-plan="selectPlan"
        />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { plans, type PricingPlan } from '@/presentation/pricing/data/pricingPlans'
import PricingCard from '@/presentation/pricing/components/PricingCard.vue'

const { t } = useI18n()
const router = useRouter()

interface Props {
  isAnnual: boolean
}

defineProps<Props>()

const selectPlan = (planId: PricingPlan['id']) => {
  toast.success(t('pricing.messages.planSelected', { plan: planId }))
  router.push('/register')
}
</script>
