<template>
  <!--监控大屏-->
  <monitoringInfo />
</template>

<script setup>
import monitoringInfo from '@/pages/index/components/monitoringInfo/index.vue'

defineOptions({ name: 'MonitorPage' })
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
