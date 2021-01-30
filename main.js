const { app, BrowserWindow, ipcMain, Menu, nativeImage } = require('electron');
const { download } = require('electron-dl');
const fs = require('fs');
const unzipper = require('unzipper');
const path = require('path');

if (require('electron-squirrel-startup')) return app.quit();

require('update-electron-app')();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    icon: 'df2.png'
  });

  const configPath = path.join(app.getPath('userData'), 'config.json');
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify({ games: [{ name: 'Delta Force 2', icon: 'df2.ico' }] }));
  }
  const config = require(configPath);
  console.log('Config', config);

  const menuItems = config.games.map(game => ({ label: game.name, icon: nativeImage.createFromPath('D:\\Documents\\Dev\\nova-gummy\\df2.png'), submenu: [{ label: game.name, icon: 'df2.png' }] }));
  // const menu = Menu.buildFromTemplate([
  //   {
  //     label: 'Game',
  //     submenu: [
  //       {
  //         label: 'Add Game',
  //         sublabel: 'C:\\Program Files',
  //         click: () => console.log('Clicked add game'),
  //         submenu: [
  //           {
  //             label: 'Delete'
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ]);
  // Menu.setApplicationMenu(Menu.buildFromTemplate(menuItems));

  win.loadFile('index.html');

  ipcMain.handle('download-item', async (event, { url }) => {
    const item = await download(win, url, { directory: path.join(__dirname, 'tmp') });
    const savePath = item.savePath;
    fs.createReadStream(savePath)
      .pipe(unzipper.Extract({ path: 'extracted' })
        .on('close', () => console.log('Done unzippin'))
      );
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
