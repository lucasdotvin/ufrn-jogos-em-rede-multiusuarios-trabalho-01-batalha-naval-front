<script setup>
import XCard from '@/components/XCard.vue'
import XButton from '@/components/XButton.vue'

import { IdentificationIcon, PlusCircleIcon } from '@heroicons/vue/16/solid'
import XTitle from '@/components/XTitle.vue'
import XTextInput from '@/components/XTextInput.vue'
import { inject, ref } from 'vue'
import { useToastStore } from '@/stores/toast.js'
import { useRoomStore } from '@/stores/room.js'
import { useRouter } from 'vue-router'
import XLink from '@/components/XLink.vue'
import { useAuthStore } from '@/stores/auth.js'
import { usePlayerStore } from '@/stores/player.js'

const router = useRouter()

const roomService = inject('service.room')

const authStore = useAuthStore()
const playerStore = usePlayerStore()
const roomStore = useRoomStore()
const toastStore = useToastStore()

const loading = ref(false)

const name = ref('')

const handleSubmit = async () => {
  loading.value = true

  const room = await roomService.store(name.value)

  if (room) {
    roomStore.setActiveRoom(room)
    playerStore.addPlayer(authStore.user)

    await router.push({ name: 'room.show', params: { room: room.uuid } })

    return
  }

  toastStore.addToast({
    type: 'error',
    text: 'Credenciais inválidas'
  })

  loading.value = false
}
</script>

<template>
  <div class="w-64">
    <header class="mb-6 text-center">
      <XCard class="mb-4">
        <XTitle> Criar Sala </XTitle>
      </XCard>
    </header>

    <main class="mb-6">
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <XTextInput
            v-model="name"
            name="name"
            type="name"
            required
            :icon="IdentificationIcon"
            placeholder="Insira o nome da sala"
          />
        </div>

        <XButton :loading="loading" type="submit" class="w-full" :icon="PlusCircleIcon">
          Criar
        </XButton>
      </form>
    </main>

    <footer class="text-center">
      <XLink to="/lobby"> Voltar ao Lobby </XLink>
    </footer>
  </div>
</template>
