<template>
  <div class="page-container-bg_header">
    <div class="page-container-bg_header_left"></div>
    <div class="page-container-bg_header_content">
      <p class="title">云视船舶——智能辅助航行系统</p>
    </div>
    <div class="page-container-bg_header_right">
      <TimeBox class="time-box-position" />
    </div>

    <div class="menu-container">
      <div class="menu-box">
        <div
          class="menu-item"
          v-for="item in leftMenus"
          :key="item.path"
          :class="{ active: activeRouteName === item.routerName }"
          @click="jumpMenu(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TimeBox from '@/pages/index/components/timeBox/index.vue'

defineOptions({
  name: 'CommonHeader'
})

const route = useRoute()
const router = useRouter()
const leftMenus = ref([
  {
    name: '智能驾驶室',
    path: '/aiCopilot',
    routerName: 'AiCopilotPage'
  },
  {
    name: '智能机舱',
    path: '/deviceInfo',
    routerName: 'DeviceInfoPage'
  },
  {
    name: '报警信息',
    path: '/alarmInfo',
    routerName: 'AlarmInfoPage'
  },
  {
    name: '视频监控',
    path: '/monitoringInfo',
    routerName: 'MonitoringInfoPage'
  }
  // {
  //   name: '数据分析',
  //   path: '/dataAnalysis',
  //   routerName: 'DataAnalysisPage',
  //   onClick: () => {
  //     window.electronAPI.getShipAppConfig().then(res => {
  //       if (res.isPackaged) {
  //         // 打包后
  //         window.electronAPI.openNewWindow(res.shipAppEntryPath, {
  //           hash: '/dataAnalysis'
  //         })
  //       } else {
  //         // 开发
  //         window.electronAPI.openNewWindow(`${res.shipAppDevPath}/#/dataAnalysis`)
  //       }
  //     })
  //   }
  // },
  // {
  //   name: '智能监控系统',
  //   onClick: () => {
  //     window.electronAPI.getShipAppConfig().then(res => {
  //       if (res.isPackaged) {
  //         // 打包后
  //         window.electronAPI.openNewWindow(res.shipMonitorAppEntryPath, {
  //           hash: '/index'
  //         })
  //       } else {
  //         // 开发
  //         window.electronAPI.openNewWindow(`${res.monitorAppDevPath}/#/index`)
  //       }
  //     })
  //   }
  // }
])

// TODO DEV 开发环境下，添加智能监控系统菜单
if (process.env.NODE_ENV === 'development') {
  leftMenus.value.push({
    name: '智能监控系统',
    onClick: () => {
      window.electronAPI.getShipAppConfig().then(async res => {
        if (res.isPackaged) {
          // 打包后
          const windowId = await window.electronAPI.openNewWindow(res.shipMonitorAppEntryPath, { hash: '/index' })
          console.log('监控系统ID', windowId)
        } else {
          // 开发
          const windowId = await window.electronAPI.openNewWindow(`${res.monitorAppDevPath}/#/index`)
          console.log('监控系统ID', windowId)
        }
      })
    }
  })
}

const activeRouteName = computed(() => route.name)

const jumpMenu = (item) => {
  if (item.onClick) {
    item.onClick()
  } else {
    router.push({
      name: item.routerName
    })
  }
}
</script>

<style lang="scss" scoped>
$headerHeight: 126;

.page-container-bg_header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  width: vw(1920);
  height: vh($headerHeight);
  background-image: url('../../assets/images/ship_top_header_bg_new.png');
  background-repeat: no-repeat;
  background-size: vw(1920) vh($headerHeight);
  background-position: 0 vh(-6);

  .page-container-bg_header_left {
    flex: 1;
  }

  .page-container-bg_header_content {
    flex: 1;
    text-shadow: vw(0) vh(3) vh(6) rgba(0, 3, 17, 0.49);
    margin-top: vh(9);
    text-align: center;
    font-size: vh(34);
    line-height: vh(44);

    .title {
      font-family: 'YouSheBiaoTiHei';
      color: rgba(221, 240, 246, 1);
    }
  }

  .page-container-bg_header_right {
    flex: 1;

    .time-box-position {
      margin-top: vh(8);
      margin-right: vw(30);
    }
  }

  .menu-container {
    position: absolute;
    top: vh(88);
    left: vw(59);
    right: vw(59);
    display: flex;

    .menu-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;

      .menu-item {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: vw(130);
        height: vh(26);
        margin-right: vw(10);
        background-image: url("../../assets/images/top_menu_bg.png");
        background-size: vw(130) vh(26);
        background-repeat: no-repeat;
        background-position: center;

        &:last-child {
          margin-right: 0;
        }

        &.active {
          background-image: url("../../assets/images/top_menu_bg_active.png");
        }
      }
    }
  }
}
</style>
