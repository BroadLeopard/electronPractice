const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const os = require('os');

var mainWindow = null;

var processedData;

function createWindow() {
    mainWindow = new BrowserWindow({
        resizable: true,
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html');
}

ipcMain.on('open-file-dialog-for-file', function (event) {//when file choose button pressed
    if (os.platform() === 'linux' || os.platform() === 'win32') {
        dialog.showOpenDialog({
            properties: ['openFile']//file can be chose
        }).then((result) => {
            console.log(result.filePaths.toString());//현재는 그냥 콘솔창에 파일 위치 출력 나중에 용연이한테 경로 넘길 파일위치 저장 
        });
    } else {//mac OS
        dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory']//file and directory can be chose
        }).then((result) => {
            console.log(result.filePaths);
        });
    }


    //이제 여기서 새 창을 로딩함

});


app.whenReady().then(() => {//when ready 
    createWindow();//create mainwindow

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
});


app.on('window-all-closed', () => {//when all window closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

