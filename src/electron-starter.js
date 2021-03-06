const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let window;

const createWindow = () => {
    window = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
        },
        frame: false,
    })

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true,
    })

    window.loadURL(startUrl)

    window.on('closed', () => {
        window = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
        createWindow()
    }
})
