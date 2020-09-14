const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/Project/index.html`),
            protocol: "file:",
            slashes: true
        })
    )
    // win.loadFile('./dist/Project/index.html');
    // win.setMenu(null)
    win.on('closed', () => {
        win = null
    })
};


app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});      