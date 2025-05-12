<template>
  <pageLayout>
    <div class="device-info-box">
      <!--<div class="top-box">-->
      <!--  <div class="top-title">-->
      <!--    <span class="top-title_title">设备信息</span>-->
      <!--  </div>-->
      <!--</div>-->

      <div class="bottom-box">
        <div class="device-info-left">
          <template v-if="deviceInfo?.config?.length">
            <titleComponent size="full">
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
      </div>
    </div>
  </pageLayout>

</template>
<script setup>
import { DEVICE_TYPES, HOST_TYPE } from '@/pages/index/constants/device.js'
import pageLayout from '@/pages/index/components/pageLayout/index.vue'
import empty from '@/pages/index/components/empty/index.vue'
import doubleDeviceItem from '@/pages/index/components/doubleDeviceItem/index.vue'
import singleDeviceItem from '@/pages/index/components/singleDeviceItem/index.vue'
import dynamoDeviceItem from '@/pages/index/components/dynamoDeviceItem/index.vue'
import servoDeviceItem from '@/pages/index/components/servoDeviceItem/index.vue'
import servoSwitcherItem from '@/pages/index/components/servoSwitcherItem/index.vue'
import titleComponent from '@/pages/index/components/titleComponent/index.vue'
import { getShipDevice } from '@/pages/index/api/device.js'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { isEmpty } from '@/pages/index/utils/utils.js'

defineOptions({ name: 'DeviceInfo' })

let timer = null
let destroyed = false
const deviceTypes = ref({}) // 设备类型
const deviceType = ref(null) // 选中的设备类型
const deviceInfo = ref({}) // 当前船舶的设备信息
const refreshTime = 2 * 1000

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
 * @function changeDeviceType
 * @description 切换设备类型
 * @param {number} value 设备类型
 **/
const changeDeviceType = (value) => {
  deviceType.value = value
}

/**
 * @function refreshData
 * @description 获取船舶列表数据
 **/
const refreshData = () => {
  timer = setTimeout(() => {
    if (destroyed) return
    getDeviceData({ reset: false })
  }, refreshTime)
}

/**
 * @function getDeviceData
 * @description 获取设备数据
 * @param {object} options 配置项
 * @param {boolean} options.reset 是否重置数据
 **/
const getDeviceData = async ({ reset = false }) => {
  // 获取设备数据
  // const shipDeviceRes = await getShipDevice({ mmsi: '413884042' })
  // const shipDeviceRes = await getShipDevice({ mmsi: '413569570' })
  const shipDeviceRes = await getShipDevice()
  console.log('机舱数据', shipDeviceRes)
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

  // 仅初始化时默认展示设备类型为主机
  if (reset) {
    deviceType.value = deviceInfo.value.config[0]
  }

  refreshData()
}

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
  return deviceInfo.value[DEVICE_TYPES.SERVO_DEVICE.value] || []
})

onMounted(() => {
  getDeviceData({ reset: true })
})

onUnmounted(() => {
  destroyed = true
  clearTimeout(timer)
})
</script>

<style lang="scss" scoped>
.device-info-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .bottom-box {
    display: flex;
    width: 100%;
    margin-top: vh(20);

    .device-info-left {
      position: relative;
      width: vw(1872);

      .empty-device {
        height: vh(750);
      }

      .main-host-device {
        width: 100%;
        height: vh(850);
        margin-top: vh(16);
      }

      .dynamo-device {
        width: 100%;
        height: vh(850);
        margin-top: vh(16);
      }

      .servo-device {
        width: 100%;
        height: vh(850);
        margin-top: vh(16);

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
            margin-right: vw(24);
          }
        }
      }
    }
  }

  .iot-empty {
    padding-top: vh(300);
  }
}
</style>
