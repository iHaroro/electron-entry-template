import { app, BrowserWindow, Menu } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

const template = [
  {
    label: '查看',
    submenu: [
      {
        label: '刷新',
        role: 'reload'
      },
      {
        label: '强制刷新',
        role: 'forceReload'
      },
      {
        label: '调试工具',
        role: 'toggleDevTools'
      }
    ]
  },
  {
    label: '操作',
    submenu: [
      {
        label: '退出',
        role: 'quit'
      }
    ]
  }
]

// 安装/卸载时处理在 Windows 上创建/删除快捷方式。
if (started) {
  app.quit();
}

const createWindow = () => {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  
  // 创建浏览器窗口。
  const mainWindow = new BrowserWindow({
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
  
  console.log('MAIN_WINDOW_VITE_DEV_SERVER_URL', MAIN_WINDOW_VITE_DEV_SERVER_URL)
  console.log('MAIN_WINDOW_VITE_NAME', MAIN_WINDOW_VITE_NAME)
  
  // 并加载应用程序的 index.html
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    
    // 拦截所有路由请求，确保返回 index.html
    mainWindow.webContents.on('did-fail-load', () => {
      mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    });
  }
  
  // 打开 DevTools。
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
