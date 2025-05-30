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
const model = defineModel({ default: 0, type: Number })
const dashboardRef = ref(null)

const drawChart = () => {
  !myChart && (myChart = echarts.init(dashboardRef.value))

  const option = getOptions(+model.value)
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
  height: 100%;

  .chart-box {
    width: 100%;
    height: calc(100% - 2px);
  }
}
</style>
