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

    elements.forEach(row => {
        const rowElements = Object.values(row);
        rowElements.unshift('x');

        const rowElement = createTableRow(rowElements, 'td');

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

function deleteTable() {
    const tables = Array.from(document.getElementsByTagName('table'));

    tables.forEach(table => table.remove());
}



export {createTable, deleteTable};