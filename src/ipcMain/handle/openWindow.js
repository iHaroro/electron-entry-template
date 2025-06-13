import { ipcMain } from 'electron'
import { createCustomWindow } from '@/utils/createWindow'

/**
 * @function initOpenNewWindow
 * @description 打开新窗口
 **/
export const initOpenNewWindow = () => {
  ipcMain.handle('openNewWindow', (event, {
    url,
    loadOptions = {}
  }) => {
    console.log(url, loadOptions)
    const customWindow = createCustomWindow()
    if (url.startsWith('http')) {
      customWindow.loadURL(url, loadOptions)
    } else {
      customWindow.loadFile(url, loadOptions)
    }
    return customWindow.id
  })
}