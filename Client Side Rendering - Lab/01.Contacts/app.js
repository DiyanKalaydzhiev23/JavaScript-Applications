import {html, render} from  'https://unpkg.com/lit-html?module';
import { contacts } from './contacts.js';

function onClick(e) {
    const info = e.target.parentNode.children[2];
    
    if (info.className === 'none') {
        info.className = 'details';
    } else {
        info.className = 'none';
    }
}

const template = (data) => html`
    <div class="contact card">
        <div>
            <i class="far fa-user-circle gravatar"></i>
        </div>
        <div class="info">
            <h2>Name: ${data.name}</h2>
            <button @click=${onClick} class="detailsBtn">Details</button>
            <div class="details" id=${data.id}>
                <p>Phone number: ${data.phoneNumber}</p>
                <p>Email: ${data.email}</p>
            </div>
        </div>
    </div>
`;

const container = document.getElementById('contacts');
const result = contacts.map(template);

render(result, container);