import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useRoomStore = defineStore('room', () => {
  const rooms = ref([])
  const activeRoom = ref(undefined)
  const leavingRoom = ref(false)

  const isActiveRoomInPreparing = computed(() => {
    if (!activeRoom.value) {
      return false
    }

    return activeRoom.value.started_at === null
  })

  const isActiveRoomInStarted = computed(() => {
    if (!activeRoom.value) {
      return false
    }

    return activeRoom.value.started_at !== null
  })

  function addRoom(room) {
    rooms.value.push(room)
  }

  function removeRoom(room) {
    rooms.value = rooms.value.filter((t) => t.uuid !== room.uuid)
  }

  function pushRooms(newRooms) {
    rooms.value.push(...newRooms)
  }

  function setRooms(newRooms) {
    rooms.value = newRooms
  }

  function setLeavingRoom(leaving) {
    leavingRoom.value = leaving
  }

  function setActiveRoom(room) {
    if (!room) {
      room = null
    }

    activeRoom.value = room
  }

  return {
    rooms,
    addRoom,
    removeRoom,
    pushRooms,
    setRooms,
    activeRoom,
    setActiveRoom,
    isActiveRoomInPreparing,
    isActiveRoomInStarted,
    leavingRoom,
    setLeavingRoom
  }
})
