import {html, render} from  'https://unpkg.com/lit-html?module';

const root = document.getElementById('root');
const loadBtn = document.getElementById('btnLoadTowns');
const template = (towns) => html`
    <ul>
        ${towns.map(t => html`<li>${t}</li>`)}
    </ul>
`;

function displayTowns(e) {
    e.preventDefault();

    const towns = document.getElementById('towns').value.split(', ');
    const result = template(towns);

    render(result, root);
}

loadBtn.addEventListener('click', displayTowns);
