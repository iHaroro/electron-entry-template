<template>
  <div class="layout-container" :style="layoutStyle">
    <CommonHeader />
    <div class="page-container" :style="containerStyle">
      <slot />
    </div>
  </div>
</template>

<script setup>
import CommonHeader from '@/components/commonHeader'
defineOptions({ name: 'PageLayout' })

defineProps({
  layoutStyle: {
    type: Object,
    default: () => ({}),
  },
  containerStyle: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<style scoped lang="scss">
.layout-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  //background-image: url('@/assets/images/main_bg.png');
  //background-repeat: no-repeat;
  //background-size: vw(1920) vh(1080);
  //background-position: center center;
  color: #ffffff;
  //background-position: left vw(-20) top vh(-$navBarTop);
  background: linear-gradient(180deg, #000e26 0%, #00225e 66%, #002156 100%);

  .page-container {
    position: absolute;
    top: vh($navBarTop);
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 vw(22) vh(12);
  }
}
</style>
