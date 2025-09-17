<template>
  <BaseCard class="text-center p-8">
    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <EnvelopeIcon class="w-8 h-8 text-blue-600" />
    </div>
    <h3 class="text-xl font-semibold text-gray-900 mb-4">
      {{ $t('help.contact.email.title') }}
    </h3>
    <p class="text-gray-600 mb-6">
      {{ $t('help.contact.email.description') }}
    </p>
    <BaseButton variant="primary" @click="sendEmail">
      {{ $t('help.contact.email.action') }}
    </BaseButton>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import { EnvelopeIcon } from '@heroicons/vue/24/outline'

const sendEmail = () => {
  window.location.href = 'mailto:support@cvanalyzer.com'
}
</script>

<style scoped></style>
