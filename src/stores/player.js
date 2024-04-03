import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  const activeRoomPlayers = ref([])
  const readyPlayerUuids = ref([])
  const userCurrentlyPlaying = ref(undefined)
  const activeRoomWinner = ref(undefined)

  function addPlayer(player) {
    activeRoomPlayers.value.push(player)
  }

  function removePlayer(player) {
    activeRoomPlayers.value = activeRoomPlayers.value.filter((p) => p.uuid !== player.uuid)
    removeReadyPlayer(player)
  }

  function setPlayers(players) {
    if (!players) {
      return
    }

    activeRoomPlayers.value = players

    const readyUuids = players.filter((p) => p?.room_user?.is_ready).map((p) => p.uuid)
    setReadyPlayerUuids(readyUuids)
  }

  function setReadyPlayerUuids(uuids) {
    readyPlayerUuids.value = uuids
  }

  function addReadyPlayer(player) {
    if (readyPlayerUuids.value.includes(player.uuid)) {
      return
    }

    readyPlayerUuids.value.push(player.uuid)
  }

  function removeReadyPlayer(player) {
    readyPlayerUuids.value = readyPlayerUuids.value.filter((u) => u !== player.uuid)
  }

  function setUserCurrentlyPlaying(userUuid) {
    userCurrentlyPlaying.value = userUuid
  }

  function setWinner(winner) {
    activeRoomWinner.value = winner
  }

  return {
    activeRoomPlayers,
    addPlayer,
    removePlayer,
    setPlayers,
    readyPlayerUuids,
    setReadyPlayerUuids,
    addReadyPlayer,
    removeReadyPlayer,
    userCurrentlyPlaying,
    setUserCurrentlyPlaying,
    activeRoomWinner,
    setWinner
  }
})
