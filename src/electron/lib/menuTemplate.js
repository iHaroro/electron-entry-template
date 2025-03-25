import { Menu } from 'electron'
export const getMenuTemplate = (win) => {
  const template = [
    {
      label: "窗口",
      submenu: [
        {
          label: "打开全屏",
          accelerator: "F11",
          click: () => {
            win.setFullScreen(true);
          }
        },
        {
          label: "退出全屏",
          accelerator: "Esc",
          click: () => {
            win.setFullScreen(false);
          }
        }
      ]
    },
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
  
  // if (process.env.NODE_ENV === 'development') {
  template[1].submenu.push({
    label: '调试工具',
    role: 'toggleDevTools'
  })
  // }
  
  return template
}

export const setMenu = (mainWindow) => {
  const menu = Menu.buildFromTemplate(getMenuTemplate(mainWindow))
  Menu.setApplicationMenu(menu)
}