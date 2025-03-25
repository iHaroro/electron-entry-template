<template>
  <a-spin v-if="loading" :spinning="loading" class="map-box" />
  <iframe id="Map" class="hk-map-container" :src="mapUrl" frameborder="0"></iframe>
  <div class="tools-box" v-if="showTools">
    <div class="tool-item" @click.stop="toggleLayer">
      <img src="@/assets/images/tool_toggle_layers_icon.png" alt="切换图层" />

      <div class="change-layer-box" v-show="showLayerChanger">
        <div
          class="change-layer-item"
          :class="{ active: mapType === MAP_TYPE.ocean.type }"
          @click="changeMap(MAP_TYPE.ocean.type)"
        >
          <img src="@/assets/images/ocean_icon.png" alt="海图" />
          <p>海图</p>
        </div>
        <div
          class="change-layer-item"
          :class="{ active: mapType === MAP_TYPE.landsea.type }"
          @click="changeMap(MAP_TYPE.landsea.type)"
        >
          <img src="@/assets/images/landsea_icon.png" alt="海陆图" />
          <p>海陆图</p>
        </div>
        <div
          class="change-layer-item"
          :class="{ active: mapType === MAP_TYPE.normal.type }"
          @click="changeMap(MAP_TYPE.normal.type)"
        >
          <img src="@/assets/images/normal_icon.png" alt="常规地图" />
          <p>常规地图</p>
        </div>
        <div
          class="change-layer-item"
          :class="{ active: mapType === MAP_TYPE.satellite.type }"
          @click="changeMap(MAP_TYPE.satellite.type)"
        >
          <img src="@/assets/images/satellite_icon.png" alt="卫星图" />
          <p>卫星图</p>
        </div>
      </div>
    </div>
    <div class="tool-item" @click.stop="positioning">
      <img src="@/assets/images/tool_positioning_icon.png" alt="定位" />
    </div>
    <div class="tool-item" @click.stop="zoomIn">
      <img src="@/assets/images/tool_zoom_in_icon.png" alt="放大" />
    </div>
    <div class="tool-item bg">{{ currentConfig.zoom }}</div>
    <div class="tool-item" @click.stop="zoomOut">
      <img src="@/assets/images/tool_zoom_out_icon.png" alt="缩小" />
    </div>
  </div>
  <shipTools ref="shipDetailRef" />
</template>

