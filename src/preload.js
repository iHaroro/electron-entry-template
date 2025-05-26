const {
  contextBridge,
  ipcRenderer
} = require('electron')

contextBridge.exposeInMainWorld('shipAppConfig', {
  desktop: true
})

contextBridge.exposeInMainWorld('electronAPI', {
  openNewWindow: (url, loadOptions) => ipcRenderer.invoke('openNewWindow', {
    url,
    loadOptions
  }),
  getShipAppConfig: () => ipcRenderer.invoke('getShipAppConfig'),
  openDevTools: () => ipcRenderer.send('openDevTools'),
  addListener: (channel, listener) => ipcRenderer.addListener(channel, listener)
})