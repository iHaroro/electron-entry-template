<template>
  <PageLayout>
    <div class="alarm-info-box">
      <div class="top-box">
        <div class="top-title">
          <span class="top-title_title">报警信息</span>
        </div>
      </div>
      <div class="page-container">
        <div class="table-page-box">
          <div class="search-box">
            <a-select
              ref="select"
              v-model:value="deviceType"
              class="custom-from-item"
              allow-clear
              placeholder="请选择设备"
            >
              <a-select-option v-for="boat in deviceTypeList" :value="boat.code" :key="boat.code">
                {{ boat.name }}
              </a-select-option>
            </a-select>

            <a-range-picker v-model:value="date" class="custom-from-item" allow-clear />

            <div class="reset-btn" @click="resetHandler">
              <img class="btn-icon" src="@/assets/images/export_icon.png" alt="" />
              导出历史
            </div>

            <div class="reset-btn" @click="resetHandler">
              <img class="btn-icon" src="@/assets/images/reset_icon.png" alt="" />
              重置
            </div>
            <div class="confirm-btn" @click="confirmHandler">
              <img class="btn-icon" src="@/assets/images/confirm_icon.png" alt="" />
              确认
            </div>
          </div>

          <div class="table-box">
            <a-table
              class="custom-main-table table-list"
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
            </a-table>
            <a-pagination
              class="custom-pagination pagination"
              v-model:current="pageNum"
              :total="total"
              @change="paginationChangeHandler"
            />
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import PageLayout from '@/components/pageLayout'
import Empty from '@/components/empty/index.vue'
import dayjs from 'dayjs'
import { onMounted, provide, ref } from 'vue'
import { BOAT_INFO } from '@/provide/boat.js'
import { useBoatInfo } from '@/composables/useBoatInfo.js'
import { getColumns } from './columns.jsx'
import { getDeviceAlarmList } from '@/api/device'
import { getDictName } from '@/api/public'

defineOptions({ name: 'AlarmInfoPage' })

const loading = ref(false)
const mmsi = ref(null)
const deviceType = ref(null)
const deviceTypeList = ref([])
const date = ref([])
const dataSource = ref([])
const total = ref(500)
const pageNum = ref(1)
const pageSize = ref(10)
const columns = getColumns()

const { boatInfo } = useBoatInfo()

provide(BOAT_INFO, {
  boatInfo
})

/**
 * @function setDefaultBoat
 * @description 设置默认船舶
 **/
const setDefaultBoat = () => {
  mmsi.value = boatInfo.value.mmsi
}

/**
 * @function resetHandler
 * @description 重置事件
 **/
const resetHandler = () => {
  pageNum.value = 1
  pageSize.value = 10
  deviceType.value = null
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

const paginationChangeHandler = (page, pageSizes) => {
  pageNum.value = page
  pageSize.value = pageSizes
  getTableList()
}

/**
 * @function getDict
 * @description 获取字典数据
 **/
const getDict = () => {
  getDictName({ type: ['device_type'] }).then((res) => {
    deviceTypeList.value = res.data.device_type
  })
}

const getTableList = () => {
  loading.value = true
  const [startDate, endDate] = date.value || []
  getDeviceAlarmList({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    mmsi: mmsi.value,
    deviceType: deviceType.value,
    name: '',
    startDate: startDate ? dayjs(startDate).format('YYYY-MM-DD') : '',
    endDate: endDate ? dayjs(endDate).format('YYYY-MM-DD') : ''
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
  resetHandler()
})
</script>

<style scoped lang="scss">
.alarm-info-box {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .top-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: vh(48);
    margin-top: vh(15);

    .top-title {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: vh(44);
      margin: 0 vw(11);
      text-align: center;
      color: rgba(221, 240, 246, 1);
      letter-spacing: vw(2);
      background-image: url('@/assets/images/device_top_component_title.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;

      .top-title_title {
        font-family: YouSheBiaoTiHei;
        font-size: vh(24);
        letter-spacing: vw(2);
      }
    }
  }

  .page-container {
    width: 100%;
    margin-top: vh(15);

    .table-page-box {
      box-sizing: border-box;
      height: vh(840);
      padding: vh(32) vw(42) vh(36);
      border: 1px solid;
      border-image: linear-gradient(317deg, rgba(0, 254, 248, 0), rgba(0, 252, 238, 1)) 1 1;

      .search-box {
        display: flex;
        align-items: center;

        .custom-from-item {
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
          //border-radius: 6px;
          margin-right: vw(8);

          .btn-icon {
            height: vh(22);
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
          height: vh(600);

          .empty-box {
            margin-top: vh(120);
            margin-bottom: vh(120);
          }
        }

        .pagination {
          margin-top: vh(45);
          text-align: right;
        }
      }
    }
  }
}
</style>