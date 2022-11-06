const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron',{
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  saveFile: (path, data) => ipcRenderer.invoke('save-file', path, data)
})
