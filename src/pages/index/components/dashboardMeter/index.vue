<template>
  <div class="dashboard-meter-box">
    <canvas ref="dashboardRef" class="chart-box" :width="300" :height="300" />
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, watch, nextTick } from 'vue'
import { getOptions } from './options.js'

defineOptions({
  name: 'DashboardMeter',
})

let myChart = null
const model = defineModel({ default: 0 })
const dashboardRef = ref(null)
const props = defineProps({
  min: {
    type: [Number, String],
    default: 0,
  },
  max: {
    type: [Number, String],
    default: 100,
  },
})

const drawChart = () => {
  !myChart && (myChart = echarts.init(dashboardRef.value))
  const option = getOptions(model.value || 0, props.min, props.max)
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
.dashboard-meter-box {
  background-image: url('../../assets/images/dashboard_meter_bg.png');
  background-size: 86% auto;
  background-repeat: no-repeat;
  background-position: top 12% center;

  .chart-box {
    width: 100%;
    height: 100%;
  }
}
</style>
