<template>
  <div class="video-box">
    <template v-if="!isNotSupported">
      <video ref="videoRef" class="flvjs-box" preload="auto" muted autoplay />
      <div class="error-mask" v-if="errorText">
        <p class="error-text">{{ errorText }}</p>
      </div>
    </template>
    <template v-else>
      <p class="err-text">浏览器版本过低，请联系管理员</p>
    </template>
  </div>
</template>
<script setup>
import flvjs from 'flv.js'
import { ref, watch, onBeforeUnmount, nextTick } from 'vue'
import { debugLog } from '@/utils/utils.js'
defineOptions({ name: 'VideoPlayer' })

const props = defineProps({
  source: {
    type: Object,
    default: () => ({}),
  },
  options: {
    type: Object,
    default: () => ({}),
  },
})

let flvPlayer = null
const videoRef = ref(null)
const isNotSupported = ref(false)
const errorText = ref('')

const initFlvJs = () => {
  console.log(flvjs)
  if (flvjs.isSupported()) {
    flvPlayer = flvjs.createPlayer(props.source, {
      autoCleanupSourceBuffer: true,
      ...props.options,
    })
    flvPlayer.attachMediaElement(videoRef.value)
    flvPlayer.load()
    flvPlayer.play()
    initErrorHandler(true)
    initCompleteHandler(true)
    initMediaInfoHandler(true)
  } else {
    isNotSupported.value = true
  }
}

const destroyFlvJs = () => {
  if (flvPlayer) {
    initErrorHandler(false)
    initCompleteHandler(false)
    initMediaInfoHandler(false)
    flvPlayer.pause()
    flvPlayer.unload()
    flvPlayer.detachMediaElement()
    flvPlayer.destroy()
    flvPlayer = null
  }
}

const initErrorHandler = (isOn) => {
  debugLog(isOn ? '注册监听' : '移除监听', 'PLAYER ON ERROR')
  if (isOn) {
    flvPlayer.on(flvjs.Events.ERROR, function (errorType, errorDetail, res) {
      debugLog(errorType, 'PLAYER ON ERROR ERROR TYPE')
      debugLog(errorDetail, 'PLAYER ON ERROR ERROR DETAIL')
      debugLog(res, 'PLAYER ON ERROR RESPONSE')

      // NETWORK_ERROR	与网络相关的错误
      // MEDIA_ERROR	与媒体相关的错误（格式错误、解码问题等）
      // OTHER_ERROR	任何其他未指定的错误

      // NETWORK_EXCEPTION	与网络的任何其他问题相关；包含message
      // NETWORK_STATUS_CODE_INVALID  与无效的 HTTP 状态代码相关，例如 403、404 等。
      // NETWORK_TIMEOUT	与超时请求问题相关
      // NETWORK_UNRECOVERABLE_EARLY_EOF	与无法恢复的意外网络 EOF 相关
      // MEDIA_MSE_ERROR	与 MediaSource 的错误（如解码问题）相关
      // MEDIA_FORMAT_ERROR	与媒体流中的任何无效参数相关
      // MEDIA_FORMAT_UNSUPPORTED	flv.js 不支持输入的 MediaDataSource 格式
      // MEDIA_CODEC_UNSUPPORTED	媒体流包含不受支持的视频/音频编解码器

      switch (errorType) {
        case flvjs.ErrorTypes.NETWORK_ERROR:
          errorText.value = '网络错误'
          break
        case flvjs.ErrorTypes.MEDIA_ERROR:
          errorText.value = '媒体错误'
          break
        case flvjs.ErrorTypes.OTHER_ERROR:
          errorText.value = '播放错误'
          break
        default:
          errorText.value = ''
          break
      }
    })
  } else {
    flvPlayer.on(flvjs.Events.ERROR, function () {
      debugLog('监听已移除', 'PLAYER ON ERROR')
    })
  }
}

const initCompleteHandler = (isOn) => {
  debugLog(isOn ? '注册监听' : '移除监听', 'PLAYER ON LOADING_COMPLETE')
  if (isOn) {
    flvPlayer.on(flvjs.Events.LOADING_COMPLETE, function () {
      debugLog(arguments, 'PLAYER ON LOADING_COMPLETE')
    })
  } else {
    flvPlayer.on(flvjs.Events.LOADING_COMPLETE, function () {
      debugLog('监听已移除', 'PLAYER ON LOADING_COMPLETE')
    })
  }
}

const initMediaInfoHandler = (isOn) => {
  debugLog(isOn ? '注册监听' : '移除监听', 'PLAYER ON MEDIA_INFO')
  if (isOn) {
    flvPlayer.on(flvjs.Events.MEDIA_INFO, function () {
      debugLog(arguments, 'PLAYER ON MEDIA_INFO')
    })
  } else {
    flvPlayer.on(flvjs.Events.MEDIA_INFO, function () {
      debugLog('监听已移除', 'PLAYER ON MEDIA_INFO')
    })
  }
}

onBeforeUnmount(() => {
  destroyFlvJs()
})

watch(
  () => props.source,
  (val) => {
    if (val?.url) {
      initFlvJs()
    }
  },
  {
    deep: true,
    immediate: true,
  },
)

defineExpose({
  flvPlayer,
  videoRef,
})
</script>
<style scoped lang="scss">
.video-box {
  position: relative;
  width: 100%;
  height: 100%;

  .flvjs-box {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .error-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);

    .error-text {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }

  .err-text {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
