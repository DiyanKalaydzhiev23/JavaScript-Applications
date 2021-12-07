import { render } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../requests.js';
import { registerTemplate } from '../templates.js';


export function registerPage() {
    const root = document.getElementById('main-content');

    render(registerTemplate(), root);

    document.querySelector('button').addEventListener('click', validate);
}

async function validate(e) {
    e.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const rePass = document.getElementById('conf-pass');

    let errorText = '';

    if (email.value === '')  {
        errorText += 'Email cannot be empty!\n';
    } 
    if (password.value === '') {
        errorText += 'Password cannot be empty!\n';
    }
    if (rePass.value !== password.value) {
        errorText += 'Passwords must match';
    }

    if (errorText) {
        alert(errorText);
        return;
    }

    await register(email.value, password.value);
}