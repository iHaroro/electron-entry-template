import startProcessIcon from '@/pages/monitor/assets/images/start_process.png'
import waitingProcessIcon from '@/pages/monitor/assets/images/waiting_process.png'
import endedProcessIcon from '@/pages/monitor/assets/images/ended_process.png'

/**
 * @constant PROCESSING_STATE_MAP
 * @description 处理状态映射
 * @property {string} CORRECTED 已纠正
 * @property {string} UN_PROCESSED 未处理
 * @property {string} PROCESSED 已处理
 * @property {string} CAPTAIN_UN_PROCESSED 船长未处理
 * @property {string} CAPTAIN_PROCESSED 船长已处理
 */
export const PROCESSING_STATE_MAP = {
  CORRECTED: {
    value: 'CORRECTED',
    label: '已纠正'
  },
  UN_PROCESSED: {
    value: 'UN_PROCESSED',
    label: '未处理'
  },
  PROCESSED: {
    value: 'PROCESSED',
    label: '已处理'
  },
  CAPTAIN_UN_PROCESSED: {
    value: 'CAPTAIN_UN_PROCESSED',
    label: '船长未处理'
  },
  CAPTAIN_PROCESSED: {
    value: 'CAPTAIN_PROCESSED',
    label: '船长已处理'
  }
}

/**
 * @constant WARN_PROCESSING_STATE_MAP
 * @description 告警处理状态映射
 */
export const WARN_PROCESSING_STATE_MAP = {
  // 船长未处理
  SHIP_UN_PROCESSED: {
    value: '2',
    label: '船端未处理',
    icon: waitingProcessIcon,
  },
  // 船长已处理
  SHIP_PROCESSED: {
    value: '3',
    label: '船长已处理',
    icon: endedProcessIcon,
  },
  // 船长处理误报警
  SHIP_FAULT: {
    value: '0',
    label: '系统误报警',
    icon: endedProcessIcon,
  },
  // 岸基未处理
  SHORE_UN_PROCESSED: {
    value: '4',
    label: '岸基未处理',
    icon: waitingProcessIcon,
  },
  // 岸基已处理
  SHORE_PROCESSED: {
    value: '5',
    label: '岸基已处理',
    icon: endedProcessIcon,
  },
  // 岸基处理误报警
  SHORE_FAULT: {
    value: '1',
    label: '系统误报警',
    icon: endedProcessIcon,
  }
}