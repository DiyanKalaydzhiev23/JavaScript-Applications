import { loginTemplate } from '../templates.js';
import { login } from '../requests.js';

function loginPage(ctx) {
    ctx.render(loginTemplate());
    document.getElementById('submitLogin').addEventListener('click', getData);
}

function getData(e) {
    e.preventDefault();

    const form = document.getElementsByTagName('form')[0];
    login(form.email.value, form.password.value);
}

export {loginPage};