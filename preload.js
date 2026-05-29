const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    readDb: () => ipcRenderer.invoke('read-db'),
    writeDb: (data) => ipcRenderer.invoke('write-db', data)
});