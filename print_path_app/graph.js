const { ipcRenderer } = require('electron');

var layerArr = [];

var showSidebar = 0;//visible 
var pressedBefore = null;

function changeInform(cnt) {
    document.getElementById('layerName').innerHTML = layerArr[cnt].symbol;//layer name 변경
    document.getElementById('option').innerHTML = layerArr[cnt].op_attributes;


    document.getElementById('outputShapeValue').innerHTML = layerArr[cnt].shape;
    //document.getElementById('propaValue').outerHTML = "<span>$$" + layerArr[cnt].value + "$$</span>";//순전파   여기는 mathjax 된 이후에 다시
    document.getElementById('backPropa_symbol').innerHTML = "$$" + layerArr[cnt].backward_symbol + "$$";//역전파
    document.getElementById('backPropa_value').innerHTML = "$$" + layerArr[cnt].backward_value + "$$";
}

function showInform() {
    var childNodeArr = this.parentNode.childNodes;//get all layer object
    var cnt = 0;

    while (this != childNodeArr[cnt]) {//clicked object is not layer
        cnt++;
    }

    if (showSidebar == 0) {//invisible
        changeInform(cnt / 2);//change Inform
        document.getElementById("informSidebar").style.width = "250px";//show sidebar
        document.getElementById("layerList").style.marginRight = "250px";
        showSidebar = 1;
    } else {//visible
        if (pressedBefore != cnt / 2) {//choosen layer is different
            changeInform(cnt / 2);
        } else {//choosen layer is same     hide sidebar
            document.getElementById("informSidebar").style.width = "0";
            document.getElementById("layerList").style.marginRight = "0";
            showSidebar = 0;
        }
    }

    pressedBefore = cnt / 2;//clicked before
}

function addArr(data) {//data to array
    var layerList = document.getElementById('layerList');//layerList

    //input 추가될 수도 있음

    for (var i = 0; i < data.senario.length; i++) {
        layerArr.push(data.symbol_map[data.senario[i]]);//add layer to layerArr

        var layer = document.createElement('p');//layer
        var symbol = document.createElement('span');//symbol
        symbol.append(layerArr[i].symbol);//add text to symbol

        if (layerArr[i].symbol[0] == "f") {//add class to symbol
            symbol.classList.add('f');
        } else if (layerArr[i].symbol[0] == "h") {
            symbol.classList.add('h');
        }

        var text = document.createElement('span');//text
        text.append(layerArr[i].shape[0] + ' * ' + layerArr[i].shape[1]);//add textNode to shape

        layer.append(symbol);
        layer.append(text);
        layer.addEventListener('click', showInform);//add event showInformation
        layer.classList.add('layer');

        var line = document.createElement('div');//line
        var lineBox = document.createElement('div');//line container
        line.classList.add('vl');
        lineBox.classList.add('vlBox');
        lineBox.append(line);

        layerList.append(layer);//add layer to layerList
        layerList.append(lineBox);//add line to layerList    이 부분은 나중에 마지막 부분에서는 줄을 없애야 함
    }

    //output 추가될 수도 있음
}

ipcRenderer.on('result-channel', (event, data) => {//receive json object 
    addArr(data);
    var c = "\\frac{\\partial E_{(total,)}}{\\partial {w}_{({f_0}_{(9)},4)}}";

    document.getElementById('test').innerHTML = "$$" + c + "$$";
});

