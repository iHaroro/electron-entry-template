<template>
  <div class="index-page-container">
    <div class="top-box">
      <div class="switch-box">
        <div class="switch-item" v-for="item in changeOptions" :key="item.key" @click="changeActiveType(item.value)" :title="item.name">
          <img class="switch-icon" :src="activeType === item.value ? item.activeIcon : item.icon" :alt="item.name" />
        </div>
      </div>
    </div>

    <!--九宫格（合流）-->
    <template v-if="activeType === CHANGE_OPTIONS_MAP.NINE.value">
      <div class="video-box">
        <LivePlayer
          :videoUrl="mergeMonitor.url"
          controls
          autoplay
          live
          stretch
          digital-zoom
          aspect="fullscreen"
        />
      </div>
    </template>
    <!--单格（独立流）-->
    <template v-if="activeType === CHANGE_OPTIONS_MAP.ONE.value">
      <div class="sign-video-box">
        <div class="device-tab-box">
          <div class="device-tab-list">
            <div class="scroll-icon left" @click="scrollBtnHandler('left')"></div>
            <div class="device-box" ref="deviceListRef">
              <div
                v-for="(item, index) in monitorList"
                :key="`sign_${item.name}`"
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
        <LivePlayer
          :videoUrl="monitorList[currentVideoIndex].url"
          controls
          autoplay
          live
          stretch
          digital-zoom
          aspect="fullscreen"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import monitorIcon9 from '@/pages/monitor/assets/images/monitor_9_icon.png'
import monitorIcon9Active from '@/pages/monitor/assets/images/monitor_9_icon_active.png'
// import monitorIcon4 from '@/pages/monitor/assets/images/monitor_4_icon.png'
// import monitorIcon4Active from '@/pages/monitor/assets/images/monitor_4_icon_active.png'
import monitorIcon1 from '@/pages/monitor/assets/images/monitor_1_icon.png'
import monitorIcon1Active from '@/pages/monitor/assets/images/monitor_1_icon_active.png'
import { ref } from 'vue'
import { getArrayMapFromMap } from '@/pages/monitor/utils/utils'
import LivePlayer from '@liveqing/liveplayer-v3'

defineOptions({ name: 'IndexPage' })

const CHANGE_OPTIONS_MAP = {
  NINE: {
    value: '9',
    name: '九宫格',
    icon: monitorIcon9,
    activeIcon: monitorIcon9Active
  },
  // FOUR: {
  //   value: '4',
  //   name: '四宫格',
  //   icon: monitorIcon4,
  //   activeIcon: monitorIcon4Active
  // },
  ONE: {
    value: '1',
    name: '单视频',
    icon: monitorIcon1,
    activeIcon: monitorIcon1Active
  }
}

const changeOptions = ref(getArrayMapFromMap(CHANGE_OPTIONS_MAP))
const activeType = ref(CHANGE_OPTIONS_MAP.ONE.value)
const changeActiveType = (value) => {
  activeType.value = value
}

// 合流
const mergeMonitor = ({
  name: '合屏',
  url: 'http://192.168.2.100/lives/m10.live.flv'
})

// 独立流
const currentVideoIndex = ref(0)
const monitorList = ref([
  {
    name: 'HDMI-0',
    url: 'http://192.168.2.100/lives/m0.live.flv'
  },
  {
    name: 'HDMI-1',
    url: 'http://192.168.2.100/lives/m0.live.flv'
  },
  {
    name: 'HDMI-2',
    url: 'http://192.168.2.100/lives/m2.live.flv'
  },
  {
    name: 'HDMI-3',
    url: 'http://192.168.2.100/lives/m0.live.flv'
  },
  {
    name: 'HDMI-4',
    url: 'http://192.168.2.100/lives/m4.live.flv'
  },
  {
    name: 'HDMI-5',
    url: 'http://192.168.2.100/lives/m5.live.flv'
  },
  {
    name: 'HDMI-6',
    url: 'http://192.168.2.100/lives/m0.live.flv'
  },
  {
    name: 'HDMI-7',
    url: 'http://192.168.2.100/lives/m0.live.flv'
  },
  {
    name: 'HDMI-8',
    url: 'http://192.168.2.100/lives/m0.live.flv'
  },
  {
    name: 'HDMI-9',
    url: 'http://192.168.2.100/lives/m9.live.flv'
  },
  {
    name: 'HDMI-10',
    url: 'http://192.168.2.100/lives/m10.live.flv'
  }
])

/**
 * @function changeCurrentVideo
 * @description 获取当前船舶的摄像机布局配置
 * @param {number} index 当前选中的视频索引
 **/
const changeCurrentVideo = (index) => {
  currentVideoIndex.value = index
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
.index-page-container {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 66px);
  padding: 12px 24px;

  .top-box {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 12px;

    .switch-box {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: 46px;
      margin-right: 16px;
      background: #041A47;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);

      .switch-item {
        margin-right: 16px;

        &:last-child {
          margin-right: 0;
        }

        .switch-icon {
          cursor: pointer;
          width: 24px;
        }
      }
    }
  }

  .video-box {
    position: absolute;
    top: 68px;
    left: 24px;
    right: 24px;
    bottom: 12px;

    .video-player {
      width: 100%;
      height: 100%;
    }
  }

  .sign-video-box {
    position: absolute;
    top: 68px;
    left: 24px;
    right: 24px;
    bottom: 12px;

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
  }
}
</style>