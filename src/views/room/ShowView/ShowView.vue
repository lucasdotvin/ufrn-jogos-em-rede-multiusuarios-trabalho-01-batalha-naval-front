<script setup>
import XCard from '@/components/XCard.vue'
import XTitle from '@/components/XTitle.vue'
import { useRoomStore } from '@/stores/room.js'
import { computed, inject, onMounted, ref } from 'vue'
import XLink from '@/components/XLink.vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import XDialog from '@/components/XDialog.vue'
import RoomEventsListener from '@/listener/room/room.js'
import PlayerList from '@/views/room/ShowView/partial/PlayerList.vue'
import CurrentMap from '@/views/room/ShowView/partial/CurrentMap/CurrentMap.vue'
import ShipList from '@/views/room/ShowView/partial/ShipList.vue'
import { usePlayerStore } from '@/stores/player.js'
import { useToastStore } from '@/stores/toast.js'
import { useShipStore } from '@/stores/ship.js'
import XButton from '@/components/XButton.vue'
import { useAuthStore } from '@/stores/auth.js'
import EnemyMap from '@/views/room/ShowView/partial/EnemyMap/EnemyMap.vue'
import { useMoveStore } from '@/stores/move.js'

const router = useRouter()

const roomService = inject('service.room')

const authStore = useAuthStore()
const moveStore = useMoveStore()
const playerStore = usePlayerStore()
const roomStore = useRoomStore()
const shipStore = useShipStore()
const toastStore = useToastStore()

const readyLoading = ref(false)
const showRoomLeaveConfirmationDialog = ref(false)

let roomEventsWebsocket
let roomEventsListener

const playersCountLabel = computed(() => {
  const playersCount = Object.keys(playerStore.activeRoomPlayers).length

  return `(${playersCount}/${roomStore.activeRoom.max_players})`
})

onMounted(async () => {
  toastStore.addToast({
    type: 'info',
    text: 'Conectando à sala...'
  })

  roomEventsWebsocket = await roomService.subscribeToRoomEvents(roomStore.activeRoom.uuid)

  if (roomEventsWebsocket) {
    roomEventsListener = new RoomEventsListener(roomEventsWebsocket)
  }
})

onBeforeRouteLeave(() => {
  roomEventsListener.close()
})

const goBackToLobby = async () => {
  roomStore.setLeavingRoom(true)

  router.push({ name: 'lobby' }).finally(() => {
    moveStore.setMoves([])

    playerStore.setPlayers([])
    playerStore.setReadyPlayerUuids([])
    playerStore.setUserCurrentlyPlaying(undefined)

    roomStore.setLeavingRoom(false)
    roomStore.setActiveRoom(null)

    shipStore.setSelectedShip(null)
    shipStore.setShipPlacements([])
  })
}

const handleLobbyLinkClick = async () => {
  if (playerStore.activeRoomWinner) {
    await goBackToLobby()
    return
  }

  showRoomLeaveConfirmationDialog.value = true
}

const handleLeaveConfirm = async () => {
  await goBackToLobby()
}

const handleReadyButtonClick = async () => {
  readyLoading.value = true

  try {
    await roomService.registerPlacements(roomStore.activeRoom.uuid, shipStore.shipPlacements)
  } catch (error) {
    toastStore.addToast({
      type: 'error',
      text: error.message
    })
  }

  readyLoading.value = false
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-row gap-5">
      <aside class="w-52">
        <div class="mb-5">
          <header class="mb-4 text-center">
            <XCard>
              <XTitle> Embarcações </XTitle>
            </XCard>
          </header>

          <ShipList />
        </div>

        <div>
          <header class="mb-4 text-center">
            <XCard>
              <XTitle>
                Jogadores

                <span v-text="playersCountLabel" />
              </XTitle>
            </XCard>
          </header>

          <PlayerList />
        </div>
      </aside>

      <section>
        <transition
          mode="out-in"
          enter-active-class="transition-all duration-200"
          leave-active-class="transition-all duration-200"
          enter-from-class="opacity-0 transform -translate-x-4"
          enter-to-class="opacity-100 transform translate-x-0"
          leave-from-class="opacity-100 transform translate-x-0"
          leave-to-class="opacity-0 transform translate-x-4"
        >
          <div
            v-if="
              roomStore.isActiveRoomInStarted &&
              playerStore.userCurrentlyPlaying === authStore.user.uuid
            "
          >
            <header class="mb-4 text-center">
              <XCard tone="primary">
                <XTitle> Mapa do Oponente </XTitle>
              </XCard>
            </header>

            <EnemyMap />
          </div>

          <div v-else>
            <header class="mb-4 text-center">
              <XCard>
                <XTitle> Seu Mapa </XTitle>
              </XCard>
            </header>

            <CurrentMap />
          </div>
        </transition>
      </section>

      <aside>
        <XButton
          @click="handleReadyButtonClick"
          class="w-full"
          :loading="readyLoading"
          :disabled="
            !shipStore.placedAllShips ||
            roomStore.isActiveRoomInStarted ||
            playerStore.readyPlayerUuids.includes(authStore.user.uuid)
          "
        >
          Estou Pronto!
        </XButton>
      </aside>
    </div>

    <footer class="text-center">
      <XLink @click.capture.prevent="handleLobbyLinkClick" to="/lobby"> Voltar ao Lobby </XLink>
    </footer>
  </div>

  <XDialog
    v-model="showRoomLeaveConfirmationDialog"
    class="text-center"
    @confirm="handleLeaveConfirm"
  >
    <p class="mb-0.5 font-medium">Deseja realmente sair da sala?</p>

    <p class="text-sm">Caso o jogo já tenha começado, a sua saída será considerada desistência.</p>
  </XDialog>
</template>
