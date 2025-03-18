<template>
  <div class="dashboard-normal" :class="[type]">
    <canvas ref="dashboardRef" class="chart-box" :width="500" :height="500" />
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, watch, nextTick } from 'vue'
import { getOptions } from './options.js'

defineOptions({
  name: 'DashboardNormal',
})

const props = defineProps({
  type: {
    default: 'normal',
    type: String,
    validator: (value) => ['normal', 'main'].includes(value),
  },
  min: {
    default: 0,
    type: [String, Number],
  },
  max: {
    default: 100,
    type: [String, Number],
  },
})

let myChart = null
const model = defineModel({ default: 0 })
const dashboardRef = ref(null)

const drawChart = () => {
  !myChart && (myChart = echarts.init(dashboardRef.value))
  const option = getOptions(model.value, props.min, props.max, props.type)
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

<style lang="scss" scoped>
.dashboard-normal {
  width: 100%;
  height: 100%;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: top center;

  &.normal {
    background-image: url('@/assets/images/new_normal_dashboard_bg.png');
  }

  &.main {
    background-image: url('@/assets/images/new_main_dashboard_bg.png');
  }

  .chart-box {
    width: 100%;
    height: 100%;
  }
}
</style>
