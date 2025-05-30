<template>
  <div class="chart-content-box">
    <div ref="dashboardRef" class="chart-box" />
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, watch, nextTick } from 'vue'
import { getOptions } from './options.js'

defineOptions({
  name: 'DashboardRoseArea'
})

let myChart = null
const model = defineModel('chartData', { default: () => [], type: Array })
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
.chart-content-box {
  width: 100%;
  height: calc(100% + 2px);
  background-image: url('@/pages/monitor/assets/images/start_up_dashboard_bg.png');
  background-size: auto 60%;
  background-position: center 24%;
  background-repeat: no-repeat;

  .chart-box {
    width: 100%;
    height: calc(100% - 2px);
  }
}
</style>
