<template>
  <section class="py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {{ $t('help.faq.title') }}
        </h2>
        <p class="text-xl text-gray-600">
          {{ $t('help.faq.subtitle') }}
        </p>
      </div>

      <div class="space-y-12">
        <!-- Getting Started -->
        <FAQSection
          section-id="getting-started"
          :title="$t('help.categories.gettingStarted')"
          :faqs="filteredFAQs.gettingStarted"
          :icon="PlayIcon"
          icon-color="text-blue-600"
          :openFAQs="openFAQs"
          @toggleFAQ="toggleFAQ"
        />

        <!-- Account Management -->
        <FAQSection
          section-id="account"
          :title="$t('help.categories.account')"
          :faqs="filteredFAQs.account"
          :icon="UserIcon"
          icon-color="text-green-600"
          :openFAQs="openFAQs"
          @toggleFAQ="toggleFAQ"
        />

        <!-- Billing & Plans -->
        <FAQSection
          section-id="billing"
          :title="$t('help.categories.billing')"
          :faqs="filteredFAQs.billing"
          :icon="CreditCardIcon"
          icon-color="text-purple-600"
          :openFAQs="openFAQs"
          @toggleFAQ="toggleFAQ"
        />

        <!-- Technical Support -->
        <FAQSection
          section-id="technical"
          :title="$t('help.categories.technical')"
          :faqs="filteredFAQs.technical"
          :icon="Cog6ToothIcon"
          icon-color="text-orange-600"
          :openFAQs="openFAQs"
          @toggleFAQ="toggleFAQ"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Cog6ToothIcon,
  CreditCardIcon,
  PlayIcon,
  UserIcon
} from '@heroicons/vue/24/outline'
import FAQSection from './FAQSection.vue'
import { useFAQSections, type FAQSections } from '../data/faqSections'

interface Props {
  searchQuery: string
}

const props = defineProps<Props>()

const { faqSections } = useFAQSections()
const openFAQs = ref<string[]>([])

const filteredFAQs = computed(() => {
  if (!props.searchQuery) {
    return faqSections
  }

  const query = props.searchQuery.toLowerCase()
  const filtered: FAQSections = {
    gettingStarted: [],
    account: [],
    billing: [],
    technical: []
  }

  Object.keys(faqSections).forEach((category) => {
    const categoryKey = category as keyof typeof faqSections
    filtered[categoryKey] = faqSections[categoryKey].filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)
    )
  })

  return filtered
})

const toggleFAQ = (id: string) => {
  const index = openFAQs.value.indexOf(id)
  if (index > -1) {
    openFAQs.value.splice(index, 1)
  } else {
    openFAQs.value.push(id)
  }
}
</script>