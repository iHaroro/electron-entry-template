<template>
  <pageLayout>
    <div class="monitoring-box">
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
          <span class="top-title_title">设备信息</span>
        </div>
        <div class="new-select-btn back-btn" @click.stop="goBack">
          <img class="back-icon" src="@/assets/images/back_btn_icon.png" alt="" />
          <span>返回</span>
        </div>
      </div>

      <!--四屏-->
      <template v-if="girdModel === GIRD_CONFIGS.FOUR.value">
        <div class="page-container-left">
          <titleComponent :styles="{ backgroundImage: `url(${monitorLargeBg})` }">
            <div class="title-info">监控信息</div>
          </titleComponent>

          <!--<div class="btn sort-btn" @click.stop="openSortDialog">排序</div>-->

          <!--<tabsBox class="tab-box" v-model:value="girdModel" :options="girdConfig" />-->

          <!--<template v-if="realRenderCameraList?.length && showVideos">-->
          <!--  <div class="monitoring-list-box" :key="`monitor-box-${monitorBoxKey}`">-->
          <!--    <monitorBorder-->
          <!--      v-for="(item, index) in realRenderCameraList"-->
          <!--      :key="item.id"-->
          <!--      class="monitoring-item"-->
          <!--    >-->
          <!--      <div class="monitor-box">-->
          <!--        <div class="video-box" :ref="(el) => setRefMap(el, item)">-->
          <!--          <ezuikitPlayer-->
          <!--            :id="index"-->
          <!--            :ref-instance="item.ref"-->
          <!--            :url="item.monitorUrl"-->
          <!--            :access-token="item.accessToken"-->
          <!--            @refreshAccessToken="handleRefreshToken"-->
          <!--          />-->
          <!--        </div>-->
          <!--        <div class="name-box" @click.stop="openMonitorDetail(item)">{{ item.name }}</div>-->
          <!--      </div>-->
          <!--    </monitorBorder>-->
          <!--  </div>-->
          <!--</template>-->
          <template v-if="cameraConfigList?.length && showVideos">
            <div class="switch-monitor-gird">
              <div class="device-tab-box">
                <div class="device-tab-list">
                  <div class="scroll-icon left" @click="scrollBtnHandler('left')"></div>
                  <div class="device-box" ref="deviceListRef">
                    <div
                      v-for="(item, index) in cameraConfigList"
                      :key="item.id"
                      class="device-tab-item"
                      :class="{ active: index === currentVideoIndex }"
                      @click.stop="changeCurrentVideo(index)"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                  <div class="scroll-icon right" @click="scrollBtnHandler('right')"></div>
                </div>
              </div>

              <!--<button-->
              <!--  class="prev-btn"-->
              <!--  :disabled="currentVideoIndex === 0"-->
              <!--  @click="changeCurrentVideo(currentVideoIndex - 1)"-->
              <!--&gt;</button>-->
              <!--<button-->
              <!--  class="next-btn"-->
              <!--  :disabled="currentVideoIndex === cameraConfigList.length - 1"-->
              <!--  @click="changeCurrentVideo(currentVideoIndex + 1)"-->
              <!--&gt;</button>-->

              <switchMonitor
                ref="switchMonitorRef"
                class="video-container"
                :key="cameraConfigList[currentVideoIndex].monitorUrl"
                :video-config="cameraConfigList[currentVideoIndex]"
              />
            </div>
          </template>
          <template v-else>
            <empty class="empty" />
          </template>
        </div>
        <div class="page-container-right">
          <div class="page-container-right_top">
            <titleComponent text="报警信息" />
            <div class="alarm-list-box">
              <div class="more-btn-box" @click="showMoreWarnList">
                <div>查看更多</div>
                <img src="@/assets/images/more_right_icon.png" alt="" />
              </div>
              <template v-if="alarmList && alarmList?.length">
                <div
                  v-for="item in alarmList"
                  :key="`monitor_alarm_${item}`"
                  class="alarm-item"
                  @click="openWarningDetail(item)"
                >
                  <img class="alarm-item-icon" :src="item.fullPicture" alt="" />
                  <div class="info-box">
                    <p class="info-name">{{ item.shipName }}</p>
                    <p class="info-desc">报警摄像头：{{ item.cameraName }}</p>
                    <p class="info-desc">报警内容：{{ item.areaName }}</p>
                    <p class="info-desc">报警时间：{{ item.alarmTime }}</p>
                  </div>
                  <div class="btn-box">
                    <div class="alarm-tag">{{ item.alarmTypeTxt }}</div>
                  </div>
                </div>
              </template>
              <template v-else>
                <empty class="empty" />
              </template>
            </div>
          </div>
          <div class="page-container-right_bottom">
            <titleComponent text="报警统计" />
            <monitorAlarmChart class="line-chart-box" :chart-data="alarmEchartList" />
          </div>
        </div>
      </template>
      <!--单屏-->
      <template v-else-if="girdModel === GIRD_CONFIGS.ONE.value">
        <template v-if="realRenderCameraList?.length && showVideos">
          <singleMonitor ref="singleMonitorRef" @close="changGirdModel(GIRD_CONFIGS.FOUR.value)" />
        </template>
        <template v-else>
          <empty class="single-empty" />
        </template>
      </template>
    </div>

    <!--排序-->
    <monitorSortDialog ref="monitorSortDialogRef" @close="handleClose" />

    <!--监控详情-->
    <monitorDetail ref="monitorDetailRef" @close="monitorDetailClose" />

    <!-- 报警详情 -->
    <Dialog ref="warnDialogRef" title="报警详情">
      <div class="warning-detail-content">
        <div class="warning-detail-item">
          <div class="waring-detail-key">船名：</div>
          <div class="warning-detail-value">{{ currentWarnDetail.shipName }}</div>
        </div>
        <div class="warning-detail-item">
          <div class="waring-detail-key">设备名称：</div>
          <div class="warning-detail-value">{{ currentWarnDetail.cameraName }}</div>
        </div>
        <div class="warning-detail-item">
          <div class="waring-detail-key">报警时间：</div>
          <div class="warning-detail-value">{{ currentWarnDetail.alarmTime }}</div>
        </div>
        <div class="warning-detail-item">
          <div class="waring-detail-key">报警内容：</div>
          <div class="warning-detail-value">{{ currentWarnDetail.alarmTypeTxt }}</div>
        </div>
        <div class="warning-detail-item">
          <div class="waring-detail-key">报警图片：</div>
          <div class="warning-detail-value no-bg">
            <a-image
              class="img"
              width="94px"
              height="94px"
              :src="currentWarnDetail.fullPicture"
              alt="报警图片"
            />
          </div>
        </div>
      </div>
    </Dialog>
  </pageLayout>

  <!--报警列表-->
  <monitorWarnTable v-if="showWarnTable" :boat="boat" @back="closeMoreWarnList" />
