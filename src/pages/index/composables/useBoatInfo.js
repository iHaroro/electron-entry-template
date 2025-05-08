import { ref, onBeforeMount } from 'vue'
import { getConfigFromApplication } from '@/pages/index/utils/userInfo.js'

export function useBoatInfo() {
  const config = JSON.parse(getConfigFromApplication() || '{}')

  const boats = ref([])
  const boatInfo = ref({})

  const setBoatInfo = (data) => (boatInfo.value = data)
  const getBoatInfo = () => boatInfo.value
  
  const setBoats = (list) => (boats.value = list)
  const getBoats = () => boats.value

  onBeforeMount(() => {
    console.log('INDEX beforeMount', config)
    boatInfo.value = config
  })

  return {
    boats,
    boatInfo,
    setBoatInfo,
    getBoatInfo,
    setBoats,
    getBoats,
  }
}
