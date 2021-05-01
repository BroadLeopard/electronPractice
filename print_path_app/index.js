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
        //����� �׳� �ܼ�â�� ���� ��ġ ��� ���߿� �뿬������ ��� �ѱ� ������ġ ���� 
        //���⼭ �뿬�̸� ���ؼ� ������ ���ü����� ����
    } else {//mac OS
        path = dialog.showOpenDialogSync({
            properties: ['openFile', 'openDirectory']//file and directory can be chose
        });
        console.log(path[0]);//���⵵ ��������
    }


    //���� ���ü������� ������ �����Դٰ� �� �� �κ��� ���߿� �̺�Ʈ�� �ؾ��� �ϴ� �װ� ���� ���� �Ұ����ϴ� �� �̺�Ʈ���� ������ ��
    //�ڵ� ��ü�� ��Ʈ��ȭ ���� �� ������ nodejs���� json library �̿��ؼ� parsing�� ������ �׷� ������ ������ �ɵ�
    processedData = '';

    resultWin = new BrowserWindow({//���â
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    resultWin.loadFile('result.html');
    //�׸��� �� �����͸� result.html�� ������ �Ѵ�.
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

