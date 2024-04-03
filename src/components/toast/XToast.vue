<script setup>
import { computed } from 'vue'
import { CheckIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/vue/16/solid'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info'
  }
})

const icon = computed(() => {
  return {
    info: InformationCircleIcon,
    success: CheckIcon,
    error: ExclamationTriangleIcon
  }[props.type]
})
</script>

<template>
  <div class="x-toast flex flex-row gap-1.5 border p-3 text-xs backdrop-blur-sm" v-bind="{ type }">
    <component :is="icon" class="h-4 w-4" />

    <p v-text="text" />
  </div>
</template>

<style>
.x-toast[type='info'] {
  @apply border-zinc-50 bg-zinc-50/5 text-zinc-50;
}

.x-toast[type='success'] {
  @apply border-green-500 bg-green-500/5 text-green-500;
}

.x-toast[type='warning'] {
  @apply border-yellow-500 bg-yellow-500/5 text-yellow-500;
}

.x-toast[type='error'] {
  @apply border-red-500 bg-red-500/5 text-red-500;
}
</style>
