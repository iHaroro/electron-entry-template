<template>
  <div class="page-container">
    <a-form
      name="search"
      layout="inline"
      class="search-form-box"
      :model="searchForm"
    >
      <a-form-item label="告警类型" name="scene" class="search-form-item">
        <a-select
          v-model:value="searchForm.scene"
          class="search-input"
          placeholder="请选择"
          allow-clear
          @change="handleChange"
        >
          <template v-for="item in warnTypes" :key="`scene_${item.value}`">
            <a-select-option :value="item.value">{{ item.label }}</a-select-option>
          </template>
        </a-select>
      </a-form-item>
      <a-form-item label="告警摄像头" name="scene" class="search-form-item">
        <a-select
          v-model:value="searchForm.scene"
          class="search-input"
          placeholder="请选择"
          allow-clear
          @change="handleChange"
        >
          <template v-for="item in warnMonitors" :key="`scene_${item.value}`">
            <a-select-option :value="item.value">{{ item.label }}</a-select-option>
          </template>
        </a-select>
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
      <a-form-item label="处理状态" name="scene" class="search-form-item">
        <a-select
          v-model:value="searchForm.scene"
          class="search-input"
          placeholder="请选择"
          allow-clear
          @change="handleChange"
        >
          <template v-for="item in processingStateOptions" :key="`scene_${item.value}`">
            <a-select-option :value="item.value">{{ item.label }}</a-select-option>
          </template>
        </a-select>
      </a-form-item>
      <a-form-item label="时间范围" name="riskLevel" class="search-form-item">
        <a-range-picker v-model:value="searchForm.time" class="search-input date-time-range" show-time />
      </a-form-item>
      <a-form-item>
        <a-space size="middle">
          <a-button class="search-btn">
            <img class="btn-icon" src="@/pages/monitor/assets/images/search_icon.png" alt="查询" />
            查询
          </a-button>
          <a-button class="export-btn">
            <img class="btn-icon" src="@/pages/monitor/assets/images/export_icon.png" alt="导出" />
            导出
          </a-button>
          <a-button class="reset-btn">
            <img class="btn-icon" src="@/pages/monitor/assets/images/reset_icon.png" alt="重置" />
            重置
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>

    <a-table
      class="custom-table"
      rowKey="id"
      :pagination="pagination"
      :dataSource="dataSource"
      :columns="columns"
      @change="tableChangeHandler"
    >
      <template #bodyCell="data">
        <template v-if="data.column.dataIndex === 'riskLevel'">
          <DotText :text="'高'" dot-color="rgba(255, 77, 79, 1)" />
        </template>
        <template v-if="data.column.dataIndex === 'operation'">
          <a-space>
            <a-button type="link" @click="jumpView(data)">查看</a-button>
            <a-button type="link" danger @click="jumpHandle(data)">处理</a-button>
          </a-space>
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
import { useRouter } from 'vue-router'
import { getColumns } from './columns'
import { usePagination } from '@/pages/monitor/hooks/usePagination'
import { PROCESSING_STATE_MAP } from '@/pages/monitor/constants/warn'
import { getArrayMapFromMap } from '@/pages/monitor/utils/utils'
import Empty from '@/pages/monitor/components/empty'
import DotText from '@/pages/monitor/components/dotText'

defineOptions({ name: 'WarnListPage' })

const searchForm = ref({
  time: [],
  riskLevel: null,
  scene: null
})
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
const warnTypes = [
  {
    label: '疲劳驾驶',
    value: '1'
  },
  {
    label: '玩手机',
    value: '2'
  },
  {
    label: '抽烟',
    value: '3'
  }
]
const warnMonitors = [
  {
    label: 'JSS-驾驶室',
    value: '1'
  },
  {
    label: 'JKS-集控室',
    value: '2'
  },
  {
    label: 'JB-甲板',
    value: '3'
  }
]
const processingStateOptions = getArrayMapFromMap(PROCESSING_STATE_MAP)

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

const router = useRouter()
/**
 * @function jumpView
 * @description 跳转详情页
 **/
const jumpView = (record) => {
  console.log(record)
  router.push({ name: 'WarnListViewPage' })
}

/**
 * @function jumpHandle
 * @description 跳转处理页
 **/
const jumpHandle = (record) => {
  console.log(record)
  router.push({ name: 'WarnListHandlePage' })
}

onMounted(() => {
  getData()
})
</script>

<style scoped lang="scss">
.page-container {
  padding: 32px 24px;

  .search-form-box {
    margin-bottom: 8px;

    .search-form-item {
      margin-right: 56px;

      .search-input {
        width: 250px;
      }

      .date-time-range {
        width: 380px;
      }
    }
  }

  .empty-box {
    padding: 50px 0;
  }
}
</style>