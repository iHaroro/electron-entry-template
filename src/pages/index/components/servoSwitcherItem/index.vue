<template>
  <div class="single-device-box">
    <div class="device-title">
      <div>控制状态</div>
    </div>
    <div class="device-state-box">
      <div class="state-cell-box">
        <!--控制状态-->
        <div
          class="state-cell-item"
          :style="getBackgroundStyle(SERVO_STATE_PARAM_MAP.HEADING_CONTROL.icon)"
        >
          <stateSwitcher
            class="state-switcher"
            :checked="Boolean(+deviceControlResult.headingControlSatuts)"
            :title="SERVO_STATE_PARAM_MAP.HEADING_CONTROL.name"
          />
        </div>
        <!--航迹控制-->
        <div
          class="state-cell-item"
          :style="getBackgroundStyle(SERVO_STATE_PARAM_MAP.FLIGHT_PATH_CONTROL.icon)"
        >
          <stateSwitcher
            class="state-switcher"
            :checked="Boolean(+deviceControlResult.trackControlSatuts)"
            :title="SERVO_STATE_PARAM_MAP.FLIGHT_PATH_CONTROL.name"
          />
        </div>
      </div>
      <div class="state-cell-box">
        <!--驾驶室控制-->
        <div
          class="state-cell-item"
          :style="getBackgroundStyle(SERVO_STATE_PARAM_MAP.CAB_CONTROL.icon)"
        >
          <stateSwitcher
            class="state-switcher"
            :checked="Boolean(+deviceControlResult.cabinControlStatus)"
            :title="SERVO_STATE_PARAM_MAP.CAB_CONTROL.name"
          />
        </div>
        <!--舵机房控制-->
        <div
          class="state-cell-item"
          :style="getBackgroundStyle(SERVO_STATE_PARAM_MAP.STEERING_ROOM_CONTROL.icon)"
        >
          <stateSwitcher
            class="state-switcher"
            :checked="Boolean(+deviceControlResult.rudderRoomControlStatus)"
            :title="SERVO_STATE_PARAM_MAP.STEERING_ROOM_CONTROL.name"
          />
        </div>
      </div>
      <div class="state-cell-box">
        <!--手动操舵-->
        <div
          class="state-cell-item"
          :style="getBackgroundStyle(SERVO_STATE_PARAM_MAP.MANUAL_STEERING.icon)"
        >
          <stateSwitcher
            class="state-switcher"
            :checked="Boolean(+deviceControlResult.manualSteeringStatus)"
            :title="SERVO_STATE_PARAM_MAP.MANUAL_STEERING.name"
          />
        </div>
        <!--随动操舵-->
        <div
          class="state-cell-item"
          :style="getBackgroundStyle(SERVO_STATE_PARAM_MAP.FOLLOW_THE_RUDDER.icon)"
        >
          <stateSwitcher
            class="state-switcher"
            :checked="Boolean(+deviceControlResult.followUpSteeringStatus)"
            :title="SERVO_STATE_PARAM_MAP.FOLLOW_THE_RUDDER.name"
          />
        </div>
        <!--自动操舵-->
        <div
          class="state-cell-item"
          :style="getBackgroundStyle(SERVO_STATE_PARAM_MAP.AUTOMATIC_STEERING.icon)"
        >
          <stateSwitcher
            class="state-switcher"
            :checked="Boolean(+deviceControlResult.automaticSteeringStatus)"
            :title="SERVO_STATE_PARAM_MAP.AUTOMATIC_STEERING.name"
          />
        </div>
        <!--副站操舵-->
        <div
          class="state-cell-item"
          :style="getBackgroundStyle(SERVO_STATE_PARAM_MAP.AUXILIARY_STEERING.icon)"
        >
          <stateSwitcher
            class="state-switcher"
            :checked="Boolean(+deviceControlResult.substationSteeringStatus)"
            :title="SERVO_STATE_PARAM_MAP.AUXILIARY_STEERING.name"
          />
        </div>
      </div>
    </div>
    <div class="device-title">
      <div>泵组运行状态</div>
    </div>
    <div class="device-state-box">
      <div class="state-cell-box">
        <!--泵组1-->
        <div
          class="state-cell-item"
          :style="getBackgroundStyle(SERVO_STATE_PARAM_MAP.PUMP_GROUP_1.icon)"
        >
          <stateSwitcher
            class="state-switcher"
            :checked="Boolean(+deviceControlResult.runningPumpSatutsOne)"
            :title="SERVO_STATE_PARAM_MAP.PUMP_GROUP_1.name"
          />
        </div>
        <!--泵组2-->
        <div
          class="state-cell-item"
          :style="getBackgroundStyle(SERVO_STATE_PARAM_MAP.PUMP_GROUP_2.icon)"
        >
          <stateSwitcher
            class="state-switcher"
            :checked="Boolean(+deviceControlResult.runningPumpSatutsTwo)"
            :title="SERVO_STATE_PARAM_MAP.PUMP_GROUP_2.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import stateSwitcher from '@/pages/index/components/stateSwitcher/index.vue'
import { SERVO_STATE_PARAM_MAP } from '@/pages/index/constants/device.js'

defineOptions({ name: 'ServoSwitcherItem' })

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

const deviceControlResult = computed(() => {
  return props.deviceInfo.deviceControlResult || {}
})

const getBackgroundStyle = (path) => {
  return {
    backgroundImage: `url(${path})`,
  }
}

// const deviceParamData = computed(() => {
//   return props.deviceInfo.data || {}
// })
</script>

<style scoped lang="scss">
.single-device-box {
  box-sizing: border-box;
  height: vh(843);
  padding: vh(11) vw(25) vh(25);
  background-image: url('../../assets/images/servo_device_bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .device-title {
    position: relative;
    display: flex;
    align-items: center;
    height: vh(38);
    padding-left: vw(29);
    margin-bottom: vh(23);
    background-image: url('../../assets/images/tab_bg_small.png');
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
      background-image: url('../../assets/images/start_arr_icon.png');
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .device-state-box {
    .state-cell-box {
      display: flex;
      align-items: center;

      .state-cell-item {
        position: relative;
        width: vw(152);
        height: vh(115);
        margin-right: vw(14);
        margin-bottom: vh(19);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;

        &:nth-child(4n) {
          margin-right: 0;
        }

        .state-switcher {
          position: absolute;
          left: 50%;
          bottom: vh(14);
          transform: translateX(-50%);
        }
      }
    }
  }
}
</style>
