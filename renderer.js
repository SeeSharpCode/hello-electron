const fs = require('fs');
const path = require('path');

document.getElementById('download-button').onclick = async function() {
    ipcRenderer.invoke('download-item', { url: 'https://novahq.net/clicktracker.php?Item=Files&ID=707' });
}

document.getElementById('write-file').onclick = function() {
    fs.writeFileSync('./test.txt', 'hey');
}
