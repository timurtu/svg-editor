/**
 * Created by timur on 9/4/16.
 */

import { app, BrowserWindow, ipcMain } from 'electron'


const windows = []

const createWindow = (name = 'game', width = 960, height = 480, resizable, frame) => {
  
  let window = new BrowserWindow({ width, height, resizable, frame })
  
  window.loadURL(`file://${__dirname}/windows/${name}.html`)
  
  window.webContents.openDevTools()
  
  window.on('closed', () => {
    window = null
  })
  
  windows.push(window)
  
  return window
}

app.on('ready', () => windows.push(createWindow('editor', 600, 400, true, true)))

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
