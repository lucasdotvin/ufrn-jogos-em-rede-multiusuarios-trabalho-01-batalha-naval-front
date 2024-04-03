<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    default: null
  },
  tone: {
    type: String,
    default: 'primary'
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  autocomplete: {
    type: String,
    default: null
  },
  required: {
    type: Boolean,
    default: false
  }
})

const hasIcon = computed(() => props.icon !== null)
</script>

<template>
  <div>
    <div class="relative">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :type="type"
        class="x-text-input w-full border border-zinc-200/80 bg-transparent p-4 text-xs font-medium tracking-wide shadow-lg shadow-zinc-50/5 backdrop-blur-sm transition-all duration-100 ease-in-out hover:bg-zinc-50/5 focus:outline-none focus:ring-1 focus:ring-zinc-400/50 focus:ring-offset-1 focus:ring-offset-zinc-50/50 active:bg-zinc-50/10"
        :class="{
          'pl-11': hasIcon
        }"
        v-bind="{
          placeholder,
          name,
          autocomplete,
          required
        }"
      />

      <component
        :is="icon"
        class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-200/80"
      />
    </div>

    <slot name="help" />
  </div>
</template>
