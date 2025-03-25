<template>
  <!--监控大屏-->
  <monitoringInfo />
</template>

<script setup>
import monitoringInfo from '@/components/monitoringInfo'
import { provide } from 'vue'
import { BOAT_INFO } from '@/provide/boat.js'
import { useBoatInfo } from '@/composables/useBoatInfo.js'

defineOptions({ name: 'MonitorPage' })

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
