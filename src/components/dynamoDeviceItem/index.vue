<template>
  <div class="single-device-box">
    <div class="single-device-title">
      <div class="device-info-tab">
        <div
          v-for="(item, index) in deviceInfos"
          class="device-info-tab_item"
          :key="`tab_${index}`"
          :class="{ active: mainDeviceTypeIndex === index }"
          @click="changeMainDeviceTypeIndex(index)"
        >
          {{ item.name }}
        </div>
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
    </div>

    <div class="single-device-info">
      <div class="single-device-info-left">
        <template v-if="processFields?.length">
          <div
            class="process-line-item"
            v-for="fieldKey in processFields"
            :key="`process-line-${fieldKey}`"
            @click="getLineChartData(fieldKey)"
          >
            <processLine
              :model="deviceParamData[fieldKey]?.value || 0"
              :min="deviceParamData[fieldKey]?.min"
              :max="deviceParamData[fieldKey]?.max"
              :height="16"
              :sub-title="`${deviceParamData[fieldKey]?.name}${deviceParamData[fieldKey]?.unit ? `(${deviceParamData[fieldKey]?.unit})` : ''}`"
            />
          </div>
        </template>
        <template v-else>
          <empty class="process-field-empty-box" />
        </template>
      </div>
      <!--仪表盘-->
      <div class="single-device-info-right">
        <div class="dashboard-box">
          <div class="top-dashboard">
            <!--主机转速为中间大仪表盘，必有参数-->
            <div class="dashboard-item-box" @click="getLineChartData(dashboardList[0])">
              <dashboardNormal
                class="dashboard-item"
                type="main"
                :model-value="deviceParamData[dashboardList[0]]?.value || 0"
                :min="deviceParamData[dashboardList[0]]?.min"
                :max="deviceParamData[dashboardList[0]]?.max"
              />
              <div v-if="dashboardList[0]" class="dashboard-item-title">
                <div class="top-value">
                  <span class="top-value-value">
                    {{ deviceParamData[dashboardList[0]]?.value }}
                  </span>
                  <span class="top-value-unit">{{
                    deviceParamData[dashboardList[0]]?.unit || ''
                  }}</span>
                </div>
                <div class="bottom-desc">{{ deviceParamData[dashboardList[0]]?.name }}</div>
              </div>
            </div>
          </div>
          <div class="bottom-dashboard">
            <!--仪表1-->
            <div class="dashboard-item-box" @click="getLineChartData(dashboardList[1])">
              <dashboardNormal
                class="dashboard-item"
                :model-value="deviceParamData[dashboardList[1]]?.value || 0"
                :min="deviceParamData[dashboardList[1]]?.min"
                :max="deviceParamData[dashboardList[1]]?.max"
              />
              <div v-if="dashboardList[1]" class="dashboard-item-title">
                <div class="top-value">
                  <span class="top-value-value">
                    {{ deviceParamData[dashboardList[1]]?.value }}
                  </span>
                  <span class="top-value-unit">{{
                    deviceParamData[dashboardList[1]]?.unit || ''
                  }}</span>
                </div>
                <div class="bottom-desc">{{ deviceParamData[dashboardList[1]]?.name }}</div>
              </div>
            </div>
            <!--仪表2-->
            <div class="dashboard-item-box" @click="getLineChartData(dashboardList[2])">
              <dashboardNormal
                class="dashboard-item"
                :model-value="deviceParamData[dashboardList[2]]?.value || 0"
                :min="deviceParamData[dashboardList[2]]?.min"
                :max="deviceParamData[dashboardList[2]]?.max"
              />
              <div v-if="dashboardList[2]" class="dashboard-item-title">
                <div class="top-value">
                  <span class="top-value-value">
                    {{ deviceParamData[dashboardList[2]]?.value }}
                  </span>
                  <span class="top-value-unit">{{
                    deviceParamData[dashboardList[2]]?.unit || ''
                  }}</span>
                </div>
                <div class="bottom-desc">{{ deviceParamData[dashboardList[2]]?.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import processLine from '@/components/processLine'
import dashboardNormal from '@/components/dashboardNormal'
import empty from '@/components/empty'
import { useDeviceChartControlStore } from '@/stores/deviceChartControl.js'
import { CHART_SEARCHABLE_TYPE, DEVICE_STATUS } from '@/constants/device.js'
import { getValueMapFromMap } from '@/utils/utils.js'

defineOptions({
  name: 'DynamoDeviceItem',
})

const emit = defineEmits(['changeMainDeviceType'])

const deviceChartControlStore = useDeviceChartControlStore()
const { getChartData } = deviceChartControlStore

const props = defineProps({
  deviceInfos: {
    type: Array,
    default: () => [],
  },
})

const mainDeviceTypeIndex = ref(0)

/**
 * @function changeMainDeviceTypeIndex
 * @description 改变主设备类型索引
 * @param {number} index 索引
 **/
const changeMainDeviceTypeIndex = (index) => {
  emit('changeMainDeviceType', index)
  mainDeviceTypeIndex.value = index
}

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

const deviceInfo = computed(() => {
  return props.deviceInfos[mainDeviceTypeIndex.value]
})

const deviceParamData = computed(() => {
  return props.deviceInfos[mainDeviceTypeIndex.value].data || {}
})

const processFields = computed(() => {
  return props.deviceInfos[mainDeviceTypeIndex.value].config?.processFields.filter((key) => {
    return deviceParamData.value[key]?.value !== null
  })
})

const dashboardFields = computed(() => {
  return deviceInfo.value?.config?.dashboardFields.filter((key) => {
    return deviceParamData.value[key]?.value !== null
  })
})

// const runtimeComputed = computed(() => {
//   const createTime = new Date(deviceInfo.value.time).getTime()
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
      name: props.deviceInfos[mainDeviceTypeIndex.value].name,
    })
  }
}

