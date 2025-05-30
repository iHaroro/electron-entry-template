<template>
  <slot v-if="hasDefaultSlot" />
  <router-view v-else />
</template>

<script setup>
import { computed, useSlots } from 'vue'
defineOptions({ name: 'NoLayoutView' })

const slots = useSlots()
// 判断默认插槽是否存在内容
const hasDefaultSlot = computed(() => {
  return !!slots.default && slots.default().length > 0
})
</script>