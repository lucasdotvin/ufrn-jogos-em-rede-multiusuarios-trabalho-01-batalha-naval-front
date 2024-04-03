<script setup>
import { computed, inject, ref } from 'vue'
import XMapTile from '@/components/map/XMapTile.vue'
import { ERROR_STATUS, NONE_STATUS, SUCCESS_STATUS } from '@/constant/tile.js'
import { useMoveStore } from '@/stores/move.js'
import { useRoomStore } from '@/stores/room.js'
import { useAuthStore } from '@/stores/auth.js'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const roomService = inject('service.room')

const authStore = useAuthStore()
const moveStore = useMoveStore()
const roomStore = useRoomStore()

const loading = ref(false)

const x = computed(() => parseInt(props.id.split('-')[0]))

const y = computed(() => parseInt(props.id.split('-')[1]))

const hit = computed(() => {
  return moveStore.currentPlayerMovesMap[props.id]
})

const hitContent = computed(() => {
  return hit.value ? { char: 'x' } : null
})

const status = computed(() => {
  if (!hit.value) {
    return NONE_STATUS
  }

  if (hit.value) {
    return hit.value.hit ? SUCCESS_STATUS : ERROR_STATUS
  }

  return NONE_STATUS
})

const handleClick = async () => {
  if (hit.value) {
    return
  }

  loading.value = true

  const roomMove = await roomService.fire(roomStore.activeRoom.uuid, x.value, y.value)
  moveStore.addMove(roomMove)

  loading.value = false
}
</script>

<template>
  <XMapTile
    :status="status"
    :content="hitContent"
    :disabled="loading"
    @click.prevent="handleClick"
  />
</template>
