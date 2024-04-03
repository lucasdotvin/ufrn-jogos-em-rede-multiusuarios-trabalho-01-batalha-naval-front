import EventsListener from '@/listener/listener.js'
import { useToastStore } from '@/stores/toast.js'
import { useRoomStore } from '@/stores/room.js'
import { usePlayerStore } from '@/stores/player.js'
import { useMoveStore } from '@/stores/move.js'
import { useAuthStore } from '@/stores/auth.js'

const ROOM_USER_INGRESSED_EVENT_ID = 'room_user_ingressed'
const ROOM_USER_EGRESSED_EVENT_ID = 'room_user_egressed'
const ROOM_STARTED_EVENT_ID = 'room_started'
const ROOM_USER_READY_EVENT_ID = 'room_user_ready'
const ROOM_USER_FIRED_EVENT_ID = 'room_user_fired'
const ROOM_CURRENT_PLAYER_CHANGED_EVENT_ID = 'room_current_player_changed'
const USER_WON_EVENT_ID = 'user_won'

export default class RoomEventsListener extends EventsListener {
  handlers = {
    [ROOM_USER_INGRESSED_EVENT_ID]: this.onUserIngressed.bind(this),
    [ROOM_USER_EGRESSED_EVENT_ID]: this.onUserEgressed.bind(this),
    [ROOM_STARTED_EVENT_ID]: this.onRoomStarted.bind(this),
    [ROOM_USER_READY_EVENT_ID]: this.onUserReady.bind(this),
    [ROOM_USER_FIRED_EVENT_ID]: this.onUserFired.bind(this),
    [ROOM_CURRENT_PLAYER_CHANGED_EVENT_ID]: this.onCurrentPlayerChanged.bind(this),
    [USER_WON_EVENT_ID]: this.onUserWon.bind(this)
  }

  moveStore = null
  playerStore = null
  roomStore = null
  toastStore = null

  onOpen() {
    this.getToastStore().addToast({
      type: 'success',
      text: 'Conectado à sala!'
    })
  }

  onUserIngressed(user) {
    this.getPlayerStore().addPlayer(user)
  }

  onUserEgressed(user) {
    this.getPlayerStore().removePlayer(user)
  }

  onRoomStarted(startingPayload) {
    const activeRoom = this.getRoomStore().activeRoom
    activeRoom.started_at = startingPayload['started_at']

    this.getRoomStore().setActiveRoom(activeRoom)
    this.getPlayerStore().setUserCurrentlyPlaying(startingPayload['user_currently_playing'])

    this.getToastStore().addToast({
      type: 'success',
      text: 'A partida começou!'
    })
  }

  onUserReady(user) {
    this.getPlayerStore().addReadyPlayer(user)
  }

  onUserFired(move) {
    this.getMoveStore().addMove(move)
  }

  onCurrentPlayerChanged(user) {
    this.getPlayerStore().setUserCurrentlyPlaying(user.uuid)

    if (user.uuid === this.getAuthStore().user.uuid) {
      this.toastStore.addToast({
        type: 'success',
        text: 'É a sua vez!'
      })
    } else {
      this.toastStore.addToast({
        type: 'info',
        text: `Está na vez de ${user.name}!`
      })
    }
  }

  onUserWon(user) {
    if (user.uuid === this.getAuthStore().user.uuid) {
      this.toastStore.addToast({
        type: 'success',
        text: 'Você ganhou!'
      })
    } else {
      this.toastStore.addToast({
        type: 'info',
        text: `${user.name} ganhou!`
      })
    }
  }

  getAuthStore() {
    if (!this.authStore) {
      this.authStore = useAuthStore()
    }

    return this.authStore
  }

  getMoveStore() {
    if (!this.moveStore) {
      this.moveStore = useMoveStore()
    }

    return this.moveStore
  }

  getPlayerStore() {
    if (!this.playerStore) {
      this.playerStore = usePlayerStore()
    }

    return this.playerStore
  }

  getRoomStore() {
    if (!this.roomStore) {
      this.roomStore = useRoomStore()
    }

    return this.roomStore
  }

  getToastStore() {
    if (!this.toastStore) {
      this.toastStore = useToastStore()
    }

    return this.toastStore
  }
}
