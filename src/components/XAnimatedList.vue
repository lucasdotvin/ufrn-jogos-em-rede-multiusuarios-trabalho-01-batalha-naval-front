<script setup></script>

<template>
  <transition-group
    class="relative flex-none backdrop-blur-sm"
    move-class="transition-all duration-200 absolute"
    enter-active-class="transition-all duration-200"
    leave-active-class="transition-all duration-200"
    enter-from-class="opacity-0 transform translate-y-4"
    enter-to-class="opacity-100 transform translate-y-0"
    leave-from-class="opacity-100 transform translate-y-0"
    leave-to-class="opacity-0 transform -translate-y-4"
    tag="ul"
  >
    <slot />
  </transition-group>
</template>
