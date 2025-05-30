<script setup>
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'

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
}
</style>