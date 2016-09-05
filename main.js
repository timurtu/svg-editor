/**
 * Created by timur on 9/4/16.
 */

const { app, BrowserWindow } = require('electron')

let win

function createWindow() {
  
  win = new BrowserWindow({
    width: 960,
    height: 540,
    resizable: false
  })
  
  win.loadURL(`file://${__dirname}/index.html`)
  
  win.webContents.openDevTools()
  
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

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
