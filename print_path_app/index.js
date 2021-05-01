const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const os = require('os');

var mainWin = null;
var resultWin = null;

var path = null;
var processedData = null;

ipcMain.on('file-choose', function (event) {//when file choose button pressed
    if (os.platform() === 'linux' || os.platform() === 'win32') {
        path = dialog.showOpenDialogSync({
            properties: ['openFile']//file can be chose
        });
        console.log(path[0]);
        //현재는 그냥 콘솔창에 파일 위치 출력 나중에 용연이한테 경로 넘길 파일위치 저장 
        //여기서 용연이를 통해서 파일을 로컬서버로 전송
    } else {//mac OS
        path = dialog.showOpenDialogSync({
            properties: ['openFile', 'openDirectory']//file and directory can be chose
        });
        console.log(path[0]);//여기도 마찬가지
    }


    //대충 로컬서버에서 파일을 가져왔다고 둠 이 부분은 나중에 이벤트로 해야함 일단 그걸 현재 구현 불가능하니 이 이벤트에서 실행을 함
    //코드 자체를 스트링화 시켜 그 다음에 nodejs에서 json library 이용해서 parsing을 진행해 그런 다음에 돌리면 될듯
    processedData = '';

    resultWin = new BrowserWindow({//결과창
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    resultWin.loadFile('result.html');
    //그리고 이 데이터를 result.html로 보내야 한다.
});


app.whenReady().then(() => {
    mainWin = new BrowserWindow({
        resizable: true,
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWin.loadFile('index.html');
});


app.on('window-all-closed', () => {//when all window closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

