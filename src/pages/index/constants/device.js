import HEADING_CONTROL from '@/pages/index/assets/images/HEADING_CONTROL.png'
import FLIGHT_PATH_CONTROL from '@/pages/index/assets/images/FLIGHT_PATH_CONTROL.png'
import CAB_CONTROL from '@/pages/index/assets/images/CAB_CONTROL.png'
import STEERING_ROOM_CONTROL from '@/pages/index/assets/images/STEERING_ROOM_CONTROL.png'
import MANUAL_STEERING from '@/pages/index/assets/images/MANUAL_STEERING.png'
import FOLLOW_THE_RUDDER from '@/pages/index/assets/images/FOLLOW_THE_RUDDER.png'
import AUTOMATIC_STEERING from '@/pages/index/assets/images/AUTOMATIC_STEERING.png'
import AUXILIARY_STEERING from '@/pages/index/assets/images/AUXILIARY_STEERING.png'
import PUMP_COMMON from '@/pages/index/assets/images/PUMP_COMMON.png'

import UN_RUNNING_BG from '@/pages/index/assets/images/UN_RUNNING_bg.png'
import RUNNING_BG from '@/pages/index/assets/images/RUNNING_bg.png'
import OFFLINE_BG from '@/pages/index/assets/images/OFFLINE_bg.png'
import NOT_CONNECTED_BG from '@/pages/index/assets/images/NOT_CONNECTED_bg.png'

import ERROR_ICON from '@/pages/index/assets/images/ERROR_ICON.png'
import SUCCESS_ICON from '@/pages/index/assets/images/SUCCESS_ICON.png'

/**
 * @constant DEVICE_TYPES
 * @description 设备类型
 */
export const DEVICE_TYPES = {
  MAIN_DEVICE: {
    name: '主机',
    value: 'iotHosts',
    type: 'Array',
  },
  ELECTRICS_DEVICE: {
    name: '电机',
    value: 'iotElectrics',
    type: 'Array',
  },
  SERVO_DEVICE: {
    name: '舵机',
    value: 'iotCab',
    type: 'Object',
  },
}

/**
 * @constant MAIN_DEVICE_TYPES
 * @description 主机设备类型
 */
export const MAIN_DEVICE_TYPES = {
  MAIN_PARAMETER: {
    name: '主机参数',
    value: 1,
  },
  EXHAUST_TEMPERATURE: {
    name: '排气温度',
    value: 2,
  },
  MAIN_BEARING_TEMPERATURE: {
    name: '主轴承温度',
    value: 3,
  },
  CONNECTING_ROD_TEMPERATURE: {
    name: '连杆温度',
    value: 4,
  },
}

/**
 * @constant BINDING_STATE
 * @description 绑定状态
 */
export const BINDING_STATE = {
  UN_BINDING: 0, // 未绑定
  BINDING: 1, // 绑定中
}

/**
 * @constant ENABLE_STATE
 * @description 启用状态
 */
export const ENABLE_STATE = {
  UN_ENABLE: 0, // 未启用
  ENABLE: 1, // 已启用
}

/**
 * @constant BIND_TYPE
 * @description 绑定类型
 */
export const BIND_TYPE = {
  BOAT: 1, // 船舶
  PORT: 2, // 港口
}

/**
 * @constant HOST_TYPE
 * @description 主机类型
 */
export const HOST_TYPE = {
  SINGLE: '1', // 单主机
  DOUBLE: '2', // 双主机
}

/**
 * @constant CHART_DATA_TYPE
 * @description 图表数据类型
 */
export const CHART_DATA_TYPE = {
  INT: 0,
  DECIMAL: 1,
  BOOLEAN: 2,
  ALARM: 3,
  STRING: 4,
}

/**
 * @constant CHART_SEARCHABLE_TYPE
 * @description 图表搜索类型
 */
export const CHART_SEARCHABLE_TYPE = {
  ENABLE: '1',
  DISABLE: '2',
}

/**
 * @constant DEVICE_STATUS
 * @description 设备状态枚举
 */
export const DEVICE_STATUS = {
  UN_RUNNING: {
    value: '0',
    name: '停车',
    style: {
      backgroundImage: `url(${UN_RUNNING_BG})`,
      backgroundSize: '100% 100%',
    },
  },
  RUNNING: {
    value: '1',
    name: '运行',
    style: {
      backgroundImage: `url(${RUNNING_BG})`,
      backgroundSize: '100% 100%',
    },
  },
  OFFLINE: {
    value: '2',
    name: '离线',
    style: {
      backgroundImage: `url(${OFFLINE_BG})`,
      backgroundSize: '100% 100%',
    },
  },
  NOT_CONNECTED: {
    value: '3',
    name: '未接入',
    style: {
      backgroundImage: `url(${NOT_CONNECTED_BG})`,
      backgroundSize: '100% 100%',
    },
  },
}

/**
 * @constant SERVO_STATE_PARAM_MAP
 * @description 舵机参数映射
 */
export const SERVO_STATE_PARAM_MAP = {
  HEADING_CONTROL: {
    value: 'HEADING_CONTROL',
    name: '航向控制',
    icon: HEADING_CONTROL,
  },
  FLIGHT_PATH_CONTROL: {
    value: 'FLIGHT_PATH_CONTROL',
    name: '航迹控制',
    icon: FLIGHT_PATH_CONTROL,
  },
  CAB_CONTROL: {
    value: 'CAB_CONTROL',
    name: '驾驶室控制',
    icon: CAB_CONTROL,
  },
  STEERING_ROOM_CONTROL: {
    value: 'STEERING_ROOM_CONTROL',
    name: '舵机房控制',
    icon: STEERING_ROOM_CONTROL,
  },
  MANUAL_STEERING: {
    value: 'MANUAL_STEERING',
    name: '手动操舵',
    icon: MANUAL_STEERING,
  },
  FOLLOW_THE_RUDDER: {
    value: 'FOLLOW_THE_RUDDER',
    name: '随动操舵',
    icon: FOLLOW_THE_RUDDER,
  },
  AUTOMATIC_STEERING: {
    value: 'AUTOMATIC_STEERING',
    name: '自动操舵',
    icon: AUTOMATIC_STEERING,
  },
  AUXILIARY_STEERING: {
    value: 'AUXILIARY_STEERING',
    name: '副站操舵',
    icon: AUXILIARY_STEERING,
  },
  PUMP_GROUP_1: {
    value: 'PUMP_GROUP_1',
    name: '泵组1',
    icon: PUMP_COMMON,
  },
  PUMP_GROUP_2: {
    value: 'PUMP_GROUP_2',
    name: '泵组2',
    icon: PUMP_COMMON,
  },
  BICONVEX: {
    value: 'BICONVEX',
    name: '双泵',
    icon: PUMP_COMMON,
  },
}

/**
 * @constant SHIP_NET_STATE_MAP
 * @description 船舶网络状态映射  1 4G在线，2北斗在线，3无网络
 */
export const SHIP_NET_STATE_MAP = {
  NET_4G: {
    value: 1,
    name: '4G在线',
    icon: SUCCESS_ICON,
    style: {
      color: 'rgba(41, 193, 75, 1)',
    },
  },
  NET_BEIDOU: {
    value: 2,
    name: '北斗在线',
    icon: SUCCESS_ICON,
    style: {
      color: 'rgba(41, 193, 75, 1)',
    },
  },
  NET_OFFLINE: {
    value: 3,
    name: '无网络',
    icon: ERROR_ICON,
    style: {
      color: 'rgba(255, 77, 79, 1)',
    },
  },
}