</template>

<script setup>
import {
  computed,
  nextTick,
  onMounted,
  onBeforeUnmount,
  ref,
  reactive,
  toRaw,
  watch,
  isRef,
  inject,
} from 'vue'
import { getShipList } from '@/api/device.js'
import { getShipMonitorAlarm, getShipMonitorAlarmEcharts, setAlarmRead } from '@/api/monitor.js'
import pageLayout from '@/components/pageLayout'
import selectBox from '@/components/selectBoxNew'
import titleComponent from '@/components/titleComponent'
import Dialog from '@/components/dialog'
import empty from '@/components/empty'
import monitorWarnTable from '@/components/monitorWarnTable'
// import monitorBorder from '@/components/monitorBorder'
import monitorAlarmChart from '@/components/monitorAlarmChart'
// import tabsBox from '@/components/tabsBox'
import singleMonitor from '@/components/singleMonitor'
import switchMonitor from '@/components/switchMonitor'
// import ezuikitPlayer from '@/components/ezuikitPlayer'
import monitorSortDialog from '@/components/monitorSortDialog'
import monitorDetail from '@/components/monitorDetail'
// import { usePageControlStore } from '@/stores/pageControl.js'
import { updateMonitorToken, getShipMonitorConfig } from '@/api/monitor.js'
import { usePageControlStore } from '@/stores/pageControl.js'
import { BOAT_INFO } from '@/provide/boat.js'
import { debounce } from 'lodash'
import { Polling } from '@/utils/polling.js'
import monitorLargeBg from '@/assets/images/monitor_title_bg.png'

