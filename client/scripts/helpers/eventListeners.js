import {createTable, deleteTable} from "./table.js";

function deleteEventListeners(element) {
    const new_element = element.cloneNode(true);

    element.parentNode.replaceChild(new_element, element);
    return new_element;
}

function generateBtnEventListener(url, reloadButton) {
    const preloader = document.getElementById('preloader');
    const main = document.getElementsByTagName('main')[0];
    const inputRow = document.getElementById('inputRow');
    let saveButton = document.getElementById('save');
    const createButton = document.getElementById('addRow');

    const rowIdS = [];
    let sampleObjectKeys;

    return async function () {
        preloader.style.display = 'block';

        saveButton=deleteEventListeners(saveButton);
        inputRow.value='';
        deleteTable();
        let response = await fetch(url);
        let elements = await response.json();

        if (elements.length === 0) return;

        rowIdS.splice(0, rowIdS.length);
        elements.forEach(element => {
            rowIdS.push(element.id);

            delete element.id;
        })

        sampleObjectKeys = Object.keys(elements[0]);
        const table = createTable(elements);

        main.append(table);

        addDeleteEventListeners();
        addEditEventListeners();

        preloader.style.display = 'none';
    }

    function addDeleteEventListeners() {
        const deleteCells = Array.from(document.querySelectorAll('tr>td:first-child'));

        deleteCells.forEach((deleteCell, index) => {
            deleteCell.addEventListener('click', generateDeleteEventListener(index));
        })
    }

    function generateDeleteEventListener(position) {
        const i = position;
        return async function () {
            await fetch(url + `/${rowIdS[i]}`, apiHelper('DELETE', {}));

            reloadButton.click();
        }
    }

    function addEditEventListeners() {
        const simpleCells = Array.from(document.querySelectorAll(`tbody>tr:nth-child(n+1)>td:nth-child(n+2)`));
        const cellsInRow = simpleCells.length / rowIdS.length;

        simpleCells.forEach((cell, index) => {
            const j = index % cellsInRow + 2;
            const i = Math.floor(index / cellsInRow) + 1;

            cell.addEventListener('click', generateEditEventListener(i, j));
        })
    }

    function generateEditEventListener(i, j) {
        const id = rowIdS[i-1];
        const fieldToChange = sampleObjectKeys[j-2];
        return async function () {
            inputRow.value = getCellText(i, j);

            saveButton = deleteEventListeners(saveButton);

            saveButton.addEventListener('click', generateSaveBtnEventListener(fieldToChange, id));
        }
    }

    function apiHelper(method, body) {
        const obj = {method};

        if (Object.keys(body).length !== 0) {
            obj.headers = {'Content-Type': 'application/json;charset=utf-8'};
            obj.body = JSON.stringify(body);
        }

        return obj;
    }

    function getCellText(i, j) {
        const cell = document.querySelector(`tbody>tr:nth-child(${i})>td:nth-child(${j})`);

        return cell.innerText;
    }

    function generateSaveBtnEventListener(fieldToEdit, id) {
        return async function () {
            const value = inputRow.value;

            await fetch(url + `/${id}`, apiHelper('PUT', {[fieldToEdit]: value}));

            reloadButton.click();
        }
    }
    
    function generateCreateBtnEventListener() {

    }
}


export {deleteEventListeners, generateBtnEventListener};