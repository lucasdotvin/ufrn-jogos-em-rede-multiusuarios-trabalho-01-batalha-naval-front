import EventsListener from '@/listener/listener.js'
import { useToastStore } from '@/stores/toast.js'
import { useRoomStore } from '@/stores/room.js'

const ROOM_CREATED_EVENT_ID = 'room_created'
const ROOM_DELETED_EVENT_ID = 'room_deleted'

export default class GlobalRoomEventsListener extends EventsListener {
  handlers = {
    [ROOM_CREATED_EVENT_ID]: this.onRoomCreated.bind(this),
    [ROOM_DELETED_EVENT_ID]: this.onRoomDeleted.bind(this)
  }

  roomStore = null
  toastStore = null

  onOpen() {
    this.getToastStore().addToast({
      type: 'success',
      text: 'Conectado ao servidor de salas!'
    })
  }

  onRoomCreated(room) {
    this.getToastStore().addToast({
      type: 'info',
      text: `Sala "${room.name}" criada!`
    })

    this.getRoomStore().addRoom(room)
  }

  onRoomDeleted(room) {
    this.getRoomStore().removeRoom(room)
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
