/**
 * Created by timur on 9/4/16.
 */

import { app, BrowserWindow } from 'electron'

let win

function createWindow(name, width, height, resizable) {
  
  win = new BrowserWindow({ width, height, resizable })
  
  win.loadURL(`file://${__dirname}/windows/${name}.html`)
  
  win.webContents.openDevTools()
  
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', () => {
  
  createWindow('login', 800, 600, false)
  
  createWindow('game', 960, 540, false)
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
