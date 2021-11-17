import {html, render} from  'https://unpkg.com/lit-html?module';
import { cats } from './catSeeder.js';

const catsTemplate = (cats) => html`
    <ul>
        ${cats.map(c => html`
        <li>
            <img src="./images/${c.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button @click="${moreInfo}" class="showBtn">Show status code</button>
                <div class="status" style="display: none" id=${c.id}>
                    <h4>Status Code: ${c.statusCode}</h4>
                    <p>${c.statusMessage}</p>
                </div>
            </div>
        </li>`)}
    </ul>
`;

function moreInfo(e) {
    const info = e.target.nextElementSibling;

    if (info.style.display === 'none') {
        info.style.display = 'block';
    } else {
        info.style.display ='none';
    }
}

function displayCats() {
    const root = document.getElementById('allCats');
    const result = catsTemplate(cats);

    render(result, root);
}

displayCats();