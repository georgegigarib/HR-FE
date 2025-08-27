<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <div v-if="loading" class="flex items-center justify-center">
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25"
cx="12"
cy="12"
r="10"
stroke="currentColor"
stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {{ loadingText || 'Cargando...' }}
    </div>
    <div v-else class="flex items-center justify-center gap-2">
      <component v-if="icon" :is="icon" :class="iconClasses" />
      <slot>{{ text }}</slot>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  text?: string;
  icon?: any;
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};

const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500';
    case 'secondary':
      return 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500';
    case 'danger':
      return 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500';
    case 'success':
      return 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500';
    case 'outline':
      return 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500';
    case 'ghost':
      return 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500';
    default:
      return 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-2 text-sm';
    case 'md':
      return 'px-4 py-2 text-base';
    case 'lg':
      return 'px-6 py-3 text-lg';
    default:
      return 'px-4 py-2 text-base';
  }
});

const buttonClasses = computed(() => {
  return [
    baseClasses,
    variantClasses.value,
    sizeClasses.value,
    props.fullWidth ? 'w-full' : '',
    props.loading ? 'cursor-wait' : ''
  ].join(' ');
});

const iconClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-4 h-4';
    case 'md':
      return 'w-5 h-5';
    case 'lg':
      return 'w-6 h-6';
    default:
      return 'w-5 h-5';
  }
});
</script>