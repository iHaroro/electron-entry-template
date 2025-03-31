<template>
  <div class="single-device-box">
    <div class="device-title">
      <div>{{ deviceInfo.name }}</div>
    </div>

    <div class="single-device-title">
      <div class="device-run-state-box">
        <div class="device-info-run-time">
          <span>累计运行时长：</span>
          <span class="device-info-run-time_time">{{ deviceParamData['runningTime']?.value || '--' }}</span>
          <span>{{ deviceParamData['runningTime']?.unit || '' }}</span>

          <span class="m-l-32">回转转速：</span>
          <span class="device-info-run-time_time">{{ deviceParamData['rotationSpeed']?.value || '--' }}</span>
          <span>{{ deviceParamData['rotationSpeed']?.unit }}</span>

          <span class="m-l-32">航向：</span>
          <span class="device-info-run-time_time">{{ deviceParamData['course']?.value || '--' }}</span>
          <span>{{ deviceParamData['course']?.unit }}</span>
        </div>

        <div v-if="deviceInfo.status" class="device-state-box">
          <span class="state-btn" :style="deviceStatus?.style">
            {{ deviceStatus?.name }}
          </span>
        </div>
      </div>
    </div>

    <div class="single-device-info">
      <div class="single-device-info-right">
        <div class="dashboard-content">
          <div class="dashboard-box">
            <dashboardServo :model-value="deviceParamData['rudderAngle'].value" />
          </div>
          <!--<div class="bg-box"></div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dashboardServo from '@/components/dashboardServo'
import { computed } from 'vue'
import { getValueMapFromMap } from '@/utils/utils.js'
import { DEVICE_STATUS } from '@/constants/device.js'

defineOptions({ name: 'ServoDeviceItem' })

const props = defineProps({
  deviceInfo: {
    type: Object,
    default: () => ({}),
  },
  threshold: {
    type: Object,
    default: () => ({}),
  },
})

const deviceParamData = computed(() => {
  return props.deviceInfo.data || {}
})

const deviceStatus = computed(() => {
  const mapValue = getValueMapFromMap(DEVICE_STATUS)
  return mapValue[props.deviceInfo.status]
})

// const runtimeComputed = computed(() => {
//   const createTime = new Date(props.deviceInfo.time).getTime()
//   const nowTime = Date.now()
//   const time = Math.floor((nowTime - createTime) / 1000 / 60 / 60)
//   return `${time} 小时`
// })
</script>

