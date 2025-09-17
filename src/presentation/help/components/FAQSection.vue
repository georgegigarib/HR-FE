<template>
  <div :id="sectionId">
    <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
      <component :is="icon" class="w-6 h-6 mr-3" :class="iconColor" />
      {{ title }}
    </h3>
    <div class="space-y-4">
      <div
        v-for="faq in faqs"
        :key="faq.id"
        class="border border-gray-200 rounded-lg"
      >
        <button
          @click="toggleFAQ(faq.id)"
          class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span class="font-medium text-gray-900">{{ faq.question }}</span>
          <ChevronDownIcon
            :class="[
              'w-5 h-5 text-gray-500 transition-transform',
              openFAQs.includes(faq.id) ? 'rotate-180' : ''
            ]"
          />
        </button>
        <div
          v-if="openFAQs.includes(faq.id)"
          class="px-6 pb-4 text-gray-600 border-t border-gray-100"
        >
          <div class="pt-4" v-html="faq.answer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import type { FAQ } from '../data/faqSections'

interface Props {
  sectionId: string
  title: string
  faqs: FAQ[]
  icon: any
  iconColor: string
  openFAQs: string[]
}

defineProps<Props>()
const emit = defineEmits<{
  toggleFAQ: [id: string]
}>()

const toggleFAQ = (id: string) => {
  emit('toggleFAQ', id)
}
</script>