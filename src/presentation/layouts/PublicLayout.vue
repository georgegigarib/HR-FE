<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navigation -->
    <PublicNavbar />
    
    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>
    
    <!-- Footer -->
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
import PublicNavbar from '@/presentation/layouts/sections/PublicNavbar.vue';
import PublicFooter from '@/presentation/layouts/sections/PublicFooter.vue';
</script>