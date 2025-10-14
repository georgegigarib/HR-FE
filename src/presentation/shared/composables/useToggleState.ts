import { ref } from 'vue'

export const useToggleState = (initialValue = false) => {
  const state = ref<boolean>(initialValue)

  const toggle = () => {
    state.value = !state.value
  }

  return { state, toggle } as const
}
