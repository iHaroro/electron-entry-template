<template>
  <pageLayout v-if="show" class="single-monitor-box">
    <div class="switch-monitor">
      <div class="btn back-monitors-btn" @click.stop="close">返回</div>
      <div class="video-box" :ref="(el) => setRef(el)" :key="monitorBoxKey">
        <ezuikitPlayer
          id="SINGLE"
          :ref-instance="videoConfig.ref"
          :url="videoConfig.monitorUrl"
          :access-token="videoConfig.accessToken"
          @refreshAccessToken="handleRefreshToken"
        />
      </div>
    </div>
  </pageLayout>
</template>

<script setup>
import pageLayout from '@/components/pageLayout'
import ezuikitPlayer from '@/components/ezuikitPlayer'
import { ref, nextTick } from 'vue'
import { updateMonitorToken } from '@/api/monitor.js'
defineOptions({ name: 'SingleMonitor' })

const show = ref(false)
const videoConfig = ref({})
const monitorBoxKey = ref(Date.now())

const emit = defineEmits(['close'])

const open = (config) => {
  videoConfig.value = config
  videoConfig.value.ref = ref
  show.value = true
}

const close = async () => {
  show.value = false
  await nextTick()
  emit('close')
}

const setRef = (el) => {
  videoConfig.value.ref = el
}

const handleRefreshToken = async () => {
  const accessTokenRes = await updateMonitorToken()
  videoConfig.value.accessToken = accessTokenRes.data
  monitorBoxKey.value = Date.now()
}

defineExpose({
  open,
  close,
})
</script>

<style scoped lang="scss">
.single-monitor-box {
  z-index: 999;

  .switch-monitor {
    position: relative;
    width: vw(1880);
    height: vh(923);
    background-image: url('@/assets/images/monitor_single_bg.png');
    background-repeat: no-repeat;
    background-size: vw(1880) vh(923);
    background-position: top;

    .back-monitors-btn {
      position: absolute;
      top: vh(-34);
      right: vw(0);
    }

    .video-box {
      position: absolute;
      top: vh(90);
      left: 50%;
      transform: translateX(-50%);
      width: vw(1810);
      height: vh(800);
    }
  }
}
</style>
