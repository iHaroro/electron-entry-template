<template>
  <a-config-provider :locale="zhCN" :theme="customTheme">
    <a-spin :spinning="isLoading" v-bind="options">
      <RouterView />
    </a-spin>
  </a-config-provider>
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { theme } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'
import { useLoadingStore } from '@/pages/index/stores/loadingControl.js'

defineOptions({ name: 'ShipApp' })

const loadingControl = useLoadingStore()
const { isLoading, options } = storeToRefs(loadingControl)

const customTheme = {
  algorithm: theme.darkAlgorithm,
  token: {},
  components: {}
}
</script>
