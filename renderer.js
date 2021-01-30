const { app, BrowserWindow, dialog } = require('electron').remote;
const fs = require('fs');
const path = require('path');

// document.getElementById('download-button').onclick = async function() {
//     ipcRenderer.invoke('download-item', { url: 'https://novahq.net/clicktracker.php?Item=Files&ID=707' });
// }

// document.getElementById('write-file').onclick = function() {
//     fs.writeFileSync('./test.txt', 'hey');
// }

document.getElementById('close-button').onclick = () => app.quit();
document.getElementById('minimize-button').onclick = () => BrowserWindow.getFocusedWindow().minimize();
document.getElementById('maximize-button').onclick = () => {
    const window = BrowserWindow.getFocusedWindow();
    window.isMaximized() ? window.unmaximize() : window.maximize();
}

document.getElementById('add-game').onclick = async () => {
    const dialogResult = await dialog.showOpenDialog({
        title: 'Select your Df2.exe file',
        filters: [
            { name: 'Df2.exe', extensions: ['exe'] }
        ]
    });

    const newOption = document.createElement('option');
    newOption.value = dialogResult.filePaths[0];
    newOption.text = "Delta Force 2"
    document.getElementById('current-game').add(newOption);
    document.getElementById('current-game').value = dialogResult.filePaths[0];
}
