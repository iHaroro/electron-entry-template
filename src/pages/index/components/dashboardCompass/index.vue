<template>
  <div class="dashboard-compass-box">
    <canvas ref="dashboardRef" class="chart-box" :width="300" :height="300" />
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, watch, nextTick } from 'vue'
import { getOptions } from './options.js'

defineOptions({
  name: 'DashboardCompass',
})

let myChart = null
const model = defineModel({ default: 0 })
const dashboardRef = ref(null)

const drawChart = () => {
  !myChart && (myChart = echarts.init(dashboardRef.value))
  const option = getOptions(model.value)
  myChart.setOption(option)
}

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
.dashboard-compass-box {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/dashboard_compass_bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .chart-box {
    width: 100%;
    height: 100%;
  }
}
</style>
