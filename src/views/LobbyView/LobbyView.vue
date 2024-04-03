<script setup>
import XCard from '@/components/XCard.vue'
import XTitle from '@/components/XTitle.vue'
import XButton from '@/components/XButton.vue'
import { ArchiveBoxXMarkIcon, ArrowPathIcon, PlusCircleIcon } from '@heroicons/vue/16/solid'
import { useRoomStore } from '@/stores/room.js'
import { computed, inject, onMounted, ref } from 'vue'
import { useToastStore } from '@/stores/toast.js'
import RoomList from '@/views/LobbyView/partial/RoomList.vue'
import RoomListPoolingState from '@/views/LobbyView/partial/RoomListPoolingState.vue'
import GlobalRoomEventsListener from '@/listener/room/global.js'
import { onBeforeRouteLeave } from 'vue-router'

const roomService = inject('service.room')

const roomStore = useRoomStore()
const toastStore = useToastStore()

const loadingRooms = ref(true)

let globalRoomEventsWebSocket
let globalRoomEventsListener

const shouldShowRoomPoolingState = computed(() => roomStore.rooms.length <= 3)

onMounted(async () => {
  const rooms = await roomService.list()

  if (!rooms) {
    toastStore.addToast({
      type: 'error',
      text: 'Erro ao buscar salas'
    })
  } else {
    roomStore.setRooms(rooms)
  }

  loadingRooms.value = false
})

onMounted(async () => {
  toastStore.addToast({
    type: 'info',
    text: 'Conectando ao servidor de salas...'
  })

  globalRoomEventsWebSocket = await roomService.subscribeToCreatedRooms()

  if (globalRoomEventsWebSocket) {
    globalRoomEventsListener = new GlobalRoomEventsListener(globalRoomEventsWebSocket)
  }
})

onBeforeRouteLeave(() => {
  if (globalRoomEventsListener) {
    globalRoomEventsListener.close()
  }
})
</script>

<template>
  <div class="w-64">
    <header class="mb-6 text-center">
      <XCard>
        <XTitle> Salas </XTitle>
      </XCard>
    </header>

    <main>
      <div class="mb-2 h-64">
        <transition
          mode="out-in"
          enter-active-class="transition-all duration-200"
          leave-active-class="transition-all duration-200"
          enter-from-class="opacity-0 transform -translate-x-4"
          enter-to-class="opacity-100 transform translate-x-0"
          leave-from-class="opacity-100 transform translate-x-0"
          leave-to-class="opacity-0 transform translate-x-4"
        >
          <XCard v-if="loadingRooms" class="flex h-full flex-col items-center justify-center gap-2">
            <ArrowPathIcon class="h-4 w-4 animate-spin" />

            <p class="text-xs uppercase tracking-widest">Carregando salas...</p>
          </XCard>

          <div class="flex h-full flex-col" v-else-if="roomStore.rooms.length">
            <div class="max-h-full flex-none">
              <RoomList />
            </div>

            <RoomListPoolingState v-if="shouldShowRoomPoolingState" class="mt-1" />
          </div>

          <XCard v-else class="flex h-full flex-col items-center justify-center gap-2">
            <ArchiveBoxXMarkIcon class="h-4 w-4" />

            <p class="text-xs uppercase tracking-widest">Nenhuma sala encontrada</p>
          </XCard>
        </transition>
      </div>

      <XButton href="/rooms/create" type="submit" class="w-full" :icon="PlusCircleIcon">
        Criar Sala
      </XButton>
    </main>
  </div>
</template>
