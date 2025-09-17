<template>
  <section class="py-12 bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <BaseCard
          class="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer"
          clickable
          @click="$emit('scrollToSection', 'getting-started')"
        >
          <div
            class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <PlayIcon class="w-6 h-6 text-blue-600" />
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">
            {{ $t('help.quickLinks.gettingStarted') }}
          </h3>
          <p class="text-sm text-gray-600">
            {{ $t('help.quickLinks.gettingStartedDesc') }}
          </p>
        </BaseCard>

        <BaseCard
          class="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer"
          clickable
          @click="$emit('scrollToSection', 'account')"
        >
          <div
            class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <UserIcon class="w-6 h-6 text-green-600" />
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">
            {{ $t('help.quickLinks.account') }}
          </h3>
          <p class="text-sm text-gray-600">
            {{ $t('help.quickLinks.accountDesc') }}
          </p>
        </BaseCard>

        <BaseCard
          class="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer"
          clickable
          @click="$emit('scrollToSection', 'billing')"
        >
          <div
            class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CreditCardIcon class="w-6 h-6 text-purple-600" />
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">
            {{ $t('help.quickLinks.billing') }}
          </h3>
          <p class="text-sm text-gray-600">
            {{ $t('help.quickLinks.billingDesc') }}
          </p>
        </BaseCard>

        <BaseCard
          class="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer"
          clickable
          @click="$emit('scrollToSection', 'technical')"
        >
          <div
            class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Cog6ToothIcon class="w-6 h-6 text-orange-600" />
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">
            {{ $t('help.quickLinks.technical') }}
          </h3>
          <p class="text-sm text-gray-600">
            {{ $t('help.quickLinks.technicalDesc') }}
          </p>
        </BaseCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import {
  Cog6ToothIcon,
  CreditCardIcon,
  PlayIcon,
  UserIcon
} from '@heroicons/vue/24/outline'

defineEmits<{
  scrollToSection: [sectionId: string]
}>()
</script>