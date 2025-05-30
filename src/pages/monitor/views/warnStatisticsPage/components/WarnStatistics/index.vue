<template>
  <div class="device-status-box">
    <!--图标-->
    <div class="chart-box">
      <div class="chart-box-item">
        <div class="chart-title">状态统计</div>
        <div class="total-info">
          总次数：2002
        </div>
        <div class="chart-item rose-area-item">
          <DashboardRoseArea :chart-data="roseAreaData" />
        </div>
      </div>
      <div class="chart-box-item">
        <div class="chart-title">工作状态</div>
        <div class="chart-item stacked-bar-item">
          <DashboardLine :chart-data="lineChartData" />
        </div>
      </div>
    </div>
    <!--检测列表-->
    <div class="search-box">
      <div class="title">检测列表</div>
      <a-form
        name="search"
        layout="inline"
        class="search-device-status search-form-box"
        :model="searchForm"
      >
        <a-form-item label="时间范围" name="time" class="search-form-item">
          <a-range-picker v-model:value="searchForm.time" class="search-input date-time-range" show-time :presets="presets" />
        </a-form-item>
        <a-form-item label="风险等级" name="riskLevel" class="search-form-item">
          <a-select
            v-model:value="searchForm.riskLevel"
            class="search-input"
            placeholder="请选择"
            allow-clear
            @change="handleChange"
          >
            <template v-for="item in riskLevelOptions" :key="`risk_${item.value}`">
              <a-select-option :value="item.value">{{ item.label }}</a-select-option>
            </template>
          </a-select>
        </a-form-item>
        <a-form-item label="应用场景" name="scene" class="search-form-item">
          <a-select
            v-model:value="searchForm.scene"
            class="search-input"
            placeholder="请选择"
            allow-clear
            @change="handleChange"
          >
            <template v-for="item in sceneOptions" :key="`scene_${item.value}`">
              <a-select-option :value="item.value">{{ item.label }}</a-select-option>
            </template>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-space size="middle">
            <a-button class="search-btn" @click="searchHandler">
              <img class="btn-icon" src="@/pages/monitor/assets/images/search_icon.png" alt="查询" />
              查询
            </a-button>
            <a-button class="export-btn">
              <img class="btn-icon" src="@/pages/monitor/assets/images/export_icon.png" alt="导出" />
              导出
            </a-button>
            <a-button class="reset-btn" @click="resetHandler">
              <img class="btn-icon" src="@/pages/monitor/assets/images/reset_icon.png" alt="重置" />
              重置
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <!-- 列表 -->
    <a-table
      class="custom-table"
      rowKey="id"
      :pagination="pagination"
      :dataSource="dataSource"
      :columns="columns"
      @change="tableChangeHandler"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'riskLevel'">
          <DotText :text="'高'" dot-color="rgba(255, 77, 79, 1)" />
        </template>
      </template>
      <template v-slot:emptyText>
        <div class="empty-box">
          <Empty />
        </div>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import DashboardRoseArea from '@/pages/monitor/components/dashboardRoseArea'
import Empty from '@/pages/monitor/components/empty/index.vue'
import { usePagination } from '@/pages/monitor/hooks/usePagination'
import { getColumns } from './columns'
import DashboardLine from '@/pages/monitor/components/dashboardLine/index.vue'
import DotText from '@/pages/monitor/components/dotText/index.vue'

defineOptions({ name: 'WarnStatistics' })

const defaultSearch = {
  time: [
    dayjs().subtract(1, 'day'),
    dayjs()
  ],
  riskLevel: null,
  scene: null
}

const roseAreaData = ref([
  {
    name: '高',
    value: '30'
  },
  {
    name: '中',
    value: '25'
  },
  {
    name: '低',
    value: '20'
  }
])
const lineChartData = ref([
  {
    name: '高',
    x: ['2025-05-23', '2025-05-24', '2025-05-25', '2025-05-26', '2025-05-27', '2025-05-28', '2025-05-29'],
    y: [1, 2, 5, 9, 10, 20, 0]
  },
  {
    name: '中',
    x: ['2025-05-23', '2025-05-24', '2025-05-25', '2025-05-26', '2025-05-27', '2025-05-28', '2025-05-29'],
    y: [10, 2, 8, 7, 8, 4, 1]
  },
  {
    name: '低',
    x: ['2025-05-23', '2025-05-24', '2025-05-25', '2025-05-26', '2025-05-27', '2025-05-28', '2025-05-29'],
    y: [17, 18, 29, 31, 42, 53, 15]
  }
])

const searchForm = ref({ ...defaultSearch })

const presets = ref([
  { label: '近一周', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: '近一月', value: [dayjs().add(-30, 'd'), dayjs()] }
])

const riskLevelOptions = [
  {
    label: '高',
    value: '1'
  },
  {
    label: '中',
    value: '2'
  },
  {
    label: '低',
    value: '3'
  }
]
const sceneOptions = [
  {
    label: '驾驶室',
    value: '1'
  },
  {
    label: '甲板',
    value: '2'
  },
  {
    label: '机舱',
    value: '3'
  }
]

const handleChange = () => {
  console.log('change', searchForm.value)
}

const dataSource = ref([])
const columns = getColumns()
const { pagination, setPaginationOptions } = usePagination()

/**
 * @function tableChangeHandler
 * @description 分页、排序、筛选变化时触发
 **/
const tableChangeHandler = (pagination, filters, sorter, { action }) => {
  // 翻页
  if (action === 'paginate') {
    setPaginationOptions({
      current: pagination.current,
      pageSize: pagination.pageSize
    })
    getData()
  }
}

const getData = () => {
  setTimeout(() => {
    dataSource.value = Array(15).fill({}).map((item, index) => ({ index }))

    setPaginationOptions({
      current: pagination.value.current,
      pageSize: pagination.value.pageSize,
      total: 1000
    })

    // setPaginationOptions({
    //   current: res.data.pageNum,
    //   pageSize: res.data.pageSize || pagination.value.pageSize,
    //   total: res.data.total
    // })
  }, 1000)
}

const searchHandler = () => {
  setPaginationOptions({
    current: 1
  })
}

const resetHandler = () => {
  searchForm.value = defaultSearch
}

onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.device-status-box {
  box-sizing: border-box;
  margin-top: 16px;

  .chart-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .chart-box-item {
      position: relative;
      flex: 1;
      height: 500px;
      margin-right: 16px;
      background-color: rgba(4, 26, 70, 1);

      &:last-child {
        margin-right: 0;
      }

      .chart-title {
        margin: 24px 42px;
      }

      .total-info {
        position: absolute;
        top: 24px;
        right: 42px;
        font-weight: 500;
        font-size: 18px;
        color: #00FCEE;
        line-height: 25px;
      }

      .chart-item {
        width: 600px;
        height: 400px;
        margin: 30px auto 0;

        &.rose-area-item {
          margin: 0 auto;
        }

        &.stacked-bar-item {
          width: 100%;

          .stacked-bar {
            width: 100%;
            margin: 0 42px;
          }
        }
      }
    }
  }

  .search-box {
    padding: 24px 42px 32px;
    margin-top: 16px;
    background: #041A47;

    .search-form-box {
      .search-form-item {

        .search-input {
          width: 250px;

          &.date-time-range {
            width: 380px;
          }
        }
      }
    }

    .title {
      margin-bottom: 16px;
    }

    :deep(.search-device-status) {
      .ant-form-item {
        margin-bottom: 0;
      }
    }
  }

  .custom-table {
    margin-top: 16px;
  }
}
</style>