<template>
  <div class="system-state-chart-box">
    <div class="search-box">
      <a-form layout="inline">
        <a-form-item label="时间">
          <a-range-picker v-model:value="searchForm.date" allow-clear class="from-input search-from-item-input" />
        </a-form-item>
      </a-form>
    </div>

    <div class="chart-box">
      <div class="left-chart-box">
        <div class="chart-title">开机率</div>
        <div class="chart-box">
          <DashboardStartUp />
        </div>
      </div>
      <div class="right-chart-box">
        <div class="chart-box">
          <DashboardRunState />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DashboardStartUp from '@/components/dashboardStartUp'
import DashboardRunState from '@/components/dashboardRunState'

defineOptions({ name: 'SystemStateCharts' })

const searchForm = ref({ date: [] })


</script>

<style scoped lang="scss">
.system-state-chart-box {
  padding-top: vh(32);

  .search-box {
    margin-bottom: vh(32);

    .search-from-item-input {
      width: 260px;
    }
  }

  .chart-box {
    display: flex;

    .left-chart-box,
    .right-chart-box {
      height: vh(515);
      background: #002056;
      box-shadow: 0 0 12px -3px rgba(9, 11, 13, 0.79);
      border-radius: 10px;
    }

    .left-chart-box {
      width: vw(637);

      .chart-title {
        margin: vh(36) vw(42);
        font-weight: 500;
        font-size: vh(16);
        color: #F2FCFF;
        line-height: vh(26);
      }

      .chart-box {
        width: vw(600);
        height: vh(300);
        margin: 0 auto;
      }
    }

    .right-chart-box {
      flex: 1;
      margin-left: vw(16);

      .chart-box {
        width: vw(900);
        height: vh(500);
        margin: 0 auto;
      }
    }
  }
}
</style>