'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain, shell } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

let isOsx = process.platform === 'darwin'
let isWin = !isOsx

let win

const mainMenu = [
  {
    label: '检查更新',
    role: 'window',
    click() {
      win.webContents.send('sys-check-update')
    },
  },
  {
    label: '关于',
    role: 'window',
    click() {},
  },
]

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])

function createDockMenu(mainWindow) {
  const dockMenu = Menu.buildFromTemplate([
    {
      label: '重新启动',
      click() {
        app.relaunch()
        app.quit()
      },
    },
    {
      label: '检查更新',
      click() {
        mainWindow.webContents.send('sys-check-update')
      },
    },
  ])

  app.dock.setMenu(dockMenu)
}

function createAppMenu(mainWindow) {
  const menu = Menu.buildFromTemplate(mainMenu)
  Menu.setApplicationMenu(menu)
}

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    backgroundColor: 'none',
    // frame: !isWin,
    /* frame: false,
    useContentSize: true,
    resizable: false,
    skipTaskbar: false,
    transparent: false,
    title: '测试',
    autoHideMenuBar: true,
    vibrancy: 'ultra-dark',
    transparent: true, */
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      nativeWindowOpen: true,
      scrollBounce: true,
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) {
      // win.webContents.openDevTools()
    }
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  // 主进程 加载完成执行
  win.webContents.on('did-finish-load', () => {
    try {
      win.show()
      win.focus()
    } catch (e) {}
  })

  // 主进程 打开新的页面
  win.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    shell.openExternal(url)
  })

  // 主进程 阻止默认的导航
  win.webContents.on('will-navigate', (event, url) => {
    event.preventDefault()
    shell.openExternal(url)
  })

  ipcMain.on('min', () => win.minimize())

  createAppMenu(win)
  if (process.platform != 'win32') {
    createDockMenu(win)
  }

  win.on('closed', () => {
    win = null
  })
}

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
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
  }
  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
