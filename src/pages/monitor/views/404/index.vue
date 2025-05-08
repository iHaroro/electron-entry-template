<script setup>
import { useRouter } from 'vue-router'
defineOptions({ name: 'NotFoundPage' })

const router = useRouter()
const backHome = () => {
  router.replace({ name: 'NotFoundPage' })
}
</script>

<template>
  <div class="page-content">
    <a-result status="404" title="404" sub-title="对不起，您访问的页面不存在。">
      <template #extra>
        <a-button type="primary" @click="backHome">回首页</a-button>
      </template>
    </a-result>
  </div>
</template>

<style scoped lang="scss">
.page-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
