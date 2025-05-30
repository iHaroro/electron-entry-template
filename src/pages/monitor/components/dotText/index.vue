<template>
  <span class="dot-box">
    <span class="dot" :style="dotStyle"></span>
    <span class="text">{{ text }}</span>
  </span>
</template>

<script setup>
import { computed } from 'vue'
defineOptions({ name: 'DotText' })

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  dotColor: {
    type: String,
    default: 'rgba(255, 77, 79, 1)'
  },
  size: {
    type: String,
    default: '6px'
  },
  radius: {
    type: String,
    default: '50%'
  }
})

const dotStyle = computed(() => {
  return {
    width: props.size,
    height: props.size,
    borderRadius: props.radius,
    backgroundColor: props.dotColor
  }
})
</script>

<style lang="scss" scoped>
.dot-box {
  display: inline-flex;
  align-items: center;

  .dot {
    margin-right: 8px;
  }

  .text {
    //font-weight: 400;
    //font-size: 16px;
    color: rgba(242, 252, 255, 1);
  }
}
</style>