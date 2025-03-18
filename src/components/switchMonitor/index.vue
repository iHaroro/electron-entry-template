<template>
  <div class="switch-monitor">
    <div class="video-box" :ref="(el) => setRef(el)" :key="monitorBoxKey">
      <ezuikitPlayer
        id="SWITCH"
        ref="videoRef"
        :ref-instance="videoConfig.ref"
        :url="videoConfig.monitorUrl"
        :access-token="videoConfig.accessToken"
        @refreshAccessToken="handleRefreshToken"
      />
    </div>
  </div>
</template>

<script setup>
import ezuikitPlayer from '@/components/ezuikitPlayer'
import { ref, watch } from 'vue'
import { updateMonitorToken } from '@/api/monitor.js'

defineOptions({ name: 'SwitchMonitor' })

const props = defineProps({
  videoConfig: {
    type: Object,
    default: () => ({}),
  },
})

const videoRef = ref(null)
const monitorBoxKey = ref(Date.now())

const setRef = (el) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.videoConfig.ref = el
}

const handleRefreshToken = async () => {
  const accessTokenRes = await updateMonitorToken()
  // eslint-disable-next-line vue/no-mutating-props
  props.videoConfig.accessToken = accessTokenRes.data
  monitorBoxKey.value = Date.now()
}

defineExpose({
  open,
  videoRef,
})

watch(
  () => props.videoConfig.monitorUrl,
  (val) => {
    if (val) {
      monitorBoxKey.value = Date.now()
    }
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.switch-monitor {
  flex: 1;
  height: 100%;

  .video-box {
    width: 100%;
    height: 100%;
  }
}
</style>
