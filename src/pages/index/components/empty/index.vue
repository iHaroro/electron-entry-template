<template>
  <div class="empty-box">
    <img class="empty-img" :src="img || emptyBg" alt="暂无数据" />
    <p>暂无数据</p>
  </div>
</template>

<script setup>
import emptyBg from '@/pages/index/assets/images/empty_bg.png'
defineOptions({ name: 'EmptyComponent' })
defineProps({
  img: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.empty-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: rgba(255, 255, 255, 0.65);

  .empty-img {
    width: vw(210);
    margin: vh(12) auto;
  }
}
</style>
