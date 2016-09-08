/**
 * Created by timur on 9/4/16.
 */

import { app, BrowserWindow, ipcMain } from 'electron'


const windows = []


function createWindow(name = 'game', width = 960, height = 480, resizable, frame) {
  
  let window = new BrowserWindow({ width, height, resizable, frame })
  
  window.loadURL(`file://${__dirname}/windows/${name}.html`)
  
  window.webContents.openDevTools()
  
  window.on('closed', () => {
    window = null
  })
  
  windows.push(window)
  
  return window
}

app.on('ready', () => {
  
  let signup
  
  let login = createWindow('login', 600, 400, false, true)
  
  windows.push(login)
  
  ipcMain.on('signup', () => {
    
    signup = createWindow('signup', 400, 520, false, true)
    windows.push(signup)
  })
  
  ipcMain.on('close-signup', () => signup.close())
  
  ipcMain.on('start-game', () => {
    
    login.close()
    windows.push(createWindow('game', 980, 600, true, true))
  })
  
})

app.on('window-all-closed', () => {
  
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  
  windows
    .filter(x => x === null)
    .forEach(x => createWindow())
})
