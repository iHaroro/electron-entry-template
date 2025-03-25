<template>
  <div class="monitor-container">
    <LivePlayer ref="livePlayer" :videoUrl="url" :controls="controls" live stretch aspect="fullscreen" digital-zoom />
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

const livePlayer = ref(null)
</script>

<style lang="scss" scoped>
.monitor-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
