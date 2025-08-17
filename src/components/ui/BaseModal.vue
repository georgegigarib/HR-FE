<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        
        <!-- Modal container -->
        <div class="flex min-h-full items-center justify-center p-4">
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-95 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-300"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-4"
          >
            <div
              v-if="modelValue"
              :class="modalClasses"
              @click.stop
            >
              <!-- Header -->
              <div v-if="$slots.header || title || closable" class="flex items-center justify-between p-6 border-b border-gray-200">
                <div class="flex items-center">
                  <component v-if="icon" :is="icon" :class="iconClasses" />
                  <h3 v-if="title" :class="titleClasses">{{ title }}</h3>
                  <slot v-else name="header" />
                </div>
                
                <button
                  v-if="closable"
                  type="button"
                  class="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                  @click="handleClose"
                >
                  <XMarkIcon class="w-6 h-6" />
                </button>
              </div>
              
              <!-- Body -->
              <div :class="bodyClasses">
                <slot />
              </div>
              
              <!-- Footer -->
              <div v-if="$slots.footer" class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                <slot name="footer" />
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, nextTick } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

interface Props {
  modelValue: boolean;
  title?: string;
  icon?: any;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  closeOnBackdrop?: boolean;
  persistent?: boolean;
  scrollable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closable: true,
  closeOnBackdrop: true,
  persistent: false,
  scrollable: true
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  close: [];
  open: [];
}>();

const handleClose = () => {
  if (!props.persistent) {
    emit('update:modelValue', false);
    emit('close');
  }
};

const handleBackdropClick = () => {
  if (props.closeOnBackdrop && !props.persistent) {
    handleClose();
  }
};

// Handle ESC key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.modelValue && props.closable && !props.persistent) {
    handleClose();
  }
};

// Add/remove event listeners
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';
    emit('open');
  } else {
    document.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = '';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'max-w-xs';
    case 'sm':
      return 'max-w-sm';
    case 'md':
      return 'max-w-md';
    case 'lg':
      return 'max-w-lg';
    case 'xl':
      return 'max-w-xl';
    case 'full':
      return 'max-w-full mx-4';
    default:
      return 'max-w-md';
  }
});

const modalClasses = computed(() => {
  return [
    'relative bg-white rounded-lg shadow-xl',
    sizeClasses.value,
    'w-full',
    props.scrollable ? 'max-h-[90vh] overflow-y-auto' : ''
  ].join(' ');
});

const titleClasses = computed(() => {
  return 'text-lg font-semibold text-gray-900';
});

const iconClasses = computed(() => {
  return 'w-6 h-6 mr-3 text-gray-600';
});

const bodyClasses = computed(() => {
  return 'p-6';
});
</script>