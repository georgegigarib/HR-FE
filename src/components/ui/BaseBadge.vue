<template>
  <span :class="badgeClasses" @click="handleClick">
    <slot name="prefix" />
    <span v-if="text">{{ text }}</span>
    <slot />
    <slot name="suffix" />
    
    <button
      v-if="closable"
      type="button"
      class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-black hover:bg-opacity-20 focus:outline-none focus:bg-black focus:bg-opacity-20"
      @click.stop="handleClose"
    >
      <XMarkIcon class="w-3 h-3" />
    </button>
    
    <PlusIcon
      v-if="addable"
      class="ml-1 w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
      @click.stop="handleAdd"
    />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { XMarkIcon, PlusIcon } from '@heroicons/vue/24/outline';

interface Props {
  text?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  closable?: boolean;
  addable?: boolean;
  clickable?: boolean;
  outline?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  rounded: 'md',
  closable: false,
  addable: false,
  clickable: false,
  outline: false
});

const emit = defineEmits<{
  click: [event: MouseEvent];
  close: [event: MouseEvent];
  add: [event: MouseEvent];
}>();

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event);
  }
};

const handleClose = (event: MouseEvent) => {
  emit('close', event);
};

const handleAdd = (event: MouseEvent) => {
  emit('add', event);
};

const baseClasses = 'inline-flex items-center font-medium transition-all duration-200';

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'px-2 py-0.5 text-xs';
    case 'sm':
      return 'px-2.5 py-0.5 text-sm';
    case 'md':
      return 'px-3 py-1 text-sm';
    case 'lg':
      return 'px-4 py-1.5 text-base';
    default:
      return 'px-3 py-1 text-sm';
  }
});

const roundedClasses = computed(() => {
  switch (props.rounded) {
    case 'sm':
      return 'rounded-sm';
    case 'md':
      return 'rounded-md';
    case 'lg':
      return 'rounded-lg';
    case 'full':
      return 'rounded-full';
    default:
      return 'rounded-md';
  }
});

const variantClasses = computed(() => {
  const isOutline = props.outline;
  
  switch (props.variant) {
    case 'primary':
      return isOutline
        ? 'border border-blue-500 text-blue-700 bg-transparent hover:bg-blue-50'
        : 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'secondary':
      return isOutline
        ? 'border border-gray-500 text-gray-700 bg-transparent hover:bg-gray-50'
        : 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    case 'success':
      return isOutline
        ? 'border border-green-500 text-green-700 bg-transparent hover:bg-green-50'
        : 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'warning':
      return isOutline
        ? 'border border-yellow-500 text-yellow-700 bg-transparent hover:bg-yellow-50'
        : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'error':
      return isOutline
        ? 'border border-red-500 text-red-700 bg-transparent hover:bg-red-50'
        : 'bg-red-100 text-red-800 hover:bg-red-200';
    case 'info':
      return isOutline
        ? 'border border-cyan-500 text-cyan-700 bg-transparent hover:bg-cyan-50'
        : 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200';
    default:
      return isOutline
        ? 'border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50'
        : 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
});

const clickableClasses = computed(() => {
  if (props.clickable) {
    return 'cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500';
  }
  return '';
});

const badgeClasses = computed(() => {
  return [
    baseClasses,
    sizeClasses.value,
    roundedClasses.value,
    variantClasses.value,
    clickableClasses.value
  ].join(' ');
});
</script>