<script setup>
import { computed } from 'vue'
import { useShipStore } from '@/stores/ship.js'

const props = defineProps({
  ship: {
    type: Object,
    required: true
  },
  sprite: {
    type: String,
    required: true
  }
})

const shipStore = useShipStore()

const handleButtonClick = () => {
  if (shipStore.selectedShip?.id === props.ship.id) {
    shipStore.setSelectedShip(null)
    return
  }

  shipStore.setSelectedShip(props.ship)
}

const isSelected = computed(() => {
  return shipStore.selectedShip?.id === props.ship.id
})

const usage = computed(() => {
  return shipStore.usageByShip[props.ship.id]
})

const isAvailable = computed(() => {
  return usage.value < props.ship.amount
})

const status = computed(() => {
  if (!isAvailable.value) {
    return 'disabled'
  }

  if (isSelected.value) {
    return 'selected'
  }

  return 'none'
})
</script>

<template>
  <li class="border border-zinc-400/50">
    <button
      class="x-ship-list-item group flex w-full items-center space-x-2 p-4 text-left transition"
      type="button"
      @click.prevent="handleButtonClick"
      v-bind="{ status, disabled: !isAvailable }"
    >
      <span class="flex flex-1 flex-col space-y-0.5">
        <span
          class="flex items-center justify-center rounded bg-zinc-50/10 p-1.5 font-mono text-sm tracking-[0.25em]"
        >
          <span class="mr-[-3px] block" v-text="sprite" />
        </span>
      </span>
    </button>
  </li>
</template>

<style scoped>
.x-ship-list-item[status='none'] {
  @apply bg-transparent hover:bg-zinc-50/5 active:bg-zinc-50/10;
}

.x-ship-list-item[status='selected'] {
  @apply bg-zinc-50/15;
}

.x-ship-list-item[status='disabled'] {
  @apply opacity-40;
}
</style>
