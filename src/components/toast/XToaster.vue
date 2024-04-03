<script setup>
import XToast from '@/components/toast/XToast.vue'
import { useToastStore } from '@/stores/toast.js'

const toastStore = useToastStore()
</script>

<template>
  <transition-group
    class="x-transition fixed bottom-0 m-10 flex w-80 flex-col items-center gap-2"
    move-class="transition-all duration-200"
    enter-active-class="transition-all duration-200"
    leave-active-class="transition-all duration-200 absolute"
    enter-from-class="opacity-0 transform translate-y-4"
    enter-to-class="opacity-100 transform translate-y-0"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    tag="div"
  >
    <XToast
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      :text="toast.text"
      :type="toast.type"
    />
  </transition-group>
</template>
