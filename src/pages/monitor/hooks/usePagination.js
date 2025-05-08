import { ref } from 'vue'
import { PAGE_SIZE_OPTIONS } from '@/pages/monitor/constants/config.js'

export const usePagination = (defaultConfig = {}) => {
  const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
    showQuickJumper: true,
    showTotal: (total, range) => `当前第 ${range[0]} - ${range[1]} 条，共 ${total} 条`,
    ...defaultConfig
  })

  const setPaginationOptions = (options) => {
    pagination.value = {
      ...pagination.value,
      ...options
    }
  }

  return {
    pagination,
    setPaginationOptions,
  }
}
