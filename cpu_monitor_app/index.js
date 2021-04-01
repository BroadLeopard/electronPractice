const { app, BrowserWindow, contextBridge } = require('electron');
const os = require('os-utils');
const path = require('path');

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    //1초 주기로 반복, cpuUsage는 내장 함수 v가 어디서 오는걸까
    setInterval(() => {
        os.cpuUsage(function (v) {
            //console.log('CPU Usage (%) ' + v * 100);//터미널에만 출력된다.
            //이유는 보여지는 화면은 renderer process에서 실행되어서
            //process 자체가 다르다. 그러니 webContents.send를 사용해서 넘겨줘야한다.
            mainWindow.webContents.send('cpu', v * 100);
            //console.log('Mem Usage (%) ' + os.freememPercentage() * 100);
            mainWindow.webContents.send('mem', os.freememPercentage() * 100);
            //console.log('Total Usage (GB) ' + os.totalmem() / 1024);
            mainWindow.webContents.send('total-mem', os.totalmem() / 1024);
        });
    }, 1000);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
