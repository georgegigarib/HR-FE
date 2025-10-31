<template>
  <section class="py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center mb-16">
        <h2 class="text-black font-bold mb-4 text-3xl lg:text-4xl">
          {{ t('pricing.faq.title') }}
        </h2>
        <p class="text-gray-500 text-xl">
          {{ t('pricing.faq.subtitle') }}
        </p>
      </div>

      <div class="space-y-4">
        <PricingFAQItem 
          v-for="faq in pricingFAQs" 
          :key="faq.id" 
          :faq="faq" 
        />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import PricingFAQItem from '@/presentation/pricing/components/PricingFAQItem.vue'
import { pricingFAQs } from '@/presentation/pricing/data/pricingFAQ'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
