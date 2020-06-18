import {createTable, deleteTable} from "./table.js";
import {showModal} from "../components/modal.js";
import {createElement} from "./domHelper.js";

const serverUrl = 'http://localhost:3050/api/';

function deleteEventListeners(element) {
    const new_element = element.cloneNode(true);

    element.parentNode.replaceChild(new_element, element);
    return new_element;
}

function generateBtnEventListener(endpoint, reloadButton) {
    const url = serverUrl + endpoint + '\/';
    const preloader = document.getElementById('preloader');
    const main = document.getElementsByTagName('main')[0];
    const inputRow = document.getElementById('inputRow');
    let saveButton;
    let createButton;

    const rowIdS = [];
    let sampleObjectKeys;

    return async function () {
        preloader.style.display = 'block';

        createButton = document.getElementById('addRow');
        saveButton = document.getElementById('save');
        saveButton = deleteEventListeners(saveButton);
        inputRow.value = '';
        deleteTable();
        let response = await fetch(url);
        let elements = await response.json();

        if (elements.length === 0) return;


        const table = createTable(elements);

        main.append(table);

        rowIdS.splice(0, rowIdS.length);
        elements.forEach(element => {
            rowIdS.push(element.id);

            delete element.id;
        })

        sampleObjectKeys = Object.keys(elements[0]);

        addDeleteEventListeners();
        addEditEventListeners();

        createButton = deleteEventListeners(createButton);
        createButton.addEventListener('click', showCreatingModal);

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
        const id = rowIdS[i - 1];
        const fieldToChange = sampleObjectKeys[j - 3];
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

    function showCreatingModal() {
        showModal({title: endpoint, bodyElement: createModalBodyElement()});
    }


    function createModalBodyElement() {
        const bodyForm = createElement({
            tagName: 'form', className: 'modal-body',
            attributes: {action: "", method: "post"}
        });

        sampleObjectKeys.forEach((key, id) => {
            const div = createElement({tagName: 'div', className: 'createdField'});
            const labelForInput = createElement({tagName: 'label', attributes: {for: `inputField${id}`}});
            const inputField = createElement({
                tagName: 'input',
                attributes: {type: 'text', id: `inputField${id}`, name: key, required: ""}
            });
            labelForInput.innerText = `${key}:`;

            div.append(labelForInput, inputField);
            bodyForm.append(div);
        })

        const createButtonModal = createElement({
            tagName: 'button',
            className: 'creatingButton',
            attributes: {type: "submit"}
        });
        createButtonModal.innerText = 'create';
        createButtonModal.addEventListener('click', generateCreateBtnEventListener());
        bodyForm.append(createButtonModal);

        return bodyForm;

        function createBodyElement() {
            let inputs = Array.from(bodyForm.getElementsByTagName('input'));

            const bodyElement = {};

            inputs.forEach(input => bodyElement[input.name] = input.value);

            return bodyElement;

        }

        function validateCreating() {
            const inputs = Array.from(bodyForm.getElementsByTagName('input'));
            const length = inputs.length;

            return inputs.filter(input => validateInput(input)).length === length;
        }

        function generateCreateBtnEventListener() {

            return async function () {
                const objectBody = createBodyElement();
                if (validateCreating()) {
                    await fetch(url, apiHelper('POST', objectBody));
                }
            }
        }

    }

    function validateInput(input) {
        return input.value.length !== 0;
    }
}


export {deleteEventListeners, generateBtnEventListener};