import { indexAppDevPath, indexAppEntryPath } from '@/config'

export const loadMainWindowHome = (mainWindow) => {
  // 加载主窗口的首页
  // 并加载应用程序的 index.html
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(indexAppDevPath)
  } else {
    mainWindow.loadFile(indexAppEntryPath)
    // 拦截所有路由请求，确保返回 index.html
    // mainWindow.webContents.on('did-fail-load', () => {
    //   mainWindow.loadFile(shipAppEntryPath)
    // })
  }
}