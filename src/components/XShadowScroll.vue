<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const container = ref(null)
const inner = ref(null)
const outter = ref(null)
const innerHeight = ref(0)
const showTopShadow = ref(false)
const showBottomShadow = ref(true)

let content
let resizeObserver

const updateInnerHeight = () => {
  innerHeight.value = content.scrollHeight
}

const calculateIfShouldShowTopShadow = () => {
  showTopShadow.value = container.value.scrollTop > 0
}

const calculateIfShouldShowBottomShadow = () => {
  showBottomShadow.value =
    container.value.scrollTop + container.value.clientHeight < content.scrollHeight
}

const handleScroll = () => {
  calculateIfShouldShowTopShadow()
  calculateIfShouldShowBottomShadow()
}

onMounted(() => {
  content = inner.value.children[0]

  resizeObserver = new ResizeObserver(() => {
    updateInnerHeight()
    calculateIfShouldShowBottomShadow()
  })

  resizeObserver.observe(outter.value)
  resizeObserver.observe(content)
})

onUnmounted(() => {
  resizeObserver.disconnect()
})
</script>

<template>
  <div class="relative h-full overflow-hidden" ref="outter">
    <div
      class="pointer-events-none absolute left-0 right-0 top-0 z-10 h-8 w-full transform bg-gradient-to-b from-zinc-950 to-transparent transition duration-200"
      :class="{
        'translate-y-0 opacity-100': showTopShadow,
        '-translate-y-2 opacity-0': !showTopShadow
      }"
    />

    <div class="x-shadow-scroll h-full overflow-auto" @scroll="handleScroll" ref="container">
      <div
        class="transition-[height] duration-200"
        :style="{ height: innerHeight + 'px' }"
        ref="inner"
      >
        <slot />
      </div>
    </div>

    <div
      class="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-8 w-full transform bg-gradient-to-t from-zinc-950 to-transparent transition duration-200"
      :class="{
        'translate-y-0 opacity-100': showBottomShadow,
        'translate-y-2 opacity-0': !showBottomShadow
      }"
    />
  </div>
</template>

<style>
.x-shadow-scroll::-webkit-scrollbar {
  display: none;
}

.x-shadow-scroll {
  scrollbar-width: none;
}
</style>
