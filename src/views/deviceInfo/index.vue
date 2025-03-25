<template>
  <!--设备大屏-->
  <deviceInfo />
</template>

<script setup>
import deviceInfo from '@/components/deviceInfo'
import { provide } from 'vue'
import '../../provide/boat.js'
import { BOAT_INFO } from '@/provide/boat.js'
import { useBoatInfo } from '@/composables/useBoatInfo.js'

defineOptions({ name: 'DevicePage' })

const { boatInfo, setBoatInfo, getBoatInfo } = useBoatInfo()

provide(BOAT_INFO, {
  boatInfo,
  setBoatInfo,
  getBoatInfo
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
