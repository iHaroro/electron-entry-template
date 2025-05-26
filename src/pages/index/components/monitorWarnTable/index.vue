<template>
  <PageLayout :layout-style="{ zIndex: 99999 }">
    <PageNormalHeader :boat="boat" @back="backHandler" @change-boat="changeBoatHandler" />
    <div class="table-page-box">
      <div class="search-box">
        <a-select
          ref="select"
          v-model:value="alarmType"
          class="custom-from-item-input"
          allow-clear
          placeholder="请选择报警类型"
        >
          <a-select-option v-for="boat in alarmTypeList" :value="boat.code" :key="boat.code">
            {{ boat.name }}
          </a-select-option>
        </a-select>

        <a-range-picker v-model:value="date" class="custom-from-item-input" allow-clear />

        <div class="reset-btn" @click="resetHandler">
          <img class="btn-icon" src="../../assets/images/reset_icon.png" alt="" />
          重置
        </div>
        <div class="confirm-btn" @click="confirmHandler">
          <img class="btn-icon" src="../../assets/images/confirm_icon.png" alt="" />
          确认
        </div>
      </div>

      <div class="table-box">
        <a-table
          class="custom-table table-list"
          rowKey="id"
          :sticky="false"
          :pagination="false"
          :dataSource="dataSource"
          :columns="columns"
          :loading="loading"
        >
          <template v-slot:emptyText>
            <div class="empty-box">
              <Empty />
            </div>
          </template>
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'operation'">
              <a-image
                :preview="{
                  visible: visibleMap[record.id],
                  onVisibleChange: (visible) => setVisible(visible, record.id),
                }"
                :src="record.fullPicture"
                :style="{ display: 'none' }"
              />
              <a-button type="link" @click="() => setVisible(true, record.id)">查看</a-button>
            </template>
          </template>
        </a-table>
        <a-pagination
          class="custom-pagination pagination"
          v-model:current="pageNum"
          :total="total"
          @change="paginationChangeHandler"
        />
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PageLayout from '@/pages/index/components/pageLayout/index.vue'
import PageNormalHeader from '@/pages/index/components/pageNormalHeader/index.vue'
import Empty from '@/pages/index/components/empty/index.vue'
import { getDictName } from '@/pages/index/api/public.js'
import { getMonitorAlarmList } from '@/pages/index/api/monitor.js'
import { getColumns } from './columns.jsx'
import dayjs from 'dayjs'

defineOptions({ name: 'MonitorWarnTable' })
const emit = defineEmits(['back'])
const props = defineProps({
  boat: {
    type: String,
    default: '',
  },
})

const loading = ref(false)
const mmsi = ref(null)
const alarmType = ref(null)
const alarmTypeList = ref([])
const date = ref([])
const dataSource = ref([])
const total = ref(500)
const pageNum = ref(1)
const pageSize = ref(10)
const columns = getColumns()

const visibleMap = ref({})

const setVisible = (value, dataIndex) => {
  console.log(dataIndex)
  visibleMap.value[dataIndex] = value
}

/**
 * @function setDefaultBoat
 * @description 设置默认船舶
 **/
const setDefaultBoat = () => {
  mmsi.value = props.boat
}

/**
 * @function backHandler
 * @description 返回事件
 **/
const backHandler = () => {
  emit('back')
}

const paginationChangeHandler = (page, pageSizes) => {
  pageNum.value = page
  pageSize.value = pageSizes
  getTableList()
}

/**
 * @function changeBoatHandler
 * @description 切换船舶事件
 * @param {String} value 船舶mmsi
 **/
const changeBoatHandler = (value) => {
  mmsi.value = value
  resetHandler()
}

/**
 * @function getDict
 * @description 获取字典数据
 **/
const getDict = () => {
  getDictName({ type: ['alarm_type'] }).then((res) => {
    alarmTypeList.value = res.data.alarm_type
  })
}

/**
 * @function resetHandler
 * @description 重置事件
 **/
const resetHandler = () => {
  pageNum.value = 1
  pageSize.value = 10
  alarmType.value = null
  date.value = []
  getTableList()
}

/**
 * @function confirmHandler
 * @description 确认事件
 **/
const confirmHandler = () => {
  pageNum.value = 1
  getTableList()
}

const getTableList = () => {
  loading.value = true
  visibleMap.value = {}
  const [startDate, endDate] = date.value || []
  getMonitorAlarmList({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    mmsi: mmsi.value,
    type: alarmType.value,
    name: '',
    startDate: startDate ? dayjs(startDate).format('YYYY-MM-DD') : '',
    endDate: endDate ? dayjs(endDate).format('YYYY-MM-DD') : '',
  })
    .then((res) => {
      dataSource.value = res.data.list
      total.value = res.data.total
    })
    .then(() => {
      loading.value = false
    })
}

onMounted(() => {
  setDefaultBoat()
  getDict()
})
</script>

<style scoped lang="scss">
.table-page-box {
  box-sizing: border-box;
  height: vh(848);
  padding: vh(40) vw(40) vh(33);
  margin-top: vh(28);
  border: 1px solid;
  border-image: linear-gradient(317deg, rgba(0, 254, 248, 0), rgba(0, 252, 238, 1)) 1 1;

  .search-box {
    display: flex;
    align-items: center;

    .custom-from-item-input {
      width: vw(320);
      margin-right: vw(24);
    }

    .reset-btn,
    .confirm-btn {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: vw(120);
      height: vh(44);
      border-radius: 6px;
      margin-right: vw(8);

      .btn-icon {
        height: vh(24);
        margin-right: vw(2);
      }

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        opacity: 0.8;
      }
    }

    .reset-btn {
      background-color: rgba(255, 162, 23, 1);
    }

    .confirm-btn {
      background-color: rgba(112, 204, 14, 1);
    }
  }

  .table-box {
    margin-top: vh(48);

    .table-list {
      overflow-y: auto;
      height: vh(626);

      .empty-box {
        margin-top: vh(120);
        margin-bottom: vh(120);
      }
    }

    .pagination {
      margin-top: vh(40);
      text-align: right;
    }
  }
}
</style>
