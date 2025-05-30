<template>
  <div class="chart-info-box">
    <div ref="dashboardRef" class="chart-box"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, watch, nextTick } from 'vue'
import { getOptions } from './options.js'

defineOptions({ name: 'dashboardLine' })

const props = defineProps({
  chartData: {
    type: Object,
    default: () => {}
  }
})
const dashboardRef = ref(null)

let myChart = null

const drawChart = () => {
  !myChart && (myChart = echarts.init(dashboardRef.value))
  const option = getOptions(props.chartData)
  myChart.setOption(option)
}

watch(
  () => props.chartData,
  () => {
    nextTick(() => {
      drawChart()
    })
  },
  { deep: true, immediate: true }
)
</script>

<style scoped lang="scss">
.chart-info-box {
  position: relative;
  width: 100%;
  height: 100%;

  .btn-box {
    z-index: 10;
    position: absolute;
    top: vh(0);
    right: vw(0);

    .btn {
      color: #333333;
      background: #ededed;

      &.active {
        color: #ffffff;
        background: #0072ff;
      }
    }
  }

  .chart-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
}
</style>
