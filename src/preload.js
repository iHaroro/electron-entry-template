const {
  contextBridge,
  ipcRenderer
} = require('electron')

contextBridge.exposeInMainWorld('appConfig', {
  desktop: true
})

contextBridge.exposeInMainWorld('electronAPI', {
  openNewWindow: (url, loadOptions) => ipcRenderer.invoke('openNewWindow', {
    url,
    loadOptions
  }),
  getAppConfig: () => ipcRenderer.invoke('getAppConfig'),
  openDevTools: () => ipcRenderer.send('openDevTools'),
  addListener: (channel, listener) => ipcRenderer.addListener(channel, listener)
})