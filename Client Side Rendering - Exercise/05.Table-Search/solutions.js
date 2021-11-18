import {html, render} from 'https://unpkg.com/lit-html?module';

const url = 'http://localhost:3030/jsonstore/advanced/table';
const root = document.querySelector('tbody');
const searchBtn = document.getElementById('searchBtn');

const templateStudents = (data) => html`
    ${data.map(d => html`
        <tr>
            <td>${d.firstName} ${d.lastName}</td>
            <td>${d.email}</td>
            <td>${d.course}</td>
        </tr>
    `)}
`;

function search() {
    const searched = document.getElementById('searchField').value.toLowerCase();
    
    for (let child of root.children) {
        for (let subChild of child.children) {
            subChild.className = '';

            if (subChild.textContent.toLowerCase().includes(searched)) {
                subChild.className = 'select';
            }
        } 
    }
}

async function renderStudents() {
    const response = await fetch(url);
    const data = await response.json();
    const result = templateStudents(Object.values(data))

    render(result, root);
}

searchBtn.addEventListener('click', search);
renderStudents();
