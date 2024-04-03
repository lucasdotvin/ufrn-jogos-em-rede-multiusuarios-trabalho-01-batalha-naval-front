import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const configs = ref(null)

  function setConfigs(newConfigs) {
    configs.value = newConfigs
  }

  function getShipConfigs(shipId) {
    return configs.value.ships.find((ship) => ship.id === shipId)
  }

  return {
    configs,
    setConfigs,
    getShipConfigs
  }
})
