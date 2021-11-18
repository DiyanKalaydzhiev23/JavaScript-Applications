import { html } from 'https://unpkg.com/lit-html?module';
import { submit, save, deleteBook } from './queries.js';
import { displayEditForm } from './dom.js';

const tableTemplate = (booksInfo) => html`
    <button id="loadBooks">LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            ${booksInfo.map(b => html`
            <tr data_id=${b[0]}>
                <td>${b[1].title}</td>
                <td>${b[1].author}</td>
                <td>
                    <button @click=${displayEditForm}>Edit</button>
                    <button @click=${deleteBook}>Delete</button>
                </td>
            </tr>
            `)}
        <tbody>
    </table>
`;

const addFormTemplate = () => html`
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit" @click=${submit}>
`;

const editFormTemplate = (data) => html`
    <input type="hidden" name="id" value=${data !== undefined ? data.id: ''} id='idHolder'>
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" value="title" placeholder="Title..." value=${data !== undefined ? data.title : ''}>
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." value=${data !== undefined ? data.author : ''}>
    <input type="submit" value="Save"  @click=${save}>
`;

export {tableTemplate, addFormTemplate, editFormTemplate};