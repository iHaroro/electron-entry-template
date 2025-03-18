<template>
  <div class="ai-servo-box">
    <canvas ref="dashboardRef" class="chart-box" :width="400" :height="400" />
    <div class="info-box">
      <p class="info-box-value">{{ Math.abs(model) || 0 }}°</p>
      <p class="info-box-desc">{{ servoDirection }}</p>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { getOptions } from './options.js'

defineOptions({
  name: 'dashboardServo',
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
const model = defineModel({ default: 0, type: [Number, String] })
const dashboardRef = ref(null)

const servoDirection = computed(() => {
  switch (+model.value) {
    case 0:
      return '正舵'
    case -40:
      return '左舵'
    case 40:
      return '右舵'
    default:
      return +model.value > 0 ? '右舵' : '左舵'
  }
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

<style lang="scss" scoped>
.ai-servo-box {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/dashboard_servo_bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: -1px center;

  .chart-box {
    width: 100%;
    height: 100%;
  }

  .info-box {
    position: absolute;
    left: 0;
    right: 0;
    bottom: vh(16);
    text-align: center;

    .info-box-value {
      margin-left: vw(20);
      font-family: '庞门正道标题体3.0';
      font-weight: normal;
      font-size: vh(21);
      color: rgba(0, 252, 238, 1);
    }

    .info-box-desc {
      font-weight: 400;
      font-size: vh(15);
      color: rgba(221, 240, 246, 1);
    }
  }
}
</style>