<script setup>
import { computed, inject, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import {
  baseMapUrl,
  getAuthKey,
  PANEL_TYPE,
  MAP_TYPE,
  EMIT_EVENT_MAP,
  HANDLE_EVENT_MAP,
} from '@/utils/map.js'
import { debugLog, objectToQuery } from '@/utils/utils.js'
import { getBrowserLocation } from '@/utils/navigator.js'
import { message } from 'ant-design-vue'
import { debounce } from 'lodash'
import { BOAT_INFO } from '@/provide/boat.js'
import shipTools from '@/components/shipTools'

defineOptions({ name: 'HaikeMap' })

const emit = defineEmits(['onLoad'])
const props = defineProps({
  shipList: {
    type: Array,
    default: () => [],
  },
})

const maxZoom = 17
const defaultZoom = 5
const [centerLat, centerLng] = [31.240985, 121.464843]
const portPanelShow = ref(false) // 港口信息面板的显隐状态
const shipPanelShow = ref(false) // 船舶信息面板的显隐状态
const mapType = ref(MAP_TYPE.satellite.type)
const shipDetailRef = ref(null)
const showLayerChanger = ref(false)
const loading = ref(true)
const showTools = ref(false)
const currentConfig = ref({ zoom: defaultZoom })
let authKeyTimer = null
const initAuthKeyDate = Date.now()
const refreshAuthKeyInterval = 1000 * 60 * 50 // 50分钟刷新authKey
let shipTimer = null
const initShipDate = Date.now()
const refreshShipInterval = 1000 * 60 * 10 // 10分钟重新绘制船舶位置

const mapData = ref({
  auth_key: getAuthKey(),
  showSearch: 'true',
  hideRightToolbar: 'true',
  map: MAP_TYPE.satellite.type,
  maxZoom,
})

const boatInfoInject = inject(BOAT_INFO)

const mapUrl = computed(() => {
  return `${baseMapUrl}?${objectToQuery(mapData.value)}`
})

const changeMap = (type) => {
  mapType.value = type
  postMessage({
    type: EMIT_EVENT_MAP.CHANGE_MAP_TYPE,
    data: {
      mapType: type,
    },
  })
}

/**
 * @function initMessageListener
 * @description 初始化消息监听
 **/
const initMessageListener = () => {
  console.log('initMessageListener')
  window.addEventListener('message', onReceive, false)
}

/**
 * @function destroyMessageListener
 * @description 初始化消息监听
 **/
const destroyMessageListener = () => {
  console.log('destroyMessageListener')
  window.removeEventListener('message', onReceiveDestroy, false)
}

/**
 * @function postMessage
 * @description 向地图窗口发送消息
 * @param {object} data 待传输的数据
 **/
const postMessage = (data) => {
  console.log('postMessage Event', data)
  document.querySelector('#Map')?.contentWindow.postMessage(data, '*')
}

/**
 * @function onReceive
 * @description 接收地图窗口消息
 * @param {event} e 传入的message事件
 * @param {event} e.data message事件数据
 **/
const onReceive = (e) => {
  const { data: eventData = {} } = e
  if (!eventData.type) return
  const { type, data } = eventData
  console.warn(type, data)
  switch (type) {
    case HANDLE_EVENT_MAP.ON_MAP_READY: // 海图初始化完成
      // 加载完成进行定位中心点
      setMapCenter()
      // showPortPoints()
      showTools.value = true
      loading.value = false
      drawShipsPosition()
      emit('onLoad')
      break
    case HANDLE_EVENT_MAP.ON_MAP_ZOOM: // 海图缩放事件
      currentConfig.value.zoom = data.zoom
      break
    case HANDLE_EVENT_MAP.ON_VESSEL_SEARCH: // 海图船舶搜索事件
      changePanelState(PANEL_TYPE.VESSEL, true)
      searchShipDetail(data)
      break
    case HANDLE_EVENT_MAP.ON_CLICK_VESSEL: // 海图点击船舶事件
      changePanelState(PANEL_TYPE.VESSEL, true)
      searchShipDetail(data)
      break
    case HANDLE_EVENT_MAP.ON_PORT_SEARCH: // 海图港口搜索事件
      changePanelState(PANEL_TYPE.PORT, true)
      searchPortDetail(data)
      break
    case HANDLE_EVENT_MAP.ON_CLICK_PORT: // 海图点击港口事件
      changePanelState(PANEL_TYPE.PORT, true)
      searchPortDetail(data)
      break
    case HANDLE_EVENT_MAP.CLOSE_INFO_PANEL: // 海图关闭传播面板事件
      changePanelState(data.type, false)
      break
    default:
      break
  }
}

/**
 * @function onReceiveDestroy
 * @description 接收地图窗口消息
 * @param {event} e 传入的message事件
 **/
const onReceiveDestroy = (e) => {
  console.log('Map destroy', e)
}

/**
 * @function changePanelState
 * @description 切换面板显隐状态
 * @param {string} type 面板类型
 * @param {boolean} showState 面板显隐状态
 **/
const changePanelState = (type, showState) => {
  switch (type) {
    case PANEL_TYPE.PORT: // 港口信息面板
      portPanelShow.value = showState
      break
    case PANEL_TYPE.VESSEL: // 船舶信息面板
      shipPanelShow.value = showState
      break
    default:
      // portPanelShow.value = showState
      // shipPanelShow.value = showState
      break
  }
}

/**
 * @function setMapCenter
 * @description 设置地图中心点
 **/
const setMapCenter = (lat = centerLat, lon = centerLng) => {
  postMessage({
    type: EMIT_EVENT_MAP.MAP_CENTER,
    data: {
      zoom: defaultZoom,
      center: {
        lat,
        lon,
      },
    },
  })
}

const removeShipsPosition = () => {
  postMessage({
    type: EMIT_EVENT_MAP.REMOVE_POSITIONS,
    data: {
      mmsiList: props.shipList.map((item) => item.mmsi),
    },
  })
}

const drawShipsPosition = () => {
  console.log('开始绘制船舶数据')
  // postMessage({
  //   type: EMIT_EVENT_MAP.REMOVE_VESSELS,
  //   data: {
  //     mmsiList: props.shipList.map((item) => item.mmsi),
  //   },
  // })

  const mmsiMapList = props.shipList.map((item) => {
    console.log(item.name)
    return {
      mmsi: item.mmsi,
      color: '#f00',
      shipShape: 'basic', //船舶形状 'square', 'triangle', 'basic'
      customTooltip: `${item.name}`, //自定义tooltip字符串 维度{lat} 经度{lon}
    }
  })

  postMessage({
    type: EMIT_EVENT_MAP.DRAW_VESSELS,
    data: {
      mmsiMapList,
      showInfoPanel: false, //是否展示信息框
      isFitMap: false, // 是否调整地图视角, 会根据当前船舶数组经纬度自动 fitBounds 移动到数据的中心位置
    },
  })
}

/**
 * @function searchShipDetail
 * @description 搜索船舶详情
 * @param {object} data 待传输的数据
 **/
const searchShipDetail = (data) => {
  postMessage({
    type: EMIT_EVENT_MAP.VESSEL_SEARCH,
    data: {
      mmsi: data.vesselInfo.mmsi,
      showTrack: true, //展示轨迹
      showInfoPanel: true, //展示信息面板
    },
  })

  // 插入当前船舶数据数据到 Provide
  boatInfoInject.setBoatInfo({ ...data.vesselInfo })

  // 打开智能驾驶按钮
  openShipIntelligentButton()
}

/**
 * @function searchShipDetail
 * @description 搜索船舶详情
 * @param {object} data 待传输的数据
 **/
const searchPortDetail = (data) => {
  postMessage({
    type: EMIT_EVENT_MAP.PORT_SEARCH,
    data: {
      portCode: data.portInfo.portCode,
      showInfoPanel: true, //展示信息面板
      canDynamic: true, //是否响应港口动态(预抵、靠泊等)点击事件：点击图标标题弹出曲线图，点击值绘制当前动态类型的船舶
    },
  })
}

// /**
//  * @function showPortPoints
//  * @description 显示港口点
//  **/
// const showPortPoints = () => {
//   postMessage({
//     type: 'SHOW_PORT_POINTS',
//     data: {},
//   })
// }
//
// /**
//  * @function showShipPoints
//  * @description 显示船舶点
//  **/
// const showShipPoints = () => {
//   postMessage({
//     type: 'SHOW_VESSEL_POINTS',
//     data: {},
//   })
// }

/**
 * @function toggleLayer
 * @description 切换图层
 **/
const toggleLayer = debounce(() => {
  showLayerChanger.value = !showLayerChanger.value
})

/**
 * @function positioning
 * @description 定位当前位置
 **/
const positioning = debounce(async () => {
  getBrowserLocation()
    .then((res) => {
      console.log('定位成功', res)
      const coords = res.coords
      setMapCenter(coords.latitude, coords.longitude)
    })
    .catch((errMsg) => {
      console.log(errMsg)
      message.error(errMsg)
    })
}, 500)

/**
 * @function zoomIn
 * @description 放大层级
 **/
const zoomIn = debounce(() => {
  if (currentConfig.value.zoom >= maxZoom) return
  postMessage({
    type: EMIT_EVENT_MAP.MAP_SETTING,
    data: {
      zoom: currentConfig.value.zoom + 1,
    },
  })
}, 500)

/**
 * @function zoomOut
 * @description 缩小层级
 **/
const zoomOut = debounce(() => {
  if (currentConfig.value.zoom <= 1) return
  postMessage({
    type: EMIT_EVENT_MAP.MAP_SETTING,
    data: {
      zoom: currentConfig.value.zoom - 1,
    },
  })
}, 500)

/**
 * @function refreshAuthKey
 * @description 刷新 authKey
 **/
const refreshAuthKey = () => {
  authKeyTimer = setTimeout(() => {
    const now = Date.now()
    if (now - initAuthKeyDate >= refreshAuthKeyInterval) {
      // 刷新 authKey
      postMessage({
        type: 'update-auth-key',
        value: getAuthKey(),
      })
      refreshAuthKey()
    }
  }, refreshAuthKeyInterval)
}

const refreshShipPosition = () => {
  shipTimer = setTimeout(() => {
    const now = Date.now()
    if (now - initShipDate >= refreshShipInterval) {
      // 刷新 authKey
      removeShipsPosition()
      drawShipsPosition()
      refreshShipPosition()
    }
  }, refreshShipInterval)
}

/**
 * @function isOwnerBoat
 * @description 判断当前船舶是否是当前人所属船舶
 * @param {object} boatInfo 传播数据
 * @returns {boolean} 是否是当前人所属船舶
 **/
const isOwnerBoat = (boatInfo) => {
  return !!props.shipList.find((item) => `${item.mmsi}` === `${boatInfo.mmsi}`)
}

/**
 * @function openShipIntelligentButton
 * @description 打开智能驾驶功能按钮
 **/
const openShipIntelligentButton = () => {
  const data = boatInfoInject.getBoatInfo()
  const isOwner = isOwnerBoat(data)
  debugLog(
    `当前船舶${data.vesselNameCn}(${data.mmsi})${isOwner ? '归属当前用户' : '不归属当前用户'}`,
  )
  if (!portPanelShow.value && shipPanelShow.value && isOwner) {
    debugLog('打开智能驾驶功能按钮')
    // 未打开港口面板信息，且是当前人所属船舶时，打开智能大屏功能按钮，否则关闭
    shipDetailRef.value?.open(data)
  } else if (portPanelShow.value || !shipPanelShow.value || !isOwner) {
    debugLog('关闭智能驾驶功能按钮')
    // 打开港口面板信息时，或者船舶面板关闭时，或者不属于当前用户的船舶时，关闭智能大屏功能按钮
    shipDetailRef.value?.close()
  }
}

onMounted(() => {
  window.sendMsg = postMessage
  initMessageListener()
  refreshAuthKey()
  refreshShipPosition()
})

onBeforeUnmount(() => {
  destroyMessageListener()
  clearTimeout(authKeyTimer)
  clearTimeout(shipTimer)
})

// 根据传入船舶数据绘制船舶
// watch(
//   () => props.shipList,
//   (value) => {
//     if (value.length > 0) {
//       drawShipsPosition()
//     } else {
//       removeShipsPosition()
//     }
//   },
// )

// 根据面板状态判断是否展示智能驾驶功能按钮
watch([portPanelShow, shipPanelShow], () => {
  openShipIntelligentButton()
})
</script>

<style lang="scss" scoped>
.map-box {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.hk-map-container {
  width: 100%;
  height: 100%;
  border: none;
}

.search-box {
  position: absolute;
  top: vh(10);
  left: vw(20);
  background: 0 0;
  width: vw(430);
  height: vh(40);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
}

.tools-box {
  position: absolute;
  right: vw(20);
  bottom: vw(40);

  .tool-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: vw(44);
    height: vw(44);
    margin-top: vh(12);
    border-radius: 50%;
    font-size: vh(18);
    font-weight: bold;
    color: #777777;
    cursor: pointer;

    &.bg {
      background-image: url('@/assets/images/tool_bg_icon.png');
      background-repeat: no-repeat;
      background-position: top center;
    }

    img {
      width: 100%;
    }
  }
}

.change-layer-box {
  position: absolute;
  right: vw(60);
  top: vh(-5);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: vw(300);
  height: vw(54);

  .change-layer-item {
    overflow: hidden;
    position: relative;
    width: vw(64);
    height: vw(54);
    margin-left: vw(10);
    border: 1px solid gray;
    border-radius: vw(4);
    transition: all 0.3s;

    img {
      width: 100%;
      height: 100%;
    }

    p {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: vh(20);
      line-height: vh(20);
      font-size: vh(12);
      text-align: center;
      color: #6f7fa8;
      background: rgba(255, 255, 255, 0.8);
    }

    &.active {
      border-color: rgb(91, 119, 255);

      p {
        color: #fff;
        background: rgb(91, 119, 255);
      }
    }

    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>
