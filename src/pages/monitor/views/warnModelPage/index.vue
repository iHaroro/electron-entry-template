<template>
  <div class="page-container">
    <a-form
      name="search"
      layout="inline"
      class="search-form-box"
      :model="searchForm"
    >
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
          <a-button class="search-btn">
            <img class="btn-icon" src="@/pages/monitor/assets/images/search_icon.png" alt="查询" />
            查询
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
import { getColumns } from './columns'
import { usePagination } from '@/pages/monitor/hooks/usePagination'
import Empty from '@/pages/monitor/components/empty'
import DotText from '@/pages/monitor/components/dotText'

defineOptions({ name: 'WarnModelPage' })

const searchForm = ref({
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
    }
  }

  .empty-box {
    padding: 50px 0;
  }
}
</style>