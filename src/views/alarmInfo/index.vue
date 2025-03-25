<template>
  <PageLayout>12345</PageLayout>
</template>

<script setup>
import PageLayout from '@/components/pageLayout'
import { provide } from 'vue'
import { BOAT_INFO } from '@/provide/boat.js'
import { useBoatInfo } from '@/composables/useBoatInfo.js'

defineOptions({ name: 'AlarmInfoPage' })

const { boats, boatInfo, setBoatInfo, getBoatInfo, setBoats, getBoats } = useBoatInfo()

provide(BOAT_INFO, {
  boats,
  boatInfo,
  setBoatInfo,
  setBoats,
  getBoatInfo,
  getBoats,
})
</script>
