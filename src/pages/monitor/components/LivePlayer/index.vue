<template>
  <div class="monitor-container">
    <LivePlayer
      :videoUrl="url"
      :controls="controls"
      aspect="fullscreen"
      live
      stretch
      digital-zoom
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LivePlayer from '@liveqing/liveplayer-v3'

defineOptions({ name: 'LivePlayer' })

const props = defineProps({
  // 视频地址
  url: {
    type: String,
    default: ''
  },
  controls: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.monitor-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}
</style>
