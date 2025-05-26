<template>
  <span class="net-state-box">
    <img class="net-state-icon" :src="netStateData.icon" :alt="netStateData.name" />
    <span class="net-state-desc" :style="netStateData.style">{{ netStateData.name }}</span>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { getValueMapFromMap } from '@/pages/index/utils/utils.js'
import { SHIP_NET_STATE_MAP } from '@/pages/index/constants/device.js'

defineOptions({
  name: 'NetStateBox',
})

const props = defineProps({
  status: {
    type: [Number, String],
    default: null,
  },
})

const netStateData = computed(() => {
  const map = getValueMapFromMap(SHIP_NET_STATE_MAP)
  return map[`${props.status}`] || {}
})
</script>

<style scoped lang="scss">
.net-state-box {
  display: flex;
  align-items: center;

  .net-state-icon {
    margin-right: vw(2);
  }

  .net-state-desc {
    font-weight: 500;
    font-size: vh(16);
    color: #29c14b;
    line-height: vh(22);
  }
}
</style>
