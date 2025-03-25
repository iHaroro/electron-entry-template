<template>
  <div class="alarm-info-list">
    <template v-if="list?.length">
      <template v-for="(item, index) in list" :key="`alarm-info-list-item-${item.id}`">
        <div class="alarm-info-list-item" v-if="index < 4" @click="openWarningDetail(item)">
          <div class="cell-item_top">
            <div class="cell-item_top-left">
              <div class="cell-item_top-icon"></div>
              <span class="cell-item_top-title">设备名称：{{ item.name }}</span>
            </div>
            <span class="cell-item_top-date">时间：{{ item.alarmTime }}</span>
          </div>
          <div class="cell-item_bottom">
            <p class="cell-item_bottom-title text-overflow" :title="item.content">
              {{ item.content }}
            </p>
            <img
              v-if="showArrow"
              class="cell-item_bottom-icon"
              :src="rightArrIcon"
              alt="点击查看"
            />
          </div>
        </div>
      </template>
    </template>
    <empty v-else class="list-empty" />
    <!--报警详情-->
    <!--<alarmInfoDetails ref="alarmInfoDetailsRef" />-->
  </div>

  <!-- 报警详情 -->
  <Dialog ref="warnDialogRef" title="报警详情">
    <div class="warning-detail-content">
      <div class="warning-detail-item">
        <div class="waring-detail-key">设备名称：</div>
        <div class="warning-detail-value">{{ currentWarnDetail.name }}</div>
      </div>
      <div class="warning-detail-item">
        <div class="waring-detail-key">报警时间：</div>
        <div class="warning-detail-value">{{ currentWarnDetail.alarmTime }}</div>
      </div>
      <div class="warning-detail-item">
        <div class="waring-detail-key">报警内容：</div>
        <div class="warning-detail-value">{{ currentWarnDetail.content }}</div>
      </div>
      <div class="warning-detail-item">
        <div class="waring-detail-key">设备数据：</div>
        <div class="warning-detail-value">
          <template v-if="currentWarnDetail.deviceParam || currentWarnDetail.deviceValue">
            {{ currentWarnDetail.deviceParam }}({{ currentWarnDetail.deviceValue || '--' }})
          </template>
          <template v-else> --</template>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
// import alarmInfoDetails from '@/components/alarmInfoDetails'
import rightArrIcon from '@/assets/images/arr_right_icon.png'
import empty from '@/components/empty'
import Dialog from '@/components/dialog'
import { setAlarmRead } from '@/api/monitor.js'

defineOptions({ name: 'AlarmInfoCellItem' })

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  showArrow: {
    type: Boolean,
    default: false,
  },
})

const warnDialogRef = ref(null)
const currentWarnDetail = ref({})

/**
 * @function openWarningDetail
 * @description 打开报警详情
 * @param {object} data 报警详情
 **/
const openWarningDetail = (data) => {
  currentWarnDetail.value = data
  console.log(data)
  setAlarmRead({ id: data.id })
  warnDialogRef.value.open()
}

// const alarmInfoDetailsRef = useTemplateRef('alarmInfoDetailsRef')
// const goAlarmInfoDetail = (item) => {
//   console.log(item)
//   alarmInfoDetailsRef.value.open(item)
// }
</script>

<style scoped lang="scss">
.alarm-info-list {
  overflow-y: auto;
  width: 100%;
  margin: 0 auto;

  .alarm-info-list-item {
    padding: vh(8) vw(12) vh(8) vw(16);
    cursor: pointer;
    margin-bottom: vh(8);
    background-color: rgba(54, 109, 135, 0.21);

    .cell-item_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: vh(2);

      .cell-item_top-left {
        display: flex;
        align-items: center;

        .cell-item_top-icon {
          width: vw(14);
          height: vw(14);
          margin-right: vw(4);
          background-image: url('@/assets/images/alarm_list_item_icon.png');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center center;
        }

        .cell-item_top-title {
          margin-right: vw(40);
          font-weight: 500;
          font-size: vh(14);
          color: #00fcee;
          line-height: vh(20);

          &:not(:first-of-type) {
            margin-right: 0;
          }
        }
      }

      .cell-item_top-date {
        font-weight: 400;
        font-size: vh(10);
        color: rgba(221, 240, 246, 0.4);
        line-height: vh(20);
      }
    }

    .cell-item_bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .cell-item_bottom-title {
        padding-left: vw(18);
        font-size: vh(14);
        font-weight: 400;
        color: rgba(255, 162, 23, 1);
        line-height: vh(20);
      }
    }
  }

  .list-empty {
    margin-top: vh(50);
  }
}
</style>
