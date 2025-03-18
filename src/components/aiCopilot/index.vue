<template>
  <page-layout>
    <div class="ai-copilot-box">
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
        <div class="top-title">智能驾驶舱</div>
        <div class="new-select-btn back-btn" @click.stop="goBack">
          <img class="back-icon" src="@/assets/images/back_btn_icon.png" alt="" />
          <span>返回</span>
        </div>
      </div>

      <div class="info-box">
        <div class="left-box">
          <div class="left-box_top">
            <titleComponent text="航次计划" />
            <div class="left-box_top-list-box">
              <div class="left-box-top_state">
                <div class="left-box_top-list-box-from-box">
                  <p>{{ destInfo.legStartPortNameCn }}</p>
                  <p>[{{ destInfo.legStartPortCtryCode }}]</p>
                </div>
                <div class="left-box_top-list-box-state-box">
                  <div class="state-name-cn">{{ boatInfo.statusNameCn }}</div>
                  <img class="to-from-icon" src="@/assets/images/to_from_icon.png" alt="" />
                  <div class="state-end-time">ETA：{{ boatInfo.eta }}</div>
                  <!--<div class="state-end-time">ETA：{{ destInfo.legEndTime }}</div>-->
                </div>
                <div class="left-box_top-list-box-to-box">
                  <p>{{ destInfo.legEndPortNameCn }}</p>
                  <p>[{{ destInfo.legEndPortCtryCode }}]</p>
                </div>
              </div>
            </div>
          </div>
          <div class="left-box_center">
            <titleComponent text="风速风向" />
            <div class="left-box_center-list-box">
              <!--视风-->
              <!--优先展示视风，视风、真风都无数据则展示视风-->
              <template v-if="sfs.value || (!sfs.value && !zfs.value)">
                <div class="compass-box">
                  <div class="compass-box_left">
                    <dashboardCompass :model-value="sfx.value" />
                  </div>
                  <div class="compass-box_right">
                    <p class="compass-box_right-cell-item">视风</p>
                    <p class="compass-box_right-cell-item info-item">
                      <span class="compass-box_right-desc">风速：</span>
                      <span class="compass-box_right-value">{{ sfs.value }}</span>
                      <span class="compass-box_right-unit">{{ sfs.unit }}</span>
                    </p>
                    <p class="compass-box_right-cell-item info-item">
                      <span class="compass-box_right-desc">风向：</span>
                      <span class="compass-box_right-value yellow">
                        {{ sfx.value }}{{ zfx.unit }}
                      </span>
                    </p>
                  </div>
                </div>
              </template>
              <!--真风-->
              <template v-else-if="zfs.value">
                <div class="compass-box">
                  <div class="compass-box_left">
                    <dashboardCompass :model-value="zfx.value" />
                  </div>
                  <div class="compass-box_right">
                    <p class="compass-box_right-cell-item">真风</p>
                    <p class="compass-box_right-cell-item info-item">
                      <span class="compass-box_right-desc">风速：</span>
                      <span class="compass-box_right-value">{{ zfs.value }}</span>
                      <span class="compass-box_right-unit">{{ zfs.unit }}</span>
                    </p>
                    <p class="compass-box_right-cell-item info-item">
                      <span class="compass-box_right-desc">风向：</span>
                      <span class="compass-box_right-value yellow">
                        {{ zfx.value }}{{ zfx.unit }}
                      </span>
                    </p>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="left-box_bottom">
            <titleComponent text="船艏向" />
            <div class="boat-facing-box">
              <div class="boat-facing-chart-box">
                <dashboardCompassEmpty :model-value="csx" />
              </div>
              <div class="boat-facing-info">
                <p class="boat-facing-info_desc">船艏向</p>
                <p class="boat-facing-info_value">{{ csx }}°</p>
              </div>
            </div>
          </div>
        </div>
        <div class="center-box">
          <div class="center-box_top">
            <titleComponent size="large">
              <div
                v-for="item in typesData"
                :key="`select_item_${item.value}`"
                class="center-box_top-title-item"
                :class="{ active: item.value === currentTypeActive }"
                @click="changeType(item.value)"
              >
                {{ item.name }}
              </div>
            </titleComponent>

            <template v-if="TYPES.OCEAN_MAP.value === currentTypeActive">
              <div
                v-if="typesData.OCEAN_MAP.show"
                class="stream-box"
                :key="OCEAN_MAP_KEY"
                :ref="(el) => setOceanRef(el)"
              >
                <!--<videoPlayer :source="oceanSource" :key="`player_${TYPES.OCEAN_MAP.value}`" />-->
                <ezuikitPlayerCopilot
                  id="OCEAN_PLAYER"
                  v-if="oceanVideoConfig.monitorUrl"
                  :key="`player_${TYPES.OCEAN_MAP.value}`"
                  :ref-instance="oceanVideoConfig.ref"
                  :url="oceanVideoConfig.monitorUrl"
                  :access-token="oceanVideoConfig.accessToken"
                  @refreshAccessToken="handleRefreshToken"
                />
              </div>
              <div class="no-signal-box" v-else>
                <img class="no-signal-bg" src="@/assets/images/no_signal_bg.png" alt="" />
              </div>
            </template>

            <template v-if="TYPES.RADAR.value === currentTypeActive">
              <div
                v-if="typesData.RADAR.show"
                class="stream-box"
                :key="RADAR_KEY"
                :ref="(el) => setRadarRef(el)"
              >
                <!--<videoPlayer :source="radarSource" :key="`player_${TYPES.RADAR.value}`" />-->
                <ezuikitPlayerCopilot
                  id="RADAR_PLAYER"
                  v-if="radarVideoConfig.monitorUrl"
                  :key="`player_${TYPES.RADAR.value}`"
                  :ref-instance="radarVideoConfig.ref"
                  :url="radarVideoConfig.monitorUrl"
                  :access-token="radarVideoConfig.accessToken"
                  @refreshAccessToken="handleRefreshToken"
                />
              </div>
              <div class="no-signal-box" v-else>
                <img class="no-signal-bg" src="@/assets/images/no_signal_bg.png" alt="" />
              </div>
            </template>
          </div>
        </div>
        <div class="right-box">
          <div class="right-box_top">
            <titleComponent text="航行" />
            <div class="sailing-box">
              <div class="sailing-top-box">
                <div class="sailing-top-item depth">
                  <div class="sailing-info-box">
                    <p class="sailing-info-value">
                      <span class="sailing-info-value_value">{{ draftDepth.value }}</span>
                      <span class="sailing-info-value_unit">{{ draftDepth.unit }}</span>
                    </p>
                    <p class="sailing-info-desc">测深仪</p>
                  </div>
                </div>
                <div class="sailing-top-item speed">
                  <div class="sailing-info-box">
                    <p class="sailing-info-value">
                      <span class="sailing-info-value_value">{{ speed.value }}</span>
                      <span class="sailing-info-value_unit">{{ speed.unit }}</span>
                    </p>
                    <p class="sailing-info-desc">航速</p>
                  </div>
                </div>
                <div class="sailing-top-item position">
                  <div class="sailing-info-box">
                    <!--<p class="sailing-info-value">{{ longitude.value }}{{ longitude.unit }}E</p>-->
                    <!--<p class="sailing-info-value">{{ latitude.value }}{{ latitude.unit }}N</p>-->
                    <p class="sailing-info-value">{{ decimalToDMS(longitude.value) }}E</p>
                    <p class="sailing-info-value">{{ decimalToDMS(latitude.value) }}N</p>
                    <p class="sailing-info-desc">经度/纬度</p>
                  </div>
                </div>
              </div>
              <!--单主机-->
              <template v-if="deviceInfo.type === HOST_TYPE.SINGLE">
                <div class="sailing-bottom-box">
                  <template
                    v-for="(key, index) in singleHostDashboardList"
                    :key="`host_dashboard_${key}`"
                  >
                    <div class="sailing-bottom-item" v-if="index < 2">
                      <div class="sailing-bottom-chart-box">
                        <dashboardMeter
                          :model-value="singleHostDashboardData[key]?.value"
                          :min="singleHostDashboardData[key]?.min"
                          :max="singleHostDashboardData[key]?.max"
                        />
                        <div class="sailing-bottom-param-box">
                          <div :class="`sailing-bottom-value color-${index}`">
                            <span class="sailing-bottom-value_value">
                              {{ singleHostDashboardData[key]?.value }}
                            </span>
                            <span class="sailing-bottom-value_unit">
                              {{ singleHostDashboardData[key]?.unit }}
                            </span>
                          </div>
                          <div class="sailing-bottom-desc">
                            <span class="sailing-bottom-desc_name">
                              {{ singleHostDashboardData[key]?.name }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </template>
              <!--双主机-->
              <template v-else-if="deviceInfo.type === HOST_TYPE.DOUBLE">
                <div class="sailing-bottom-box">
                  <template
                    v-for="(keys, hostIndex) in doubleHostDashboardList"
                    :key="`host_dashboard_host_${hostIndex}`"
                  >
                    <template v-for="(key, index) in keys" :key="`host_dashboard_${key}`">
                      <div class="sailing-bottom-item" v-if="index < 1">
                        <div class="sailing-bottom-chart-box">
                          <dashboardMeter
                            :model-value="doubleHostDashboardData[hostIndex][key]?.value"
                            :min="doubleHostDashboardData[hostIndex][key]?.min"
                            :max="doubleHostDashboardData[hostIndex][key]?.max"
                          />
                          <div class="sailing-bottom-param-box">
                            <div :class="`sailing-bottom-value color-${index}`">
                              <span class="sailing-bottom-value_value">
                                {{ doubleHostDashboardData[hostIndex][key]?.value }}
                              </span>
                              <span class="sailing-bottom-value_unit">
                                {{ doubleHostDashboardData[hostIndex][key]?.unit }}
                              </span>
                            </div>
                            <div class="sailing-bottom-desc">
                              <span class="sailing-bottom-desc_name">
                                {{ doubleHostDashboardData[hostIndex][key]?.name }}
                              </span>
                              <span class="sailing-bottom-desc_type">
                                /{{ hostDevices[hostIndex]?.name }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </template>
                </div>
              </template>
            </div>
          </div>
          <div class="right-box_bottom">
            <titleComponent text="舵方向" />
            <div class="servo-item-box">
              <div class="dashboard-servo-box">
                <dashboardAiServo
                  class="servo-box"
                  :model-value="dfx.value"
                  :min="dfx.min"
                  :max="dfx.max"
                  :textStyle="{ fontSize: 26 }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </page-layout>
</template>

<script setup>
import PageLayout from '@/components/pageLayout'
import TitleComponent from '@/components/titleComponent'
import dashboardCompass from '@/components/dashboardCompass'
import dashboardCompassEmpty from '@/components/dashboardCompassEmpty'
import dashboardAiServo from '@/components/dashboardAiServo'
// import dashboardNormal from '@/components/dashboardNormal'
// import videoPlayer from '@/components/videoPlayer'
import SelectBox from '@/components/selectBoxNew'
import ezuikitPlayerCopilot from '@/components/ezuikitPlayerCopilot'
import dashboardMeter from '@/components/dashboardMeter'
import { usePageControlStore } from '@/stores/pageControl.js'
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import { BOAT_INFO } from '@/provide/boat.js'
import { getDest, getDrivingCab, getShipSrs, updateShipMap } from '@/api/copilot.js'
import { getShipList, getShipDevice } from '@/api/device.js'
import { debugLog } from '@/utils/utils.js'
import { HOST_TYPE } from '@/constants/device.js'
import { updateMonitorToken } from '@/api/monitor.js'
import { decimalToDMS } from '@/utils/utils.js'

defineOptions({ name: 'AiCopilot' })

const TYPES = {
  OCEAN_MAP: {
    name: '海图',
    value: '1',
    show: false,
  },
  RADAR: {
    name: '雷达',
    value: '2',
    show: false,
  },
}

const UPDATE_TYPE = {
  MAP: 'map',
  LD: 'ld',
}

let timer = null
let refreshUpdateShipMapTimer = null
let refreshDisabled = false
const refreshTime = 1000 * 10 // 10s刷新一次数据
const boatInfoInject = inject(BOAT_INFO)
const boatInfo = computed(() => boatInfoInject.getBoatInfo())
const boats = ref([]) // 船舶列表
const boat = ref(null) // 当前的选中的船舶
const OCEAN_MAP_KEY = ref(Date.now())
const RADAR_KEY = ref(Date.now() + 1)
const typesData = ref(TYPES)
const currentTypeActive = ref(TYPES.OCEAN_MAP.value)
const zfs = ref({}) // 真风速
const zfx = ref({}) // 真风向
const sfs = ref({}) // 视风速
const sfx = ref({}) // 视风向
const longitude = ref({}) // Gps纬度
const latitude = ref({}) // Gps经度
const draftDepth = ref({}) // 水深度
const speed = ref({}) // 水深度
const dfx = ref({}) // 舵角
const hostSpeed = ref({}) // 主机转速
const csx = ref(null) // 船艏向
const deviceInfo = ref({}) // 当前船舶的设备信息
const destInfo = ref({})
const oceanSource = ref({
  url: '',
  type: 'flv',
})
const radarSource = ref({
  url: '',
  type: 'flv',
})

const oceanVideoConfig = ref({
  ref: ref(null),
  monitorUrl: '',
  accessToken: '',
})

const radarVideoConfig = ref({
  ref: ref(null),
  monitorUrl: '',
  accessToken: '',
})
const pageControlStore = usePageControlStore()
const { goBack } = pageControlStore

const setOceanRef = (el) => {
  oceanVideoConfig.value.ref = el
}

const setRadarRef = (el) => {
  radarVideoConfig.value.ref = el
}

/**
 * @function setDefaultShip
 * @description 设置当前船舶
 **/
const setDefaultShip = () => {
  const boatInfo = boatInfoInject.getBoatInfo()
  boat.value = boatInfo.mmsi ? `${boatInfo.mmsi}` : null
}

/**
 * @function changeType
 * @description 切换数据流视频类型
 * @param {string} value 当前选中的类型
 **/
const changeType = (value) => {
  currentTypeActive.value = value
  if (value === TYPES.OCEAN_MAP.value) {
    OCEAN_MAP_KEY.value = Date.now()
  } else if (value === TYPES.RADAR.value) {
    RADAR_KEY.value = Date.now() + 1
  }
}

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
 * @function handleChangeBoat
 * @description 切换船舶事件
 **/
const handleChangeBoat = () => {
  clearTimeout(timer)
  refreshCopilotData()
  getShipSrsData()
}

/**
 * @function getDrivingCabData
 * @description 获取驾驶舱数据
 **/
const getDrivingCabData = async () => {
  const drivingCabRes = await getDrivingCab({ mmsi: boat.value })
  // 字段配置
  zfs.value = drivingCabRes.data.zfs
  zfx.value = drivingCabRes.data.zfx
  sfs.value = drivingCabRes.data.sfs
  sfx.value = drivingCabRes.data.sfx
  longitude.value = drivingCabRes.data.longitude
  latitude.value = drivingCabRes.data.latitude
  draftDepth.value = drivingCabRes.data.draftDepth
  speed.value = drivingCabRes.data.speed
  dfx.value = drivingCabRes.data.dfx
  hostSpeed.value = drivingCabRes.data.hostSpeed
  csx.value = drivingCabRes.data.csx

  // zfs.value.value = 13
  // zfx.value.value = 10
  // sfs.value.value = 14
  // sfx.value.value = 10
  // longitude.value.value = 13.378137
  // latitude.value.value = 151.378173
  // draftDepth.value.value = 1
  // speed.value.value = 10
  // csx.value = 90
}

/**
 * @function singleHostDashboardList
 * @description 单主机过滤出有值的仪表盘字段
 **/
const singleHostDashboardList = computed(() => {
  if (deviceInfo.value?.type === HOST_TYPE.SINGLE) {
    return hostDevices.value[0]?.config.dashboardFields.filter((key) => {
      return hostDevices.value[0]?.data[key]?.value !== null
    })
  } else {
    return []
  }
})

const singleHostDashboardData = computed(() => {
  if (deviceInfo.value?.type === HOST_TYPE.SINGLE) {
    return hostDevices.value[0]?.data
  } else {
    return {}
  }
})

/**
 * @function doubleHostDashboardList
 * @description 双主机过滤出有值的仪表盘字段
 **/
const doubleHostDashboardList = computed(() => {
  if (deviceInfo.value?.type === HOST_TYPE.DOUBLE) {
    return hostDevices.value.map((device) => {
      return device.config.dashboardFields.filter((key) => {
        return device.data[key]?.value !== null
      })
    })
  } else {
    return []
  }
})

/**
 * @function doubleHostDashboardData
 * @description 双主机仪表盘数据
 **/
const doubleHostDashboardData = computed(() => {
  if (deviceInfo.value?.type === HOST_TYPE.DOUBLE) {
    return hostDevices.value.map((device) => {
      return device.data
    })
  } else {
    return []
  }
})

/**
 * @function hostDevices
 * @description 主机设备
 **/
const hostDevices = computed(() => {
  return deviceInfo.value?.iotHosts || []
})

/**
 * @function handleRefreshToken
 * @description 刷新token
 **/
const handleRefreshToken = async () => {
  const accessTokenRes = await updateMonitorToken()
  oceanVideoConfig.value.accessToken = accessTokenRes.data
  radarVideoConfig.value.accessToken = accessTokenRes.data
}

/**
 * @function getShipDeviceData
 * @description 获取船舶设备数据
 **/
const getShipDeviceData = async () => {
  const shipDeviceRes = await getShipDevice({ mmsi: boat.value })
  deviceInfo.value = shipDeviceRes.data
  console.log(shipDeviceRes.data)
}

/**
 * @function getShipSrsData
 * @description 获取船舶流媒体数据
 **/
const getShipSrsData = async () => {
  const shipSrsRes = await getShipSrs({ mmsi: boat.value })
  const { data = [] } = shipSrsRes
  await handleRefreshToken()
  // 先清空
  oceanVideoConfig.value.monitorUrl = ''
  radarVideoConfig.value.monitorUrl = ''
  typesData.value.OCEAN_MAP.show = false
  typesData.value.RADAR.show = false
  OCEAN_MAP_KEY.value = Date.now()
  RADAR_KEY.value = Date.now() + 1

  data.forEach((item) => {
    // 开发环境用于测试的链接
    // const isDev = import.meta.env.MODE !== 'development'
    // const testFlvUrl = 'https://mister-ben.github.io/videojs-flvjs/bbb.flv'
    // const testFlvUrl = 'https://djlm.dajvision.com/live/676990.flv'

    if (item.type === TYPES.OCEAN_MAP.value) {
      // oceanSource.value.url = isDev ? testFlvUrl : item.monitorUrl
      oceanVideoConfig.value.monitorUrl = item.monitorUrl
      typesData.value.OCEAN_MAP.show = true
      OCEAN_MAP_KEY.value = Date.now() + 2
    } else if (item.type === TYPES.RADAR.value) {
      // radarSource.value.url = isDev ? testFlvUrl : item.monitorUrl
      radarVideoConfig.value.monitorUrl = item.monitorUrl
      typesData.value.RADAR.show = true
      RADAR_KEY.value = Date.now() + 3
    }
  })

  if (typesData.value.OCEAN_MAP.show) {
    currentTypeActive.value = TYPES.OCEAN_MAP.value
  } else if (typesData.value.RADAR.show) {
    currentTypeActive.value = TYPES.RADAR.value
  }
}

const getDestData = () => {
  getDest({ mmsi: boat.value }).then((res) => {
    destInfo.value = res.data
  })
}

/**
 * @function refreshCopilotData
 * @description 刷新驾驶舱数据
 **/
const refreshCopilotData = () => {
  if (refreshDisabled) return
  debugLog('加载数据')
  getDestData()
  getDrivingCabData()
  getShipDeviceData()

  timer = setTimeout(() => {
    refreshCopilotData()
  }, refreshTime)
}

/**
 * @function refreshUpdateShipMap
 * @description 通知设备推流心跳
 **/
const refreshUpdateShipMap = () => {
  if (refreshDisabled) return
  let type = null
  switch (currentTypeActive.value) {
    case TYPES.OCEAN_MAP.value:
      type = UPDATE_TYPE.MAP
      break
    case TYPES.RADAR.value:
      type = UPDATE_TYPE.LD
      break
    default:
      break
  }
  updateShipMap({ mmsi: boat.value, type })
  refreshUpdateShipMapTimer = setTimeout(() => {
    refreshUpdateShipMap()
  }, 5000)
}

onMounted(() => {
  // refreshUpdateShipMap()
  setDefaultShip()
  getShipListData()
  refreshCopilotData()
  getShipSrsData()
})

onUnmounted(() => {
  refreshDisabled = true
})
</script>

<style lang="scss" scoped>
.ai-copilot-box {
  position: relative;
  box-sizing: border-box;
  height: vh(940);
  margin-top: vh(15);
  //background-image: url('@/assets/images/ai_copilot_bg.png');
  //background-repeat: no-repeat;
  //background-size: 100% vh(940);

  .top-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: vh(48);

    .top-title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: vh(44);
      margin: 0 vw(11);
      text-align: center;
      font-family: YouSheBiaoTiHei;
      font-size: vh(24);
      color: rgba(221, 240, 246, 1);
      letter-spacing: vw(2);
      background-image: url('@/assets/images/top_component_title.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    .back-btn {
      .back-icon {
        width: vw(20);
        height: vw(20);
        margin-right: vw(8);
      }
    }
  }

  .info-box {
    display: flex;
    justify-content: space-between;
    margin: vh(20) 0;

    .left-box {
      width: vw(456);
      height: 100%;

      .left-box_top {
        position: relative;
        //border: 2px solid rgba(25, 56, 121, 1);
        //background: linear-gradient(
        //  180deg,
        //  rgba(52, 88, 155, 0.27) 0%,
        //  rgba(48, 97, 219, 0.29) 100%
        //);

        .left-box_top-list-box {
          width: vw(353);
          height: vh(195);
          margin: vh(20) auto;
          background-image: url('@/assets/images/voyage_bg.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;

          .left-box-top_state {
            display: flex;
            justify-content: space-between;

            .left-box_top-list-box-from-box {
              margin-left: vw(7);
              margin-top: vh(80);
              font-weight: 500;
              font-size: 16px;
              color: rgba(221, 240, 246, 1);
              line-height: vh(22);
              letter-spacing: 1px;
              text-align: center;
            }

            .left-box_top-list-box-state-box {
              flex: 1;
              margin-top: vh(68);
              text-align: center;

              .state-name-cn {
                text-align: center;
                font-weight: 500;
                font-size: 16px;
                color: rgba(0, 252, 238, 1);
                line-height: 22px;
                font-style: normal;
              }

              .to-from-icon {
                width: vw(134);
              }

              .state-end-time {
                margin-top: vh(11);
                text-align: center;
                font-weight: 400;
                font-size: vh(14);
                color: #ffa217;
                line-height: vh(20);
              }
            }

            .left-box_top-list-box-to-box {
              margin-right: vw(7);
              margin-top: vh(80);
              font-weight: 500;
              font-size: 16px;
              color: rgba(221, 240, 246, 1);
              line-height: vh(22);
              letter-spacing: 1px;
              text-align: center;
            }
          }
        }
      }

      .left-box_center {
        position: relative;

        .left-box_center-list-box {
          margin-top: vh(10);

          .compass-box {
            display: flex;
            height: vh(210);
            margin-bottom: vh(15);
            background-image: url('@/assets/images/wind_direction_bg.png');
            background-size: 100% 100%;

            .compass-box_left {
              width: vh(178);
              height: vh(178);
              margin-top: vh(16);
              margin-left: vw(54);
              margin-right: vw(33);
            }

            .compass-box_right {
              box-sizing: border-box;
              flex: 1;
              padding-left: vw(20);
              padding-right: vw(20);
              font-size: vh(18);

              .compass-box_right-cell-item {
                display: flex;
                align-items: flex-end;
                margin-top: vh(60);
                font-weight: 500;
                font-size: vh(16);
                color: rgba(221, 240, 246, 1);

                &.info-item {
                  margin-top: vh(12);
                  font-weight: 400;
                  font-size: vh(14);
                  color: rgba(221, 240, 246, 0.4);
                  line-height: vh(20);
                  text-align: left;
                  font-style: normal;
                }

                .compass-box_right-desc {
                  margin-right: vw(5);
                }

                .compass-box_right-value {
                  font-family: '庞门正道标题体3.0';
                  font-size: vh(24);
                  color: rgba(0, 252, 238, 1);

                  &.yellow {
                    color: rgba(255, 162, 23, 1);
                  }
                }

                .compass-box_right-unit {
                  font-size: vh(12);
                  line-height: vh(16);
                  color: rgba(0, 252, 238, 1);

                  &.yellow {
                    color: rgba(255, 162, 23, 1);
                  }
                }
              }
            }

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      .left-box_bottom {
        margin-top: vh(30);
        //border: 2px solid rgba(25, 56, 121, 1);
        //background: linear-gradient(
        //  180deg,
        //  rgba(52, 88, 155, 0.27) 0%,
        //  rgba(48, 97, 219, 0.29) 100%
        //);

        .boat-facing-box {
          box-sizing: border-box;
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          height: vh(210);
          margin-top: vh(10);
          padding: 0 vw(21) 0 vw(53);
          background-image: url('@/assets/images/wind_direction_bg_1.png');
          background-size: 100% 100%;

          .boat-facing-chart-box {
            width: vh(180);
            height: vh(180);
          }

          .boat-facing-info {
            margin-left: vw(53);

            .boat-facing-info_desc {
              margin-bottom: vh(4);
              font-weight: 500;
              font-size: vh(16);
              color: rgba(221, 240, 246, 1);
            }

            .boat-facing-info_value {
              font-family: '庞门正道标题体3.0';
              font-size: vh(24);
              color: rgba(0, 252, 238, 1);
            }
          }
        }
      }
    }

    .center-box {
      flex: 1;
      margin: 0 vw(17);

      .center-box_top {
        height: vh(860);

        .stream-box {
          margin-top: vh(15);
          height: vh(780);
        }

        .center-box_top-title-item {
          cursor: pointer;
          margin-right: vw(25);
          opacity: 0.6;

          &:last-child {
            margin-right: 0;
          }

          &.active {
            opacity: 1;
          }
        }

        .no-signal-box {
          width: 100%;
          height: calc(100% - vh(62));
          margin-top: vh(10);

          .no-signal-bg {
            width: 100%;
            height: 100%;
          }
        }
      }

      //.center-box_bottom {
      //  height: vh(250);
      //  margin-top: vh(10);
      //  background: linear-gradient(
      //    180deg,
      //    rgba(52, 88, 155, 0.27) 0%,
      //    rgba(48, 97, 219, 0.29) 100%
      //  );
      //
      //  .host-speed-box {
      //    position: relative;
      //    display: flex;
      //    justify-content: space-around;
      //    align-items: center;
      //    margin-top: vh(15);
      //    text-align: center;
      //
      //    &.double_dashboard {
      //      &::after {
      //        content: '';
      //        position: absolute;
      //        top: 50%;
      //        left: 50%;
      //        transform: translateX(-50%) translateY(-50%);
      //        width: 1px;
      //        height: 70%;
      //        background-color: #ffffff;
      //      }
      //    }
      //
      //    .dashboard-item {
      //      position: relative;
      //      width: vh(200);
      //      height: vh(200);
      //      margin: 0 vw(20);
      //      text-align: center;
      //
      //      .dashboard-item-dashboard {
      //        width: vh(180);
      //        height: vh(180);
      //        margin: 0 auto;
      //      }
      //
      //      .dashboard-item-name {
      //        font-size: vh(18);
      //        margin-top: vh(-15);
      //      }
      //    }
      //  }
      //}
    }

    .right-box {
      width: vw(456);
      height: 100%;

      .right-box_top {
        margin-bottom: vh(24);

        .sailing-box {
          box-sizing: border-box;
          margin-top: vh(10);
          height: vh(442);
          padding-top: vh(39);
          background-image: url('@/assets/images/sailing_bg.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;

          .sailing-top-box {
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 vw(28);

            .sailing-top-item {
              position: relative;
              width: vw(126);
              height: vh(212);
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;

              &.depth {
                background-image: url('@/assets/images/sailing_item_depth.png');
              }

              &.speed {
                background-image: url('@/assets/images/sailing_item_speed.png');
              }

              &.position {
                background-image: url('@/assets/images/sailing_item_position.png');

                .sailing-info-box {
                  position: absolute;
                  left: vw(10);
                  right: vw(10);
                  bottom: vh(33);
                  text-align: center;

                  .sailing-info-value {
                    font-size: vh(14);
                    line-height: vh(16);
                  }
                }
              }

              .sailing-info-box {
                position: absolute;
                left: vw(10);
                right: vw(10);
                bottom: vh(33);
                text-align: center;

                .sailing-info-value {
                  font-size: vh(24);
                  color: rgba(0, 252, 238, 1);
                  line-height: vh(27);
                  letter-spacing: vw(1);

                  .sailing-info-value_value {
                    font-family: '庞门正道标题体3.0';
                  }

                  .sailing-info-value_unit {
                    font-size: vh(12);
                  }
                }

                .sailing-info-desc {
                  margin-top: vh(3);
                  font-weight: 400;
                  font-size: vh(14);
                  color: rgba(221, 240, 246, 1);
                  line-height: vh(20);
                }
              }
            }
          }

          .sailing-bottom-box {
            display: flex;
            justify-content: center;
            margin-top: vh(30);
            padding: 0 vw(52);

            .sailing-bottom-item {
              margin-right: vw(98);

              &:last-child {
                margin-right: 0;
              }

              .sailing-bottom-chart-box {
                position: relative;
                width: vh(127);
                height: vh(127);

                .sailing-bottom-param-box {
                  position: absolute;
                  top: vh(75);
                  width: vw(127);
                  text-align: center;

                  .sailing-bottom-value {
                    margin-bottom: vw(4);

                    .sailing-bottom-value_value {
                      font-family: '庞门正道标题体3.0';
                      font-weight: normal;
                      font-size: vh(24);
                      letter-spacing: vw(1);
                    }

                    .sailing-bottom-value_unit {
                      font-weight: 400;
                      font-size: vh(12);
                    }
                  }

                  .sailing-bottom-desc {
                    .sailing-bottom-desc_name {
                      font-weight: 500;
                      font-size: vh(14);
                      color: rgba(221, 240, 246, 1);
                    }

                    .sailing-bottom-desc_type {
                      font-weight: 400;
                      font-size: vh(12);
                      color: rgba(221, 240, 246, 0.4);
                      line-height: vh(17);
                    }
                  }

                  .color-0 {
                    color: rgba(0, 252, 238, 1);
                  }

                  .color-1 {
                    color: rgba(255, 162, 23, 1);
                  }
                }
              }
            }
          }
        }
      }

      .right-box_bottom {
        height: vh(350);
        margin-top: vh(10);
        //border: 2px solid rgba(25, 56, 121, 1);
        //background: linear-gradient(
        //  180deg,
        //  rgba(52, 88, 155, 0.27) 0%,
        //  rgba(48, 97, 219, 0.29) 100%
        //);
        text-align: center;

        .servo-item-box {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: vh(10);
          width: vw(456);
          height: vh(260);
          background-image: url('@/assets/images/servo_bg.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;

          .dashboard-servo-box {
            width: vw(232);
            height: vw(232);

            .servo-box {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
