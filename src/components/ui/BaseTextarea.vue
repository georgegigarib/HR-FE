<template>
  <div class="w-full">
    <label v-if="label" :for="textareaId" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <div class="relative">
      <textarea
        :id="textareaId"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :rows="rows"
        :maxlength="maxlength"
        :class="textareaClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown="handleKeydown"
      />
      
      <div v-if="showCharCount && maxlength" class="absolute bottom-2 right-2 text-xs text-gray-400 bg-white px-1 rounded">
        {{ characterCount }}/{{ maxlength }}
      </div>
    </div>
    
    <div v-if="error || hint" class="mt-1">
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      <p v-else-if="hint" class="text-sm text-gray-500">{{ hint }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  rows?: number;
  maxlength?: number;
  showCharCount?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled';
  autoGrow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  rows: 4,
  resize: 'vertical',
  size: 'md',
  variant: 'default',
  showCharCount: false,
  autoGrow: false
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
  keydown: [event: KeyboardEvent];
}>();

const textareaId = ref(`textarea-${Math.random().toString(36).substr(2, 9)}`);
const isFocused = ref(false);

const characterCount = computed(() => {
  return props.modelValue?.length || 0;
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
  
  if (props.autoGrow) {
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
  }
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit('blur', event);
};

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emit('focus', event);
};

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event);
};

const baseClasses = 'block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0';

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-2 text-sm';
    case 'md':
      return 'px-4 py-2.5 text-base';
    case 'lg':
      return 'px-4 py-3 text-lg';
    default:
      return 'px-4 py-2.5 text-base';
  }
});

const variantClasses = computed(() => {
  if (props.variant === 'filled') {
    return 'bg-gray-50 border-gray-200';
  }
  return 'bg-white border-gray-300';
});

const stateClasses = computed(() => {
  if (props.error) {
    return 'border-red-300 focus:border-red-500 focus:ring-red-500';
  }
  if (isFocused.value) {
    return 'border-blue-500 focus:border-blue-500 focus:ring-blue-500';
  }
  return 'hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500';
});

const resizeClasses = computed(() => {
  switch (props.resize) {
    case 'none':
      return 'resize-none';
    case 'vertical':
      return 'resize-y';
    case 'horizontal':
      return 'resize-x';
    case 'both':
      return 'resize';
    default:
      return 'resize-y';
  }
});

const textareaClasses = computed(() => {
  return [
    baseClasses,
    sizeClasses.value,
    variantClasses.value,
    stateClasses.value,
    resizeClasses.value,
    props.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : '',
    props.readonly ? 'bg-gray-50' : '',
    props.autoGrow ? 'overflow-hidden' : ''
  ].join(' ');
});
</script>