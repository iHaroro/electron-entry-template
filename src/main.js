import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

// 安装/卸载时处理在 Windows 上创建/删除快捷方式。
if (started) {
  app.quit();
}

const createWindow = () => {
  // 创建浏览器窗口。
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  
  // 并加载应用程序的 index.html。
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
  
  // 打开 DevTools。
  mainWindow.webContents.openDevTools();
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
