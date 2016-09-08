/**
 * Created by timur on 9/4/16.
 */

import { app, BrowserWindow, ipcMain } from 'electron'


function createWindow(name, width, height, resizable, frame) {
  
  let window = new BrowserWindow({ width, height, resizable, frame })
  
  window.loadURL(`file://${__dirname}/windows/${name}.html`)
  
  window.webContents.openDevTools()
  
  window.on('closed', () => {
    window = null
  })
  
  return window
}

app.on('ready', () => {
  
  createWindow('login', 600, 400, false, true)
  
  let signup
  
  ipcMain.on('signup', () => {
    signup = createWindow('signup', 400, 520, false, true)
  })
  
  ipcMain.on('close-signup', () => {
    signup.close()
  })
  
  // createWindow('game', 960, 540, false)
})

app.on('window-all-closed', () => {
  
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  
  if (win === null) {
    createWindow()
  }
})
