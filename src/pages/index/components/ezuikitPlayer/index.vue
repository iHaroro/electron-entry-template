<template>
  <div :id="eleId" class="ez-ui-player"></div>
</template>

<script setup>
import EZUIKit from 'ezuikit-js'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { noop } from '@/pages/index/utils/utils.js'

defineOptions({ name: 'EzuiKitPlayer' })

const VIDEO_QUALITY_LEVEL = {
  VIDEO_LEVEL_SATNDARD: 'VIDEO_LEVEL_SATNDARD', // 标清
  VIDEO_LEVEL_HEIGH: 'VIDEO_LEVEL_HEIGH', // 高清
}

let defaultQuality = null

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  refInstance: {
    type: Object,
    default: null,
  },
  url: {
    type: String,
    default: '',
    required: true,
  },
  accessToken: {
    type: String,
    default: '',
    required: true,
  },
})
const emit = defineEmits(['refreshAccessToken'])
const eleId = `ezuikitPlayer_${props.id}`
let UIKIT_INSTANCE = null

/**
 * @function handleError
 * @description 处理异常事件
 * @param {object} data 异常数据
 **/
const handleError = (data) => {
  console.log('handleError', data)
  // token过期
  if (data.retcode === '10002') {
    // REFRESH ACCESS_TOKEN
    emit('refreshAccessToken')
  }
}

/**
 * @function handleSuccess
 * @description 初始化成功事件
 **/
const handleSuccess = () => {
  console.log('handleSuccess')
  changeVideoLevel()
}

/**
 * @function initPressEscEvent
 * @description 初始化事件
 **/
const initPressEscEvent = () => {
  window.addEventListener(
    'keydown',
    (event) => {
      const { keyCode } = event
      if (keyCode === 27) {
        UIKIT_INSTANCE.exitFullscreen()
      }
    },
    true,
  )
}

/**
 * @function removePressEscEvent
 * @description 移除事件
 **/
const removePressEscEvent = () => {
  window.removeEventListener('keydown', noop, true)
}

/**
 * @function initPlayer
 * @description 初始化播放器
 **/
const initPlayer = () => {
  UIKIT_INSTANCE = new EZUIKit.EZUIKitPlayer({
    id: eleId,
    url: props.url,
    accessToken: props.accessToken,
    width: props.refInstance.clientWidth,
    height: props.refInstance.clientHeight,
    template: 'pcLive',
    plugin: ['talk'],
    useHardDev: true, // 开启高性能模式
    audio: 0,
    autoplay: true,
    handleError,
    handleSuccess,
  })
}

/**
 * @function changeVideoLevel
 * @description 切换视频清晰度
 **/
const changeVideoLevel = () => {
  console.log('change video level', UIKIT_INSTANCE, defaultQuality)
  if (defaultQuality !== null) return
  const qualityList = UIKIT_INSTANCE?.getVideoLevelList() || []
  defaultQuality =
    qualityList.find((item) => item.name === VIDEO_QUALITY_LEVEL.VIDEO_LEVEL_SATNDARD) || 1
  // UIKitDEMO.changeVideoLevel(defaultQuality)
  console.log('change video level success')
}

const stopVideo = () => {
  console.log('stopVideo')
  UIKIT_INSTANCE.stop()
}

const playVideo = () => {
  console.log('playVideo')
  UIKIT_INSTANCE.play()
}

onMounted(() => {
  console.log('onMounted')
  // 调试不初始化播放器，有流量限制
  initPlayer()
  initPressEscEvent()
})

onBeforeUnmount(() => {
  console.log('onBeforeUnmount')
  removePressEscEvent()
  try {
    UIKIT_INSTANCE.stop()
    UIKIT_INSTANCE.destroy()
  } catch {
    console.log('销毁播放器')
  }
  console.log('已销毁萤石云组件')
})

defineExpose({
  stopVideo,
  playVideo,
})
</script>

<style lang="scss" scoped>
.ez-ui-player {
  width: 100%;
  height: 100%;
}
</style>
