<template>
  <pageLayout>
    <div class="device-info-box">
      <div class="top-box">
        <selectBox
          v-model:value="boat"
          :options="boats"
          :options-props="{
            name: 'name',
            value: 'mmsi',
            key: 'mmsi',
          }"
          @change="handleChangeBoat"
        />
        <div class="top-title">
          <span class="net-state-box">
            <img class="net-state-icon" :src="netStateData.icon" :alt="netStateData.name" />
            <span class="net-state-desc" :style="netStateData.style">{{ netStateData.name }}</span>
          </span>
          <span class="update-time" v-if="currentDeviceUpdateTime">
            更新时间：{{ currentDeviceUpdateTime }}
          </span>
          <span class="top-title_title">设备信息</span>
        </div>
        <div class="new-select-btn back-btn" @click.stop="goBack">
          <img class="back-icon" src="@/assets/images/back_btn_icon.png" alt="" />
          <span>返回</span>
        </div>
      </div>

      <div class="bottom-box">
        <div class="device-info-left">
          <template v-if="deviceInfo?.config?.length">
            <titleComponent size="huge">
              <!--设备类型-->
              <div class="device-info-tab">
                <div
                  v-for="item in deviceTypes"
                  class="device-info-tab_item"
                  :key="item.value"
                  :class="{ active: deviceType === item.value }"
                  @click="changeDeviceType(item.value)"
                >
                  {{ item.name }}
                </div>
              </div>
            </titleComponent>
            <!--主机-->
            <div class="main-host-device" v-if="deviceType === DEVICE_TYPES.MAIN_DEVICE.value">
              <template v-if="isEmpty(mainDeviceInfo)">
                <empty class="empty-device" />
              </template>
              <template v-else>
                <!--单主机-->
                <div v-if="deviceInfo.type === HOST_TYPE.SINGLE">
                  <singleDeviceItem class="single-device-box" :device-info="mainDeviceInfo" />
                </div>
                <!--双主机-->
                <div class="double-device-box" v-else-if="deviceInfo.type === HOST_TYPE.DOUBLE">
                  <template v-for="(item, index) in mainDeviceInfo" :key="`double_device_${index}`">
                    <doubleDeviceItem
                      class="double-device-box_item"
                      :device-info="item"
                      :device-index="index"
                    />
                  </template>
                </div>
              </template>
            </div>
            <!--发电机-->
            <div class="dynamo-device" v-if="deviceType === DEVICE_TYPES.ELECTRICS_DEVICE.value">
              <template v-if="isEmpty(electricsDeviceInfo)">
                <empty class="empty-device" />
              </template>
              <template v-else>
                <dynamoDeviceItem
                  :device-infos="electricsDeviceInfo"
                  @changeMainDeviceType="changeElectricsTypeIndex"
                />
              </template>
            </div>
            <!--舵机-->
            <div class="servo-device" v-if="deviceType === DEVICE_TYPES.SERVO_DEVICE.value">
              <template v-if="isEmpty(cabDeviceInfo)">
                <empty class="empty-device" />
              </template>
              <template v-else>
                <div class="servo-device-box">
                  <servoSwitcherItem class="servo-switcher-item" :device-info="cabDeviceInfo" />
                  <servoDeviceItem class="servo-device-item" :device-info="cabDeviceInfo" />
                </div>
              </template>
            </div>
          </template>
          <template v-else>
            <empty class="iot-empty"></empty>
          </template>
        </div>
        <div class="device-info-right">
          <div class="device-info-right_top">
            <titleComponent size="small">历史数据</titleComponent>
            <template
              v-if="
                isEmpty(mainDeviceInfo) && isEmpty(electricsDeviceInfo) && isEmpty(cabDeviceInfo)
              "
            >
              <empty class="params-empty" />
            </template>
            <template v-else>
              <dashboardParams class="device-info-right_top-chart" :chart-data="chartData" />
            </template>
          </div>
          <div class="device-info-right_bottom">
            <titleComponent size="small">报警信息</titleComponent>
            <div class="device-info-right_bottom-content">
              <div class="more-btn-box" @click="showMoreWarnList">
                <div>查看更多</div>
                <img src="@/assets/images/more_right_icon.png" alt="" />
              </div>
              <alarmInfoList :boat-info="boatInfo" :list="alarmInfo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </pageLayout>

  <deviceWarnTable v-if="showWarnTable" :boat="boat" @back="closeMoreWarnList" />
