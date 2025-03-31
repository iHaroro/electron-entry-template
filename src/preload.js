const {
  contextBridge,
  ipcRenderer
} = require('electron')

contextBridge.exposeInMainWorld('shipAppConfig', {
  desktop: true
})

contextBridge.exposeInMainWorld('electronAPI', {
  getToken: () => ipcRenderer.invoke('getToken'),
  refreshToken: () => ipcRenderer.invoke('refreshToken'),
  openNewWindow: (url, loadOptions) => ipcRenderer.invoke('openNewWindow', {
    url,
    loadOptions
  }),
  getShipAppConfig: () => ipcRenderer.invoke('getShipAppConfig')
})
