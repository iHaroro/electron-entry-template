import dayjs from 'dayjs'
import { md5 } from 'js-md5'

/**
 * @constant baseMapUrl
 * @description 瓦片地址
 */
export const baseMapUrl = 'https://emb.data.myvessel.cn/microapps/app-map-w'

/**
 * @constant appId
 * @description 应用ID
 */
export const appId = 'djyskjahyxgs_app03'

/**
 * @constant appSecret
 * @description 应用密钥
 */
export const appSecret = '4c6cf3a8b70502a3b35fdc3a5351e085'

/**
 * @constant rand
 * @description 固定随机数（建议项目级别的固定值）
 */
export const rand = 'c7a26a27c98641b89d5d5e0b626598cc'

/**
 * @function getAuthKey
 * @description 获取鉴权authKey
 * @returns {string} 鉴权密钥
 **/
export const getAuthKey = () => {
  const timestamp = dayjs().endOf('hour').unix() // 签算服务器生成鉴权 URL 的时间
  const md5Hash = md5(`${timestamp}-${rand}-${appId}-${appSecret}`) // md5 加密
  return `${timestamp}-${rand}-${appId}-${md5Hash}` // 计算出来的鉴权密钥
}

/**
 * @constant MAP_TYPE
 * @description 地图类型
 */
export const MAP_TYPE = {
  ocean: {
    desc: '海图',
    type: 'ocean',
  },
  landsea: {
    desc: '海陆图',
    type: 'landsea',
  },
  normal: {
    desc: '常规地图',
    type: 'normal',
  },
  satellite: {
    desc: '卫星图',
    type: 'satellite',
  },
}

/**
 * @constant PANEL_TYPE
 * @description 面板类型
 */
export const PANEL_TYPE = {
  VESSEL: 'vessel', // 船舶
  PORT: 'port', // 港口
}

/**
 * @constant HANDLE_EVENT_MAP
 * @description 嵌入页面触发事件的type字段返回值枚举
 */
export const HANDLE_EVENT_MAP = {
  ON_MAP_READY: 'ON_MAP_READY', //地图加载完成
  ON_VESSEL_SEARCH: 'ON_VESSEL_SEARCH', //返回搜船信息
  ON_PORT_SEARCH: 'ON_PORT_SEARCH', //返回搜港信息
  ON_DRAW_VESSELS: 'ON_DRAW_VESSELS', //批量画船 返回批量mmsi信息
  ON_CLICK_VESSEL: 'ON_CLICK_VESSEL', //返回用户点击船舶事件 显示船舶信息 返回船舶信息
  ON_CLICK_PORT: 'ON_CLICK_PORT', //点击港口 显示港口信息 返回港口信息
  ON_CLICK_POSITION: 'ON_CLICK_POSITION', //点击marker位置 返回marker项
  ON_MAP_MOVE: 'ON_MAP_MOVE', //地图移动事件
  ON_MAP_ZOOM: 'ON_MAP_ZOOM', //地图缩放事件
  ON_MAP_TILE: 'ON_MAP_TILE', //切换地图图层事件
  ON_MAP_CLICK: 'ON_MAP_CLICK', //地图点击事件
  CLOSE_INFO_PANEL: 'CLOSE_INFO_PANEL', //关闭船或港的信息面板
  CLICK_CUSTOM_BUTTON: 'CLICK_CUSTOM_BUTTON', //点击右侧自定义工具条
  ON_DRAW_END: 'ON_DRAW_END', //结束图形绘制且返回绘制数据
}

/**
 * @constant EMIT_EVENT_MAP
 * @description 发送消息到嵌入页面的type字段值枚举
 */
export const EMIT_EVENT_MAP = {
  MAP_SETTING: 'MAP_SETTING', //地图配置
  DRAW_POSITIONS: 'DRAW_POSITIONS', //传入marker数据数组 画标记
  REMOVE_POSITIONS: 'REMOVE_POSITIONS', //传入marker经纬度数组 移除标记
  CHANGE_MAP_TYPE: 'CHANGE_MAP_TYPE', //控制地图切换
  MAP_CENTER: 'MAP_CENTER', //地图控制中心
  DRAW_AREA: 'DRAW_AREA', //传入区域数据画区域
  REMOVE_AREAS: 'REMOVE_AREAS', //传入区域id移除区域
  MAP_CLEAR: 'MAP_CLEAR', //清除地图上元素
  START_DRAW: 'START_DRAW', //开始绘制图形
  END_DRAW: 'END_DRAW', //结束绘制图形'
  VESSEL_SEARCH: 'VESSEL_SEARCH', //发送mmsi 查询船舶信息
  PORT_SEARCH: 'PORT_SEARCH', //发送港口代码 查询港口信息
  DRAW_VESSELS: 'DRAW_VESSELS', //传入mmsi数组 批量画船
  REMOVE_VESSELS: 'REMOVE_VESSELS', //传入mmsi数组 批量移除船
  DRAW_PORTS: 'DRAW_PORTS', //传入portCodes数组 批量画港
  REMOVE_PORTS: 'REMOVE_PORTS', //移除港口
  SHOW_VESSEL_POINTS: 'SHOW_VESSEL_POINTS', //显示船舶绿点
  SHOW_PORT_POINTS: 'SHOW_PORT_POINTS', //显示港口黄点
  HIDE_VESSEL_POINTS: 'HIDE_VESSEL_POINTS', //关闭船舶绿点
  HIDE_PORT_POINTS: 'HIDE_PORT_POINTS', //关闭港口黄点
  SHOW_TILE: 'SHOW_TILE', //显示区域
  HIDE_TILE: 'HIDE_TILE', //隐藏区域
  SHIP_TOGGLE_NAME: 'SHIP_TOGGLE_NAME', //船名显隐
  CLEAR_VESSEL_SELECTED_STATUS: 'CLEAR_VESSEL_SELECTED_STATUS', // 清除船舶选中的状态
  // 未授权
  DRAW_LINES: 'DRAW_LINES', //传入轨迹数据画轨迹
  // 未授权
  REMOVE_LINES: 'REMOVE_LINES', //传入轨迹id移除轨迹
  // 未授权
  VESSEL_TRACK_SEARCH: 'VESSEL_TRACK_SEARCH', //查询历史航迹
  // 未授权
  HIDE_RIGHT_TOOLBAR: 'HIDE_RIGHT_TOOLBAR', //右侧工具显隐
  // 未授权
  VESSEL_CURRENT_TRACK: 'VESSEL_CURRENT_TRACK', //绘制船舶当前轨迹
  // 未授权
  VESSEL_TRACK_PARAMS: 'VESSEL_TRACK_PARAMS', //轨迹参数
  // 未授权
  CLEAR_TRACK: 'CLEAR_TRACK', //清除当前或历史轨迹
  // 未授权
  SHOW_RIGHT_CUSTOM: 'SHOW_RIGHT_CUSTOM', //显示右侧自定义工具条
  // 未授权
  SHOW_HEATMAP: 'SHOW_HEATMAP', //显示航线热力图
  // 未授权
  HIDE_HEATMAP: 'HIDE_HEATMAP', //隐藏航线热力图
}
