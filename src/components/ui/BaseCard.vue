<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" :class="headerClasses">
      <div v-if="title" class="flex items-center justify-between">
        <h3 :class="titleClasses">{{ title }}</h3>
        <slot name="headerActions" />
      </div>
      <slot v-else name="header" />
    </div>
    
    <div :class="bodyClasses">
      <slot />
    </div>
    
    <div v-if="$slots.footer" :class="footerClasses">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title?: string;
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  padding: 'md',
  rounded: 'lg',
  shadow: 'sm',
  hover: false,
  clickable: false
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const baseClasses = 'bg-white border transition-all duration-200';

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'outlined':
      return 'border-gray-200 bg-white';
    case 'elevated':
      return 'border-transparent bg-white';
    case 'filled':
      return 'border-transparent bg-gray-50';
    default:
      return 'border-gray-200 bg-white';
  }
});

const roundedClasses = computed(() => {
  switch (props.rounded) {
    case 'none':
      return 'rounded-none';
    case 'sm':
      return 'rounded-sm';
    case 'md':
      return 'rounded-md';
    case 'lg':
      return 'rounded-lg';
    case 'xl':
      return 'rounded-xl';
    default:
      return 'rounded-lg';
  }
});

const shadowClasses = computed(() => {
  switch (props.shadow) {
    case 'none':
      return 'shadow-none';
    case 'sm':
      return 'shadow-sm';
    case 'md':
      return 'shadow-md';
    case 'lg':
      return 'shadow-lg';
    case 'xl':
      return 'shadow-xl';
    default:
      return 'shadow-sm';
  }
});

const hoverClasses = computed(() => {
  if (props.hover || props.clickable) {
    return 'hover:shadow-md hover:scale-[1.02]';
  }
  return '';
});

const clickableClasses = computed(() => {
  if (props.clickable) {
    return 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
  }
  return '';
});

const cardClasses = computed(() => {
  return [
    baseClasses,
    variantClasses.value,
    roundedClasses.value,
    shadowClasses.value,
    hoverClasses.value,
    clickableClasses.value
  ].join(' ');
});

const paddingClasses = computed(() => {
  switch (props.padding) {
    case 'none':
      return 'p-0';
    case 'sm':
      return 'p-4';
    case 'md':
      return 'p-6';
    case 'lg':
      return 'p-8';
    default:
      return 'p-6';
  }
});

const headerClasses = computed(() => {
  const padding = props.padding === 'none' ? 'px-6 pt-6' : paddingClasses.value.replace('p-', 'px-').replace('p-', 'pt-');
  return `${padding} pb-4 border-b border-gray-200`;
});

const bodyClasses = computed(() => {
  if (props.padding === 'none') {
    return 'p-0';
  }
  return paddingClasses.value;
});

const footerClasses = computed(() => {
  const padding = props.padding === 'none' ? 'px-6 pb-6' : paddingClasses.value.replace('p-', 'px-').replace('p-', 'pb-');
  return `${padding} pt-4 border-t border-gray-200`;
});

const titleClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-lg font-semibold text-gray-900';
    case 'md':
      return 'text-xl font-semibold text-gray-900';
    case 'lg':
      return 'text-2xl font-semibold text-gray-900';
    default:
      return 'text-xl font-semibold text-gray-900';
  }
});
</script>