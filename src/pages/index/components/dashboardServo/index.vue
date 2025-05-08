<template>
  <div class="servo-chart-box">
    <canvas ref="dashboardRef" class="chart-box" :width="510" :height="510" />
    <div class="servo-detail-box">
      {{servoDetail}}
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { getOptions } from './options.js'

defineOptions({
  name: 'dashboardAiServo',
})

const props = defineProps({
  min: {
    default: -40,
    type: [Number, String],
  },
  max: {
    default: 40,
    type: [Number, String],
  },
  textStyle: {
    default: () => ({}),
    type: Object,
  },
})

let myChart = null
const model = defineModel({ default: 0, type: Number })
const dashboardRef = ref(null)

// 舵机方向
const servoDetail = computed(() => {
  let text = 0
  if (+model.value !== 0) {
    // 大于0为右舵，小于0为右舵
    text = `${+model.value > 0 ? '右舵' : '左舵'}${Math.abs(+model.value)}°`
  } else {
    text = '正舵0°'
  }

  return `实时舵角：${text}`
})

const drawChart = () => {
  !myChart && (myChart = echarts.init(dashboardRef.value))

  // let chartValue = 0
  // if (+model.value === 0 || !model.value) {
  //   chartValue = 0
  // } else {
  //   // R40\L40 截取第一位
  //   const pn = model.value.slice(0, 1)
  //   if (pn === 'L') {
  //     chartValue = -model.value.slice(1, model.value.length)
  //   } else if (pn === 'R') {
  //     chartValue = model.value.slice(1, model.value.length)
  //   }
  // }

  const option = getOptions(+model.value || 0, +props.min, +props.max, props.textStyle)
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
.servo-chart-box {
  width: 100%;
  height: calc(100% + 2px);
  background-image: url("../../assets/images/new_servo_dashboard_bg.png");
  background-size: 100% calc(100% - 2px);
  background-repeat: no-repeat;
  background-position: 0 2px;

  .chart-box {
    width: 100%;
    height: calc(100% - 2px);
  }

  .servo-detail-box {
    margin-top: vh(21);
    text-align: center;
    font-weight: 500;
    font-size: vh(18);
    color: #00FCEE;
    line-height: vh(25);
  }
}
</style>
