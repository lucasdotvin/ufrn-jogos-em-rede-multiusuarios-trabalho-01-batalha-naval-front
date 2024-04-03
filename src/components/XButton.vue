<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import XLoadingIcon from '@/components/XLoadingIcon.vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    default: null
  },
  href: {
    type: String,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  tone: {
    type: String,
    default: 'primary'
  },
  type: {
    type: String,
    default: null
  }
})

const isLink = computed(() => props.href !== null)

const tag = computed(() => (isLink.value ? RouterLink : 'button'))

const boundAttrs = computed(() => {
  const attrs = {}

  if (isLink.value) {
    attrs.to = props.href
  } else {
    attrs.type = props.type
  }

  if (props.disabled || props.loading) {
    attrs['aria-disabled'] = true
    attrs.disabled = true
  }

  return attrs
})
</script>

<template>
  <component
    :is="tag"
    class="x-button relative bottom-0 flex flex-row items-center justify-center gap-2 border p-4 text-xs font-medium uppercase tracking-widest shadow-lg shadow-zinc-50/5 backdrop-blur-sm transition-all duration-100 ease-in-out hover:bottom-0.5 focus:outline-none focus:ring-1 focus:ring-zinc-400/50 focus:ring-offset-1 focus:ring-offset-zinc-50/50 active:-bottom-0.5"
    :tone="tone"
    v-bind="boundAttrs"
  >
    <component
      v-if="icon"
      :is="icon"
      class="h-4 w-4 transform duration-200 ease-in-out"
      :class="{
        'translate-y-4 opacity-0': loading,
        'translate-y-0 opacity-100': !loading
      }"
    />

    <span
      class="transform duration-200 ease-in-out"
      :class="{
        'translate-y-4 opacity-0': loading,
        'translate-y-0 opacity-100': !loading
      }"
    >
      <slot />
    </span>

    <XLoadingIcon
      :class="{
        '-translate-y-4 opacity-0': !loading,
        'translate-y-0 opacity-100': loading
      }"
    />
  </component>
</template>

<style>
.x-button[tone='primary'] {
  @apply border-zinc-200/90 bg-zinc-50/80 text-zinc-900 hover:bg-zinc-50/90 active:bg-zinc-50/95;
}

.x-button[tone='invert'] {
  @apply border-zinc-200/80 hover:bg-zinc-50/5 active:bg-zinc-50/10;
}

.x-button[disabled] {
  @apply pointer-events-none cursor-not-allowed opacity-40;
}
</style>
