import { app, Menu } from 'electron'
import { loadMainWindowHome } from '@/utils/loadMainWindow'
import { shipAppLogout } from '@/ipcMain/send/appControl'

export const getMenuTemplate = (mainWindow) => {
  const menus = [
    {
      label: "窗口",
      submenu: [
        {
          label: '首页',
          click: () => {
            loadMainWindowHome(mainWindow)
          }
        },
        {
          label: '刷新',
          role: 'reload'
        },
        {
          label: '强制刷新',
          role: 'forceReload'
        },
        {
          label: "打开全屏",
          accelerator: "F11",
          click: () => {
            mainWindow.setFullScreen(true);
          }
        },
        {
          label: "退出全屏",
          accelerator: "Esc",
          click: () => {
            mainWindow.setFullScreen(false);
          }
        }
      ]
    },
    {
      label: '操作',
      submenu: [
        // {
        //   label: '退出登录',
        //   click: () => {
        //     shipAppLogout(mainWindow)
        //   }
        // },
        {
          label: '退出应用',
          role: 'quit'
        }
      ]
    }
  ]
  
  // TODO 调试
  // 如果不是打包环境的话，就添加调试菜单
  if (!app.isPackaged) {
    menus.push({
      label: '调试',
      submenu: [
        {
          label: '调试工具',
          role: 'toggleDevTools'
        }
      ]
    })
  }
  
  return menus
}

export const setMenu = (mainWindow, menus) => {
  const menu = menus === undefined
               ? Menu.buildFromTemplate(getMenuTemplate(mainWindow))
               : null
  Menu.setApplicationMenu(menu)
}