<script setup>
import { computed, onMounted, ref } from 'vue'
import dayjs from 'dayjs'

defineOptions({
  name: 'TimeBox'
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

onMounted(() => {
  updateTime()
})
</script>

<template>
  <div class="time-box">
    <span class="date">{{ nowDate }}</span>
    <span class="time">{{ nowTime }}</span>
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
    width: vh(28);
    height: vh(28);
    margin-left: vw(28);
    background-image: url('@/assets/images/logout_icon.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>