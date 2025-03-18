<template>
  <div class="double-device-item-box">
    <div class="device-title">
      <div>{{ deviceInfo.name }}</div>
    </div>
    <div class="device-run-state-box">
      <div class="device-info-run-time">
        <span>累计运行时长：</span>
        <span class="device-info-run-time_time">{{ deviceParamData['runningTime']?.value }}</span>
        <span>{{ deviceParamData['runningTime']?.unit || '' }}</span>
      </div>

      <div v-if="deviceInfo.status" class="device-state-box">
        <span class="state-btn" :style="deviceStatus?.style">
          {{ deviceStatus?.name }}
        </span>
      </div>
    </div>

    <div class="dashboards-box">
      <div class="dashboard-item" @click="getLineChartData(dashboardList[1])">
        <div class="dashboard-box">
          <dashboardNormal
            class="dashboard-item-2"
            :model-value="deviceParamData[dashboardList[1]]?.value || 0"
            :min="deviceParamData[dashboardList[1]]?.min"
            :max="deviceParamData[dashboardList[1]]?.max"
          />
        </div>
        <div v-if="dashboardList[1]" class="dashboard-item-title">
          <div class="top-value">
            <span class="top-value-value">
              {{ deviceParamData[dashboardList[1]]?.value }}
            </span>
            <span class="top-value-unit">{{ deviceParamData[dashboardList[1]]?.unit || '' }}</span>
          </div>
          <div class="bottom-desc">{{ deviceParamData[dashboardList[1]]?.name }}</div>
        </div>
      </div>
      <div class="dashboard-item main" @click="getLineChartData(dashboardList[0])">
        <div class="dashboard-box">
          <dashboardNormal
            type="main"
            :model-value="deviceParamData[dashboardList[0]]?.value || 0"
            :min="deviceParamData[dashboardList[0]]?.min"
            :max="deviceParamData[dashboardList[0]]?.max"
          />
        </div>

        <div v-if="dashboardList[0]" class="dashboard-item-title">
          <div class="top-value">
            <span class="top-value-value">
              {{ deviceParamData[dashboardList[0]]?.value }}
            </span>
            <span class="top-value-unit">{{ deviceParamData[dashboardList[0]]?.unit || '' }}</span>
          </div>
          <div class="bottom-desc">{{ deviceParamData[dashboardList[0]]?.name }}</div>
        </div>
      </div>
      <div class="dashboard-item" @click="getLineChartData(dashboardList[2])">
        <div class="dashboard-box">
          <dashboardNormal
            class="dashboard-item-1"
            :model-value="deviceParamData[dashboardList[2]]?.value || 0"
            :min="deviceParamData[dashboardList[2]]?.min"
            :max="deviceParamData[dashboardList[2]]?.max"
          />
        </div>
        <div v-if="dashboardList[2]" class="dashboard-item-title">
          <div class="top-value">
            <span class="top-value-value">
              {{ deviceParamData[dashboardList[2]]?.value }}
            </span>
            <span class="top-value-unit">{{ deviceParamData[dashboardList[2]]?.unit || '' }}</span>
          </div>
          <div class="bottom-desc">{{ deviceParamData[dashboardList[2]]?.name }}</div>
        </div>
      </div>
    </div>

    <div class="device-bottom-box">
      <template v-if="processFields?.length">
        <template v-for="fieldKey in processFields" :key="`double-process-line-${fieldKey}`">
          <div class="process-line-item" @click="getLineChartData(fieldKey)">
            <processLine
              :model="deviceParamData[fieldKey]?.value || 0"
              :min="deviceParamData[fieldKey]?.min"
              :max="deviceParamData[fieldKey]?.max"
              :height="16"
              :sub-title="`${deviceParamData[fieldKey]?.name}${deviceParamData[fieldKey]?.unit ? `(${deviceParamData[fieldKey]?.unit})` : ''}`"
            />
          </div>
        </template>
      </template>
      <template v-else>
        <empty class="process-empty" />
      </template>
    </div>
  </div>
</template>

<script setup>
import empty from '@/components/empty'
import dashboardNormal from '@/components/dashboardNormal'
import processLine from '@/components/processLine'
import { computed, onMounted } from 'vue'
import { CHART_SEARCHABLE_TYPE, DEVICE_STATUS } from '@/constants/device.js'
import { useDeviceChartControlStore } from '@/stores/deviceChartControl.js'
import { getValueMapFromMap } from '@/utils/utils.js'

defineOptions({
  name: 'DoubleDeviceItem',
})

const props = defineProps({
  deviceInfo: {
    type: Object,
    default: () => ({
      name: '',
      data: {},
    }),
  },
  deviceIndex: {
    type: Number,
    required: true,
  },
})

const deviceChartControlStore = useDeviceChartControlStore()
const { getChartData } = deviceChartControlStore

/**
 * @function dashboardList
 * @description 仪表盘列表
 * @returns {array} 仪表盘列表
 **/
const dashboardList = computed(() => {
  const list = []
  // 中间大仪表盘必定为主机转速
  list.push(dashboardFields.value[0])
  // 其余仪表盘
  for (let i = 1; i < dashboardFields.value.length; i++) {
    const key = dashboardFields.value[i]
    if (deviceParamData.value[key]) {
      list.push(key)
    }
  }
  return list
})

const deviceParamData = computed(() => {
  return props.deviceInfo.data || {}
})

