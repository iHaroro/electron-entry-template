<template>
  <a-config-provider :locale="zhCN" :theme="customTheme">
    <Layout v-if="meta.showLayout">
      <RouterView v-slot="{ Component }">
        <component :is="Component"></component>
      </RouterView>
    </Layout>
    <RouterView v-else v-slot="{ Component }">
      <component :is="Component"></component>
    </RouterView>
  </a-config-provider>
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { RouterView, useRoute } from 'vue-router'
import { theme } from 'ant-design-vue'
import antdTheme from './antDesignVueTheme.json'
import Layout from '@/pages/monitor/layout'
import { computed } from 'vue'

defineOptions({ name: 'App' })

const route = useRoute()
const meta = computed(() => route.meta)

const customTheme = {
  ...antdTheme,
  algorithm: theme.darkAlgorithm,
  components: {}
}
</script>
