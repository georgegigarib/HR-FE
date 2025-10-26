<template>
  <PublicLayout>
    <PricingIntro :is-annual="isAnnual" @toggle-annual="toggleAnnual" />
    <PricingPlans :is-annual="isAnnual" />
    <PricingFeatures />
    <PricingFAQ />
    <CTASection />
  </PublicLayout>
</template>

<script setup lang="ts">
import CTASection from '@/presentation/pricing/components/CTASection.vue'
import PricingFAQ from '@/presentation/pricing/components/PricingFAQ.vue'
import PricingFeatures from '@/presentation/pricing/components/PricingFeatures.vue'
import PricingIntro from '@/presentation/pricing/components/PricingIntro.vue'
import PricingPlans from '@/presentation/pricing/components/PricingPlans.vue'
import { useToggleState } from '@/presentation/shared/composables/useToggleState'

const { state: isAnnual, toggle: toggleAnnual } = useToggleState(false)
</script>
