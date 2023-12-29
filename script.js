// create table

let idList = ['id-table-ekuitas'];

function createRowTable(n){
    for(var id=0; id<idList.length; id++){
        for(var i=0; i<n; i++){
            const newTr = document.createElement('tr');
            const newTd1 = document.createElement('td');
            const newTd2 = document.createElement('td');
            
            const newInput = document.createElement('input');
            newInput.setAttribute('type', 'number');
    
            newTd2.appendChild(newInput);

            newTr.appendChild(newTd1);
            newTr.appendChild(newTd2);

            document.getElementById(idList[id]).childNodes[3].appendChild(newTr);
        }
    }
    
}

function cleanRowTable(){
    for(var id=0; id<idList.length; id++){
        var node = document.getElementById(idList[id]).childNodes[3]
        while(node.firstChild){
            node.removeChild(node.firstChild);
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
    const tableList = ['table-ekuitas', 'table-jumlah-lembar-saham', 'table-pbv', 'table-nilai-wajar'];

    for(var i=0; i<tableList.length; i++){
        // thead
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'table-wrapper');

        const newH3 = document.createElement('h3');
        var temp = tableList[0].split('-');
        temp = (temp[0]).join(' ');


        const newTable = document.createElement('table');
        newTable.setAttribute('id', 'id-'+tableList[i]);

        const newThead = document.createElement('thead');
        const newTr = document.createElement('tr');
        const newTd1 = document.createElement('td');
        newTd1.innerHTML = 'Tahun';
        const newTd2 = document.createElement('td');
        newTd2.innerHTML = 'Data';

        newTr.appendChild(td1);
        newTr.appendChild(td2);

        newThead.appendChild(newTr);

        // tbody
        const newTbody = document.createElement('tbody');
        

        newTable.appendChild(newThead);
        newTable.appendChild(newTbody);


    }
}