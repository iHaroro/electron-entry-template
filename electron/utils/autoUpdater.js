import { autoUpdater } from 'electron'
import { app } from 'electron'
import started from 'electron-squirrel-startup'

// 处理Squirrel启动事件
if (started) {
  app.quit()
}

export const initAutoUpdater = () => {
  autoUpdater.autoDownload = false // 禁用自动下载
  autoUpdater.autoInstallOnAppQuit = false // 禁用自动安装
  
  autoUpdater.setFeedURL({
    url: 'http://localhost:3000/updates',
    provider: 'generic'
  })
  
  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...')
  })
  
  autoUpdater.on('update-available', () => {
    console.log('Update available')
  })
  
  autoUpdater.on('update-not-available', () => {
    console.log('Update not available')
  })
  
  autoUpdater.on('error', (err) => {
    console.error(`Error in auto-updater: ${err}`)
  })
  
  autoUpdater.on('download-progress', (progressObj) => {
    console.log(`Downloaded ${progressObj.percent}%`)
  })
  
  autoUpdater.on('update-downloaded', () => {
    console.log('Update downloaded')
  })
  
  autoUpdater.checkForUpdates()
}