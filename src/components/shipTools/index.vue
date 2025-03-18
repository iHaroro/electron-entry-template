<template>
  <div v-if="show" class="ship-detail-box">
    <a-space size="large">
      <a-button class="tool-btn" size="large" type="primary" shape="round" @click="toAiCopilot">
        智能驾驶
      </a-button>
      <a-button class="tool-btn" size="large" type="primary" shape="round" @click="toShipDevice">
        智能机舱
      </a-button>
      <a-button class="tool-btn" size="large" type="primary" shape="round" @click="toShipMonitor">
        智能监控
      </a-button>
    </a-space>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePageControlStore } from '@/stores/pageControl.js'
import { storeToRefs } from 'pinia'
defineOptions({ name: 'ShipTools' })

const show = ref(false)
const shipInfo = ref({})
const pageControlStore = usePageControlStore()
const { goPage } = pageControlStore
const { pageRouters } = storeToRefs(pageControlStore)

/**
 * @function open
 * @description 打开船舶详情
 * @param {object} data 船舶参数
 **/
const open = (data) => {
  shipInfo.value = data
  show.value = true
}

/**
 * @function close
 * @description 关闭船舶详情
 **/
const close = () => {
  shipInfo.value = {}
  show.value = false
}

/**
 * @function toShipDevice
 * @description 进入设备页面
 **/
const toShipDevice = () => {
  goPage(pageRouters.value.deviceInfo.name)
}

/**
 * @function toShipMonitor
 * @description 进入监控页面
 **/
const toShipMonitor = () => {
  goPage(pageRouters.value.monitoringInfo.name)
}

/**
 * @function toAiCopilot
 * @description 进入智能驾驶页面
 **/
const toAiCopilot = () => {
  goPage(pageRouters.value.aiCopilot.name)
}

defineExpose({
  open,
  close,
})
</script>

<style scoped lang="scss">
.ship-detail-box {
  position: absolute;
  //top: 373px;
  top: 422px;
  left: 10px;
  width: 440px;
  padding: 20px 10px;
  text-align: center;
  background: #fff;
  pointer-events: auto;
  border-top: 1px dashed #5b77ff;

  .tool-btn {
    font-size: 18px;
    height: 50px;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
