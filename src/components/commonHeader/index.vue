<template>
  <div class="page-container-bg_header">
    <div class="page-container-bg_header_left"></div>
    <div class="page-container-bg_header_content">
      <p class="title">云视船舶—智慧船舶可视化平台</p>
    </div>
    <div class="page-container-bg_header_right">
      <div class="time-box">
        <span class="date">{{ nowDate }}</span>
        <span class="time">{{ nowTime }}</span>
        <!--<a-popconfirm placement="bottom" title="是否确认退出登录？" ok-text="确认" cancel-text="取消" @confirm="logout">-->
        <!--  <div class="logout-box"></div>-->
        <!--</a-popconfirm>-->
      </div>
    </div>

    <div class="menu-container">
      <div class="left-menu-box">
        <div
          class="menu-item"
          v-for="item in leftMenus"
          :key="item.path"
          :class="{ active: activeMenuPath === item.path }"
          @click="jumpMenu(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="center-holder"></div>
      <div class="right-menu-box">
        <div
          class="menu-item"
          v-for="item in rightMenus"
          :key="item.path"
          :class="{ active: activeMenuPath === item.path }"
          @click="jumpMenu(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { useRoute, useRouter } from 'vue-router'
// import { cleanTokenFromApplication } from '@/utils/userInfo.js'

defineOptions({
  name: 'CommonHeader',
})

const route = useRoute()
const router = useRouter()
const leftMenus = ref([
  {
    name: '智能驾驶室',
    path: '/aiCopilot',
  },
  {
    name: '智能机舱',
    path: '/deviceInfo',
  },
  {
    name: '视频预警',
    path: '/monitoringInfo',
  },
])
const rightMenus = ref([
  {
    name: '报警信息',
    path: '/alarmInfo',
  },
  // {
  //   name: '历史数据',
  //   path: '/historyInfo',
  // },
])

const datetime = ref(Date.now())
const nowDate = computed(() => {
  return dayjs(datetime.value).format('YYYY年MM月DD日')
})
const nowTime = computed(() => {
  return dayjs(datetime.value).format('HH:mm:ss')
})

const updateTime = () => {
  setTimeout(() => {
    datetime.value = Date.now()
    updateTime()
  }, 1000)
}

// const logout = () => {
//   cleanTokenFromApplication()
//   location.replace('/login')
// }

const activeMenuPath = computed(() => {
  return route.path
})

const jumpMenu = (item) => {
  router.push(item.path)
}

onMounted(() => {
  updateTime()
})
</script>

<style lang="scss" scoped>
$headerHeight: 140;

.page-container-bg_header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  width: vw(1920);
  height: vh($headerHeight);
  background-image: url('@/assets/images/ship_top_header_bg_new.png');
  background-repeat: no-repeat;
  background-size: vw(1920) vh($headerHeight);

  .page-container-bg_header_left {
    flex: 1;
  }

  .page-container-bg_header_content {
    flex: 1;
    text-shadow: vw(0) vh(3) vh(6) rgba(0, 3, 17, 0.49);
    margin-top: vh(20);
    line-height: vh(50);
    text-align: center;
    font-size: vh(40);

    .title {
      font-family: 'YouSheBiaoTiHei';
      color: rgba(221, 240, 246, 1);
    }
  }

  .page-container-bg_header_right {
    flex: 1;

    .time-box {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: vh(22);
      margin-right: vw(24);
      color: rgba(221, 240, 246, 1);

      .date {
        margin-right: vw(16);
        font-weight: 400;
        font-size: vh(16);
        line-height: vh(18);
      }

      .time {
        font-weight: 400;
        font-size: vh(20);
        line-height: vh(28);
      }

      .logout-box {
        width: vh(28);
        height: vh(28);
        margin-left: vw(28);
        background-image: url('@/assets/images/logout_icon.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }

  .menu-container {
    position: absolute;
    top: vh(51);
    left: vw(59);
    right: vw(59);
    width: 100%;
    display: flex;

    .left-menu-box,
    .right-menu-box {
      flex: 1;
      display: flex;

      .menu-item {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: vw(176);
        height: vh(49);
        font-size: vh(16);
        font-weight: 500;
        line-height: vh(22);
        background-repeat: no-repeat;
        background-size: vw(166) vh(41);
        background-position: center center;

        &.active {
          background-size: vw(176) vh(49);
        }
      }
    }

    .left-menu-box {
      .menu-item {
        background-image: url('@/assets/images/left_menu_bg.png');

        &.active {
          background-image: url('@/assets/images/left_menu_bg_active.png');
        }
      }
    }

    .right-menu-box {
      .menu-item {
        background-image: url('@/assets/images/right_menu_bg.png');

        &.active {
          background-image: url('@/assets/images/right_menu_bg_active.png');
        }
      }
    }

    .center-holder {
      flex: 1;
      height: vh(1);
    }
  }
}
</style>
