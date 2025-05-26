<template>
  <div class="dialog-mask" v-if="show" @click.stop="clickMaskHandler"></div>
  <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @leave="leave">
    <div class="dialog-box" v-if="show" ref="dialogRef" :style="originStyle">
      <slot name="title" v-if="$slots.title" />
      <div class="dialog-title-box" v-else>
        <titleComponent :text="title" />
        <div class="close-btn" @click.stop="close"></div>
      </div>
      <div class="dialog-content">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import titleComponent from '@/pages/index/components/titleComponent/index.vue'

defineOptions({ name: 'DialogComponent' })

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  clickMaskClose: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['opened', 'closed'])

const show = ref(false)
const dialogRef = ref(null)
const originStyle = ref({})
const lastClickInfo = ref({
  x: 0,
  y: 0,
  timestamp: 0,
})

const handleKeydown = (event) => {
  if (event.key === 'Escape' && show.value) {
    close()
  }
}

// 全局点击监听
const handleGlobalClick = (e) => {
  console.log('用户点击', e.clientX, e.clientY, Date.now())
  lastClickInfo.value = {
    x: e.clientX,
    y: e.clientY,
    timestamp: Date.now(),
  }
}

const clickMaskHandler = () => {
  props.clickMaskClose && close()
}

const calculateOrigin = () => {
  // 判断是否为用户触发（300ms内的点击视为有效）
  const isUserTriggered = Date.now() - lastClickInfo.value.timestamp < 500
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2

  return isUserTriggered
    ? {
        x: lastClickInfo.value.x - centerX,
        y: lastClickInfo.value.y - centerY,
        scale: 0,
      }
    : {
        x: 0,
        y: 0,
        scale: 0.8, // 中心弹出时初始缩放
      }
}

const beforeEnter = (el) => {
  const origin = calculateOrigin()
  console.log(
    'beforeEnter',
    origin,
    lastClickInfo.value.x,
    lastClickInfo.value.y,
    lastClickInfo.value.timestamp,
  )
  el.style.transform = `
    translate(-50%, -50%)
    translate(${origin.x}px, ${origin.y}px)
    scale(${origin.scale})
  `
  el.style.opacity = '0'
}

const enter = (el, done) => {
  void el.offsetHeight // 触发重绘
  el.style.transition = `
    transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28),
    opacity 0.3s ease-out
  `
  el.style.transform = `
    translate(-50%, -50%)
    translate(0, 0)
    scale(1)
  `
  el.style.opacity = '1'

  el.addEventListener('transitionend', done)
}

const leave = (el, done) => {
  const origin = calculateOrigin()
  console.log('leave', origin)
  el.style.transition = `
    transform 0.2s ease-in,
    opacity 0.2s ease-in
  `
  el.style.transform = `
    translate(-50%, -50%)
    translate(${origin.x}px, ${origin.y}px)
    scale(${origin.scale})
  `
  el.style.opacity = '0'

  el.addEventListener('transitionend', done)
}

const afterEnter = () => {
  dialogRef.value.style.transition = ''
}

const open = () => {
  setTimeout(() => {
    show.value = true
    emits('opened')
  }, 0)
}

const close = () => {
  show.value = false
  emits('closed')
}

onMounted(() => {
  document.addEventListener('click', handleGlobalClick) // 用户点击监听
  document.addEventListener('keydown', handleKeydown) // 监听ESC按键
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleGlobalClick) // 移除用户点击监听
  document.removeEventListener('keydown', handleKeydown) // 移除监听ESC按键
})

defineExpose({
  open,
  close,
})
</script>

<style lang="scss" scoped>
.dialog-mask {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.dialog-box {
  box-sizing: border-box;
  z-index: 99999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid;
  border-image: linear-gradient(
      135deg,
      rgba(0, 252, 238, 1),
      rgba(0, 252, 238, 0),
      rgba(0, 252, 238, 1),
      rgba(3, 18, 44, 0)
    )
    1 1;
  background: linear-gradient(180deg, #002156 0%, #00225e 34%, #000e26 100%);
  transform-origin: center center;
  opacity: 0;

  .dialog-title-box {
    position: relative;
    border-bottom: 1px solid rgba(54, 109, 135, 1);
    padding-top: vh(14);

    .close-btn {
      position: absolute;
      top: 50%;
      right: vw(16);
      transform: translateY(-50%);
      width: vw(24);
      height: vw(24);
      background: url('../../assets/images/dialog_close_icon.png') no-repeat center center;
      background-size: contain;
      cursor: pointer;
    }
  }
}
</style>
