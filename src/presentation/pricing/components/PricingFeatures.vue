<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-black mb-4">
          {{ t('pricing.comparison.title') }}
        </h2>
        <p class="text-xl text-gray-600">
          {{ t('pricing.comparison.subtitle') }}
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <PricingFeaturesTable />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import PricingFeaturesTable from '@/presentation/pricing/components/PricingFeaturesTable.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
