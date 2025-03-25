import { noop } from '@/utils/utils'
// import { message } from 'ant-design-vue'

/**
 * @constant IWNDOW_TYPES
 * @description 屏幕分割数量
 */
export const IWNDOW_TYPES = {
  ['1*1']: 1, // 1行1列
  ['2*2']: 2, // 2行2列
  ['3*3']: 3, // 3行3列
  ['4*4']: 4, // 4行4列
}

/**
 * @constant HTTP_TYPE
 * @description http类型
 */
export const HTTP_TYPE = {
  HTTP: '1',
  HTTPS: '2',
}

/**
 * @constant STREAM_TYPE
 * @description 码流类型
 */
export const STREAM_TYPE = {
  MAIN_STREAM: 1, // 主码流
  SUB_STREAM: 2, // 子码流
}

/**
 * @function initCamera
 * @description 初始化摄像头
 * @param {object} options 配置参数
 * @param {string} options.eleId 插件挂载的dom元素id
 * @param {function} options.beforeInit 初始化之前的回调
 * @param {function} options.initError 初始化失败的回调
 * @param {function} options.initSuccess 初始化成功的回调
 * @param {function} options.initComplete 初始化完成的回调
 **/
export const initCamera = async ({
  eleId = '',
  cameraList = [],
  beforeInit = noop,
  initError = noop,
  initSuccess = noop,
  initComplete = noop,
}) => {
  beforeInit()
  try {
    await startPlugin(eleId)
    await cameraListLogin(cameraList)
    await cameraListPreview(cameraList)
    initSuccess()
  } catch (error) {
    initError(error)
  } finally {
    initComplete()
  }
}

/**
 * @function startPlugin
 * @description 启动插件
 * @param {string} eleId 插件挂载的dom元素id
 **/
export const startPlugin = (eleId) => {
  return new Promise((resolve, reject) => {
    window.WebVideoCtrl.I_InitPlugin({
      iWndowType: IWNDOW_TYPES['1*1'],
      bWndFull: true, //是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
      bDebugMode: true, //是否支持调试模式，默认不支持 true:支持 false:不支持
      cbInitPluginComplete: function () {
        window.WebVideoCtrl.I_InsertOBJECTPlugin(eleId).then(
          () => {
            // 检查插件是否最新
            resolve()
            window.WebVideoCtrl.I_CheckPluginVersion().then((bFlag) => {
              if (bFlag) {
                // 提示用户安装最新的HCWebSDKPlugin.exe
                // message.warning("请安装最新的HCWebSDKPlugin.exe")
              }
            })
          },
          () => {
            reject()
            // 初始化失败，提示用户安装最新的HCWebSDKPlugin.exe
            // message.warning("请安装最新的HCWebSDKPlugin.exe")
          },
        )
      },
    })
  })
}

/**
 * @function
 * @description
 * @param {object} config 摄像头配置参数
 * @param {string} config.ip 摄像头ip
 * @param {string} config.protocol 摄像头协议
 * @param {string} config.port 摄像头端口
 * @param {string} config.userName 摄像头用户名
 * @param {string} config.password 摄像头密码
 **/
export const login = (config) => {
  return new Promise((resolve, reject) => {
    const { ip, protocol, port, userName, password } = config
    window.WebVideoCtrl.I_Login(ip, protocol, port, userName, password, {
      success: () => {
        resolve()
      },
      error: () => {
        console.log(`登录失败：${userName}`)
        reject()
      },
    })
  })
}

/**
 * @function cameraListLogin
 * @description 登录摄像头列表
 * @param {object} cameraList 摄像头配置列表
 * @returns {promise}
 **/
export const cameraListLogin = (cameraList) => {
  const promiseMap = cameraList.map((item) => {
    return login(item)
  })
  return Promise.all(promiseMap)
}

/**
 * @function preview
 * @description 预览摄像头
 * @param {config} config 摄像头配置参数
 * @return {promise}
 **/
export const preview = (config) => {
  return new Promise((resolve, reject) => {
    const { ip, port, window } = config
    top.window.WebVideoCtrl.I_StartRealPlay(`${ip}_${port}`, {
      iWndIndex: window,
      iStreamType: STREAM_TYPE.MAIN_STREAM,
      iChannelID: 1,
      bZeroChannel: false,
      async: true,
      timeout: 900,
      success: () => {
        resolve()
      },
      error: () => {
        console.log('预览失败')
        reject()
      },
    })
  })
}

/**
 * @function cameraListPreview
 * @description 预览摄像头列表
 * @param {object} cameraList 摄像头配置列表
 * @returns {promise}
 **/
export const cameraListPreview = (cameraList) => {
  const promiseMap = cameraList.map((item, index) => {
    return preview({
      ...item,
      window: index,
    })
  })
  return Promise.all(promiseMap)
}

/**
 * @function stopPreview
 * @description 停止预览
 * @param {function} callBack 回调函数
 **/
export const stopAllPreview = (callBack) => {
  window.WebVideoCtrl.I_StopAllPlay().then(() => callBack?.())
}

/**
 * @function loginOut
 * @description 注销所有摄像头
 * @param {array} cameraList 摄像头配置列表
 **/
export const loginOut = (cameraList) => {
  cameraList.forEach((item) => {
    window.WebVideoCtrl.I_Logout(`${item.ip}_${item.port}`)
  })
}

/**
 * @function destroyPlugin
 * @description 销毁插件
 **/
export const destroyPlugin = () => {
  window.WebVideoCtrl.I_DestroyPlugin()
}
