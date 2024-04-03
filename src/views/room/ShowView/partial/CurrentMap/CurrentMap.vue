<script setup>
import { computed } from 'vue'
import CurrentMapTile from '@/views/room/ShowView/partial/CurrentMap/CurrentMapTile.vue'
import { useRoomStore } from '@/stores/room.js'
import { useShipStore } from '@/stores/ship.js'
import XMap from '@/components/map/XMap.vue'

const roomStore = useRoomStore()
const shipStore = useShipStore()

const tileIds = computed(() => {
  const ids = []

  for (let row = 0; row < roomStore.activeRoom.map_height; row++) {
    for (let col = 0; col < roomStore.activeRoom.map_width; col++) {
      ids.push(`${col}-${row}`)
    }
  }

  return ids
})

const handleMouseLeave = () => {
  if (shipStore.selectedShip) {
    shipStore.setShipPlacementCursorPosition(null, null)
  }
}

const handleContextMenu = () => {
  if (shipStore.selectedShip) {
    shipStore.toggleShipPlacementDirection()
  }
}
</script>

<template>
  <XMap @mouseleave="handleMouseLeave" @contextmenu.prevent="handleContextMenu">
    <CurrentMapTile v-for="id in tileIds" :key="id" :id="id" />
  </XMap>
</template>
