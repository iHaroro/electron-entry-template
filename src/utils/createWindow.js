import { BrowserWindow } from 'electron'
import { setMenu } from '@/utils/menuTemplate'
import { preloadPath, iconPath } from '@/config'

/**
 * @function createCustomWindow
 * @description 创建自定义窗口
 * @param {object} options - 自定义窗口选项
 * @param {string} [options.icon=path.join(__dirname, '../../images/icon.ico')] - 窗口图标路径
 * @param {number} [options.width=1920] - 窗口宽度
 * @param {number} [options.height=1080] - 窗口高度
 * @param {boolean} [options.frame=true] - 是否显示窗口边框
 * @param {boolean} [options.resizable=false] - 是否允许用户调整窗口大小
 * @param {boolean} [options.fullscreen=false] - 是否全屏显示窗口
 * @param {object} [options.webPreferences] - 窗口 Web 内容的偏好设置
 * @param {boolean} [options.webPreferences.sandbox=false] - 是否启用沙盒
 * @param {boolean} [options.webPreferences.devTools=true] - 是否启用开发者工具
 * @param {boolean} [options.webPreferences.nodeIntegration=true] - 是否启用 Node.js 集成
 * @param {boolean} [options.webPreferences.nodeIntegrationInWorker=true] - 是否启用 Node.js 集成在工作线程中
 * @param {string} [options.webPreferences.preload=path.join(__dirname, '../../src/preload.js')] - 预加载脚本路径
 * @param {string} [options.webPreferences.webSecurity=false] - 是否启用同源策略
 * @returns {BrowserWindow} - 创建的自定义窗口实例
 **/
export const createCustomWindow = (options = {}) => {
  const defaultOptions = {
    icon: iconPath, // 窗口图标路径 默认 icon.ico
    width: 1920, // 窗口宽度 默认 1920
    height: 1080, // 窗口高度 默认 1080
    frame: true, // 是否显示窗口边框 默认 true
    resizable: false, // 是否允许用户调整窗口大小 默认 true
    fullscreen: false, // 是否全屏显示窗口 默认 false
    webPreferences: {
      sandbox: false, // 沙盒模式，防止渲染进程访问系统资源
      devTools: true, // 启用开发者工具
      nodeIntegration: true, // 允许渲染进程使用 Node.js API
      nodeIntegrationInWorker: true, // 允许工作线程使用 Node.js API
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