<template>
  <div class="device-status-box">
    <!--图标-->
    <div class="chart-box">
      <div class="chart-box-item">
        <div class="chart-title">状态统计</div>
        <div class="chart-item rose-area-item">
          <DashboardRoseArea :chart-data="roseAreaData" />
        </div>
      </div>
      <div class="chart-box-item">
        <div class="chart-title">工作状态</div>
        <div class="chart-item stacked-bar-item">
          <DashboardStackedBar class="stacked-bar" />
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
import DashboardStackedBar from '@/pages/monitor/components/dashboardStackedBar'
import Empty from '@/pages/monitor/components/empty/index.vue'
import { usePagination } from '@/pages/monitor/hooks/usePagination'
import { getColumns } from './columns'

defineOptions({ name: 'DeviceStatus' })

const defaultSearch = {
  time: [
    dayjs().subtract(1, 'day'),
    dayjs()
  ]
}

const roseAreaData = ref([
  {
    name: '在线',
    value: '30'
  },
  {
    name: '离线',
    value: '25'
  },
  {
    name: '其他',
    value: '20'
  }
])

const searchForm = ref({ ...defaultSearch })
const presets = ref([
  { label: '近一周', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: '近一月', value: [dayjs().add(-30, 'd'), dayjs()] },
])
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