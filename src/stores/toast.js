import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])

  function addToast(toast) {
    toast.id = Math.random()

    if (toasts.value.length > 4) {
      shiftToast()
    }

    toasts.value.push(toast)

    setTimeout(() => {
      removeToast(toast)
    }, 3000)
  }

  function removeToast(toast) {
    toasts.value = toasts.value.filter((t) => t.id !== toast.id)
  }

  function shiftToast() {
    toasts.value.shift()
  }

  return {
    toasts,
    addToast,
    removeToast,
    shiftToast
  }
})
