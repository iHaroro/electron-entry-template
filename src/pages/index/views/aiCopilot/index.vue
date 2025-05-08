<template>
  <!--智能驾驶-->
  <aiCopilot />
</template>

<script setup>
import aiCopilot from '@/pages/index/components/aiCopilot/index.vue'
import { provide } from 'vue'
import { BOAT_INFO } from '@/pages/index/provide/boat.js'
import { useBoatInfo } from '@/pages/index/composables/useBoatInfo.js'

defineOptions({ name: 'AiCopilotPage' })

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
  src: url('../../assets/fonts/YouSheBiaoTiHei-Regular.woff') format('woff');
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
    background-image: url('../../assets/images/main_bg.png');
    background-repeat: no-repeat;
    background-size: vw(1920) vh(1080);
  }
}
</style>
