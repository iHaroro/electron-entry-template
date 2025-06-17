import { app, ipcMain } from 'electron'
import { demoAppDevPath, indexAppDevPath, indexAppEntryPath, demoAppEntryPath } from '@/config'

export const initAppConfig = () => {
  ipcMain.handle('getAppConfig', () => {
    const { resourcesPath } = process
    const { isPackaged } = app
    
    return {
      version: app.getVersion(),
      appPath: app.getAppPath(),
      // 应用的资源目录
      resourcesPath,
      // 判断是否打包环境
      isPackaged,
      // 打包后的应用的入口路径
      indexAppEntryPath,
      // 打包后的智能监控应用的入口路径
      demoAppEntryPath,
      // 开发时船端应用地址
      indexAppDevPath,
      // 开发时智能监控应用地址
      demoAppDevPath
    }
  })
}