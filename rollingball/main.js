const { app, BrowserWindow } = require("electron/main");
const path = require("node:path");
const { updateElectronApp } = require('update-electron-app');
updateElectronApp();
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 500,
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
