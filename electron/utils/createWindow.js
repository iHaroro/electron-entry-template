import { BrowserWindow } from 'electron'
import { setMenu } from '@electron/utils/menuTemplate'
import { preloadPath, iconPath } from '@/config'

/**
 * @function createCustomWindow
 * @description 创建自定义窗口
 * @param {object} options - 自定义窗口选项
 * @param {number} [options.width=1920] - 窗口宽度
 * @param {number} [options.height=1080] - 窗口高度
 * @param {string} [options.icon=path.join(__dirname, '../../images/icon.ico')] - 窗口图标路径
 * @param {boolean} [options.frame=true] - 是否显示窗口边框
 * @param {boolean} [options.devTools=true] - 是否启用开发者工具
 * @param {boolean} [options.nodeIntegration=true] - 是否启用 Node.js 集成
 * @param {boolean} [options.nodeIntegrationInWorker=true] - 是否启用 Node.js 集成在工作线程中
 * @param {boolean} [options.enableRemoteModule=true] - 是否启用远程模块
 * @param {boolean} [options.sandbox=false] - 是否启用沙盒
 * @param {object} [options.webPreferences] - 窗口 Web 内容的偏好设置
 * @param {string} [options.webPreferences.preload=path.join(__dirname, '../../src/preload.js')] - 预加载脚本路径
 * @param {boolean} [options.showMenu=true] - 是否显示菜单
 * @returns {BrowserWindow} - 创建的自定义窗口实例
 **/
export const createCustomWindow = (options = {}) => {
  
  const defaultOptions = {
    width: 1920,
    height: 1080,
    icon: iconPath,
    frame: true,
    devTools: true,
    nodeIntegration: true, // 允许渲染进程使用 Node.js API
    nodeIntegrationInWorker: true, // 允许工作线程使用 Node.js API
    enableRemoteModule: true, // 允许渲染进程使用远程模块
    sandbox: false, // 沙盒模式，防止渲染进程访问系统资源
    webPreferences: {
      preload: preloadPath,
      webSecurity: false
    },
    ...options
  };
  
  const {
    showMenu = true,
    ...windowOptions
  } = defaultOptions;
  const newWindow = new BrowserWindow(windowOptions);
  
  // 根据选项设置菜单
  if (showMenu) {
    setMenu(newWindow);
  }
  
  return newWindow;
};