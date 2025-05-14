import { app, BrowserWindow } from 'electron'
import started from 'electron-squirrel-startup'
import { createCustomWindow } from '@/utils/createWindow'
import { initIpcHandles } from '@/ipcMain/handle'
import { initIpcOns } from '@/ipcMain/on'
import { shipAppEntryPath, shipAppDevPath } from './config'

// 安装/卸载时处理在 Windows 上创建/删除快捷方式。
if (started) {
  console.log('started')
  app.quit()
}

let mainWindow = null

const createWindow = () => {
  // 创建浏览器窗口。
  mainWindow = createCustomWindow()
  
  // 并加载应用程序的 index.html
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(shipAppDevPath)
  } else {
    mainWindow.loadFile(shipAppEntryPath)
    
    // 拦截所有路由请求，确保返回 index.html
    // mainWindow.webContents.on('did-fail-load', () => {
    //   mainWindow.loadFile(shipAppEntryPath)
    // })
  }
}

app.whenReady().then(() => {
  createWindow()
  
  // 在 OS X 上，当单击 Dock 图标，并且没有打开其他窗口。
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  
  // 渲染进程用 ipcRenderer.send 发，主进程用 ipcMain.on接，不期待返回；
  // 渲染进程用 ipcRenderer.invoke 发，主进程用 ipcMain.handle接，期待返回；
  // 统一注册ipc通信事件
  initIpcHandles(mainWindow)
  initIpcOns(mainWindow)
})

// 当所有窗口都关闭时退出，macOS 除外。在那里，这很常见
// 使应用程序及其菜单栏保持活动状态，直到用户退出
// Mac使用 Cmd + Q。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})