const GIRD_CONFIGS = {
  FOUR: {
    name: '四屏',
    value: '1',
  },
  ONE: {
    name: '单屏',
    value: '2',
  },
}

defineOptions({ name: 'MonitoringInfo' })

// 记录用户最后一次移动的位置及时间
const unUseInterval = 5 * 60 * 1000 // 未使用时间间隔 5分钟
let isDestroy = false
let mouseMoveHandlerTimer = null
let mouseMoveTime = Date.now()
const mouseMovePoint = {
  x: 0,
  y: 0,
}

let alarmPollInstance = null

const showWarnTable = ref(false)
const warnDialogRef = ref(null) // 船舶列表
const LOCAL_CAMERA_CONFIG_KEY = 'cameraConfig'
const cameraLimit = 4 // 视频限制数量
const boats = ref([]) // 船舶列表
const boat = ref(null) // 当前的选中的船舶
const cameraConfigList = ref([]) // 摄像机配置列表
const cameraSortConfigs = reactive({})
const monitorBoxKey = ref(Date.now())
const isNeedRefresh = ref(false)
const girdModel = ref(GIRD_CONFIGS.FOUR.value)
// const girdConfig = ref([GIRD_CONFIGS.FOUR, GIRD_CONFIGS.ONE])
const singleMonitorRef = ref(null)
const switchMonitorRef = ref(null)
const monitorSortDialogRef = ref(null)
const monitorDetailRef = ref(null)
const deviceListRef = ref(null)
const showVideos = ref(true)
const currentVideoIndex = ref(0)

const alarmList = ref([])
const alarmEchartList = ref([])

const currentWarnDetail = ref({})

const boatInfoInject = inject(BOAT_INFO)

const pageControlStore = usePageControlStore()
const { goBack } = pageControlStore

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

// /**
//  * @function changGird
//  * @description 改变布局
//  * @param {string} value 布局类型值
//  **/
const changGirdModel = (value) => {
  nextTick(() => {
    girdModel.value = value
  })
}

/**
 * @function scrollBtnHandler
 * @description 滚动按钮处理
 * @param {string} type 滚动类型
 **/
let left = 0
const scrollBtnHandler = (type) => {
  const scrollWidth = deviceListRef.value.scrollWidth // 获取总宽度
  const clientWidth = deviceListRef.value.clientWidth // 获取可视区域宽度
  const scrollLeft = deviceListRef.value.scrollLeft // 当前滚动位置

  let scrollToLeft = scrollLeft // 初始化为当前滚动位置

  if (type === 'right') {
    // 向右滚动
    if (scrollLeft < scrollWidth - clientWidth) {
      left += 100 // 更新 left
      scrollToLeft = Math.min(left, scrollWidth - clientWidth) // 确保不超出最大滚动范围
    }
  } else if (type === 'left') {
    // 向左滚动
    if (scrollLeft > 0) {
      left -= 100 // 更新 left
      scrollToLeft = Math.max(left, 0) // 确保不小于 0
    }
  }

  if (deviceListRef.value) {
    deviceListRef.value.scrollTo({
      left: scrollToLeft,
      behavior: 'smooth',
    })
    console.log(left)
  }
}

/**
 * @function openMonitorDetail
 * @description 打开监控详情
 * @param {object} item 当前监控配置数据
 **/
const openMonitorDetail = (item) => {
  console.log('open detail', item)
  monitorDetailRef.value?.open(item)
  showVideos.value = false
}

