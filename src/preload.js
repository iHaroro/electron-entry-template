// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const {
  contextBridge,
  ipcRenderer
} = require('electron');

contextBridge.exposeInMainWorld('SHIP_APP_CONFIG', {
  desktop: true
});

contextBridge.exposeInMainWorld('electronAPI', {
  openDevTools: () => {
    ipcRenderer.send('openDevTools');
  },
  openFile: () => {
    return ipcRenderer.invoke('dialog:openFile')
  },
  getConfig: () => {
    return ipcRenderer.invoke('update-config')
  }
});