</template>
<script setup>
import { DEVICE_TYPES, HOST_TYPE, SHIP_NET_STATE_MAP } from '@/constants/device.js'
import pageLayout from '@/components/pageLayout'
import empty from '@/components/empty'
import doubleDeviceItem from '@/components/doubleDeviceItem'
import singleDeviceItem from '@/components/singleDeviceItem'
import dynamoDeviceItem from '@/components/dynamoDeviceItem'
import servoDeviceItem from '@/components/servoDeviceItem'
import servoSwitcherItem from '@/components/servoSwitcherItem'
import dashboardParams from '@/components/dashboardParams'
import alarmInfoList from '@/components/alarmInfoList'
import selectBox from '@/components/selectBoxNew'
import titleComponent from '@/components/titleComponent'
import deviceWarnTable from '@/components/deviceWarnTable'
import { getShipList, getShipDevice, getShipAlarm } from '@/api/device.js'
import { storeToRefs } from 'pinia'
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import { useDeviceChartControlStore, DEVICE_TYPE, TIME_TYPE } from '@/stores/deviceChartControl.js'
import { usePageControlStore } from '@/stores/pageControl.js'
import { isEmpty, getValueMapFromMap } from '@/utils/utils.js'
import { BOAT_INFO } from '@/provide/boat.js'

defineOptions({ name: 'DeviceInfo' })

let timer = null
let destroyed = false
const boats = ref([]) // 船舶列表
const boat = ref(null) // 当前的选中的船舶
const deviceTypes = ref({}) // 设备类型
const deviceType = ref(null) // 选中的设备类型
const deviceInfo = ref({}) // 当前船舶的设备信息
const alarmInfo = ref([])
const refreshTime = 10 * 1000
const showWarnTable = ref(false)

const boatInfoInject = inject(BOAT_INFO)

const deviceChartControlStore = useDeviceChartControlStore()
const { setRequestParams } = deviceChartControlStore
const { chartData } = storeToRefs(deviceChartControlStore)

const pageControlStore = usePageControlStore()
const { goBack } = pageControlStore

const electricsTypeIndex = ref(0)

/**
 * @function changeElectricsTypeIndex
 * @description 切换发电机类型
 * @param {number} index 发电机类型索引
 **/
const changeElectricsTypeIndex = (index) => {
  electricsTypeIndex.value = index
}

/**
 * @function showMoreWarnList
 * @description 展示报警列表
 **/
const showMoreWarnList = () => {
  showWarnTable.value = true
}

/**
 * @function closeMoreWarnList
 * @description 关闭报警列表
 **/
const closeMoreWarnList = () => {
  showWarnTable.value = false
}

/**
 * @function changeDeviceType
 * @description 切换设备类型
 * @param {number} value 设备类型
 **/
const changeDeviceType = (value) => {
  deviceType.value = value
  setRequestParams({
    mmsi: boat.value,
    type: chartDeviceType.value,
    time: TIME_TYPE.WEEK,
    // 默认请求主机设备图表数据
    name:
      deviceType.value === DEVICE_TYPES.SERVO_DEVICE.value
        ? deviceInfo.value[deviceType.value].name
        : deviceInfo.value[deviceType.value][0].name,
  })
}

const netStateData = computed(() => {
  const map = getValueMapFromMap(SHIP_NET_STATE_MAP)
  return map[`${deviceInfo.value.shipStatus}`] || {}
})

/**
 * @function handleChangeBoat
 * @description 切换船舶事件
 **/
const handleChangeBoat = () => {
  clearTimeout(timer)
  getDeviceData({
    reset: true,
    initChart: true,
  })
}

/**
 * @function refreshData
 * @description 获取船舶列表数据
 **/
const refreshData = () => {
  timer = setTimeout(() => {
    if (destroyed) return
    getDeviceData({
      reset: false,
      initChart: false,
    })
  }, refreshTime)
}

/**
 * @function getDeviceData
 * @description 获取设备数据
 * @param {object} options 配置项
 * @param {boolean} options.reset 是否重置数据
 * @param {boolean} options.initChart 是否初始化图表数据
 **/
