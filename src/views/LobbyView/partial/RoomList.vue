<script setup>
import { useRoomStore } from '@/stores/room.js'
import XShadowScroll from '@/components/XShadowScroll.vue'
import RoomListItem from '@/views/LobbyView/partial/RoomListItem.vue'
import XAnimatedList from '@/components/XAnimatedList.vue'

const roomStore = useRoomStore()
</script>

<template>
  <XShadowScroll>
    <XAnimatedList>
      <RoomListItem v-for="room in roomStore.rooms" :key="room.uuid" :room="room" />
    </XAnimatedList>
  </XShadowScroll>
</template>