/**
 * @function changeCurrentVideo
 * @description 获取当前船舶的摄像机布局配置
 * @param {number} index 当前选中的视频索引
 **/
const changeCurrentVideo = (index) => {
  currentVideoIndex.value = index
}

/**
 * @function initCameraSortConfigs
 * @description 初始化摄像机配置
 **/
const initCameraSortConfigs = () => {
  const config = JSON.parse(localStorage.getItem(LOCAL_CAMERA_CONFIG_KEY) || '{}')
  Object.keys(config).forEach((key) => {
    cameraSortConfigs[key] = config[key]
  })
}

/**
 * @function setCameraSortConfigs
 * @description 设置摄像机布局排序配置
 * @param {string} mmsi
 * @param {array} configs
 **/
const setCameraSortConfigs = (mmsi, configs) => {
  console.log('设置摄像机布局配置', mmsi, configs)
  cameraSortConfigs[mmsi] = configs
  localStorage.setItem(
    LOCAL_CAMERA_CONFIG_KEY,
    JSON.stringify(isRef(cameraSortConfigs) ? toRaw(cameraSortConfigs) : cameraSortConfigs),
  )
}

// /**
//  * @function openSortDialog
//  * @description 打开排序弹窗
//  **/
// const openSortDialog = () => {
//   monitorSortDialogRef.value.open(cameraConfigList.value, currentCameraSortConfig.value)
// }

/**
 * @function realRenderCameraList
 * @description 渲染的摄像机列表
 * @returns {array} 渲染的摄像机列表
 **/
const realRenderCameraList = computed(() => {
  if (!currentCameraSortConfig.value?.length || !cameraConfigList.value?.length) {
    return []
  }
  return currentCameraSortConfig.value.map((id) => {
    return cameraConfigList.value.find((item) => item.id === id)
  })
})

/**
 * @function getShipListData
 * @description 获取船舶列表数据
 **/
const getShipListData = async () => {
  const boatsRes = await getShipList()
  boats.value = boatsRes.data
  boat.value = boat.value || boatsRes.data[0].mmsi
}

/**
 * @function handleChangeBoat
 * @description 船舶数据改变
 **/
const handleChangeBoat = async (boat) => {
  currentVideoIndex.value = 0
  await getCameraConfigList()
}

/**
 * @function currentCameraSortConfig
 * @description 当前船舶的监控布局配置
 * @returns {object | null} 当前船舶的监控布局配置
 **/
const currentCameraSortConfig = computed(() => {
  return cameraSortConfigs[boat.value] || null
})

/**
 * @function getCameraConfigList
 * @description 获取摄像机配置列表
 **/