const getDeviceData = async ({ reset = false, initChart = false }) => {
  // 获取设备数据
  const shipDeviceRes = await getShipDevice({ mmsi: boat.value })
  deviceInfo.value = shipDeviceRes.data

  // 插入已存在的设备类型（防止某种设备不存在）
  deviceTypes.value = {}
  if (deviceInfo.value.config?.length) {
    deviceInfo.value.config.forEach((key) => {
      const constKey = Object.keys(DEVICE_TYPES).find((item) => {
        return DEVICE_TYPES[item].value === key
      })
      deviceTypes.value[key] = DEVICE_TYPES[constKey]
    })
  }

  if (reset) {
    // 默认展示设备类型为主机
    deviceType.value = deviceInfo.value.config[0]
  }

  if (initChart && deviceInfo.value.config?.length) {
    console.log(deviceInfo.value[deviceInfo.value.config[0]])
    // 获取图表数据
    setRequestParams({
      mmsi: boat.value,
      type: chartDeviceType.value,
      // 默认请求主机设备图表数据
      name: deviceInfo.value[deviceInfo.value.config[0]]?.length
        ? deviceInfo.value[deviceInfo.value.config[0]][0].name
        : deviceInfo.value[deviceInfo.value.config[0]].name,
      time: TIME_TYPE.WEEK,
    })
  }

  // 获取警报列表
  getShipAlarmList()

  refreshData()
}

/**
 * @function getShipAlarmList
 * @description 获取报警数据
 **/
const getShipAlarmList = () => {
  getShipAlarm({ mmsi: boat.value }).then((res) => {
    console.log('报警数据', res.data)
    alarmInfo.value = res.data
  })
}

/**
 * @function chartDeviceType
 * @description 图标请求的设备类型type映射值
 * @returns {string} 图标请求的设备类型type映射值
 **/
const chartDeviceType = computed(() => {
  switch (deviceType.value) {
    case DEVICE_TYPES.MAIN_DEVICE.value:
      return DEVICE_TYPE.MAIN_DEVICE
    case DEVICE_TYPES.ELECTRICS_DEVICE.value:
      return DEVICE_TYPE.ELECTRICS_DEVICE
    case DEVICE_TYPES.SERVO_DEVICE.value:
      return DEVICE_TYPE.SERVO_DEVICE
    default:
      return null
  }
})

/**
 * @function getShipListData
 * @description 获取船舶列表数据
 **/
const getShipListData = () => {
  getShipList().then((res) => {
    console.log('船舶数据', res.data)
    boats.value = res.data
    boat.value = boat.value || res.data[0].mmsi
  })
}

/**
 * @function boatInfo
 * @description 船舶信息
 * @returns {object} 船舶信息
 **/
const boatInfo = computed(() => {
  return boats.value.find((item) => item.mmsi === boat.value)
})

/**
 * @function mainDeviceInfo
 * @description 获取主机信息数据，已根据主机类型筛选数据
 * @returns {object | array} 主机信息数据
 **/
const mainDeviceInfo = computed(() => {
  const data = deviceInfo.value[DEVICE_TYPES.MAIN_DEVICE.value] || []
  // 根据单主机、多主机进行筛选数据
  const device = deviceInfo.value.type === HOST_TYPE.SINGLE ? data[0] : data
  return device || {}
})

/**
 * @function electricsDeviceInfo
 * @description 获取电机信息数据
 * @returns {array} 主机信息数据
 **/
const electricsDeviceInfo = computed(() => {
  return deviceInfo.value[DEVICE_TYPES.ELECTRICS_DEVICE.value] || []
})

/**
 * @function cabDeviceInfo
 * @description 舵机信息数据
 * @returns {object} 舵机信息数据
 **/
const cabDeviceInfo = computed(() => {
  console.log('舵机信息数据', deviceInfo.value[DEVICE_TYPES.SERVO_DEVICE.value])
  return deviceInfo.value[DEVICE_TYPES.SERVO_DEVICE.value] || []
})

/**
 * @function setDefaultShip
 * @description 设置当前船舶
 **/
const setDefaultShip = () => {
  const boatInfo = boatInfoInject.getBoatInfo()
  boat.value = boatInfo.mmsi ? `${boatInfo.mmsi}` : null
}

