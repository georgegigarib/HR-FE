<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          {{ $t('help.contact.title') }}
        </h2>
        <p class="text-xl text-gray-600">
          {{ $t('help.contact.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <EmailSupport />
        <LiveChat />
        <PhoneSupport />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import EmailSupport from '../components/EmailSupport.vue'
import LiveChat from '../components/LiveChat.vue'
import PhoneSupport from '../components/PhoneSupport.vue'
</script>
