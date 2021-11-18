import { tableTemplate } from "./templates.js";
import { render } from 'https://unpkg.com/lit-html?module';
import { root } from "./app.js";

const url = 'http://localhost:3030/jsonstore/collections/books';

async function submit(e) {
    const form = e.target.parentNode;
    const data = {
        title: form.title.value,
        author: form.author.value
    };
    const options = {
        method: 'post',
        headers: {'Content-Type': 'application/json.'},
        body: JSON.stringify(data)
    };

    await fetch(url, options);
}

async function deleteBook(e) {
    const id = document.getElementById('idHolder').name;
    const options = {
        method: 'delete',
        headers: {'Content-Type': 'application/json.'},
        body: ''
    };
    const url = `http://localhost:3030/jsonstore/collections/books/${id}`;

    await fetch(url, options);
    render(await loadTable(), root);
}


async function getData() {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

async function save(e) {
    e.preventDefault();

    const id = document.getElementById('idHolder').value;
    const addForm = document.getElementById('add-form');
    const editForm = e.target.parentNode;
    const data = {
        title: editForm.title.value,
        author: editForm.author.value
    };
    const options = {
        method: 'put',
        headers: {'Content-Type': 'application/json.'},
        body: JSON.stringify(data)
    };
    const url = `http://localhost:3030/jsonstore/collections/books/${id}`;

    await fetch(url, options);

    addForm.style.display = 'block';
    editForm.style.display = 'none';
}

async function loadTable() {
    const data = await getData();
    const result = tableTemplate(Object.entries(data));

    return result;
}

export {loadTable, submit, save, deleteBook};