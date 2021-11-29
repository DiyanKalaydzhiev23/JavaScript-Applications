import { loginTemplate } from '../templates.js';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../request.js';
import { notify } from '../notify.js';


export function loginPage() {
    const root = document.querySelector('main');

    render(loginTemplate(), root);

    document.querySelector('.registerbtn').addEventListener('click', validate);
} 

async function validate(e) {
    e.preventDefault();

    const form = document.querySelector('form');
    let errorText = '';

    if (form.email.value === '') {
        errorText += 'Email cannot be empty!\n';
    }
    if (form.password.value === '') {
        errorText += 'Password cannot be empty!\n';
    }
    
    if (errorText.length > 0) {
        notify(errorText);
        return;
    }

    await login(form.email.value, form.password.value);
}