<template>
  <HeroSection>
    
    <h1 class="text-black font-bold mb-6 text-4xl sm:text-5xl md:text-6xl">
      {{ $t('pricing.hero.title') }}
    </h1>
    <p class="text-gray-500 mx-auto mb-8 md:mt-5 text-lg md:text-xl">
      {{ $t('pricing.hero.subtitle') }}
    </p>

    <!-- Billing Toggle -->
    <div class="flex justify-center items-center text-gray-500">
      <p class="mr-3">
        {{ $t('pricing.billing.monthly') }}
      </p>

      <button
        @click="toggleAnnual"
        :class="[
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
          isAnnual ? 'bg-blue-600' : 'bg-gray-200'
        ]"
      >
        <span
          :class="[
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
            isAnnual ? 'translate-x-6' : 'translate-x-1'
          ]"
        />
      </button>

      <p class="ml-3">
        {{ $t('pricing.billing.annual') }}
        <span class="text-green-600">({{ $t('pricing.billing.save20') }})</span>
      </p>
    </div>

  </HeroSection>
</template>

<script setup lang="ts">
import HeroSection from '@/presentation/shared/HeroSection.vue'

interface Props {
  isAnnual: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  toggleAnnual: []
}>()

const toggleAnnual = () => {
  emit('toggleAnnual')
}
</script>
