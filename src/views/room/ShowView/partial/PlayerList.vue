<script setup>
import XAnimatedList from '@/components/XAnimatedList.vue'
import PlayerListItem from '@/views/room/ShowView/partial/PlayerListItem.vue'
import { usePlayerStore } from '@/stores/player.js'

const playerStore = usePlayerStore()
</script>

<template>
  <XAnimatedList>
    <PlayerListItem
      v-for="player in playerStore.activeRoomPlayers"
      :key="player.uuid"
      :player="player"
    />
  </XAnimatedList>
</template>
