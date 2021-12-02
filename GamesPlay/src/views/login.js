import { render } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../requests.js';
import { loginTemplate } from '../templates.js';

export function loginPage() {
    const root = document.getElementById('main-content');
    
    render(loginTemplate(), root);

    document.querySelector('.submit').addEventListener('click', sendRequest);
}

async function sendRequest(e) {
    e.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('login-password');

    await login(email.value, password.value);
}