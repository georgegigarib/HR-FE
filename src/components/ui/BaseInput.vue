<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <div class="relative">
      <div v-if="$slots.prefix || prefixIcon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <component v-if="prefixIcon" :is="prefixIcon" class="h-5 w-5 text-gray-400" />
        <slot name="prefix" />
      </div>
      
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown.enter="handleEnter"
      />
      
      <div v-if="$slots.suffix || suffixIcon || showPasswordToggle" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <button
          v-if="showPasswordToggle"
          type="button"
          class="text-gray-400 hover:text-gray-600 focus:outline-none"
          @click="togglePasswordVisibility"
        >
          <EyeIcon v-if="type === 'password'" class="h-5 w-5" />
          <EyeSlashIcon v-else class="h-5 w-5" />
        </button>
        <component v-else-if="suffixIcon" :is="suffixIcon" class="h-5 w-5 text-gray-400" />
        <slot v-else name="suffix" />
      </div>
    </div>
    
    <div v-if="error || hint" class="mt-1">
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      <p v-else-if="hint" class="text-sm text-gray-500">{{ hint }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

interface Props {
  modelValue?: string | number;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  label?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  autocomplete?: string;
  prefixIcon?: any;
  suffixIcon?: any;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled';
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  variant: 'default'
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
  enter: [event: KeyboardEvent];
}>();

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`);
const internalType = ref(props.type);
const isFocused = ref(false);

const showPasswordToggle = computed(() => {
  return props.type === 'password' || internalType.value === 'password';
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = props.type === 'number' ? Number(target.value) : target.value;
  emit('update:modelValue', value);
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit('blur', event);
};

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emit('focus', event);
};

const handleEnter = (event: KeyboardEvent) => {
  emit('enter', event);
};

const togglePasswordVisibility = () => {
  internalType.value = internalType.value === 'password' ? 'text' : 'password';
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

const paddingClasses = computed(() => {
  const hasPrefix = props.prefixIcon || !!document.querySelector(`#${inputId.value}`)?.previousElementSibling?.querySelector('[slot="prefix"]');
  const hasSuffix = props.suffixIcon || showPasswordToggle.value || !!document.querySelector(`#${inputId.value}`)?.nextElementSibling?.querySelector('[slot="suffix"]');
  
  let classes = '';
  if (hasPrefix) classes += ' pl-10';
  if (hasSuffix) classes += ' pr-10';
  
  return classes;
});

const inputClasses = computed(() => {
  return [
    baseClasses,
    sizeClasses.value,
    variantClasses.value,
    stateClasses.value,
    paddingClasses.value,
    props.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : '',
    props.readonly ? 'bg-gray-50' : ''
  ].join(' ');
});
</script>