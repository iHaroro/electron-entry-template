<template>
  <a-config-provider :locale="zhCN" :theme="customTheme">
    <RouterView v-slot="{ Component }">
      <component :is="Component"></component>
    </RouterView>
  </a-config-provider>
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { RouterView } from 'vue-router'

defineOptions({ name: 'App' })

const customTheme = {
  components: {}
}
</script>
