<script setup>
import XCard from '@/components/XCard.vue'
import XButton from '@/components/XButton.vue'

import { ArrowRightEndOnRectangleIcon, PencilSquareIcon } from '@heroicons/vue/16/solid'
import XLogo from '@/components/XLogo.vue'
import XFooter from '@/components/XFooter.vue'
</script>

<template>
  <div class="w-64">
    <header class="mb-6 text-center">
      <XCard>
        <XLogo />
      </XCard>
    </header>

    <main class="mb-6">
      <div class="space-y-2">
        <XButton href="sign-in" class="w-full" :icon="ArrowRightEndOnRectangleIcon">
          Entrar
        </XButton>
        <XButton href="sign-up" class="w-full" :icon="PencilSquareIcon" tone="invert">
          Cadastrar
        </XButton>
      </div>
    </main>

    <XFooter />
  </div>
</template>
