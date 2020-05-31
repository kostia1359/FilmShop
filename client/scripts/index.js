const url = 'http://localhost:3050/api/description/';

function createTable(elements) {
    if (elements.length === 0) {
        return null;
    }
    const table = document.createElement('table');

    table.append(createTHeadElement(elements[0]));
    table.append(createTBodyElement(elements));

    return table;
}

function createTBodyElement(elements) {
    const tBody = document.createElement('tbody');

    elements.forEach(row=>{
        const rowElements=Object.values(row);
        rowElements.unshift('x');

        const rowElement=createTableRow(rowElements,'td');

        tBody.append(rowElement);
    })
    return tBody;
}

function createTHeadElement(element) {
    const tHead = document.createElement('thead');

    const keys = Object.keys(element);
    keys.unshift('delete');

    tHead.append(createTableRow(keys, 'th'));

    return tHead;
}

function createTableRow(cells, cellTagName) {
    const tr = document.createElement('tr');

    cells.forEach(cell => {
        const cellElement = document.createElement(cellTagName);

        cellElement.innerText = cell;

        tr.append(cellElement);
    });

    return tr;
}

function deleteTable(){
    const tables=Array.from(document.getElementsByTagName('table'));

    tables.forEach(table=>table.remove());
}

window.onload = () => {
    const preloader = document.getElementById('preloader');
    const descriptionButton = document.getElementById('openDescriptionTable');
    const main=document.getElementsByTagName('main')[0];
    const rowIdS=[];

    async function f() {
        preloader.style.display = 'block';

        deleteTable();
        let response = await fetch(url);
        let elements = await response.json();

        rowIdS.splice(0,rowIdS.length);
        elements.forEach(element=>{
            rowIdS.push(element.id);

            delete element.id;
        })

        main.append(createTable(elements));
        console.log(rowIdS);
        preloader.style.display = 'none';
    }

    descriptionButton.addEventListener('click', f);
}