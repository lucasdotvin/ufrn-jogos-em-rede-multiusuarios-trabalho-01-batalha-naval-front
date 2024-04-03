import { useRoomStore } from '@/stores/room.js'
import { inject } from 'vue'
import { usePlayerStore } from '@/stores/player.js'

export const validateRoomStatus = async (to, from, next) => {
  const roomService = inject('service.room')
  const playerStore = usePlayerStore()
  const roomStore = useRoomStore()

  if (roomStore.activeRoom === undefined) {
    let activeRoom = await roomService.findActive()
    roomStore.setActiveRoom(activeRoom)
    playerStore.setPlayers(activeRoom?.users)
    playerStore.setUserCurrentlyPlaying(activeRoom?.user_currently_playing)
  }

  if (to.name !== 'room.show' && roomStore.leavingRoom) {
    return next()
  }

  if (roomStore.activeRoom && to.name !== 'room.show') {
    return next({ name: 'room.show', params: { room: roomStore.activeRoom.uuid } })
  }

  if (!roomStore.activeRoom && to.name === 'room.show') {
    return next({ name: 'lobby' })
  }

  return next()
}
