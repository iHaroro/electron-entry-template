<template>
  <a-spin :spinning="chartLoading">
    <div class="chart-info-box">
      <div class="device-run-state-box">
        <div class="device-info-run-time">
          <span>{{ deviceName }}</span>
        </div>

        <div class="device-state-box">
          <div
            class="state-btn"
            :class="{ active: requestParams.time === dataTypes.week.type }"
            @click="getData(dataTypes.week.type)"
          >
            {{ dataTypes.week.name }}
          </div>
          <div
            class="state-btn"
            :class="{ active: requestParams.time === dataTypes.month.type }"
            @click="getData(dataTypes.month.type)"
          >
            {{ dataTypes.month.name }}
          </div>
        </div>
      </div>
      <div class="chart-box">
        <div ref="dashboardRef" class="chart" width="390" height="250"></div>
      </div>
    </div>
  </a-spin>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, watch, nextTick, computed } from 'vue'
import { getOptions } from './options.js'
import { TIME_TYPE } from '@/stores/deviceChartControl.js'
import { useDeviceChartControlStore } from '@/stores/deviceChartControl.js'
import { storeToRefs } from 'pinia'

defineOptions({ name: 'dashboardParams' })

const props = defineProps({
  chartData: {
    type: Object,
    default: () => {}
  }
})
const dashboardRef = ref(null)
const dataTypes = ref({
  week: {
    type: TIME_TYPE.WEEK,
    name: '近一周'
  },
  month: {
    type: TIME_TYPE.MONTH,
    name: '近一月'
  }
})
let myChart = null
const chartControlStore = useDeviceChartControlStore()
const { getChartData } = chartControlStore
const { requestParams, chartLoading } = storeToRefs(chartControlStore)

const drawChart = () => {
  !myChart && (myChart = echarts.init(dashboardRef.value))
  console.log('渲染图表数据', requestParams.value?.fieldName, requestParams.value?.name)
  const name = requestParams.value?.name
               ? `${requestParams.value?.fieldName}(${requestParams.value?.name})`
               : requestParams.value?.fieldName
  const option = getOptions({
    name,
    yaxle: props.chartData.yaxle,
    xaxle: props.chartData.xaxle
  })
  myChart.setOption(option)
}

const deviceName = computed(() => {
  return requestParams.value?.name
         ? `${requestParams.value?.fieldName}(${requestParams.value?.name})`
         : requestParams.value?.fieldName
})

const getData = (dataType) => {
  getChartData({ time: dataType })
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
  box-sizing: border-box;
  position: relative;
  padding: vh(24) vw(24);
  background-image: url('@/assets/images/history_data_bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;

  .device-run-state-box {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: vh(24);

    .device-info-run-time {
      position: relative;
      display: flex;
      align-items: center;
      height: vh(24);
      padding-left: vw(13);
      font-weight: 400;
      font-size: vh(16);
      color: rgba(0, 252, 238, 1);
      text-align: left;
      font-style: normal;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: vw(5);
        height: vh(24);
        background-image: url('@/assets/images/title_start_icon.png');
        background-repeat: no-repeat;
        background-size: vw(5) vh(18);
        background-position: center center;
      }

      .device-info-run-time_time {
        font-family: '庞门正道标题体3.0';
        color: rgba(255, 162, 23, 1);
        text-align: left;
        letter-spacing: 1px;
        font-style: normal;
      }
    }

    .device-state-box {
      display: flex;
      align-items: center;

      .state-btn {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: vw(68);
        height: vh(26);
        padding: 0 vw(13);
        margin-left: vw(12);
        font-weight: 400;
        font-size: vh(14);
        line-height: vh(26);
        border-radius: 4px;
        box-shadow: inset 0px 0px 9px 0px rgba(0, 211, 255, 0.6);

        &.active {
          background: #0091ff;
          border: 1px solid #30b9ff;
        }
      }
    }
  }

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
    width: vw(392);
    height: vh(326);
    margin-top: vh(30);

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