const getCameraConfigList = async () => {
  // 清除鼠标时间,并清空之前的定时器数据
  destroyMouseMoveHandler()

  const cameraConfigListRes = await getShipMonitorConfig({ mmsi: boat.value })
  console.log('监控摄像机配置', cameraConfigListRes)
  // const configList = JSON.parse('[{"id":13,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"5","serialNumber":"FH1501930","areaCode":"1","areaCodeTxt":"机舱","name":"主机右","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FH1501930/1.hd.live"},{"id":14,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"6","serialNumber":"FH1501930","areaCode":"1","areaCodeTxt":"机舱","name":"辅机右","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FH1501930/1.hd.live"},{"id":1,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"1","serialNumber":"FR8131769","areaCode":"1","areaCodeTxt":"机舱","name":"辅机左","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FR8131769/1.hd.live"},{"id":3,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"3","serialNumber":"FR8131769","areaCode":"1","areaCodeTxt":"机舱","name":"集控室","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FR8131769/3.hd.live"},{"id":5,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"5","serialNumber":"FR8131769","areaCode":"1","areaCodeTxt":"机舱","name":"主机左","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FR8131769/5.hd.live"},{"id":9,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"1","serialNumber":"FH1501930","areaCode":"2","areaCodeTxt":"甲板","name":"右舷向后","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FH1501930/1.hd.live"},{"id":11,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"3","serialNumber":"FH1501930","areaCode":"2","areaCodeTxt":"甲板","name":"LNG右","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FH1501930/1.hd.live"},{"id":12,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"4","serialNumber":"FH1501930","areaCode":"2","areaCodeTxt":"甲板","name":"甲板右向前","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FH1501930/1.hd.live"},{"id":2,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"2","serialNumber":"FR8131769","areaCode":"2","areaCodeTxt":"甲板","name":"LNG左","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FR8131769/2.hd.live"},{"id":4,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"4","serialNumber":"FR8131769","areaCode":"2","areaCodeTxt":"甲板","name":"左舷后视","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FR8131769/4.hd.live"},{"id":6,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"6","serialNumber":"FR8131769","areaCode":"2","areaCodeTxt":"甲板","name":"LNG主","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FR8131769/6.hd.live"},{"id":7,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"7","serialNumber":"FR8131769","areaCode":"2","areaCodeTxt":"甲板","name":"甲板左向前","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FR8131769/7.hd.live"},{"id":10,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"2","serialNumber":"FH1501930","areaCode":"3","areaCodeTxt":"驾驶室","name":"驾驶室","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FH1501930/1.hd.live"},{"id":15,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"7","serialNumber":"FH1501930","areaCode":"3","areaCodeTxt":"驾驶室","name":"球机","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FH1501930/1.hd.live"},{"id":8,"type":"1","typeTxt":"船舶","mmsi":"413884042","channelNumber":"8","serialNumber":"FR8131769","areaCode":"3","areaCodeTxt":"驾驶室","name":"球机","verificationCode":"Djys2024","accessToken":"at.4yiytpvo939y7yfn4ksrpvx53axweawg-73u0q0kmuk-073pr7v-8nxwnqbwo","expireTime":"2024-12-30 10:06:47","monitorUrl":"ezopen://open.ys7.com/FR8131769/8.hd.live"}]')
  const configList = cameraConfigListRes.data
  // 当前监控布局配置为空时，默认初始化前四条监控配置为四屏默认数据
  console.log(`当前船舶${boat.value}监控布局配置：`, currentCameraSortConfig.value)
  if (!currentCameraSortConfig.value && configList?.length) {
    const configs = configList.slice(0, cameraLimit).map((item) => item.id)
    console.log(`无当前船舶${boat.value}配置，设置船舶监控布局配置：`, configs)
    setCameraSortConfigs(boat.value, configs)
  }

  cameraConfigList.value = configList.map((item) => {
    return {
      ...item,
      ref: null,
    }
  })

  // 绑定鼠标事件,并开始监听空闲时间
  initMouseMoveHandler()
}

// /**
//  * @function goBackStack
//  * @description 返回上一页
//  **/
// const goBackStack = () => {
//   goBack()
// }

/**
 * @function handleRefreshToken
 * @description 刷新token
 **/
const handleRefreshToken = () => {
  isNeedRefresh.value = true
}

/**
 * @function setRefMap
 * @description 设置refMap
 * @param {Element} el 当前的dom
 * @param {object} itemData 当前的索引
 **/
const setRefMap = (el, itemData) => {
  const index = cameraConfigList.value.findIndex((item) => item.id === itemData.id)
  cameraConfigList.value[index].ref = el
}

/**
 * @function handleClose
 * @description 关闭排序弹窗回调
 * @param {object} data 配置数据
 **/
