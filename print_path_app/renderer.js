const { ipcRenderer } = require('electron');
const fileChooseBtn = document.getElementById('upload');

fileChooseBtn.addEventListener('click', function (event) {//when button pressed
    ipcRenderer.send('open-file-dialog-for-file');//send event 
});