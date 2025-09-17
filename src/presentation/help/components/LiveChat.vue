<template>
  <BaseCard class="text-center p-8">
    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <ChatBubbleLeftRightIcon class="w-8 h-8 text-green-600" />
    </div>
    <h3 class="text-xl font-semibold text-gray-900 mb-4">
      {{ $t('help.contact.chat.title') }}
    </h3>
    <p class="text-gray-600 mb-6">
      {{ $t('help.contact.chat.description') }}
    </p>
    <BaseButton variant="primary" @click="startChat">
      {{ $t('help.contact.chat.action') }}
    </BaseButton>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import { ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline'

const startChat = () => {}
</script>
