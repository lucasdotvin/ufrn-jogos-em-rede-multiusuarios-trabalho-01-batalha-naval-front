<script setup>
import { VERTICAL_DIRECTION } from '@/constant/direction.js'
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  content: {
    type: Object,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    required: true
  }
})

const boundAttrs = computed(() => {
  const attrs = {
    status: props.status
  }

  if (props.disabled || props.loading) {
    attrs['aria-disabled'] = true
    attrs.disabled = true
  }

  return attrs
})
</script>

<template>
  <li class="flex h-8 w-8 items-center justify-center">
    <button
      class="x-map-tile h-full w-full border transition duration-75"
      type="button"
      v-bind="{ ...boundAttrs, ...$attrs }"
    >
      <span
        class="block transform"
        :class="{
          'rotate-90': content?.direction === VERTICAL_DIRECTION
        }"
        v-text="content?.char"
      />
    </button>
  </li>
</template>

<style scoped>
.x-map-tile[status='none'] {
  @apply border-dashed border-zinc-400/50 hover:bg-zinc-50/5 active:bg-zinc-50/10;
}

.x-map-tile[status='info'] {
  @apply border-solid border-zinc-400/50 bg-zinc-50/5;
}

.x-map-tile[status='error'] {
  @apply border-solid border-red-500 bg-red-500/10;
}

.x-map-tile[status='success'] {
  @apply border-solid border-green-500 bg-green-500/10;
}
</style>
