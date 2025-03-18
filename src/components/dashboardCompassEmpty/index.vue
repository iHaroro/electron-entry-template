<template>
  <div class="dashboard-chart-box">
    <canvas ref="dashboardRef" class="chart-box" :width="244" :height="244" />
    <div class="boat-facing-icon" :style="boatRotate"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { getOptions } from './options.js'

defineOptions({
  name: 'DashboardCompassEmpty',
})

let myChart = null
const model = defineModel({ default: 0 })
const dashboardRef = ref(null)

const drawChart = () => {
  !myChart && (myChart = echarts.init(dashboardRef.value))
  const option = getOptions(model.value || 0)
  myChart.setOption(option)
}

const boatRotate = computed(() => {
  return {
    transform: `rotate(${+model.value + 45}deg) translate(-50%, -50%)`,
  }
})

onMounted(() => {
  drawChart()
})

watch(model, () => {
  nextTick(() => {
    drawChart()
  })
})
</script>
<style scoped lang="scss">
.dashboard-chart-box {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/boat_bow_bg.png');
  background-size: 100% 100%;

  .chart-box {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    transition: all 0.3s;
  }

  .boat-facing-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-origin: 0 0;
    width: vh(61);
    height: vh(61);
    background-image: url('@/assets/images/boat_overlooking_icon.png');
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
  }

  .boat-facing-value {
    position: absolute;
    bottom: vh(0);
    left: 50%;
    width: 100%;
    text-align: center;
    transform: translate(-50%, -50%);
    font-weight: 700;
    font-size: vh(18);
  }
}
</style>
