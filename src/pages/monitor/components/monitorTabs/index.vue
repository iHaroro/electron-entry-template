<template>
  <div class="device-tab-box">
    <div class="device-tab-list">
      <div class="scroll-icon left" @click="scrollBtnHandler('left')"></div>
      <div class="device-box" ref="deviceListRef">
        <div
          v-for="(item, index) in options"
          :key="`${componentKey}_${index}`"
          class="device-tab-item"
          :class="{ active: active === index }"
          @click.stop="handleTabChange(index)"
        >
          {{ item[labelKey] }}
        </div>
      </div>
      <div class="scroll-icon right" @click="scrollBtnHandler('right')"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'MonitorTabs' })

const componentKey = Date.now()

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  labelKey: {
    type: String,
    default: 'label'
  }
})

const active = defineModel('active', { type: Number, default: 0 })
const emit = defineEmits(['change'])

const handleTabChange = (index) => {
  emit('update:active', index)
  emit('change', { index, data: props.options[index] })
}

/**
 * @function scrollBtnHandler
 * @description 滚动按钮处理
 * @param {string} type 滚动类型
 **/
let left = 0
const deviceListRef = ref(null)
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
      behavior: 'smooth'
    })
    console.log(left)
  }
}
</script>

<style scoped lang="scss">
.device-tab-box {
  z-index: 9;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  width: 100%;
  height: 68px;
  background: linear-gradient(90deg, #002158 0%, rgba(0, 33, 88, 0) 100%);
  //border: 1px solid;
  //border-image: linear-gradient(
  //    9deg,
  //    rgba(0, 252, 238, 0.69),
  //    rgba(0, 252, 238, 0.51),
  //    rgba(3, 18, 44, 0)
  //) 1 1;

  .device-tab-list {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 68px;
    background-image: url('@/pages/monitor/assets/images/monitor_device_tab_bg.png');
    background-size: calc(100% - 21px) 16px;
    background-repeat: no-repeat;
    background-position: left 19px bottom 20px;

    .scroll-icon {
      cursor: pointer;
      width: 17px;
      height: 12px;
      margin-top: 23px;
      margin-left: 24px;
      background-image: url('@/pages/monitor/assets/images/scroll_more_icon.png');
      background-size: 100% 100%;

      &.left {
        transform: rotate(180deg);
      }
    }

    .device-box {
      overflow: auto;
      width: 800px;
      height: 30px;
      margin-top: 19px;
      margin-left: 29px;
      white-space: nowrap;

      &::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
      }

      .device-tab-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 29px;
        margin-right: 24px;
        font-weight: 500;
        font-size: 16px;
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
            width: 35px;
            height: 2px;
            background-color: rgba(0, 252, 238, 1);
          }
        }
      }
    }
  }
}
</style>