<template>
  <BaseCard class="text-center p-8">
    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <PhoneIcon class="w-8 h-8 text-purple-600" />
    </div>
    <h3 class="text-xl font-semibold text-gray-900 mb-4">
      {{ $t('help.contact.phone.title') }}
    </h3>
    <p class="text-gray-600 mb-6">
      {{ $t('help.contact.phone.description') }}
    </p>
    <BaseButton variant="primary" @click="callSupport">
      {{ $t('help.contact.phone.action') }}
    </BaseButton>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import { PhoneIcon } from '@heroicons/vue/24/outline'

const callSupport = () => {
  window.location.href = 'tel:+1-800-123-4567'
}
</script>
