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
        <MonitorTabs
          class="sign-device-tabs"
          v-model:active="activeDeviceIndex"
          :options="monitorList"
          label-key="name"
        />
        <div class="player-box">
          <LivePlayer
            :key="`sign_player_${activeDeviceIndex}`"
            :videoUrl="monitorList[activeDeviceIndex].url"
            controls
            autoplay
            live
            stretch
            digital-zoom
            aspect="fullscreen"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LivePlayer from '@liveqing/liveplayer-v3'
import monitorIcon9 from '@/pages/monitor/assets/images/monitor_9_icon.png'
import monitorIcon9Active from '@/pages/monitor/assets/images/monitor_9_icon_active.png'
// import monitorIcon4 from '@/pages/monitor/assets/images/monitor_4_icon.png'
// import monitorIcon4Active from '@/pages/monitor/assets/images/monitor_4_icon_active.png'
import monitorIcon1 from '@/pages/monitor/assets/images/monitor_1_icon.png'
import monitorIcon1Active from '@/pages/monitor/assets/images/monitor_1_icon_active.png'
import { getArrayMapFromMap } from '@/pages/monitor/utils/utils'
import MonitorTabs from '@/pages/monitor/components/monitorTabs'

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
const activeType = ref(CHANGE_OPTIONS_MAP.NINE.value)
const changeActiveType = (value) => {
  activeType.value = value
}

// 合流
const mergeMonitor = ({
  name: '合屏',
  url: 'http://192.168.2.100/lives/m10.live.flv'
})

// 独立流
const activeDeviceIndex = ref(0)
const monitorList = ref([
  {
    name: 'HDMI-0',
    url: 'http://192.168.2.100/lives/m0.live.flv'
  },
  {
    name: 'HDMI-1',
    url: 'http://192.168.2.100/lives/m5.live.flv'
  },
  {
    name: 'HDMI-2',
    url: 'http://192.168.2.100/lives/m2.live.flv'
  },
  {
    name: 'HDMI-3',
    url: 'http://192.168.2.100/lives/m5.live.flv'
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
    url: 'http://192.168.2.100/lives/m5.live.flv'
  },
  {
    name: 'HDMI-7',
    url: 'http://192.168.2.100/lives/m5.live.flv'
  },
  {
    name: 'HDMI-8',
    url: 'http://192.168.2.100/lives/m5.live.flv'
  },
  {
    name: 'HDMI-9',
    url: 'http://192.168.2.100/lives/m5.live.flv'
  }
])
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

    .sign-device-tabs {
      z-index: 9;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    .player-box {
      position: absolute;
      top: 68px;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>