const processFields = computed(() => {
  return props.deviceInfo.config?.processFields.filter((key) => {
    return deviceParamData.value[key]?.value !== null
  })
})

const dashboardFields = computed(() => {
  return props.deviceInfo.config?.dashboardFields.filter((key) => {
    return deviceParamData.value[key]?.value !== null
  })
})

// const runtimeComputed = computed(() => {
//   const createTime = new Date(props.deviceInfo.time).getTime()
//   const nowTime = Date.now()
//   const time = Math.floor((nowTime - createTime) / 1000 / 60 / 60)
//   return `${time} 小时`
// })

/**
 * @function getLineChartData
 * @description 获取折线图数据
 * @param {string} fieldKey 字段键值
 **/
const getLineChartData = (fieldKey) => {
  const item = deviceParamData.value[fieldKey]
  if (item.type === CHART_SEARCHABLE_TYPE.ENABLE) {
    // 获取折线图数据（目前固定字段都可查询）
    getChartData({
      paramName: fieldKey,
      fieldName: deviceParamData.value[fieldKey]?.name,
      name: props.deviceInfo.name,
    })
  }
}

const deviceStatus = computed(() => {
  const mapValue = getValueMapFromMap(DEVICE_STATUS)
  return mapValue[props.deviceInfo.status]
})

onMounted(() => {
  // 第0个需要展示
  if (props.deviceIndex === 0) {
    const firstField = dashboardList.value[0]
    getChartData({
      paramName: firstField,
      fieldName: deviceParamData.value[firstField]?.name,
      name: props.deviceInfo.name,
    })
  }
})
</script>

<style scoped lang="scss">
.double-device-item-box {
  box-sizing: border-box;
  position: relative;
  width: vw(690);
  height: vh(797);
  padding: vh(12) vw(24) vh(20);
  background-image: url('@/assets/images/single_host_bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;

  .device-title {
    position: relative;
    display: flex;
    align-items: center;
    height: vh(38);
    padding-left: vw(29);
    margin-bottom: vh(14);
    background-image: url('@/assets/images/tab_bg_small.png');
    background-size: 100% vh(16);
    background-position: left bottom;
    background-repeat: no-repeat;
    font-weight: 400;
    font-size: vh(16);
    color: rgba(0, 252, 238, 1);
    line-height: vh(22);
    letter-spacing: 1px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: calc(50% - 1px);
      width: vw(18);
      height: vh(13);
      transform: translateY(-50%);
      background-image: url('@/assets/images/start_arr_icon.png');
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .device-run-state-box {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: vh(24);
    margin-bottom: vh(60);

    .device-info-run-time {
      position: relative;
      display: flex;
      align-items: center;
      height: vh(24);
      padding-left: vw(13);
      font-weight: 400;
      font-size: vh(16);
      color: rgba(221, 240, 246, 1);
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
      align-items: flex-end;

      .state-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: vw(68);
        height: vh(26);
        padding: 0 vw(13);
        font-weight: 400;
        font-size: vh(14);
        line-height: vh(26);
        border-radius: vh(4);
        color: rgba(221, 240, 246, 1);
      }
    }
  }

  .device-name {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: vh(25);
    margin-left: vw(95);
    font-weight: 500;
    font-size: vh(20);
    color: #ffffff;
    text-shadow: vw(0) vh(3) vh(12) #19576d;

    .time {
      margin-right: vw(39);
      font-weight: 400;
      font-size: vh(14);
      color: #66ffff;
      text-shadow: vw(0) vh(3) vh(12) #19576d;
      text-align: right;
    }
  }

  .dashboards-box {
    display: flex;
    justify-content: space-between;

    .dashboard-item {
      position: relative;
      display: flex;
      align-items: flex-end;
      width: vw(168);

      .dashboard-box {
        width: vw(168);
        height: vw(168);
      }

      &.main {
        width: vw(240);
        margin: 0 vw(28);

        .dashboard-box {
          width: vw(240);
          height: vw(240);
        }

        .dashboard-item-title {
          .top-value {
            .top-value-value {
              font-size: vh(20);
              line-height: vh(23);
            }

            .top-value-unit {
              font-size: vh(12);
              line-height: vh(17);
            }
          }
        }
      }

      .dashboard-item-title {
        position: absolute;
        left: 50%;
        bottom: vh(-15);
        transform: translateX(-50%);
        width: 100%;
        text-align: center;

        .top-value {
          .top-value-value {
            font-family: '庞门正道标题体3.0';
            font-weight: normal;
            font-size: vh(16);
            color: rgba(0, 252, 238, 1);
            line-height: vh(18);
            margin-bottom: vh(3);
          }

          .top-value-unit {
            margin-left: vw(2);
            font-weight: 400;
            font-size: vh(10);
            color: rgba(221, 240, 246, 0.4);
            line-height: vh(14);
          }
        }

        .bottom-desc {
          font-weight: 500;
          font-size: vh(16);
          color: rgba(221, 240, 246, 1);
          line-height: vh(20);
        }
      }
    }
  }

  .device-bottom-box {
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    box-sizing: border-box;
    height: vh(260);
    padding-left: vw(4);
    margin-top: vh(68);

    .process-empty {
      margin: vh(150) auto 0;
    }

    .process-line-item {
      display: inline-block;
      width: vw(270);
      margin-right: vw(42);
      margin-bottom: vh(16);

      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
}
</style>
