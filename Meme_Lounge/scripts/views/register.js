import { registerTemplate } from '../templates.js';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../request.js';
import { notify } from '../notify.js';

export function registerPage() {
    const root = document.querySelector('main');

    render(registerTemplate(), root);

    document.querySelector('.registerbtn').addEventListener('click', validate);

}

async function validate(e) {
    e.preventDefault();

    const form = document.querySelector('form');
    let errorText = '';

    if (form.username.value === '') {
        errorText += 'Username cannot be empty!\n';
    }
    if (form.email.value === '') {
        errorText += 'Email cannot be empty!\n';
    }
    if (form.password.value === '') {
        errorText += 'Password cannot be empty!\n';
    }
    if (form.password.value !== form.repeatPass.value) {
        errorText += 'Passwords must match!\n';
    }

    if (errorText.length > 0) {
        notify(errorText);
        return;
    }

    await register(
        form.username.value,
        form.email.value,
        form.password.value,
        form.gender.value
    );
}