<template>
  <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
    <span class="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
      {{ $t(label) }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
}

defineProps<Props>()
</script>