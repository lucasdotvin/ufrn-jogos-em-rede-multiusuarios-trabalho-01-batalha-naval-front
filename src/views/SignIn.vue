<script setup>
import XCard from '@/components/XCard.vue'
import XButton from '@/components/XButton.vue'

import { ArrowRightEndOnRectangleIcon, KeyIcon, UserIcon } from '@heroicons/vue/16/solid'
import XTitle from '@/components/XTitle.vue'
import XTextInput from '@/components/XTextInput.vue'
import { inject, ref } from 'vue'
import { useToastStore } from '@/stores/toast.js'
import XLink from '@/components/XLink.vue'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const authService = inject('service.auth')

const authStore = useAuthStore()
const toastStore = useToastStore()

const loading = ref(false)

const username = ref('')
const password = ref('')

const handleSubmit = async () => {
  loading.value = true

  const user = await authService.signIn(username.value, password.value)

  if (user) {
    authStore.setUser(user)
    await router.push({ name: 'lobby' })
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
        <XTitle> Sign In </XTitle>
      </XCard>
    </header>

    <main class="mb-6">
      <form @submit.prevent="handleSubmit">
        <div class="mb-4 space-y-2">
          <XTextInput
            v-model="username"
            name="username"
            type="username"
            required
            :icon="UserIcon"
            placeholder="Insira seu nome de usuário"
          />

          <XTextInput
            v-model="password"
            :icon="KeyIcon"
            name="password"
            type="password"
            required
            placeholder="Insira sua senha"
          >
            <template #help>
              <small class="block text-right">
                <XLink to="/forgot-password"> Esqueceu sua senha? </XLink>
              </small>
            </template>
          </XTextInput>
        </div>

        <XButton
          :loading="loading"
          type="submit"
          class="w-full"
          :icon="ArrowRightEndOnRectangleIcon"
        >
          Entrar
        </XButton>
      </form>
    </main>

    <footer class="text-center">
      <XLink to="sign-up"> Ainda não tem uma conta? </XLink>
    </footer>
  </div>
</template>
