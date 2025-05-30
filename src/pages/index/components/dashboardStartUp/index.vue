<template>
  <div class="chart-box">
    <canvas ref="dashboardRef" class="chart-box" :width="600" :height="300" />
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, watch, nextTick } from 'vue'
import { getOptions } from './options.js'

defineOptions({
  name: 'DashboardStartUp'
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
.chart-box {
  width: 100%;
  height: calc(100% + 2px);
  background-image: url("../../assets/images/start_up_dashboard_bg.png");
  background-size: auto 80%;
  background-position: center;
  background-repeat: no-repeat;

  .chart-box {
    width: 100%;
    height: calc(100% - 2px);
  }
}
</style>
