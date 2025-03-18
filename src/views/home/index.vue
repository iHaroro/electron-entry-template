<template>
  <pageLayout>
    <!--首页海图大屏常驻-->
    <homeMap />
    <!--设备大屏-->
    <deviceInfo v-if="activePage === pageRouters.deviceInfo.name" />
    <!--监控大屏-->
    <monitoringInfo v-if="activePage === pageRouters.monitoringInfo.name" />
    <!--智能驾驶-->
    <aiCopilot v-if="activePage === pageRouters.aiCopilot.name" />
  </pageLayout>
</template>

<script setup>
import pageLayout from '@/components/pageLayout'
import homeMap from '@/components/homeMap'
import deviceInfo from '@/components/deviceInfo'
import monitoringInfo from '@/components/monitoringInfo'
import aiCopilot from '@/components/aiCopilot'
import { usePageControlStore } from '@/stores/pageControl'
import { storeToRefs } from 'pinia'
import { onMounted, provide, ref } from 'vue'
import '../../provide/boat.js'
import { BOAT_INFO } from '@/provide/boat.js'
// import mockShipData from '@/data/shipData.json'

defineOptions({ name: 'MiddlePage' })

const pageControlStore = usePageControlStore()
const { goPage, goBack } = pageControlStore
const { activePage, pageRouters } = storeToRefs(pageControlStore)

const boats = ref([])
const boatInfo = ref({})
const setBoatInfo = (data) => (boatInfo.value = data)
const getBoatInfo = () => boatInfo.value
const setBoats = (list) => (boats.value = list)
const getBoats = () => boats.value

provide(BOAT_INFO, {
  boats,
  boatInfo,
  setBoatInfo,
  setBoats,
  getBoatInfo,
  getBoats,
})

onMounted(() => {
  window.pageControlStore = {
    activePage,
    pageRouters,
    goPage,
    goBack,
  }

  // TODO MOCK DATA
  if (import.meta.env.MODE === 'development') {
    // setBoatInfo(mockShipData)
    // goPage(pageRouters.value.aiCopilot.name) // 进入智能驾驶大屏
    // goPage(pageRouters.value.deviceInfo.name) // 进入设备大屏
    // goPage(pageRouters.value.monitoringInfo.name) // 进入监控大屏
  }
})
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'YouSheBiaoTiHei-Regular';
  src: url('@/assets/fonts/YouSheBiaoTiHei-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.page-container {
  width: vw(1920);
  height: vh(1080);
  color: #ffffff;

  .page-container-bg {
    display: flex;
    justify-content: space-between;
    width: vw(1920);
    height: vh(1080);
    background-image: url('@/assets/images/main_bg.png');
    background-repeat: no-repeat;
    background-size: vw(1920) vh(1080);
  }
}
</style>
