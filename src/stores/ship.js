import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { SPRITES_BY_SHIP } from '@/constant/ship.js'
import { useConfigStore } from '@/stores/config.js'
import { HORIZONTAL_DIRECTION, VERTICAL_DIRECTION } from '@/constant/direction.js'

export const useShipStore = defineStore('ship', () => {
  const configStore = useConfigStore()

  const shipPlacements = ref([])

  const selectedShip = ref(null)

  const shipPlacementCursorPosition = ref(null)
  const shipPlacementDirection = ref(HORIZONTAL_DIRECTION)

  const shipPlacementDeltaX = computed(() => {
    if (!shipPlacementCursorPosition.value) {
      return null
    }

    if (shipPlacementDirection.value === VERTICAL_DIRECTION) {
      return 0
    }

    const { size } = configStore.getShipConfigs(selectedShip.value.id)

    return size
  })

  const shipPlacementDeltaY = computed(() => {
    if (!shipPlacementCursorPosition.value) {
      return null
    }

    if (shipPlacementDirection.value === HORIZONTAL_DIRECTION) {
      return 0
    }

    const { size } = configStore.getShipConfigs(selectedShip.value.id)

    return size
  })

  const effectiveShipPlacementX = computed(() => {
    if (!shipPlacementCursorPosition.value) {
      return null
    }

    const finalPlacementX = shipPlacementCursorPosition.value.x + shipPlacementDeltaX.value

    if (finalPlacementX < 0) {
      return 0
    }

    if (finalPlacementX < configStore.configs.map.width) {
      return shipPlacementCursorPosition.value.x
    }

    const { size } = configStore.getShipConfigs(selectedShip.value.id)

    return configStore.configs.map.width - size
  })

  const effectiveShipPlacementY = computed(() => {
    if (!shipPlacementCursorPosition.value) {
      return null
    }

    const finalPlacementY = shipPlacementCursorPosition.value.y + shipPlacementDeltaY.value

    if (finalPlacementY < 0) {
      return 0
    }

    if (finalPlacementY < configStore.configs.map.height) {
      return shipPlacementCursorPosition.value.y
    }

    const { size } = configStore.getShipConfigs(selectedShip.value.id)

    return configStore.configs.map.height - size
  })

  const effectiveShipPlacementPosition = computed(() => {
    if (effectiveShipPlacementX.value === null || effectiveShipPlacementY.value === null) {
      return null
    }

    return {
      x: effectiveShipPlacementX.value,
      y: effectiveShipPlacementY.value
    }
  })

  function parsePlacementToContentMapEntries(placement) {
    const map = {}
    const { ship, position, direction } = placement

    const { size } = configStore.getShipConfigs(ship)

    const placementHeight = direction === VERTICAL_DIRECTION ? size : 1
    const placementWidth = direction === HORIZONTAL_DIRECTION ? size : 1

    let charIndex = 0

    for (let i = 0; i < placementHeight; i++) {
      for (let j = 0; j < placementWidth; j++) {
        const x = position.x + j
        const y = position.y + i

        map[`${x}-${y}`] = {
          char: SPRITES_BY_SHIP[ship][charIndex],
          direction,
          ship,
          placement
        }

        charIndex++
      }
    }

    return map
  }

  const contentMap = computed(() => {
    const mapEntries = shipPlacements.value.map(parsePlacementToContentMapEntries)

    return Object.assign({}, ...mapEntries)
  })

  const placementPreview = computed(() => {
    if (
      !selectedShip.value ||
      !effectiveShipPlacementPosition.value ||
      !shipPlacementDirection.value
    ) {
      return null
    }

    return {
      ship: selectedShip.value.id,
      position: effectiveShipPlacementPosition.value,
      direction: shipPlacementDirection.value
    }
  })

  const mapContentPreview = computed(() => {
    if (!placementPreview.value) {
      return {}
    }

    return parsePlacementToContentMapEntries(placementPreview.value)
  })

  const placementsCollidingWithPreview = computed(() => {
    if (!mapContentPreview.value) {
      return {}
    }

    return shipPlacements.value.filter((placement) => {
      const previewEntries = Object.entries(mapContentPreview.value)
      const placementEntries = Object.entries(parsePlacementToContentMapEntries(placement))

      return previewEntries.some(([key]) =>
        placementEntries.some(([placementKey]) => placementKey === key)
      )
    })
  })

  const previewCollisionMap = computed(() => {
    return Object.assign(
      {},
      ...placementsCollidingWithPreview.value.map(parsePlacementToContentMapEntries)
    )
  })

  const usageByShip = computed(() => {
    const usage = {}

    configStore.configs.ships.forEach((ship) => {
      usage[ship.id] = 0
    })

    shipPlacements.value.forEach((placement) => {
      usage[placement.ship] += 1
    })

    return usage
  })

  const availableShips = computed(() => {
    return configStore.configs.ships.filter((ship) => {
      const { amount } = configStore.getShipConfigs(ship.id)

      return usageByShip.value[ship.id] < amount
    })
  })

  const placedAllShips = computed(() => {
    return availableShips.value.length === 0
  })

  function setShipPlacementCursorPosition(x, y) {
    shipPlacementCursorPosition.value = { x, y }
  }

  function toggleShipPlacementDirection() {
    shipPlacementDirection.value =
      shipPlacementDirection.value === HORIZONTAL_DIRECTION
        ? VERTICAL_DIRECTION
        : HORIZONTAL_DIRECTION
  }

  function setSelectedShip(ship) {
    selectedShip.value = ship
  }

  function addShipPlacement() {
    if (!selectedShip.value || !effectiveShipPlacementPosition.value) {
      return
    }

    if (!shipPlacements.value) {
      shipPlacements.value = []
    }

    placementsCollidingWithPreview.value.forEach((placement) => {
      removeShipPlacement(placement.position.x, placement.position.y)
    })

    shipPlacements.value.push({
      ship: selectedShip.value.id,
      position: effectiveShipPlacementPosition.value,
      direction: shipPlacementDirection.value
    })

    if (!availableShips.value.includes(selectedShip.value)) {
      setSelectedShip(null)
    }

    shipPlacementCursorPosition.value = null
  }

  function removeShipPlacement(x, y) {
    const { placement } = contentMap.value[`${x}-${y}`]

    shipPlacements.value = shipPlacements.value.filter((t) => t !== placement)
  }

  function setShipPlacements(ships) {
    shipPlacements.value = ships
  }

  return {
    selectedShip,
    shipPlacementCursorPosition,
    shipPlacementDirection,
    effectiveShipPlacementPosition,
    contentMap,
    placementPreview,
    mapContentPreview,
    setShipPlacementCursorPosition,
    toggleShipPlacementDirection,
    setSelectedShip,
    addShipPlacement,
    removeShipPlacement,
    shipPlacements,
    placementsCollidingWithPreview,
    previewCollisionMap,
    usageByShip,
    availableShips,
    placedAllShips,
    effectiveShipPlacementX,
    effectiveShipPlacementY,
    shipPlacementDeltaX,
    shipPlacementDeltaY,
    parsePlacementToContentMapEntries,
    setShipPlacements
  }
})
