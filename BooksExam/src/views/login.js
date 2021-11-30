import { loginTemplate } from "../templates.js";
import { render } from '../../node_modules/lit-html/lit-html.js';
import { login } from "../requests.js";


export function loginPage() {
    const root = document.getElementById('site-content');

    render(loginTemplate(), root);

    document.querySelector('.submit').addEventListener('click', sendRequest);
}

async function sendRequest(e) {
    e.preventDefault();

    const form = document.querySelector('form');

    await login(form.email.value, form.password.value);
}