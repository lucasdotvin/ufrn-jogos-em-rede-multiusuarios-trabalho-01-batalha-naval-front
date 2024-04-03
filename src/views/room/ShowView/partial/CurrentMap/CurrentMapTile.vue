<script setup>
import { computed } from 'vue'
import { useShipStore } from '@/stores/ship.js'
import XMapTile from '@/components/map/XMapTile.vue'
import { ERROR_STATUS, INFO_STATUS, NONE_STATUS, SUCCESS_STATUS } from '@/constant/tile.js'
import { useRoomStore } from '@/stores/room.js'
import { usePlayerStore } from '@/stores/player.js'
import { useAuthStore } from '@/stores/auth.js'
import { useMoveStore } from '@/stores/move.js'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const authStore = useAuthStore()
const moveStore = useMoveStore()
const playerStore = usePlayerStore()
const roomStore = useRoomStore()
const shipStore = useShipStore()

const x = computed(() => parseInt(props.id.split('-')[0]))

const y = computed(() => parseInt(props.id.split('-')[1]))

const hit = computed(() => {
  return moveStore.enemyMovesMap[props.id]
})

const hitContent = computed(() => {
  return hit.value ? { char: 'x' } : null
})

const previewContent = computed(() => {
  return shipStore.mapContentPreview[props.id]
})

const placementContent = computed(() => {
  return shipStore.contentMap[props.id]
})

const content = computed(() => {
  return hitContent.value || previewContent.value || placementContent.value
})

const isColliding = computed(() => {
  return shipStore.previewCollisionMap[props.id]
})

const status = computed(() => {
  if (previewContent.value) {
    return INFO_STATUS
  }

  if (isColliding.value) {
    return ERROR_STATUS
  }

  if (hit.value) {
    return hit.value.hit ? ERROR_STATUS : SUCCESS_STATUS
  }

  return NONE_STATUS
})

const handleMouseEnter = () => {
  if (shipStore.selectedShip) {
    shipStore.setShipPlacementCursorPosition(x.value, y.value)
  }
}

const handleClick = () => {
  if (shipStore.selectedShip) {
    shipStore.addShipPlacement()
    return
  }

  if (
    placementContent.value &&
    roomStore.isActiveRoomInPreparing &&
    !playerStore.readyPlayerUuids.includes(authStore.user.uuid)
  ) {
    shipStore.removeShipPlacement(x.value, y.value)
  }
}
</script>

<template>
  <XMapTile
    :status="status"
    :content="content"
    @mouseenter="handleMouseEnter"
    @click.prevent="handleClick"
  />
</template>