const currentDeviceUpdateTime = computed(() => {
  const data = deviceInfo.value[deviceType.value]

  if (DEVICE_TYPES.MAIN_DEVICE.value === deviceType.value) {
    // 主机
    const [{ dataTime }] = data
    console.log('主机更新时间:', dataTime)
    return dataTime
  } else if (DEVICE_TYPES.ELECTRICS_DEVICE.value === deviceType.value) {
    // 电机
    const { dataTime } = data[electricsTypeIndex.value]
    console.log('电机更新时间:', dataTime)
    return dataTime
  } else if (DEVICE_TYPES.SERVO_DEVICE.value === deviceType.value) {
    console.log('舵机更新时间:', data.dataTime)
    // 舵机
    return data.dataTime
  }

  console.log('全局更新时间缺省:', deviceInfo.value.updateTime)
  return deviceInfo.value.updateTime
})

onMounted(() => {
  setDefaultShip()
  getShipListData()
})

onUnmounted(() => {
  destroyed = true
})
</script>

<style lang="scss" scoped>
.device-info-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .top-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: vh(48);
    margin-top: vh(28);

    .top-title {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: vh(44);
      margin: 0 vw(11);
      text-align: center;
      color: rgba(221, 240, 246, 1);
      background-image: url('@/assets/images/device_top_component_title.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;

      .net-state-box {
        position: absolute;
        left: vw(24);
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;

        .net-state-icon {
          margin-right: vw(2);
        }

        .net-state-desc {
          font-weight: 500;
          font-size: vh(16);
          color: #29c14b;
          line-height: vh(22);
        }
      }

      .top-title_title {
        font-family: YouSheBiaoTiHei;
        font-size: vh(24);
        letter-spacing: vw(2);
      }

      .update-time {
        position: absolute;
        left: vw(138);
        top: 50%;
        transform: translateY(-50%);
        font-size: vh(16);
        color: rgba(221, 240, 246, 1);
      }
    }

    .back-btn {
      .back-icon {
        width: vw(20);
        height: vw(20);
        margin-right: vw(8);
      }
    }
  }

  .bottom-box {
    display: flex;
    width: 100%;
    margin-top: vh(16);

    .device-info-left {
      position: relative;
      width: vw(1392);

      .empty-device {
        height: vh(700);
      }

      .main-host-device {
        width: 100%;
        height: vh(797);
        margin-top: vh(10);
      }

      .dynamo-device {
        width: 100%;
        height: vh(797);
        margin-top: vh(10);
      }

      .servo-device {
        width: 100%;
        height: vh(797);
        margin-top: vh(10);

        .servo-device-box {
          display: flex;
          align-items: center;

          .servo-switcher-item {
            flex: 1;
            margin-right: vw(16);
          }

          .servo-device-item {
            flex: 1;
          }
        }
      }

      .device-info-left_title {
        position: relative;
        font-size: vh(24);
        color: #ffffff;
        margin-top: vh(4);
        height: vh(67);
        line-height: vh(67);
        letter-spacing: vw(4);
        text-align: center;

        .device-info-left_title-time {
          position: absolute;
          top: 50%;
          right: vw(30);
          transform: translateY(-50%);
          font-size: vh(14);
          letter-spacing: vw(1);
          color: #66ffff;
        }
      }

      .device-info-tab {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;

        .device-info-tab_item {
          margin-right: vw(102);
          font-weight: 500;
          font-size: vh(20);
          color: rgba(221, 240, 246, 0.4);
          cursor: pointer;

          &.active {
            color: rgba(221, 240, 246, 1);
          }
        }
      }

      .double-device-box {
        display: flex;

        .double-device-box_item {
          &:first-child {
            margin-right: vw(12);
          }
        }
      }
    }

    .device-info-right {
      width: vw(460);
      margin-left: vw(23);

      .device-info-right_top {
        overflow: hidden;
        position: relative;
        margin-bottom: vh(24);

        .params-empty {
          margin-top: vh(90);
        }

        .device-info-right_top-chart {
          width: 100%;
          height: vh(378);
          margin-top: vh(10);
          background-image: url('@/assets/images/history_data_bg.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center center;
        }
      }

      .device-info-right_bottom {
        position: relative;

        .device-info-right_bottom-content {
          position: relative;
          overflow-y: auto;
          height: vh(330);
          margin-top: vh(10);
          padding: vh(12) vw(12);
          background-image: url('@/assets/images/alarm_data_bg.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center center;

          .more-btn-box {
            cursor: pointer;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: vh(20);
            margin-bottom: vh(19);
            font-weight: 400;
            font-size: vh(16);
            color: rgba(221, 240, 246, 1);
            line-height: 22px;
            text-align: left;
            font-style: normal;
          }
        }
      }
    }
  }

  .iot-empty {
    padding-top: vh(250);
  }
}
</style>
