<script setup>
import { RouterLink } from 'vue-router'

defineProps(RouterLink.props)
</script>

<template>
  <RouterLink v-bind="$props" class="text-xs text-zinc-400/80 hover:text-zinc-400/100">
    <slot />
  </RouterLink>
</template>
