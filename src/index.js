const { app, BrowserWindow } = require("electron");

const mainWindow = () => {
    const window = new BrowserWindow({
        width: 1800,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });
    window.loadFile(__dirname + '/index.html');
    window.webContents.openDevTools();
}


app.on('ready', () => {
    mainWindow();
})