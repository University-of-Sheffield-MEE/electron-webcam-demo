const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'icon.png')
  })

  // and load the index.html of the app.
  win.loadFile('src/renderer/index.html')
  win.removeMenu()

  ipcMain.handle('select-directory', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory']
    });
    return result.filePaths[0];
  })

  ipcMain.handle('save-file', async(event, path, data) => {
    fs.writeFileSync(path, data);
  })
}

app.whenReady().then(createWindow)

try {
  require('electron-reloader')(module)
} catch (_) {}