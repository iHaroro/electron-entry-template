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
        <a-popconfirm placement="bottom" title="是否确认退出登录？" ok-text="确认" cancel-text="取消" @confirm="logout">
          <div class="logout-box"></div>
        </a-popconfirm>
      </div>
      <!--<iframe-->
      <!--  width="250"-->
      <!--  scrolling="no"-->
      <!--  height="25"-->
      <!--  frameborder="0"-->
      <!--  allowtransparency="true"-->
      <!--  src="https://i.tianqi.com?c=code&id=26&color=%23FFFFFF&icon=1&site=18"-->
      <!--/>-->
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { cleanTokenFromApplication } from '@/utils/userInfo.js'

defineOptions({
  name: 'CommonHeader'
})

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

const logout = () => {
  cleanTokenFromApplication()
  location.replace('/login')
}

onMounted(() => {
  updateTime()
})
</script>

<style lang="scss" scoped>
$headerHeight: 115;

.page-container-bg_header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  width: vw(1920);
  height: vh($headerHeight);
  background-image: url('@/assets/images/top_header_bg_new.png');
  background-repeat: no-repeat;
  background-size: vw(1920) vh($headerHeight);

  .page-container-bg_header_left {
    flex: 1;
    margin-top: vh(22);
    margin-left: vw(58);
    line-height: vh(30);
    text-align: left;
    //font-size: vh(22);
    font-size: 18px;
    letter-spacing: vw(4);
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
    margin-top: vh(32);
    //margin-left: vw(58);
    //margin-right: vh(58);
    //line-height: vh(30);
    //text-align: right;
    //font-size: vh(22);
    //letter-spacing: vw(4);

    .time-box {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: vw(24);
      color: rgba(221, 240, 246, 1);

      .date {
        margin-right: vw(18);
        font-weight: 400;
        font-size: vh(12);
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
}
</style>
