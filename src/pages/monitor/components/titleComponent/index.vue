<template>
  <div v-if="slots.default" class="title-box" :class="['bg-common', bgClass]" :style="styles">
    <slot class="slot-box" />
  </div>
  <div v-else class="title-box" :class="['bg-common', bgClass]" :style="styles">{{ text }}</div>
</template>

<script setup>
import { computed, useSlots } from 'vue'

defineOptions({ name: 'TitleComponent' })

const slots = useSlots()

const props = defineProps({
  size: {
    type: String,
    validator: (value) => ['small', 'large', 'huge'].includes(value),
    default: 'small',
  },
  text: {
    type: String,
    default: '',
  },
  styles: {
    type: Object,
    default: () => ({}),
  },
})

const bgClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'small-bg'
    case 'large':
      return 'large-bg'
    case 'huge':
      return 'huge-bg'
    default:
      return 'small-bg'
  }
})
</script>

<style scoped lang="scss">
.title-box {
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  height: vh(52);
  padding-left: vw(42);
  font-weight: 500;
  font-size: vh(20);
  color: rgba(221, 240, 246, 1);
  letter-spacing: vw(1);

  &.bg-common {
    background-size: auto vh(38);
    background-position: left bottom;
    background-repeat: no-repeat;
  }

  &.small-bg {
    background-image: url('@/pages/monitor/assets/images/common_title_small_bg.png');
  }

  &.large-bg {
    background-image: url('@/pages/monitor/assets/images/common_title_large_bg.png');
  }

  &.huge-bg {
    background-image: url('@/pages/monitor/assets/images/common_title_huge_bg.png');
  }
}
</style>
