<script setup>
import { ArrowRightIcon, IdentificationIcon, UserCircleIcon } from '@heroicons/vue/16/solid'
import { useRoomStore } from '@/stores/room.js'
import { inject } from 'vue'
import { useToastStore } from '@/stores/toast.js'
import { useRouter } from 'vue-router'
import { usePlayerStore } from '@/stores/player.js'

const props = defineProps({
  room: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const roomService = inject('service.room')

const playerStore = usePlayerStore()
const roomStore = useRoomStore()
const toastStore = useToastStore()

const handleRoomItemClick = async () => {
  const room = await roomService.ingress(props.room.uuid)

  if (room) {
    roomStore.setActiveRoom(room)
    playerStore.setPlayers(room.users)
    await router.push({ name: 'room.show', params: { room: room.uuid } })
  } else {
    toastStore.addToast({
      type: 'error',
      text: 'Erro ao ingressar na sala'
    })
  }
}
</script>

<template>
  <li class="border-x border-t border-zinc-400/50 last:border-b">
    <button
      class="background-transparent group flex w-full items-center space-x-2 p-4 text-left transition hover:bg-zinc-50/5 active:bg-zinc-50/10"
      type="button"
      @click.prevent="handleRoomItemClick"
    >
      <span class="flex flex-1 flex-col space-y-0.5 overflow-hidden">
        <span class="flex flex-row items-center gap-1.5">
          <IdentificationIcon class="h-4 w-4 flex-none opacity-40" />

          <span class="truncate text-sm font-medium tracking-wide" v-text="room.name" />
        </span>

        <span class="flex flex-row items-center gap-1.5">
          <UserCircleIcon class="h-4 w-4 flex-none opacity-40" />

          <span class="truncate text-xs font-thin tracking-widest" v-text="room.created_by.name" />
        </span>
      </span>

      <ArrowRightIcon
        class="flex h-4 w-4 flex-none transform transition-transform duration-75 ease-in-out group-hover:translate-x-0.5"
      />
    </button>
  </li>
</template>
