<script setup>
defineProps({
  tone: {
    type: String,
    default: 'invert'
  }
})
</script>

<template>
  <div class="x-card border p-4 backdrop-blur-sm" v-bind="{ tone }">
    <slot />
  </div>
</template>

<style>
.x-card[tone='invert'] {
  @apply border-dashed border-zinc-400/50;
}

.x-card[tone='primary'] {
  @apply border-zinc-200/90 bg-zinc-50/80 text-zinc-900;
}
</style>