const deviceStatus = computed(() => {
  const mapValue = getValueMapFromMap(DEVICE_STATUS)
  return mapValue[props.deviceInfos[mainDeviceTypeIndex.value].status]
})

onMounted(() => {
  const firstField = dashboardList.value[0]
  getChartData({
    paramName: firstField,
    fieldName: deviceParamData.value[firstField]?.name,
    name: props.deviceInfos[mainDeviceTypeIndex.value].name,
  })
  emit('changeMainDeviceTypeIndex', mainDeviceTypeIndex.value)
})
</script>

<style scoped lang="scss">
.single-device-box {
  box-sizing: border-box;
  width: 100%;
  height: vh(790);
  padding: vh(25) vw(25);
  background-image: url('@/assets/images/single_host_bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .single-device-title {
    margin-bottom: vh(68);

    .device-info-tab {
      box-sizing: border-box;
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: vh(30);
      padding-left: vw(20);
      margin-bottom: vh(25);
      background-image: url('@/assets/images/tab_bg_large.png');
      background-size: 100% vh(16);
      background-position: left bottom;
      background-repeat: no-repeat;

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

      .device-info-tab_item {
        position: relative;
        cursor: pointer;
        height: 100%;
        font-weight: 400;
        font-size: vh(16);
        color: rgba(0, 252, 238, 0.4);
        line-height: vh(22);
        letter-spacing: 1px;
        text-align: left;
        font-style: normal;
        margin: 0 vw(18);

        &.active {
          color: rgba(0, 252, 238, 1);

          &::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: vh(-3);
            transform: translateX(-50%) translateY(-50%);
            width: vw(35);
            height: vh(4);
            background-color: rgba(0, 252, 238, 1);
          }
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }

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
  }

  .single-device-info {
    display: flex;

    .single-device-info-left {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      overflow-y: auto;
      position: relative;
      box-sizing: border-box;
      width: vw(633);
      height: vh(600);
      //padding: vh(20) vw(8) 0;
      //background: linear-gradient(180deg, rgba(52, 88, 155, 0.27) 0%, rgba(48, 97, 219, 0.29) 100%);

      .process-line-item {
        display: inline-block;
        width: vw(270);
        margin-right: vw(40);
        margin-bottom: vh(16);

        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }

    .single-device-info-right {
      position: relative;
      flex: 1;
      margin-left: vw(70);
      margin-right: vw(55);
      //background: linear-gradient(180deg, rgba(52, 88, 155, 0.27) 0%, rgba(48, 97, 219, 0.29) 100%);

      .dashboard-box {
        .top-dashboard {
          display: flex;
          justify-content: center;
          align-items: center;

          .dashboard-item-box {
            position: relative;

            .dashboard-item {
              width: vh(300);
              height: vh(300);
            }
          }
        }

        .bottom-dashboard {
          display: flex;
          justify-content: center;
          align-items: center;

          .dashboard-item-box {
            position: relative;
            margin-right: vw(90);

            &:last-child {
              margin-right: 0;
            }

            .dashboard-item {
              width: vh(232);
              height: vh(232);
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
              font-size: vh(20);
              color: rgba(0, 252, 238, 1);
              line-height: vh(23);
              margin-bottom: vh(3);
            }

            .top-value-unit {
              margin-left: vw(2);
              font-weight: 400;
              font-size: vh(12);
              color: rgba(221, 240, 246, 0.4);
              line-height: vh(17);
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
  }

  .process-field-empty-box {
    margin: vh(100) auto;
  }
}
</style>
