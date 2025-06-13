import { app, ipcMain } from 'electron'
import { demoAppDevPath, shipAppDevPath, shipAppEntryPath, demoAppEntryPath } from '@/config'

export const initAppConfig = () => {
  ipcMain.handle('getAppConfig', () => {
    return {
      version: app.getVersion(),
      appPath: app.getAppPath(),
      // 应用的资源目录
      resourcesPath: process.resourcesPath,
      // 当前开发环境还是生产环境
      isPackaged: app.isPackaged,
      // 打包后的应用的入口路径
      shipAppEntryPath,
      // 打包后的智能监控应用的入口路径
      demoAppEntryPath,
      // 开发时船端应用地址
      shipAppDevPath,
      // 开发时智能监控应用地址
      demoAppDevPath
    }
  })
}