const handleClose = (data) => {
  setCameraSortConfigs(boat.value, data.configs)
  monitorBoxKey.value = Date.now()
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
 * @function initMouseMoveHandler
 * @description 初始化鼠标移动事件
 **/
const initMouseMoveHandler = () => {
  isDestroy = false
  // 初始化一个默认的鼠标位置
  resetMouseMoveHandler({ pageX: 0, pageY: 0 })
  document.addEventListener('mousemove', mouseMoveHandler)
}

/**
 * @function destroyMouseMoveHandler
 * @description 销毁鼠标移动事件
 **/
const destroyMouseMoveHandler = () => {
  isDestroy = true
  // 清除倒计时
  mouseMoveHandlerTimer !== null && clearTimeout(mouseMoveHandlerTimer)
  document.removeEventListener('mousemove', mouseMoveHandler)
}

/**
 * @function mouseMoveHandler
 * @description 鼠标移动事件
 **/
const mouseMoveHandler = debounce((event) => {
  const { pageX, pageY } = event
  console.log('鼠标位置：', pageX, pageY)

  resetMouseMoveHandler({ pageX, pageY })
}, 300)

/**
 * @function resetMouseMoveHandler
 * @description 重置鼠标移动事件
 * @param {number} pageX
 * @param {number} pageY
 **/
const resetMouseMoveHandler = ({ pageX, pageY }) => {
  mouseMoveHandlerTimer !== null && clearTimeout(mouseMoveHandlerTimer)
  mouseMoveTime = Date.now()
  mouseMovePoint.x = pageX
  mouseMovePoint.y = pageY
  checkMouseMoveState()
}

/**
 * @function checkMouseMoveState
 * @description 检查鼠标上次移动停留的时间
 **/
const checkMouseMoveState = () => {
  if (isDestroy) {
    return
  }
  // 每5s检测一次未操作时间
  mouseMoveHandlerTimer = setTimeout(() => {
    const now = Date.now()
    // console.log(
    //   'Timer:',
    //   mouseMoveHandlerTimer,
    //   '空闲时间:',
    //   Math.floor((now - mouseMoveTime) / 1000),
    //   '暂停时间:',
    //   unUseInterval / 1000,
    // )
    if (now - mouseMoveTime >= unUseInterval) {
      // 关闭视频
      console.log(`未使用超过${unUseInterval / 1000 / 60}分钟，暂停视频`)
      switchMonitorRef.value.videoRef.stopVideo()
    } else {
      checkMouseMoveState()
    }
  }, 1000)
}

/**
 * @function monitorDetailClose
 * @description 关闭监控详情
 **/
const monitorDetailClose = () => {
  showVideos.value = true
}

/**
 * @function getShipAlarmList
 * @description 获取船舶报警列表
 **/
const getShipAlarmList = () => {
  getShipMonitorAlarm({ mmsi: boat.value, pageSize: 3, pageNum: 1 }).then((res) => {
    alarmList.value = res.data.list
  })
}

/**
 * @function getShipAlarmEchartList
 * @description 获取船舶报警图标数据
 **/
const getShipAlarmEchartList = () => {
  getShipMonitorAlarmEcharts({ mmsi: boat.value }).then((res) => {
    alarmEchartList.value = res.data
  })
}

/**
 * @function openWarningDetail
 * @description 打开报警详情
 * @param {object} data 报警详情数据
 **/
const openWarningDetail = (data) => {
  currentWarnDetail.value = data
  console.log(data)
  setAlarmRead({ id: data.id })
  warnDialogRef.value.open()
}

onMounted(() => {
  setDefaultShip()
  initCameraSortConfigs()
  getShipListData()

  // 使用示例
  alarmPollInstance = new Polling(
    async () => {
      console.log('开始轮询')
      getShipAlarmList()
      getShipAlarmEchartList()
    },
    10 * 1000,
    {
      immediate: true,
      onStop: () => console.log('轮询已停止'),
    },
  )
})

onBeforeUnmount(() => {
  destroyMouseMoveHandler()
  alarmPollInstance.stop()
})

watch(isNeedRefresh, async () => {
  if (isNeedRefresh.value) {
    const accessTokenRes = await updateMonitorToken()
    cameraConfigList.value = cameraConfigList.value.map((item) => {
      return {
        ...item,
        accessToken: accessTokenRes.data,
      }
    })
    isNeedRefresh.value = false
    monitorBoxKey.value = Date.now()
  }
})

watch(
  [girdModel, realRenderCameraList],
  async () => {
    if (realRenderCameraList.value?.length) {
      // 打开单屏
      if (girdModel.value === GIRD_CONFIGS.ONE.value) {
        await nextTick()
        singleMonitorRef.value?.open(realRenderCameraList.value[0])
      }
    }
  },
  {
    immediate: true,
    flush: 'post',
  },
)
</script>

<style scoped lang="scss">
.monitoring-box {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .top-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: vh(48);
    margin-top: vh(15);

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

      .top-title_title {
        font-family: YouSheBiaoTiHei;
        font-size: vh(24);
        letter-spacing: vw(2);
      }

      .update-time {
        position: absolute;
        left: vw(20);
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

  .empty {
    height: 100%;
  }

  .page-container-left {
    position: relative;
    width: vw(1392);
    height: vh(797);
    margin-top: vh(13);

    .title-info {
      margin-left: vw(50);
      font-weight: 600;
      font-size: vh(20);
      color: rgba(221, 240, 246, 1);
      line-height: vh(28);
      letter-spacing: 1px;
    }

    .switch-monitor-gird {
      position: relative;
      width: vw(1392);
      height: vh(797);
      margin: vh(10) auto 0;

      .device-tab-box {
        box-sizing: border-box;
        width: 100%;
        height: vh(68);
        background: linear-gradient(90deg, #002158 0%, rgba(0, 33, 88, 0) 100%);
        border: 1px solid;
        border-image: linear-gradient(
            9deg,
            rgba(0, 252, 238, 0.69),
            rgba(0, 252, 238, 0.51),
            rgba(3, 18, 44, 0)
          )
          1 1;

        .device-tab-list {
          box-sizing: border-box;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          width: 100%;
          height: vh(68);
          background-image: url('@/assets/images/monitor_device_tab_bg.png');
          background-size: calc(100% - vw(21)) vh(16);
          background-repeat: no-repeat;
          background-position: left vw(19) bottom vh(20);

          .scroll-icon {
            cursor: pointer;
            width: vw(17);
            height: vh(12);
            margin-top: vh(23);
            margin-left: vw(24);
            background-image: url('@/assets/images/scroll_more_icon.png');
            background-size: 100% 100%;

            &.left {
              transform: rotate(180deg);
            }
          }

          .device-box {
            overflow: auto;
            width: vw(800);
            height: vh(30);
            margin-top: vh(19);
            margin-left: vw(29);
            white-space: nowrap;

            &::-webkit-scrollbar {
              width: 0 !important;
              height: 0 !important;
            }

            .device-tab-item {
              display: inline-block;
              position: relative;
              cursor: pointer;
              height: vh(29);
              margin-right: vw(24);
              font-weight: 500;
              font-size: vh(16);
              line-height: 1;
              color: rgba(0, 252, 238, 0.4);
              letter-spacing: 1px;

              &.active {
                color: rgba(0, 252, 238, 1);
                text-shadow: 0 0 0 rgba(0, 252, 238, 1);

                &::after {
                  content: '';
                  position: absolute;
                  bottom: 0;
                  left: 50%;
                  transform: translateX(-50%);
                  width: vh(35);
                  height: vw(2);
                  background-color: rgba(0, 252, 238, 1);
                }
              }
            }
          }
        }
      }

      .video-container {
        height: vh(730);
      }

      .prev-btn,
      .next-btn {
        cursor: pointer;
        z-index: 999;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: vw(50);
        height: vw(50);
        border-radius: 60%;
        background-size: 60%;
        background-position: center center;
        background-repeat: no-repeat;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .prev-btn {
        left: vw(20);
        background-image: url('@/assets/images/icon_prev_btn.png');
      }

      .next-btn {
        right: vw(20);
        background-image: url('@/assets/images/icon_next_btn.png');
      }

      .device-list {
        z-index: 9999;
        position: absolute;
        top: vh(60);
        left: vw(20);
        background-color: rgba(11, 28, 83, 0.5);
        padding: vh(10) vw(15);
        border-radius: vw(4);

        .switch-box {
          overflow-y: auto;
          height: vh(700);
        }

        .hide {
          height: 0;
          overflow: hidden;
        }

        .device-list-item {
          padding: vh(10) vw(15);
          border-radius: vw(50);
          text-align: center;
          background-color: rgba(1, 121, 182, 0.5);
          margin-bottom: vh(10);
          cursor: pointer;

          &.active {
            background: rgba(99, 242, 255, 1);
          }

          &:hover {
            opacity: 0.8;
          }
        }

        .collapse-item {
          padding: vh(5) 0;
          text-align: center;
          cursor: pointer;
        }
      }
    }

    .sort-btn {
      position: absolute;
      top: vh(33);
      right: vw(200);
    }

    .tab-box {
      position: absolute;
      top: vh(33);
      right: vw(20);
    }

    .page-container-left_title {
      margin-left: vw(35);
      height: vh(44);
      line-height: vh(44);
      font-size: vh(20);
    }

    .monitoring-list-box {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: vh(40) vw(20);
      height: vw(755);

      .monitoring-item {
        width: vw(570);
        height: vh(400);
        margin-bottom: vh(20);

        &:nth-child(odd) {
          margin-right: vw(20);
        }

        .monitor-box {
          overflow: hidden;
          background-color: rgba(7, 32, 92, 1);
          width: vw(570);
          height: vh(400);

          .video-box {
            overflow: hidden;
            width: 100%;
            height: vh(320);
          }

          .name-box {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: vh(80);
            font-weight: 500;
            font-size: vh(34);
            color: rgba(102, 255, 255, 1);
            background-color: rgb(7, 32, 92);
            cursor: pointer;
          }
        }
      }
    }
  }

  .page-container-right {
    display: flex;
    flex-direction: column;
    width: vw(456);
    margin-top: vh(13);
    margin-left: vw(24);

    .page-container-right_top {
      .alarm-list-box {
        box-sizing: border-box;
        overflow-y: auto;
        height: vh(434);
        margin-top: vh(10);
        padding: vh(16) vw(12) 0;
        background-image: url('@/assets/images/alarm_info_bg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;

        .more-btn-box {
          cursor: pointer;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: vh(20);
          margin-bottom: vh(12);
          font-weight: 400;
          font-size: vh(16);
          color: rgba(221, 240, 246, 1);
          line-height: 22px;
          text-align: left;
          font-style: normal;
        }

        .alarm-item {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          height: vh(116);
          margin-bottom: vh(12);
          background-color: rgba(54, 109, 135, 0.21);
          border-radius: vw(8);

          &:last-child {
            margin-bottom: 0;
          }

          .alarm-item-icon {
            width: vh(106);
            height: vh(92);
            margin-right: vw(16);
            margin-left: vw(12);
            border-radius: vw(8);
          }

          .info-box {
            flex: 1;
            margin-right: vw(15);

            .info-name {
              margin-bottom: vh(4);
              font-weight: 500;
              font-size: vh(16);
              line-height: vh(20);
              color: rgba(221, 240, 246, 1);
            }

            .info-desc {
              margin-bottom: vh(4);
              font-weight: 400;
              font-size: vh(14);
              line-height: vh(20);
              color: rgba(221, 240, 246, 0.4);
            }

            :last-child {
              margin-bottom: 0;
            }
          }

          .btn-box {
            position: absolute;
            top: vh(12);
            right: vw(12);
            align-self: flex-start;

            .alarm-tag {
              display: flex;
              justify-content: center;
              align-items: center;
              height: vh(24);
              line-height: vh(24);
              padding: 0 vw(6);
              font-weight: 400;
              font-size: vh(14);
              border-radius: vw(4);
              color: rgba(221, 240, 246, 1);
              background-color: rgba(255, 77, 79, 1);
            }
          }
        }
      }
    }

    .page-container-right_bottom {
      margin-top: vh(24);

      .line-chart-box {
        width: 100%;
        height: vh(275);
        margin-top: vh(10);
        background-image: url('@/assets/images/alarm_count_bg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }

  .single-empty {
    height: 100%;
    margin: vh(250) auto;
  }
}
</style>
