import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'

export const useMoveStore = defineStore('move', () => {
  const authStore = useAuthStore()

  const activeRoomMoves = ref([])

  const currentPlayerMoves = computed(() => {
    return activeRoomMoves.value.filter((move) => move.user_uuid === authStore.user.uuid)
  })

  const enemyMoves = computed(() => {
    return activeRoomMoves.value.filter((move) => move.user_uuid !== authStore.user.uuid)
  })

  const currentPlayerMovesMap = computed(() => {
    const map = {}

    currentPlayerMoves.value.forEach((move) => {
      map[`${move.x}-${move.y}`] = move
    })

    return map
  })

  const enemyMovesMap = computed(() => {
    const map = {}

    enemyMoves.value.forEach((move) => {
      map[`${move.x}-${move.y}`] = move
    })

    return map
  })

  function addMove(move) {
    if (!move) {
      return
    }

    activeRoomMoves.value.push(move)
  }

  function setMoves(moves) {
    if (!moves) {
      moves = []
    }

    activeRoomMoves.value = moves
  }

  return {
    activeRoomMoves,
    currentPlayerMoves,
    enemyMoves,
    currentPlayerMovesMap,
    enemyMovesMap,
    addMove,
    setMoves
  }
})