<style scoped lang="scss">
.single-device-box {
  box-sizing: border-box;
  height: vh(843);
  padding: vh(11) vw(25) vh(25);
  background-image: url('@/assets/images/servo_device_bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .device-title {
    position: relative;
    display: flex;
    align-items: center;
    height: vh(38);
    padding-left: vw(29);
    margin-bottom: vh(14);
    background-image: url('@/assets/images/tab_bg_small.png');
    background-size: 100% vh(16);
    background-position: left bottom;
    background-repeat: no-repeat;
    font-weight: 400;
    font-size: vh(16);
    color: rgba(0, 252, 238, 1);
    line-height: vh(22);
    letter-spacing: 1px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: calc(50% - 1px);
      width: vw(18);
      height: vh(13);
      transform: translateY(-50%);
      background-image: url('@/assets/images/start_arr_icon.png');
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .single-device-title {
    margin-bottom: vh(115);

    .device-info-tab {
      box-sizing: border-box;
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: vh(30);
      padding-left: vw(20);
      margin-bottom: vh(25);
      background-image: url('@/assets/images/tab_bg_large.png');
      background-size: 100% vh(16);
      background-position: left bottom;
      background-repeat: no-repeat;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: calc(50% - 1px);
        width: vw(18);
        height: vh(13);
        transform: translateY(-50%);
        background-image: url('@/assets/images/start_arr_icon.png');
        background-repeat: no-repeat;
        background-size: contain;
      }

      .device-info-tab_item {
        position: relative;
        cursor: pointer;
        height: 100%;
        font-weight: 400;
        font-size: vh(16);
        color: rgba(0, 252, 238, 0.4);
        line-height: vh(22);
        letter-spacing: 1px;
        text-align: left;
        font-style: normal;
        margin: 0 vw(18);

        &.active {
          color: rgba(0, 252, 238, 1);

          &::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: vh(-3);
            transform: translateX(-50%) translateY(-50%);
            width: vw(35);
            height: vh(4);
            background-color: rgba(0, 252, 238, 1);
          }
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .device-run-state-box {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: vh(24);

      .device-info-run-time {
        position: relative;
        display: flex;
        align-items: center;
        height: vh(24);
        padding-left: vw(13);
        font-weight: 400;
        font-size: vh(16);
        color: rgba(221, 240, 246, 1);
        text-align: left;
        font-style: normal;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: vw(5);
          height: vh(24);
          background-image: url('@/assets/images/title_start_icon.png');
          background-repeat: no-repeat;
          background-size: vw(5) vh(18);
          background-position: center center;
        }

        .device-info-run-time_time {
          font-family: '庞门正道标题体3.0';
          color: rgba(255, 162, 23, 1);
          text-align: left;
          letter-spacing: 1px;
          font-style: normal;
        }
      }

      .device-state-box {
        .state-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: vw(68);
          height: vh(26);
          padding: 0 vw(13);
          font-weight: 400;
          font-size: vh(14);
          line-height: vh(26);
          border-radius: 4px;
          color: rgba(221, 240, 246, 1);
        }
      }
    }
  }

  .device-info-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: vh(60);
    margin-bottom: vh(60);
    background-color: rgba(54, 109, 135, 0.21);

    .device-info {
      margin-right: vw(220);
      font-weight: 400;
      font-size: vh(24);
      color: rgba(221, 240, 246, 1);
      line-height: vh(33);

      .value {
        font-size: vh(28);
        color: rgba(0, 252, 238, 1);
        line-height: vh(33);
        letter-spacing: 1px;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .single-device-info {
    display: flex;

    .single-device-info-left {
      overflow-y: auto;
      position: relative;
      box-sizing: border-box;
      width: vw(611);
      height: vh(700);
      padding: vh(20) vw(20) 0;
      background: linear-gradient(180deg, rgba(52, 88, 155, 0.27) 0%, rgba(48, 97, 219, 0.29) 100%);

      .single-device-info-left_content {
        .state-title {
          margin-bottom: vh(10);
          font-weight: 500;
          font-size: vh(20);
          color: #ffffff;
          text-shadow: vh(0) vw(3) 12px #19576d;

          &:not(:first-of-type) {
            margin-top: vh(20);
          }
        }

        .state-switch-box {
          display: flex;
          flex-wrap: wrap;

          .switch-item {
            margin-right: vw(30);
            margin-bottom: vh(10);
            cursor: not-allowed;

            &:nth-child(4n) {
              margin-right: vh(0);
            }

            .state-item-title {
              text-align: center;
              margin-top: vh(10);
              font-weight: 400;
              font-size: vh(16);
              color: rgba(255, 255, 255, 0.85);
              text-shadow: vh(0) vw(3) 12px #19576d;
            }
          }
        }
      }
    }

    .single-device-info-right {
      position: relative;
      flex: 1;

      .dashboard-content {
        position: relative;

        .dashboard-box {
          margin: 0 auto;
          width: vh(450);
          height: vh(450);
        }

        //.bg-box {
        //  position: absolute;
        //  left: 50%;
        //  bottom: vh(-100);
        //  transform: translateX(-50%);
        //  width: vw(478);
        //  height: vh(263);
        //  background-image: url('@/assets/images/servo_dashboard_bg.png');
        //  background-position: bottom center;
        //  background-repeat: no-repeat;
        //  background-size: 100%;
        //}
      }
    }
  }
}

.m-l-32 {
  margin-left: vw(32);
}
</style>
