<template>
  <div class="process-line-box">
    <div class="process-top-info">
      <p class="process-title">{{ subTitle }}</p>
      <p class="process-data">{{ model }}</p>
    </div>

    <div class="process-line" :class="progressClass" :style="{ height: styles.boxHeight }">
      <div class="process-line-cover" :style="{ width: `${percentage}%`, minWidth: `2%` }">
        <div class="process-line-end"></div>
      </div>
      <div class="process-line-end box-end"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { px2vh } from '@/pages/index/assets/js/sizeUtils.js'
import { calculatePercentage } from '@/pages/index/utils/utils.js'
defineOptions({
  name: 'ProcessLine',
})

const props = defineProps({
  min: {
    default: 0,
    type: [String, Number],
  },
  max: {
    default: 100,
    type: [String, Number],
  },
  height: {
    default: 24,
    type: Number,
  },
  subTitle: {
    default: '',
    type: String,
  },
  progressClass: {
    default: '',
    type: String,
  },
})

const model = defineModel('model', { default: 0 })

const percentage = computed(() => {
  // 计算百分比
  const num = calculatePercentage(model.value, props.min, props.max) * 100
  return num >= 100 ? 100 : num
})

const styles = computed(() => {
  return {
    boxHeight: px2vh(props.height),
  }
})
</script>

<style scoped lang="scss">
.process-line-box {
  display: inline-block;
  width: 100%;
  cursor: pointer;

  .process-top-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: vh(4);

    .process-title {
      height: vh(20);
      font-weight: 400;
      font-size: vh(14);
      color: rgba(221, 240, 246, 0.8);
      line-height: vh(20);
    }

    .process-data {
      font-weight: 400;
      font-size: vh(16);
      color: rgba(0, 252, 238, 1);
      line-height: vh(28);
    }
  }

  .process-line {
    position: relative;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: vh(16);
    text-align: right;
    border-radius: 1px;
    font-size: vh(16);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: inset 0 1px 3px 0 #3288b1;

    .process-line-cover {
      position: absolute;
      top: vh(2);
      bottom: vh(2);
      left: 0;
      right: 0;
      width: 0;
      height: calc(100% - vw(3));
      background: linear-gradient(90deg, #dce35b 0%, #45b649 100%);
      transition: width 0.5s ease-in-out;

      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        width: 3px;
        height: vh(16);
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.8);
        box-shadow: inset 0 1px 2px 0 #ecfffd;
      }
    }
  }
}
</style>
