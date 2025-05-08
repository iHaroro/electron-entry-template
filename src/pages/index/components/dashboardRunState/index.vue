<template>
  <div class="run-state-chart-box">
    <div class="state-box" v-for="(item, index) in model" :key="`state-item-${index}`">
      <div class="state-item">

      </div>
    </div>
  </div>
</template>

<script setup>

defineOptions({
  name: 'DashboardRunState'
})
const model = defineModel({
  type: Array,
  default: () => [
    {
      name: '运转',
      startTime: '2024-01-01 00:00:00',
      endTime: '2024-01-01 01:10:00'
    },
    {
      name: '停机',
      startTime: '2024-01-01 01:10:00',
      endTime: '2024-01-01 02:00:00'
    },
    {
      name: '故障',
      startTime: '2024-01-01 02:00:00',
      endTime: '2024-01-01 04:00:00'
    },
    {
      name: '其他',
      startTime: '2024-01-01 05:00:00',
      endTime: '2024-01-01 06:00:00'
    },
    {
      name: '运转',
      startTime: '2024-01-01 06:00:00',
      endTime: '2024-01-01 18:00:00'
    },
    {
      name: '停机',
      startTime: '2024-01-01 18:00:00',
      endTime: '2024-01-01 22:00:00'
    },
    {
      name: '停机',
      startTime: '2024-01-01 22:00:00',
      endTime: '2024-01-01 24:00:00'
    }
  ]
})

</script>

<style scoped lang="scss">
.run-state-chart-box {
  box-sizing: border-box;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  width: 100%;
  height: calc(100% + 2px);

  .state-box {
    margin: 0 vw(42);
    height: vh(36);
    line-height: vh(36);

    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }
  }
}
</style>
