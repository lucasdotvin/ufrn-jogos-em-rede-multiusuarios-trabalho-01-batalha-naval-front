<script setup>
import XCard from '@/components/XCard.vue'
import XButton from '@/components/XButton.vue'
import { CheckIcon, XMarkIcon } from '@heroicons/vue/16/solid'

defineProps({
  modelValue: Boolean
})

const $emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const handleOverlayClick = () => {
  $emit('update:modelValue', false)
}

const handleCancelClick = () => {
  $emit('cancel')
  $emit('update:modelValue', false)
}

const handleConfirmClick = () => {
  $emit('confirm')
  $emit('update:modelValue', false)
}
</script>

<template>
  <transition
    name="fade"
    enter-active-class="transition-all duration-200"
    leave-active-class="transition-all duration-200"
    enter-from-class="opacity-0 transform scale-95"
    enter-to-class="opacity-100 transform scale-100"
    leave-from-class="opacity-100 transform scale-100"
    leave-to-class="opacity-0 transform scale-95"
  >
    <div
      v-if="modelValue"
      class="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center backdrop-blur-sm"
    >
      <div class="absolute inset-0 z-10 bg-zinc-950 opacity-40" @click="handleOverlayClick" />

      <div class="relative z-20 w-80 p-4">
        <XCard class="mb-4">
          <slot />
        </XCard>

        <XButton
          @click.prevent="handleCancelClick"
          type="button"
          class="mb-2 w-full"
          tone="invert"
          :icon="XMarkIcon"
        >
          Cancelar
        </XButton>

        <XButton @click.prevent="handleConfirmClick" :icon="CheckIcon" class="w-full" type="button">
          Confirmar
        </XButton>
      </div>
    </div>
  </transition>
</template>
