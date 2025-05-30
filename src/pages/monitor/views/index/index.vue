<template>
  <div class="index-page-container">
    <div class="top-box">
      <div class="switch-box">
        <div class="switch-item" v-for="item in changeOptions" :key="item.key" @click="changeActiveType(item.value)" :title="item.name">
          <img class="switch-icon" :src="activeType === item.value ? item.activeIcon : item.icon" :alt="item.name" />
        </div>
      </div>
    </div>

    <div class="video-box">
      <LivePlayer :url="''" controls />
    </div>
  </div>
</template>

<script setup>
import monitorIcon9 from '@/pages/monitor/assets/images/monitor_9_icon.png'
import monitorIcon9Active from '@/pages/monitor/assets/images/monitor_9_icon_active.png'
import monitorIcon4 from '@/pages/monitor/assets/images/monitor_4_icon.png'
import monitorIcon4Active from '@/pages/monitor/assets/images/monitor_4_icon_active.png'
import monitorIcon1 from '@/pages/monitor/assets/images/monitor_1_icon.png'
import monitorIcon1Active from '@/pages/monitor/assets/images/monitor_1_icon_active.png'
import { ref } from 'vue'
import { getArrayMapFromMap } from '@/pages/monitor/utils/utils'
import LivePlayer from '@/pages/monitor/components/livePlayer'

defineOptions({ name: 'IndexPage' })

const CHANGE_OPTIONS_MAP = {
  NINE: {
    value: '9',
    name: '九宫格',
    icon: monitorIcon9,
    activeIcon: monitorIcon9Active
  },
  FOUR: {
    value: '4',
    name: '四宫格',
    icon: monitorIcon4,
    activeIcon: monitorIcon4Active
  },
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
}
</style>