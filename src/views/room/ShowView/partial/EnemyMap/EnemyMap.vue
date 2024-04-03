<script setup>
import { computed } from 'vue'
import { useRoomStore } from '@/stores/room.js'
import XMap from '@/components/map/XMap.vue'
import EnemyMapTile from '@/views/room/ShowView/partial/EnemyMap/EnemyMapTile.vue'

const roomStore = useRoomStore()

const tileIds = computed(() => {
  const ids = []

  for (let row = 0; row < roomStore.activeRoom.map_height; row++) {
    for (let col = 0; col < roomStore.activeRoom.map_width; col++) {
      ids.push(`${col}-${row}`)
    }
  }

  return ids
})
</script>

<template>
  <XMap>
    <EnemyMapTile v-for="id in tileIds" :key="id" :id="id" />
  </XMap>
</template>
