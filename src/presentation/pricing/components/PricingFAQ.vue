<template>
  <section class="py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-black font-bold mb-4 text-3xl lg:text-4xl">
          {{ $t('pricing.faq.title') }}
        </h2>
        <p class="text-gray-500 text-xl">
          {{ $t('pricing.faq.subtitle') }}
        </p>
      </div>

      <!-- FAQs con <details> -->
      <div class="space-y-4">
        <details
          v-for="faq in pricingFAQs"
          :key="faq.id"
          class="border border-gray-200 rounded-lg group open:bg-gray-50 transition-colors"
        >
          <summary
            class="text-left px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <p class="text-black">{{ faq.question }}</p>
            <ChevronDownIcon
              class="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
            />
          </summary>

          <div class="px-6 pb-4 text-gray-500 border-t border-gray-100 pt-4">
            <p>{{ faq.answer }}</p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const pricingFAQs = computed(() => [
  {
    id: 'pricing-1',
    question: t('pricing.faq.q1.question'),
    answer: t('pricing.faq.q1.answer')
  },
  {
    id: 'pricing-2',
    question: t('pricing.faq.q2.question'),
    answer: t('pricing.faq.q2.answer')
  },
  {
    id: 'pricing-3',
    question: t('pricing.faq.q3.question'),
    answer: t('pricing.faq.q3.answer')
  },
  {
    id: 'pricing-4',
    question: t('pricing.faq.q4.question'),
    answer: t('pricing.faq.q4.answer')
  },
  {
    id: 'pricing-5',
    question: t('pricing.faq.q5.question'),
    answer: t('pricing.faq.q5.answer')
  }
])
</script>
