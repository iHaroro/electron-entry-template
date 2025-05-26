<script setup>
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'
import { useAppControlStore } from '@/pages/index/stores/appControl'

defineOptions({
  name: 'TimeBox'
})

const props = defineProps({
  timeBoxStyle: {
    type: Object,
    default: () => ({})
  },
  dateStyle: {
    type: Object,
    default: () => ({})
  },
  timeStyle: {
    type: Object,
    default: () => ({})
  },
  hasLogout: {
    type: Boolean,
    default: true
  }
})

const datetime = ref(Date.now())
const nowDate = computed(() => {
  return dayjs(datetime.value).format('YYYY年MM月DD日')
})
const nowTime = computed(() => {
  return dayjs(datetime.value).format('HH:mm:ss')
})

const appControlStore = useAppControlStore()

const updateTime = () => {
  setTimeout(() => {
    datetime.value = Date.now()
    updateTime()
  }, 1000)
}

onMounted(() => {
  updateTime()
})
</script>

<template>
  <div class="time-box" :style="timeBoxStyle">
    <span class="date" :style="dateStyle">{{ nowDate }}</span>
    <span class="time" :style="timeStyle">{{ nowTime }}</span>
    <a-popconfirm
      v-if="hasLogout"
      placement="bottom"
      title="是否确认退出登录？"
      ok-text="确认"
      cancel-text="取消"
      @confirm="appControlStore.logout"
    >
      <div class="logout-box"></div>
    </a-popconfirm>
  </div>
</template>

<style scoped lang="scss">
.time-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
    cursor: pointer;
    width: vh(28);
    height: vh(28);
    margin-left: vw(28);
    background-image: url('../../assets/images/logout_icon.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>