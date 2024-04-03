<script setup>
import { RouterView } from 'vue-router'
import XToaster from '@/components/toast/XToaster.vue'
import { inject, onMounted } from 'vue'
import { useConfigStore } from '@/stores/config.js'

const configService = inject('service.config')

const configStore = useConfigStore()

onMounted(async () => {
  const configs = await configService.list()

  if (configs) {
    configStore.setConfigs(configs)
  }
})
</script>

<template>
  <RouterView />

  <XToaster />
</template>

<style>
html {
  @apply bg-zinc-950 text-zinc-100;

  background-image: linear-gradient(theme('colors.zinc.925') 1px, transparent 1px),
    linear-gradient(90deg, theme('colors.zinc.925') 1px, transparent 1px);
  background-size: 1rem 1rem;
  background-position: 0 0;
  animation: move-diagonally 2.3s linear infinite;
}

@keyframes move-diagonally {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 1rem 1rem;
  }
}

body,
html,
#app {
  @apply h-full w-full;
}

#app {
  @apply flex flex-col items-center justify-center;
}
</style>
