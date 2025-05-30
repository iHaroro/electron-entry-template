<template>
  <div class="page-container">
    <div class="page-tabs">
      <template v-for="item in pageTabs">
        <span class="page-tab-item" :class="{'active': activePage.key === item.key}" @click="changeActivePage(item)">{{
            item.label
          }}</span>
      </template>
    </div>

    <div class="page-components-box">
      <component :is="activePage.component" />
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import DeviceStatus from './components/DeviceStatus'
import WarnStatistics from './components/WarnStatistics'
import WarnHandlingStatistics from './components/WarnHandlingStatistics'

defineOptions({ name: 'WarnStatisticsPage' })

const pageTabs = [
  {
    label: '设备状态',
    key: 'DeviceStatus',
    component: markRaw(DeviceStatus)
  },
  {
    label: '告警次数统计',
    key: 'WarnStatistics',
    component: markRaw(WarnStatistics)
  },
  {
    label: '告警处理统计',
    key: 'WarnHandlingStatistics',
    component: markRaw(WarnHandlingStatistics)
  }
]
const activePage = ref(pageTabs[0])

const changeActivePage = (value) => {
  activePage.value = value
}
</script>

<style scoped lang="scss">
.page-container {
  box-sizing: border-box;
  padding: 24px;

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
      padding: 0 7px;
      margin-right: 53px;
      height: 100%;
      font-weight: 400;
      font-size: 16px;
      color: rgba(242, 252, 255, 1);

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

  .page-components-box {
    margin-top: 16px;
  }
}
</style>