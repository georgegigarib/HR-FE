<template>
  <details class="border border-gray-200 rounded-lg group open:bg-gray-50 transition-colors">

    <summary
      class="text-left px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <p class="text-black">{{ t(faq.question) }}</p>
      <ChevronDownIcon class="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" />
    </summary>

    <div class="px-6 pb-4 text-gray-500 border-t border-gray-100 pt-4">
      <p>{{ t(faq.answer) }}</p>
    </div>

  </details>
</template>

<script setup lang="ts">
import type { FAQ } from '@/presentation/pricing/data/pricingFAQ'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  faq: FAQ
}

defineProps<Props>()
</script>
