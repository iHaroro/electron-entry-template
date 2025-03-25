import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { setMenu } from './electron/lib/menuTemplate'
import { getDesktopSource } from './electron/lib/getDesktopSource'

let globalConfig = null

// 安装/卸载时处理在 Windows 上创建/删除快捷方式。
if (started) {
  app.quit();
}

let mainWindow = null

const createWindow = () => {
  // 创建浏览器窗口。
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon: path.join(__dirname, '../images/icon.icon'),
    frame: true,
    devTools: true,
    nodeIntegration: true,
    nodeIntegrationInWorker: true,
    enableRemoteModule: true,
    sandbox: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  
  setMenu(mainWindow)
  getDesktopSource()
  
  // 获取安装目录
  // 这里要注意 获取的安装目录是反斜杠 也就是 c:\dev\xxxx
  // 这肯定是不行的  nodejs在使用这种地址是读取不了的
  // 所以 后边加了一个replace 用于转换反斜杠
  let exePath = path.dirname(app.getPath('exe')).replace(/\\/g, "/");
  // 拼接好安装目录下的config.json
  let configPath = `${exePath}/config.json`;
  // 使用fs读取文件内容
  const fs = require('fs');
  fs.readFile(configPath, 'utf-8', (err, data) => {
    if (data) {
      // 注意要转换json
      globalConfig = JSON.parse(data)
    }
  })
  
  // 并加载应用程序的 index.html
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    // mainWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/#/video`);
    mainWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/#/aiCopilot`);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));

    // 拦截所有路由请求，确保返回 index.html
    mainWindow.webContents.on('did-fail-load', () => {
      mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    });
  }
  
  // 打开 DevTools
  // mainWindow.webContents.openDevTools();
};

// 当 Electron 完成时，将调用此方法
// 初始化并准备好创建浏览器窗口。
// 某些 API 只能在此事件发生后使用。
app.whenReady().then(() => {
  createWindow();
  
  // 在 OS X 上，当
  // 单击 Dock 图标，并且没有打开其他窗口。
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  
  ipcMain.on('openDevTools', (event, arg) => {
    console.log('openDevTools', arg)
    mainWindow.webContents.openDevTools();
  })
  
  ipcMain.handle('dialog:openFile', () => dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
  
  ipcMain.handle('update-config', () => {
    return new Promise((resolve, reject) => {
      if (globalConfig) {
        resolve(globalConfig)
      } else {
        reject()
      }
    })
  })
});

// 当所有窗口都关闭时退出，macOS 除外。在那里，这很常见
// 使应用程序及其菜单栏保持活动状态，直到用户退出
// 显式使用 Cmd + Q。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 在此文件中，您可以包含应用的特定 main 进程的其余部分
// 您也可以将它们放在单独的文件中并在此处导入它们。
