<template>
  <div class="page-tabs">
    <template v-for="item in tabs">
        <span
          class="page-tab-item"
          :class="{'active': active === item.key}"
          @click="changeActivePage(item)">
          {{ item.label }}
        </span>
    </template>
  </div>
</template>

<script setup>
import { watch } from 'vue'

defineOptions({ name: 'TitleTabs' })

const props = defineProps({
  tabs: {
    type: Array,
    default: () => []
  }
})

const active = defineModel('active', {
  type: [Number, String],
  default: null
})

const changeActivePage = (item) => {
  active.value = item.key
}

watch(() => props.tabs, (value) => {
  // active 无数据进行初始化
  if (!active.value && active.value !== 0) {
    changeActivePage(value[0])
  }
}, {
  immediate: true
})
</script>

<style scoped lang="scss">
.page-tabs {
  display: flex;
  align-items: center;
  height: 67px;
  padding: 0 42px;
  background: #041A47;

  .page-tab-item {
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 42px;
    height: 100%;
    font-weight: 500;
    font-size: 18px;
    color: #ffffff;
    line-height: 22px;
    text-align: left;
    font-style: normal;

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      //left: 0;
      //transform: translateY(-50%);
      width: 0;
      height: 2px;
      background: #1890FF;
      transition: all 0.18s;
    }

    &.active {
      color: #1890FF;

      &::before {
        width: 100%;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>