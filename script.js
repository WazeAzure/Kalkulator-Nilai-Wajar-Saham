// create table

const tableList = ['tabel-ekuitas', 'tabel-jumlah-lembar-saham', 'tabel-pbv', 'tabel-nilai-wajar'];

function createRowTable(n){
    for(var id=0; id<tableList.length; id++){
        for(var i=0; i<n; i++){
            const newTr = document.createElement('tr');
            const newTd1 = document.createElement('td');
            const newTd2 = document.createElement('td');
            
            const newInput = document.createElement('input');
            newInput.setAttribute('type', 'number');
            newInput.setAttribute('placeholder', '0');
    
            newTd2.appendChild(newInput);

            newTr.appendChild(newTd1);
            newTr.appendChild(newTd2);

            document.getElementById('id-'+tableList[id]).childNodes[1].appendChild(newTr);
        }
    }
    
}

function cleanRowTable(){
    for(var id=0; id<tableList.length; id++){
        var node = document.getElementById('id-'+tableList[id]).childNodes[1]
        
        if(node != null ){
            while(node.firstChild){
                node.removeChild(node.firstChild);
            }
        }
    }
}

function handleChoice(){
    let temp = document.getElementById('id-choice');
    let choice = temp.value;
    console.log(choice);

    cleanRowTable();
    createRowTable(choice);
}

function initTable(){

    for(var i=0; i<tableList.length; i++){
        // thead
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'table-wrapper');

        const newH3 = document.createElement('h3');
        var temp = tableList[i].split('-');
        console.log(temp);
        for(var j = 0; j < temp.length; j++){
            temp[j][0] = temp[j][0].toUpperCase();
        }
        temp = temp.join(' ');
        newH3.innerHTML = temp;
        newDiv.appendChild(newH3);

        const newTable = document.createElement('table');
        newTable.setAttribute('id', 'id-'+tableList[i]);

        const newThead = document.createElement('thead');
        const newTr = document.createElement('tr');
        const newTd1 = document.createElement('td');
        newTd1.innerHTML = 'Tahun';
        const newTd2 = document.createElement('td');
        newTd2.innerHTML = 'Data';

        newTr.appendChild(newTd1);
        newTr.appendChild(newTd2);

        newThead.appendChild(newTr);

        // tbody
        const newTbody = document.createElement('tbody');

        newTable.appendChild(newThead);
        newTable.appendChild(newTbody);

        newDiv.appendChild(newTable);

        document.getElementById('tables-container').appendChild(newDiv);
    }
}

function getRataPBV(){
    var rataPBV = 0;
    const tablePbv = document.getElementById('id-tabel-pbv');
    const nums = tablePbv.getElementsByTagName('input');

    var nilaiPBV = 0;
    for(var i=0; i<nums.length; i++){
        nilaiPBV += parseFloat(nums[i].value);
    }
    rataPBV = nilaiPBV / nums.length;

    return rataPBV;
}

function getEkuitas(){
    var nilaiEkuitas = []

    // get data from ekuitas
    const tableEkuitas = document.getElementById('id-tabel-ekuitas');
    const nums = tableEkuitas.getElementsByTagName('input');

    for(var i=0; i<nums.length; i++){
        nilaiEkuitas.push(parseFloat(nums[i].value));
    }
    // console.log(nilaiEkuitas)

    return nilaiEkuitas;
}

function getJLS(){
    var nilaiJLS = []

    // get data from ekuitas
    const tableJLS = document.getElementById('id-tabel-jumlah-lembar-saham');
    const nums = tableJLS.getElementsByTagName('input');

    for(var i=0; i<nums.length; i++){
        nilaiJLS.push(parseFloat(nums[i].value));
    }

    return nilaiJLS;
}

function setNilaiWajar(nilaiEkuitas, nilaiJLS, rataPBV){
    const tableNW = document.getElementById('id-tabel-nilai-wajar');
    const nums = tableNW.getElementsByTagName('input');

    for(var i=0; i<nums.length; i++){
        nums[i].value = (nilaiEkuitas[i] / nilaiJLS[i]) * rataPBV;
    }
    
    return nums[nums.length - 1].value;
}

function getRataKenaikanPerTahun(nilaiEkuitas, nilaiJLS){
    var kenaikan = 0;
    var temp = []

    for(var i=0; i<nilaiEkuitas.length; i++){
        temp.push(nilaiEkuitas[i] / nilaiJLS[i]);
    }

    console.log(temp)

    for(var i=1; i<temp.length; i++){
        kenaikan += ((temp[i] - temp[i-1]) / temp[i-1]);
    }

    return kenaikan / (temp.length - 1);
}

function setForecast(rataKenaikan, nwTerakhir){
    const tableForecast = document.getElementById('id-forecast');
    const num = tableForecast.getElementsByTagName('tr');

    num[1].childNodes[3].innerHTML = nwTerakhir + nwTerakhir * rataKenaikan;

    for(var i=2; i<num.length; i++){
        console.log(parseFloat(num[i-1].childNodes[3].innerHTML));
        const temp = num[i].childNodes;
        temp[3].innerHTML = parseFloat(num[i-1].childNodes[3].innerHTML) * (1 + rataKenaikan);
    }
}

function calculate(){
    // nilai-nilai penting
    var rataPBV = getRataPBV();
    var nilaiEkuitas = getEkuitas();
    var nilaiJLS = getJLS();
    var rataKenaikan = getRataKenaikanPerTahun(nilaiEkuitas, nilaiJLS);

    // set Nilai Wajar
    console.log(nilaiEkuitas, nilaiJLS, rataPBV);
    var nwTerakhir = setNilaiWajar(nilaiEkuitas, nilaiJLS, parseFloat(rataPBV));
    
    // forecast
    console.log(rataKenaikan, nwTerakhir);
    setForecast(rataKenaikan, parseFloat(nwTerakhir));

}