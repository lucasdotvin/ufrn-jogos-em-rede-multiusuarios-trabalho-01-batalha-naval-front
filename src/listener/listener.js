export default class EventsListener {
  websocket = null

  handlers = {}

  constructor(websocket) {
    this.websocket = websocket

    this.websocket.addEventListener('message', this.onMessage.bind(this))
    this.websocket.addEventListener('open', this.onOpen.bind(this))
  }

  onMessage(event) {
    const { id, payload } = JSON.parse(event.data)

    const handler = this.handlers[id]

    if (handler) {
      handler(payload)
    }
  }

  onOpen() {}

  onClose() {}

  close() {
    console.log('Closing connection...')

    this.websocket.close()
    this.onClose()

    console.log('Connection closed')
  }
}
