<script setup>
import ShipListItem from '@/views/room/ShowView/partial/ShipListItem.vue'
import { SPRITES_BY_SHIP } from '@/constant/ship.js'
import { useConfigStore } from '@/stores/config.js'

const configStore = useConfigStore()
</script>

<template>
  <ul class="grid grid-cols-2 gap-1">
    <ShipListItem
      v-for="ship in configStore.configs.ships"
      :key="ship.id"
      :ship="ship"
      :sprite="SPRITES_BY_SHIP[ship.id]"
    />
  </ul>
</template>
