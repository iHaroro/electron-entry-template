<template>
  <div class="handle-process-log-wrapper">
    <div class="log-item" v-for="item in logList" :key="item.id">
      <p class="item-title">{{ item.dealTime }}</p>
      <p class="item-info">操作人员:{{ item.dealUserName }}</p>
      <p class="item-info">操作内容：{{ item.dealDescription }}</p>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'HandleProcessLog' })
defineProps({
  logList: {
    type: Array,
    default: () => [
      {
        id: '457550119752048640',
        dealUserId: '100138',
        dealUserName: '船舶和港口',
        alarmId: '450710456945004544',
        dealDescription: '已读',
        dealTime: '2024-11-14 14:20:49',
      },
      {
        id: '450772192603607040',
        dealUserId: '100125',
        dealUserName: '',
        alarmId: '450710456945004544',
        dealDescription: '已经处理',
        dealTime: '2024-10-26 21:27:46',
      },
      {
        id: '450772023606710273',
        dealUserId: '100125',
        dealUserName: '测试账号勿删',
        alarmId: '450710456945004544',
        dealDescription: '已读',
        dealTime: '2024-10-26 21:27:05',
      },
    ],
  },
})
</script>

<style scoped lang="scss">
.handle-process-log-wrapper {
  .log-item {
    position: relative;
    padding-left: 32px;
    padding-bottom: 16px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 11px;
      transform: translateY(-50%);
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #02afff;
    }

    &::after {
      content: '';
      position: absolute;
      left: 6px;
      top: 23px;
      bottom: 1px;
      width: 2px;
      background: #02afff;
    }

    &:last-of-type {
      padding-bottom: 0;

      &::after {
        display: none;
      }
    }

    .item-title {
      font-weight: 500;
      font-size: 18px;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 8px;
    }

    .item-info {
      font-weight: 400;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.85);
      margin-bottom: 8px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
}
</style>
