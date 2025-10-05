<template>
  <section class="py-20 bg-blue-600">
    <div class="px-8 text-center">

      <h2 class="text-white text-3xl font-bold mb-6">
        {{ $t('pricing.cta.title') }}
      </h2>
      <p class="text-white text-xl mb-8">
        {{ $t('pricing.cta.subtitle') }}
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <BaseButton 
          variant="secondary" 
          size="lg" 
          @click="$router.push('/register')"
        >
          {{ $t('pricing.cta.startTrial') }}
        </BaseButton>

        <BaseButton
          variant="outline"
          size="lg"
          class="text-white border-white hover:bg-white hover:text-blue-600"
          @click="contactSales"
        >
          {{ $t('pricing.cta.contactSales') }}
        </BaseButton>
      </div>
      
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'

const contactSales = () => {}
</script>
